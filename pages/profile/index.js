import banner from '../../public/images/banners/contemporary-banner.png';
import {ProfileSidebar} from "../../core/Navigation";
import BannerCard from "../../layouts/main/pages/profile/BannerCard";
import {Grid} from "../../core/Layout";
import {Link} from "../../core/Next";

const MyProfile = () => {

  return (
    <div>
      <BannerCard srcImg={banner} title='Profile'/>
      <Grid md={2} lg={6} gapx={12} classes='mt-12'>
        <div className='col-span-1'>
          <ProfileSidebar active='dashboard'/>
        </div>
        <div className='laptop:col-span-3'>
          <div className="flex flex-col w-full">
            <div className='p-4 rounded-lg'>
              <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
              <p> From your profile dashboard you can view your
                <Link scroll={false} href='/profile/order' className='font-bold underline mx-1'>
                  recent orders
                </Link>
                , manage your
                <Link scroll={false} href='/profile/info' className='font-bold underline mx-1'>
                  Account Details
                </Link>
                and
                <Link scroll={false} href='/profile/change-pass' className='font-bold underline mx-1'>
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

export default MyProfile;