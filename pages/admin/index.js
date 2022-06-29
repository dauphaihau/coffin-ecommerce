import {useEffect, useState} from 'react';
import {userService} from '../../services/users';
import {formatPrice} from '../../utils/helpers';
import {useUIController} from '../../context/UIControllerContext';
import {Box, Col, Grid, Row} from '../../core/Layout';
import Image from '../../core/Next/Image';
import {Helmet} from '../../layouts/admin/common/Helmet';
import Table from '../../core/Table';
import {Text} from '../../core';

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const {progress, setProgress} = useUIController();

  useEffect(() => {
    const fetchData = async () => {
      setProgress(progress + 30)
      const res = await userService.getAll();
      if (res) {
        setLoading(false)
        setProgress(100)
        setUsers(res?.data)
      }
    }
    fetchData();
  }, [])

  const dataBreadcrumb = [
    {path: '/admin', name: 'Dashboard', firstLink: true},
    {path: '', name: 'default', lastLink: true}
  ];

  const data = [
    {
      title: 'Sales',
      number: '$230,220',
      percentage: '+11%',
    },
    {
      title: 'Customers',
      number: '3.200',
      percentage: '+12%',
    },
    {
      title: 'Avg. Revenue',
      number: '$1.200',
      percentage: '+$213',
    },
  ]

  const products = ['Autumn Oak Hardwood', 'Trinity Oak', 'Premium Traditional Casket', 'Willow Rounded Coffin']

  const columns = [
    {
      id: 'Seller', title: 'Name',
      render: (row) => (
        <Row classes='flex items-center'>
          <Box classes='rounded-lg '>
            <Image
              src={row.avatar ?? '/images/default/avatar-default.jpeg'}
              classesSize='max-w-9 max-h-9 w-9 h-9'
              classes='rounded-md'
            />
          </Box>
          <Box>
            <Text weight='bold' classes='ml-4 text-sm'>{row.name}</Text>
            <Text classes='ml-4 text-sm text-gray-500'>{row.email}</Text>
          </Box>
        </Row>
      )
    },
    {id: 'product', title: 'Product', render: () => <>{products[Math.floor(Math.random() * products.length)]}</>},
    // {id: 'country', title: 'Country',},
    {id: 'total', title: 'Total', render: () => <>{formatPrice(Math.floor(Math.random() * 10000) + 1)}</>},
    {id: 'rank', title: 'Rank', render: (_, index) => <span className='badge-gray'>Top {index}</span>},
  ];

  return (
    <Helmet title='General Statistics' dataBreadcrumb={dataBreadcrumb}>
      <Grid sx={3} lg={3} gap={4}>
        {data.map((e, id) => (
          <Box key={id} classes="w-full bg-white dark:bg-gray-custom-901 p-4 flex-col justify-between items-center rounded-xl shadow-xl">
            {/*<Col key={id} justify='between' align='center' classes='w-full bg-white p-4 rounded-xl shadow-xl'>*/}
            <Box classes='h-full'>
              <Row justify='between'>
                <Text weight='bold' classes='text-gray-500 text-sm'>{e.title}</Text>
                <Text classes=' text-[#8592a9] text-[13px]'>6 May - 7 May</Text>
              </Row>
              <Text weight='semibold' classes='text-xl text-gray-700 my-1'>{e.number} </Text>
              <Text classes='text-[#8592a9] text-sm'>
                <Text weight='bold' span classes='text-[#96d245] text-sm mr-1'>{e.percentage}</Text>since last month
              </Text>
            </Box>
            {/*</Col>*/}
          </Box>
        ))}
      </Grid>
      <Text sx='2xl' weight='bold' classes='mt-6 mb-3'>Best Salesman</Text>
      <Table
        hidePagination
        rowsPerPage={6}
        loading={loading}
        columns={columns}
        rows={users?.list}
      />
    </Helmet>
  );
}

Dashboard.layout = 'admin';
export default Dashboard;