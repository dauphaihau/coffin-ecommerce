import {useRouter} from "next/router";
import moment from "moment";
import {toast} from "react-hot-toast";
import {useEffect, useState} from "react";

import {Link, Helmet, Tooltip} from "@components";
import {Table} from "@components/Table";
import {productService} from "@services/products";
import {formatPrice} from "@utils/helpers";
import {useUIController} from "@context/UIControllerContext";

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState()
  const {progress, setProgress} = useUIController();

  useEffect(() => {
    const fetchData = async () => {
      setProgress(progress + 30)
      const res = await productService.getAll();
      setProgress(100)
      setProducts(res.data)
    }
    fetchData();
  }, [])

  const handleQuantity = (quantity) => {
    if (quantity == 0) {
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
      render: (row) => {
        // return <div className='flex items-center'>
        //   <div className='rounded-lg '>
        //     <img src={`https://i.pravatar.cc/150?u=${row._id}`} className='h-9 w-9 rounded-md ' alt='avatar'/>
        //   </div>
        //   <p className='ml-4 text-sm font-bold'>{row.name}</p>
        // </div>
        return <p className='text-sm font-bold'>{row.name}</p>
      }
    },
    {id: 'category', title: 'Category',},
    {id: 'price', title: 'Price', render: (row) => <>{formatPrice(row.price)}</>},
    {id: 'sku', title: 'SKU'},
    {id: 'quantity', title: 'quantity'},
    // {id: 'brand', title: 'Brand'},
    {
      id: 'status', title: 'Status',
      render: (row) => (<>{handleQuantity(row.quantity)}</>)
    },
    {id: 'createAt', title: 'Date Create', render: (row) => <>{moment(row.createAt).format('LL')}</>},
    {
      id: '', title: '',
      render: (row) => <>
        <div className='flex gap-x-4 justify-center'>
          <Tooltip title='Edit'>
            <Link href={`${router.pathname}/${row._id}`}>
              <i className=" fa-solid fa-pen text-xl "/>
            </Link>
          </Tooltip>
          <Tooltip title='Delete'>
            <button onClick={() => handleDelete(row._id)}>
              <i className="fa-solid fa-trash-can text-xl"/>
            </button>
          </Tooltip>
        </div>
      </>
    },
  ];


  const dataBreadcrumb = [
    {path: "/admin", name: "Dashboard", firstLink: true},
    {path: "/admin/products", name: "Products"},
    {path: "", name: "List", lastLink: true}
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

  return (
    <Helmet title='All Products' dataBreadcrumb={dataBreadcrumb}>
      <Table
        itemsPerPage={6}
        columns={columns}
        rows={products}
      />
    </Helmet>
  )
}

ProductList.layout = 'admin';
export default ProductList