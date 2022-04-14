import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {useEffect, useState} from "react";

import {Link} from "@components";
import {Table} from "@components/Table";
import Helmet from "@components/Helmet";
import {productService} from "@services/products";
import {useUtil} from "../../../context/utilContext";

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
    {id: 'price', title: 'Price',},
    {id: 'stock', title: 'Stock',},
    {id: 'brand', title: 'Brand',},
    // {id: 'sku', title: 'SKU'},
    {
      id: 'status', title: 'Status',
      render: (row) => (<span className="badge-green">{row ? 'Active' : 'Banned'}</span>
      )
    },
    // {id: 'createAt', title: 'Date Create', render: (row) => <>{moment(row.createAt).format('DD/MM/YYYY')}</>},
    {
      id: '', title: '',
      render: (row) => <>
        <div className='flex gap-x-4 justify-center'>
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
    <Helmet title='Product List' dataBreadcrumb={dataBreadcrumb}>
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