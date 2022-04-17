import Breadcrumb from "../Navigation/Breadcrumb";

const Helmet = ({title, dataBreadcrumb, children}) => {
  return (
    <>
      <div className="mb-6">
        <Breadcrumb links={dataBreadcrumb}/>
        <h1 className='text-3xl mt-2 font-bold'>{title}</h1>
      </div>
      <div>
        {children}
      </div>
    </>
  );
}

export default Helmet;