import Breadcrumb from "../../../core/Navigation/Breadcrumb";
import { Text } from "../../../core";
import { Box, Col } from "../../../core/Layout";

type DataBreadcrumbValue = number | string;

type DataBreadcrumb<Type extends DataBreadcrumbValue> = {
  path: Type;
  name: string;
  firstLink: boolean,
  lastLink: boolean,
};

interface Props<Type extends DataBreadcrumbValue> {
  title?: string,
  classes?: string,
  dataBreadcrumb?: DataBreadcrumb<Type>[],

  // '[{ firstLink?: boolean; lastLink?: boolean; path: string; name: string; }]'.
}

export const Helmet = ({title, classes = '', dataBreadcrumb, children}: Props) => {
  return (
    <Box section classes={classes}>
      <Col classes='mb-6'>
        <Breadcrumb links={dataBreadcrumb}/>
        <Text weight='bold' classes='dark:text-white text-xl laptop:text-3xl mt-2'>{title}</Text>
      </Col>
      {children}
    </Box>
  );
}
