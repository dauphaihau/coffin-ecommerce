import Breadcrumb from "../../components/Breadcrumb";

const Helmet = ({title, dataBreadcrumb, children}) => {
  return (
    <div>
      <div className="mb-6">
        <Breadcrumb links={dataBreadcrumb}/>
        <h1 className='text-3xl mt-2 font-bold'>{title}</h1>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

export default Helmet;