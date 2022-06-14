import {useRouter} from "next/router";
import moment from "moment";
import {toast} from "react-hot-toast";
import {useCallback, useEffect, useState} from "react";

import {productService} from "@services/products";
import {formatPrice} from "@utils/helpers";
import {useUIController} from "@context/UIControllerContext";
import {Button} from "../../../core/Button";
import {MenuDropdown} from "../../../core/Navigation";
import {Checkbox} from "../../../core/Input";
import {Helmet} from "../../../layouts/admin/common/Helmet";
import {Link} from "../../../core/Next";
import {Row} from "../../../core/Layout";
import Table from "../../../core/Table";


const dataBreadcrumb = [
  {path: "/admin", name: "Dashboard", firstLink: true},
  {path: "/admin/products", name: "Products"},
  {path: "", name: "List", lastLink: true}
];

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState({
    skip: 0, limit: 3
  })
  const {progress, setProgress} = useUIController();


  const getAllProducts = useCallback(
    async () => {
      setProgress(progress + 30)
      // const res = await productService.getAll(params);
      const res = await productService.getAll();
      if (res) {
        setProgress(100)
        setProducts(res.data)
        setLoading(false)
      }
    }, []
  )
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts])

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

  const columns = [
    {
      id: 'name', title: 'Product',
      render: (row) => <p className='text-sm font-bold'>{row.name}</p>
    },
    {id: 'category', title: 'Category'},
    {id: 'price', title: 'Price', render: (row) => <>{formatPrice(row.price)}</>},
    {id: 'sku', title: 'SKU'},
    {id: 'quantity', title: 'quantity'},
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
              feature: () => handleDelete(row._id)
            },
          ]}
        />
      )
    },
  ];


  async function handleDelete(id) {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    const res = await productService.delete(id)
    if (res.isSuccess) {
      const res = await productService.getAll();
      setProducts(res.data)
      toast.success('Delete success!')
    } else {
      toast.error(res.message)
    }
  }

  async function handleDeleteMultiItems(optionsChecked) {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    const res = await productService.multiDelete(optionsChecked.map(e => e.id))
    if (res.isSuccess) {
      const res = await productService.getAll();
      setProducts(res.data)
      toast.success('Delete success!')
    } else {
      toast.error(res.message)
    }
  }

  const handleOnChangeTable = (values) => {
    setParams({...params, ...values})
  }

  // console.log('products', products)
  // console.log('params', params)

  return (
    <>
      <Row justify='between' align='center'>
        <Helmet title='All Products' dataBreadcrumb={dataBreadcrumb}/>
        <Link href='/admin/products/new'>
          <Button classes='ml-auto mb-4' icon={<i className="fa-solid fa-plus"/>}> New Product</Button>
        </Link>
      </Row>
      <Table
        searchInputSelection
        checkboxSelection
        // onChange={(values) => setParams(values)}
        onChange={handleOnChangeTable}
        // onChange={setParams}
        onChangeSelected={handleDeleteMultiItems}
        loading={loading}
        // rowsPerPage={3}
        rowsPerPageOptions={[3, 5, 25]}
        // rowsPerPageOptions={[3, 4, 5]}
        totalRows={products?.total}
        columns={columns}
        rows={products?.list}
      />
    </>
  )
}

ProductList.layout = 'admin';
export default ProductList