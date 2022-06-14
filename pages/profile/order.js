import {useRouter} from "next/router";

import banner from "../../public/images/banners/contemporary-banner.png";
import BannerCard from "../../layouts/main/pages/profile/BannerCard";
import ProfileSidebar from "../../layouts/main/pages/profile/ProfileSidebar";
import {EyeIcon} from "@heroicons/react/outline";
import {Link} from "../../core";
import {rows} from "../../assets/data/orders";
import Table from "../../core/Table";
import {Grid} from "../../core/Layout";

const Order = () => {
  const router = useRouter();
  const columns = [
    {id: 'id', title: 'Order'},
    {id: 'date', title: 'Date',},
    {id: 'status', title: 'Status',},
    {id: 'total', title: 'Total',},
    {
      id: '', title: 'Action',
      render: (row) => <>
        <div className='flex gap-x-4 justify-center'>
          <Link href={`${router.pathname}/${row.id}`}>
            <EyeIcon className='cursor-pointer' height={30} width={30}/>
          </Link>
        </div>
      </>
    },
  ];

  return (
    <>
      <BannerCard srcImg={banner} title='Profile'/>
      <Grid md={2} lg={6} gapx={12} classes='mt-12'>
        <div className='col-span-1'>
          <ProfileSidebar active='order'/>
        </div>
        <div className='col-span-4'>
          <div className="flex flex-col w-full">
            <div className='p-4 rounded-lg'>
              <h1 className='text-3xl font-bold mb-6'>Order</h1>
              <Table
                rowsPerPage={4}
                columns={columns}
                rows={rows}
              />
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
}

export default Order;