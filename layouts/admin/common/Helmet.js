import Breadcrumb from "../../../core/Navigation/Breadcrumb";
import { Text } from "../../../core";
import { Col } from "../../../core/Layout";

export const Helmet = ({title, classes = '', dataBreadcrumb, children}) => {
  return (
    <section className={`${classes}`}>
      <Col classes='mb-6 '>
        <Breadcrumb links={dataBreadcrumb}/>
        <Text weight='bold' classes='dark:text-white text-xl laptop:text-3xl mt-2'>{title}</Text>
      </Col>
      {children}
    </section>
  );
}
