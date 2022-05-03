import Breadcrumb from "../../../core/Navigation/Breadcrumb";

const Helmet = ({title, dataBreadcrumb, children}) => {
  return (
    <>
      <div className="mb-6">
        <Breadcrumb links={dataBreadcrumb}/>
        <h1 className='text-xl laptop:text-3xl mt-2 font-bold'>{title}</h1>
      </div>
      {children}
    </>
  );
}

export default Helmet;