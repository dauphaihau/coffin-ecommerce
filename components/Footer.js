const Footer = () => {
  return (
    <footer className="mt-12">
      <div className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
            <div className=" sm:w-1/2 md:w-1/4 xl:w-1/6">
              <h5 className="text-xl font-bold mb-6">Social</h5>
              <ul className="list-none footer-links">
                <li className="mb-3">
                  <a href="#"
                     className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                    <i className="fa text-2xl">&#xf099;</i> Twitter</a>
                </li>
                <li className="mb-3">
                  <a href="#"
                     className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                    <i className="fa-brands fa-instagram text-2xl mr-2"/> Instagram</a>
                </li>
                <li className="mb-3">
                  <a href="#"
                     className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                    <i className="fa-brands fa-facebook text-2xl mr-2"/>Facebook</a>
                </li>
                <li className="mb-3">
                  <a href="#"
                     className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">
                    <i className="fa-brands fa-youtube text-2xl mr-2"/> Youtube</a>
                </li>
              </ul>
            </div>
            <div className=" sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
              <h5 className="text-xl font-bold mb-6">Contact</h5>
              <ul className="list-none footer-links">
                {['Contact Us', 'dauphaihau@email.com','example@email.com','Call us: +1 254 568-5479'].map((li, i) => (
                  <>
                    <li className="mb-3" key={i}>
                      <a href="#" className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">{li}</a>
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div className=" sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
              <h5 className="text-xl font-bold mb-6">About</h5>
              <ul className="list-none footer-links">
                {['Support center', 'Customer Support','About Us','Copyright'].map((li, i) => (
                  <>
                    <li className="mb-3" key={i}>
                      <a href="#" className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">{li}</a>
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div className=" sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0">
              <h5 className="text-xl font-bold mb-6">Customer Care</h5>
              <ul className="list-none footer-links">
                {['FAQ & Helps', 'Shipping & Delivery','Return & Exchanges'].map((li, i) => (
                  <>
                    <li className="mb-3" key={i}>
                      <a href="#" className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">{li}</a>
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div className=" sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0">
              <h5 className="text-xl font-bold mb-6">Our Information</h5>
              <ul className="list-none footer-links">
                {['Privacy policy update', 'Terms & conditions','Return Policy', 'Site Map'].map((li, i) => (
                  <>
                    <li className="mb-3" key={i}>
                      <a href="#" className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">{li}</a>
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div className=" sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
              <h5 className="text-xl font-bold mb-6">Top Categories</h5>
              <ul className="list-none footer-links">
                {['Natural material coffin', 'Traditional coffin','American caskets'].map((li, i) => (
                  <>
                    <li className="mb-3" key={i}>
                      <a href="#" className="border-b border-solid border-transparent hover:text-black text-smaller text-gray-500">{li}</a>
                    </li>
                  </>
                ))}
            </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex-row sm:items-center flex-col flex px-12 desktop:px-0 border-solid border-t border-gray-300">
        <span className="block text-gray-700 text-xs">Copyright © 2022 Coffin Ecommerce. All rights reserved.</span>
        <div className="sm:justify-end sm:m-0 flex flex-1 mt-4">
          <ul className="hidden md:flex flex-wrap justify-center items-center space-s-4 xs:space-s-5 lg:space-s-7 mb-1 md:mb-0 mx-auto md:mx-0">
            <li className="mb-2 md:mb-0 transition hover:opacity-80 ml-8">
              <a href="/" target="_blank">
                <img src="/images/payment/visa.png" alt="Visa" width="50" height="20"/>
              </a>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80 ml-8">
              <a href="/" target="_blank">
                <img src="/images/payment/paypal.png" alt="Paypal" width="76" height="20"/>
              </a>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80 ml-8">
              <a href="/" target="_blank">
                <img src="/images/payment/amazon.png" alt="Master Card" width="86" height="20"/>
              </a>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80 ml-8">
              <a href="/" target="_blank">
                <img src="/images/payment/apple-pay.png" alt="Apple Pay" width="66" height="20"/>
              </a>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80 ml-8">
              <a href="/" target="_blank">
                <img src="/images/payment/skrill-logo.png" alt="Skrill" width="79" height="20"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;