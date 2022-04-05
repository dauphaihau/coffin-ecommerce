import {Link} from "../index";

const Footer = () => {
  return (
    <footer className="mt-12">
      <div className="py-8 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 ipad:grid-cols-3 laptop:grid-cols-6">
            <div className="mb-8 ipad:mt-0">
              <h5 className="text-xl font-bold mb-6">Social</h5>
              <ul className="list-none ">
                <li className="mb-3">
                  <Link href="#"
                        className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                    <i className="fa text-2xl">&#xf099;</i> Twitter
                  </Link>
                </li>
                <li className="mb-3">
                  <Link href="#"
                        className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                    <i className="fa-brands fa-instagram  text-2xl mr-2"/> Instagram
                  </Link>
                </li>
                <li className="mb-3">
                  <Link href="#"
                        className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                    <i className="fa-brands fa-facebook-square  text-2xl mr-3"/>Facebook
                  </Link>
                </li>
                <li className="mb-3">
                  <Link href="#"
                        className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                    <i className="fa-brands fa-youtube  text-2xl mr-2"/> Youtube
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-8 ipad:mt-0">
              <h5 className="text-xl font-bold mb-6">Contact</h5>
              <ul className="list-none footer-links">
                {['Contact Us', 'Deck 5, ISS, LEO 51.603.', 'dauphaihau@outlook.com', 'Call us: 84901111921'].map((nameLink, id) => (
                  <li className="mb-3" key={id}>
                    <Link href='#'
                          className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                      {nameLink}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8 ipad:mt-0">
              <h5 className="text-xl font-bold mb-6">About</h5>
              <ul className="list-none footer-links">
                {['Support center', 'Customer Support', 'About Us', 'Copyright'].map((nameLink, id) => (
                  <li className="mb-3" key={id}>
                    <Link href='#'
                          className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                      {nameLink}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8 ipad:mt-0">
              <h5 className="text-xl font-bold mb-6">Customer Care</h5>
              <ul className="list-none footer-links">
                {['FAQ & Helps', 'Shipping & Delivery', 'Return & Exchanges'].map((nameLink, id) => (
                  <li className="mb-3" key={id}>
                    <Link href='#'
                          className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                      {nameLink}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 ipad:mt-0">
              <h5 className="text-xl font-bold mb-6">Our Information</h5>
              <ul className="list-none footer-links">
                {['Privacy policy update', 'Terms & conditions', 'Return Policy', 'Site Map'].map((nameLink, id) => (
                  <li className="mb-3" key={id}>
                    <Link href='#'
                          className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                      {nameLink}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 ipad:mt-0">
              <h5 className="text-xl font-bold mb-6">Top Categories</h5>
              <ul className="list-none footer-links">
                {['Natural material coffin', 'Traditional coffin', 'American caskets'].map((nameLink, id) => (
                  <li className="mb-3" key={id}>
                    <Link href='#'
                          className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                      {nameLink}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-around
      border-solid border-t border-gray-300 py-3
      ipad:flex-row ipad:px-0
      ">
        <span className="block text-gray-700 text-xs text-center ipad:pb-0">Copyright © 2022 Coffin Store, Inc. All rights reserved.</span>
        <div className="
        justify-end m-0 flex flex-1
        flex hidden ipad:block
         ">
          <ul className="
          ipad:flex
          laptop:flex-wrap laptop:justify-end items-center
          space-s-4 xs:space-s-5 lg:space-s-7
          mb-1 md:mb-0 mx-auto md:mx-0
          ">
            <li className="mb-2 md:mb-0 transition hover:opacity-80 ml-8">
              <Link href="/" target="_blank">
                <img src="/images/payment/visa.png" alt="Visa" width="50" height="20"/>
              </Link>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80 ml-8">
              <Link href="/" target="_blank">
                <img src="/images/payment/paypal.png" alt="Paypal" width="76" height="20"/>
              </Link>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80 ml-8">
              <Link href="/" target="_blank">
                <figure >
                  <img src="/images/payment/amazon.png" alt='Amazon' width="86" height="20"/>
                </figure>
              </Link>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80 ml-8">
              <Link href="/" target="_blank">
                <img src="/images/payment/apple-pay.png" alt="Apple Pay" width="66" height="20"/>
              </Link>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80 ml-8">
              <Link href="/" target="_blank">
                <img src="/images/payment/skrill.png" alt="Skrill" width="69" height="20"/>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;