import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {useEffect, useState} from "react";

import {Link} from "@components";
import {Table} from "@components/Table";
import Helmet from "@components/Helmet";
import {productService} from "@services/products";
import {useUtil} from "../../../context/utilContext";
import {formatPrice} from "../../../utils/helpers";
import moment from "moment";

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState()
  const {progress, setProgress} = useUtil();

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
    if (quantity < 0 && quantity > 100) {
      return <span className='badge-warning'>Low Stock</span>
    }
    return <span className='badge-green'>In Stock</span>
  }

  const columns = [
    {
      id: 'name', title: 'Name',
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
    {id: 'quantity', title: 'quantity'},
    // {id: 'brand', title: 'Brand'},
    {id: 'sku', title: 'SKU'},
    {
      id: 'status', title: 'Status',
      render: (row) => (<>{handleQuantity(row.quantity)}</>)
    },
    {id: 'createAt', title: 'Date Create', render: (row) => <>{moment(row.createAt).format('LL')}</>},

    {
      id: '', title: '',
      render: (row) => <>
        <div className='flex gap-x-4 justify-center'>
          {/*<Link href={`${router.pathname}/${row._id}`}>*/}
          {/*  <div className="relative mx-2 group ">*/}
          {/*    <div className="group-hover:block hidden bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-0">Edit*/}
          {/*      /!*<svg className="absolute text-black h-2 z-[999] w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>*!/*/}
          {/*    </div>*/}
          {/*    <i className=" fa-solid fa-pen text-xl group-hover:block"/>*/}
          {/*  </div>*/}
          {/*</Link>*/}
          <Link href={`${router.pathname}/${row._id}`}>
            <i className="fa-solid fa-pen text-xl"/>
          </Link>
          <button onClick={() => handleDelete(row._id)}>
            <i className="fa-solid fa-trash-can text-xl"/>
          </button>
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