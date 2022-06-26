import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {useCallback, useEffect, useState} from "react";

import {productService} from "@services/products";
import {formatPrice} from "@utils/helpers";
import {useUIController} from "@context/UIControllerContext";
import {Button} from "../../../core/Button";
import {MenuDropdown} from "../../../core/Navigation";
import {Helmet} from "../../../layouts/admin/common/Helmet";
import {Link} from "../../../core/Next";
import {Row} from "../../../core/Layout";
import Table from "../../../core/Table";
import ConfirmDeleteDialog from "../../../layouts/admin/template/Dialog/ConfirmDelete";
import {Text} from "../../../core";


const dataBreadcrumb = [
  {path: "/admin", name: "Dashboard", firstLink: true},
  {path: "/admin/products", name: "Products"},
  {path: "", name: "List", lastLink: true}
];

const handleQuantity = (quantity) => {
  if (quantity === 0) {
    return <span className='badge-danger'>Out Of Stock</span>
  }
  if (quantity < 0 || quantity <= 100) {
    return <span className='badge-warning'>Low Stock</span>
  } else {
    return <span className='badge-green'>In Stock</span>
  }
}

const rowsPerPage = [5, 15, 25]

const ProductList = () => {
  const router = useRouter();
  const [ui, setUi] = useState({
    products: [],
    loading: true,
    showDialog: false,
    idUser: '',
    deleteType: 'single',
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [idUser, setIdUser] = useState()
  const [deleteType, setDeleteType] = useState('single')
  const [optCheckbox, setOptCheckbox] = useState([])
  const [resetCheckbox, setResetCheckbox] = useState(false)
  const [params, setParams] = useState({
    skip: 0, limit: rowsPerPage[0]
  })

  const {progress, setProgress} = useUIController();

  const getAllProducts = useCallback(
    async () => {
      setProgress(progress + 30)
      const {isSuccess, data} = await productService.getAll(params);
      if (isSuccess) {
        setProgress(100)
        setProducts(data)
        setLoading(false)
      }
    }, [params]
  )

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts])

  const columns = [
    {
      id: 'name', title: 'Product',
      render: (row) => (
        <>
          <Text weight='bold' classes='text-sm desktop:hidden '>
            {row.name.length > 15 ? row.name.substring(0, 15) + '...' : row.name}
          </Text>
          <Text weight='bold' sx='sm' classes='ml-4 hidden desktop:block'>
            {row.name}
          </Text>
        </>
      )
    },
    {id: 'category', title: 'Category'},
    {id: 'price', title: 'Price', render: (row) => <>{formatPrice(row.price)}</>},
    {id: 'sku', title: 'SKU'},
    {id: 'quantity', title: 'quantity', align: 'center'},
    // {id: 'brand', title: 'Brand'},
    // {
    //   id: 'status', title: 'Status',
    //   render: (row) => (<>{handleQuantity(row.quantity)}</>)
    // },
    // {id: 'createAt', title: 'Date Create', render: (row) => <>{moment(row.createAt).format('LL')}</>},
    {
      id: 'actions', title: '', align: 'center',
      render: (row) => (
        <MenuDropdown
          options={[
            {
              label: 'Edit',
              element: <i className="fa-solid fa-pen"/>,
              href: `${router.pathname}/${row._id}`
            },
            {
              label: 'Delete',
              element: <i className="fa-solid fa-trash-can"/>,
              feature: () => {
                setShowDialog(true)
                setIdUser(row._id);
              }
            },
          ]}
        />
      )
    },
  ];

  async function handleDeleteMultiItems(optionsChecked) {
    setOptCheckbox(optionsChecked)
    setShowDialog(true);
    setDeleteType('multi')
  }

  async function handleRequest() {
    let res;
    if (deleteType === 'single') {
      res = await productService.delete(idUser);
    } else res = await productService.multiDelete(optCheckbox);

    if (!res.isSuccess) return toast.error(res.message);
    getAllProducts();
    setResetCheckbox(true)
    setShowDialog(false)
    toast.success('Delete success!')
  }

  const handleOnChangeTable = (values) => {
    setParams({...params, skip: values.skip})
  }

  return (
    <>
      <ConfirmDeleteDialog defaultStatus={showDialog} setShowDialog={setShowDialog} handleRequest={handleRequest}/>
      <Row justify='between' align='center'>
        <Helmet title='All Products' dataBreadcrumb={dataBreadcrumb}/>
        <Link href='/admin/products/new'>
          <Button classes='ml-auto mb-4' icon={<i className="fa-solid fa-plus"/>}> New Product</Button>
        </Link>
      </Row>
      <Table
        // searchInputSelection
        checkboxSelection
        onChange={handleOnChangeTable}
        onChangeCheckbox={handleDeleteMultiItems}
        resetSelectCheckbox={resetCheckbox}
        loading={loading}
        rowsPerPageOptions={rowsPerPage}
        totalRows={products?.total}
        columns={columns}
        rows={products?.list}
      />
    </>
  )
}

ProductList.layout = 'admin';
export default ProductList