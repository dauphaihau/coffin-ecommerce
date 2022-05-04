import {Table} from "../../core/Table";
import {useEffect, useState} from "react";
import {userService} from "../../services/users";
import {formatPrice} from "../../utils/helpers";
import {useUIController} from "../../context/UIControllerContext";
import {Grid} from "../../core/Layout";
import Image from "../../core/Next/Image";
import {Helmet} from "../../layouts/admin/common/Helmet";

const Dashboard = () => {

  const [users, setUsers] = useState()
  const {progress, setProgress} = useUIController();

  useEffect(() => {
    const fetchData = async () => {
      setProgress(progress + 30)
      const res = await userService.getAll();
      setProgress(100)
      setUsers(res.data)
    }
    fetchData();
  }, [])

  const dataBreadcrumb = [
    {path: "/admin", name: "Dashboard", firstLink: true},
    {path: "", name: 'default', lastLink: true}
  ];

  const data = [
    {
      title: "Sales",
      number: '$230,220',
      percentage: '+11%',
    },
    {
      title: "Customers",
      number: '3.200',
      percentage: '+12%',
    },
    {
      title: "Avg. Revenue",
      number: '$1.200',
      percentage: '+$213',
    },
  ]

  const products = ['Autumn Oak Hardwood', 'Trinity Oak', 'Premium Traditional Casket', 'Willow Rounded Coffin']

  const columns = [
    {
      id: 'Seller', title: 'Name',
      render: (row) => (
        <div className='flex items-center'>
          <div className='rounded-lg '>
            <Image
              src={`https://i.pravatar.cc/150?u=${row._id}`}
              classesSize='max-w-9 max-h-9 w-9 h-9'
              classes='rounded-md'
            />
          </div>
          <div className=''>
            <p className='ml-4 text-sm font-bold'>{row.name}</p>
            <p className='ml-4 text-sm text-gray-500'>{row.email}</p>
          </div>
        </div>
      )
    },
    {id: 'product', title: 'Product', render: () => <>{products[Math.floor(Math.random() * products.length)]}</>},
    // {id: 'country', title: 'Country',},
    {id: 'total', title: 'Total', render: () => <>{formatPrice(Math.floor(Math.random() * 10000) + 1)}</>},
    {id: 'rank', title: 'Rank', render: (_, index) => <span className='badge-gray'>Top {index}</span>},
  ];

  return (
    <Helmet title='General Statistics' dataBreadcrumb={dataBreadcrumb}>
      <Grid lg={3} gap={4}>
        {data.map((e, id) => (
          <div key={id} className="w-full bg-white p-4 flex-col justify-between items-center rounded-xl shadow-xl">
            <div className='h-full'>
              <div className="flex justify-between">

                <p className='text-gray-500 font-bold text-sm'>{e.title}</p>
                <p className=' text-[#8592a9] text-[13px]'>6 May - 7 May</p>
              </div>
              <p className='text-xl text-gray-700 font-semibold my-1'>{e.number} </p>
              <p className='text-[#8592a9] text-sm'>
                <span className='text-[#96d245] font-bold text-sm mr-1 '>{e.percentage}</span>
                since last month</p>
            </div>

            {/*<div>*/}
            {/*  <i className="fa-solid fa-message p-4 bg-gradient-to-t from-gray-400 to-gray-300 rounded-xl text-black fa-circle-dollar "></i>*/}
            {/*</div>*/}
          </div>
        ))}
      </Grid>

      <h1 className='text-2xl mt-6 mb-3 font-bold'>Best Salesman</h1>

      <Table
        hidePagination
        rowsPerPage={6}
        columns={columns}
        rows={users}
      />
    </Helmet>
  );
}

Dashboard.layout = 'admin';
export default Dashboard;