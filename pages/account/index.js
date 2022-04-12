import banner from '../../public/images/banners/contemporary-banner.png';
import ImgBannerCard from "../../components/Card/ImgBannerCard";
import Grid from "../../components/Grid";
import {Link} from "../../components";
import ProfileSidebar from "../../components/Sidebar/ProfileSidebar";

const MyAccount = () => {

  return (
    <div>
      <ImgBannerCard srcImg={banner} title='Profile'/>
      <Grid md={2} lg={6} gapx={12} css='mt-12'>
        <ProfileSidebar active='dashboard'/>
        <div className='laptop:col-span-3'>
          <div className="flex flex-col w-full">
            <div className='p-4 rounded-lg'>
              <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
              <p> From your account dashboard you can view your
                <Link scroll={false} href='/account/order' className='font-bold underline mx-1'>
                  recent orders
                </Link>
                , manage your
                <Link scroll={false} href='/account/info' className='font-bold underline mx-1'>
                  Account Details
                </Link>
                and
                <Link scroll={false} href='/account/change-pass' className='font-bold underline mx-1'>
                  change your password.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Grid>
    </div>

  );
}

export default MyAccount;