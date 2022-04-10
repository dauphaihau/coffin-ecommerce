import {useRouter} from "next/router";

import banner from "../../public/images/banners/contemporary-banner.png";
import ImgBannerCard from "../../components/Card/ImgBannerCard";
import SidebarProfile from "../../components/SidebarProfile";
import {EyeIcon} from "@heroicons/react/outline";
import {Link} from "../../components";
import {rows} from "../../assets/data/orders";
import {Table} from "../../components/Table";

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
    <div>
      <ImgBannerCard srcImg={banner} title='Profile'/>
      <div className='mt-12 grid ipad:grid-cols-2 laptop:grid-cols-6 gap-x-12 '>
        <SidebarProfile active='order'/>
        <div className='col-span-3'>
          <div className="flex flex-col w-full">
            <div className='p-4 rounded-lg'>
              <h1 className='text-3xl font-bold mb-6'>Order</h1>
              <Table
                itemsPerPage={4}
                columns={columns}
                rows={rows}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;