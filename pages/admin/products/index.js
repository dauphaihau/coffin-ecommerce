import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {useCallback, useEffect, useRef, useState} from 'react';
import * as XLSX from 'xlsx';

import {productService} from '@services/products';
import {formatPrice} from '@utils/helpers';
import {useUIController} from '@context/UIControllerContext';
import {Button} from '../../../core/Button';
import {MenuDropdown} from '../../../core/Navigation';
import {Helmet} from '../../../layouts/admin/common/Helmet';
import {Link} from '../../../core/Next';
import {Box, Grid, Row} from '../../../core/Layout';
import Table from '../../../core/Table';
import ConfirmDeleteDialog from '../../../layouts/admin/template/Dialog/ConfirmDelete';
import {Text} from '../../../core';
import {Controller, useForm} from 'react-hook-form';
import {
  sortByOpts,
  productBrandOptions,
  productCategoriesOptions,
  productColorOptions,
  productTagsOptions, searchByOptsProducts
} from '../../../assets/data/options';
import {Input, InputExcelFile, Select} from '../../../core/Input';
import {uiControllerActionsType} from '../../../store/reducers/uiControllerReducer';
import {ServerIcon} from '@heroicons/react/outline';
import FiltersDialog from '../../../layouts/admin/template/Dialog/Filters';
import CustomizeColumn from '../../../layouts/admin/template/Dialog/CustomizeColumn';
import CustomizeColumnDialog from '../../../layouts/admin/template/Dialog/CustomizeColumn';

const dataBreadcrumb = [
  {path: '/admin', name: 'Dashboard', firstLink: true},
  {path: '/admin/products', name: 'Products'},
  {path: '', name: 'List', lastLink: true}
];

const handleQuantity = (quantity) => {
  if (quantity === 0) {
    return <span className='badge-danger'>Out Of Stock</span>
  }
  if (quantity < 0 || quantity <= 100) {
    return <span className='badge-warning'>Low Stock</span>
  } else {
    return <span className='badge-green'>In Stock</span>
  }
}

const rowsPerPage = [5, 15, 25]

const ColumnsDefault = ({setIdUser, setShowDialog}) => {
  const router = useRouter();
  return [
    {
      id: 'name', title: 'Product',
      render: (row) => (
        <>
          <Text weight='bold' classes='text-sm desktop:hidden '>
            {row.name.length > 15 ? row.name.substring(0, 15) + '...' : row.name}
          </Text>
          <Text weight='bold' sx='sm' classes='ml-4 hidden desktop:block'>
            {row.name}
          </Text>
        </>
      )
    },
    {id: 'category', title: 'Category'},
    {id: 'price', title: 'Price', render: (row) => <>{formatPrice(row.price)}</>},
    {id: 'sku', title: 'SKU'},
    {id: 'quantity', title: 'quantity', align: 'center'},
    // {id: 'brand', title: 'Brand'},
    // {
    //   id: 'status', title: 'Status',
    //   render: (row) => (<>{handleQuantity(row.quantity)}</>)
    // },
    // {id: 'createAt', title: 'Date Create', render: (row) => <>{moment(row.createAt).format('LL')}</>},
    {
      id: 'actions', title: '', align: 'center',
      render: (row) => (
        <MenuDropdown
          options={[
            {
              label: 'Edit',
              element: <i className='fa-solid fa-pen'/>,
              href: `${router.pathname}/${row._id}`
            },
            {
              label: 'Delete',
              element: <i className='fa-solid fa-trash-can'/>,
              feature: () => {
                setShowDialog(true)
                setIdUser(row._id);
              }
            },
          ]}
        />
      )
    },
  ]
};

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [showColumnDialog, setShowColumnDialog] = useState(false)
  const [idUser, setIdUser] = useState()
  const [deleteType, setDeleteType] = useState('single')
  const [optCheckbox, setOptCheckbox] = useState([])
  const [resetCheckbox, setResetCheckbox] = useState(false)
  const [columns, setColumns] = useState(ColumnsDefault(setIdUser, setShowDialog))
  const [params, setParams] = useState({
    skip: 0, limit: rowsPerPage[0],
    searchBy: '', sort: 'name', by: 'asc'
  })
  const [clickImport, setClickImport] = useState(false)
  const inputRef = useRef(null)

  const {progress, setProgress} = useUIController();

  const formOptions = {
    defaultValues: {
      orderBy: sortByOpts[0],
      searchBy: searchByOptsProducts[0],
    }
  };
  const {register, handleSubmit, control, formState} = useForm(formOptions);
  const {errors} = formState;

  const getAllProducts = useCallback(
    async () => {
      setProgress(progress + 30)
      console.log('params', params)
      const {isSuccess, data} = await productService.getAll(params);
      if (isSuccess) {
        setProgress(100)
        setProducts(data)
        setLoading(false)
      }
    }, [params]
  )

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts])

  async function handleDeleteMultiItems(optionsChecked) {
    setOptCheckbox(optionsChecked)
    setShowDialog(true);
    setDeleteType('multi')
  }

  async function handleRequest() {
    let res;
    if (deleteType === 'single') {
      res = await productService.delete(idUser);
    } else res = await productService.multiDelete(optCheckbox);

    if (!res.isSuccess) return toast.error(res.message);
    getAllProducts();
    setResetCheckbox(true)
    setShowDialog(false)
    toast.success('Delete success!')
  }

  const handleOnChangeTable = ({skip, limit}) => {
    console.log('skip-li', skip, limit)
    setParams({...params, skip, limit})
    // setParams({...params, skip: values.skip, limit: values.limit})
  }

  const handleImportExportExcelFile = (type, value) => {
    switch (type) {
      case 'import': {
        console.log('value', value)
      }
        break
      case 'export': {
        const worksheet = XLSX.utils.json_to_sheet(products.list);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'product-list.xlsx');
      }
        break
    }
  }

  const handleFilters = (value) => {
    const {searchBy, searchValue} = value;
    // console.log('value', value)
    setParams({...params, searchBy, searchValue})
    // setParams({...params, searchBy, searchValue})
    // console.log('params', params)
  }

  return (
    <>
      <ConfirmDeleteDialog
        defaultStatus={showDialog}
        setDialogStatus={setShowDialog}
        handleRequest={handleRequest}
      />
      <FiltersDialog
        defaultStatus={showFilterDialog}
        setDialogStatus={setShowFilterDialog}
        onChangeFilter={handleFilters}
      />
      <CustomizeColumnDialog
        columns={columns}
        onSave={(newUpdate) => setColumns(newUpdate)}
        defaultStatus={showColumnDialog}
        setDialogStatus={setShowColumnDialog}
        columnsDefault={ColumnsDefault(setIdUser, setShowDialog)}
        // columns={columnsDefault}
        // columns={columnsDefault.slice(0, -1)}
      />
      {/*<Helmet title='All Products' dataBreadcrumb={dataBreadcrumb}/>*/}
      <Row justify='between' align='center'>
        <Helmet title='All Products' dataBreadcrumb={dataBreadcrumb}/>
        <Row gap={4}>
          <Button
            classes='ml-auto'
            onClick={() => setShowColumnDialog(true)}
            icon={<ServerIcon className='h-4 w-4 inline'/>}>
            Column
          </Button>
          <Button
            classes='ml-auto'
            onClick={() => setShowFilterDialog(true)}
            icon={<Text i classes='fa-solid fa-sliders '/>}>
            Filter
          </Button>
          {/*<Button >*/}
          {/*  <InputExcelFile label='Import' onChange={(n, val) => handleImportExportExcelFile('import', val)}/>*/}
          {/*</Button>*/}
          <Button icon={<i className='fa-solid fa-download'/>}
                  onClick={() => handleImportExportExcelFile('export')}>Export</Button>

          {/*<MenuDropdown*/}
          {/*  trigger={<Button classes='ml-auto'> Import/Export</Button>}*/}
          {/*  options={[*/}
          {/*    {*/}
          {/*      label: <InputExcelFile label='Import' ref={inputRef}/>, element: <i className='fa-solid fa-upload'/>,*/}
          {/*      // feature: () => inputRef.current.click()*/}
          {/*    },*/}
          {/*    // {label: 'Import', element: <i className='fa-solid fa-upload'/>*/}
          {/*    // , feature: () => <InputExcelFile clickStatus/>*/}
          {/*    // },*/}
          {/*    {*/}
          {/*      label: 'Export',*/}
          {/*      element: <i className='fa-solid fa-download'/>,*/}
          {/*      feature: () => handleImportExportExcelFile()*/}
          {/*      // feature: () => <InputExcelFile onChange={handleImportExcelFile}/>*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*/>*/}

          {/*<Dropdown>*/}
          {/*  <Dropdown.Trigger>*/}
          {/*    <Button classes='ml-auto'> Import/Export</Button>*/}
          {/*  </Dropdown.Trigger>*/}
          {/*  <Dropdown.Item>*/}
          {/*    <i className='fa-solid fa-upload'/> Import <InputExcelFile/>*/}
          {/*  </Dropdown.Item>*/}
          {/*  <Dropdown.Item>*/}
          {/*    <i className='fa-solid fa-download'/> Export <InputExcelFile/>*/}
          {/*  </Dropdown.Item>*/}
          {/*</Dropdown>*/}
          <Link href='/admin/products/new'>
            <Button classes='ml-auto mb-4' icon={<i className='fa-solid fa-plus'/>}> New Product</Button>
          </Link>
        </Row>
      </Row>
      {/*<InputExcelFile label='Import' name='import'/>*/}
      <Table
        // searchInputSelection
        checkboxSelection
        onChange={handleOnChangeTable}
        onChangeCheckbox={handleDeleteMultiItems}
        resetSelectCheckbox={resetCheckbox}
        loading={loading}
        rowsPerPageOptions={rowsPerPage}
        totalRows={products?.total}
        columns={columns}
        rows={products?.list}
      />
    </>
  )
}

ProductList.layout = 'admin';
export default ProductList
