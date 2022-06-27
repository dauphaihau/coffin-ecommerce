import React, {useRef} from 'react';
// import XLSX from 'xlsx'
import {Box} from '../Layout';
import {Text} from "../index";

const ACCEPT_TYPE_FILE = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  // "xml",
  "csv",
  // "txt",
  // "ods",
  // "fods",
  // "uos",
  // "sylk",
  // "dif",
  // "dbf",
  // "prn",
  // "qpw",
  // "123",
  // "wb*",
  // "wq*",
  // "html",
  // "htm"
]

const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (let i = 0; i < C; ++i) o[i] = {name: XLSX.utils.encode_col(i), key: i};
  return o;
};

const InputExcelFile = (props) => {
  const {
    name,
    label = 'Import',
    cssInput = {opacity: 0, position: 'absolute', height: 32, left: -47, top: 0},
    onChange = () => {},
  } = props;

  const inputRef = useRef(null)

  const onClick = e => {
    try {
      e.preventDefault();
      inputRef.current.click()
    } catch (e) {

    }
  }

  // const handleFile = (file) => {
  //   const reader = new FileReader();
  //   const rABS = !!reader.readAsBinaryString;
  //   reader.onload = e => {
  //     /* Parse data */
  //     const bstr = e.target.result;
  //     const wb = XLSX.read(bstr, {type: rABS ? "binary" : "array"});
  //     /* Get first worksheet */
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     // console.log(rABS, wb);
  //     /* Convert array of arrays */
  //     const data = XLSX.utils.sheet_to_json(ws, {header: 1});
  //     const firstItem = Helper.cloneNewModel(data[0])
  //     data.shift()
  //     const parseData = data.map(item => {
  //       let obj = {}
  //       firstItem.map((i, key) => {
  //         obj = {
  //           ...obj,
  //           [i]: item[key]
  //         }
  //       })
  //       return obj
  //     })
  //     // console.log({ data: data, cols: make_cols(ws["!ref"]) })
  //     // console.log(parseData)
  //     /* Update state */
  //     // this.setState({ data: data, cols: make_cols(ws["!ref"]) });
  //
  //     onChange(name, parseData)
  //   };
  //   if (rABS) reader.readAsBinaryString(file);
  //   else reader.readAsArrayBuffer(file);
  // }
  //
  // const handleOnChange = e => {
  //   const files = e.target.files;
  //   if (files && files[0]) handleFile(files[0]);
  // }

  return (
    <Box classes='relative'>
      {/*<ButtonHook*/}
      {/*  className='btn-back button__small'*/}
      {/*  variant='text'*/}
      {/*  text={text}*/}
      {/*  onClick={onClick}*/}
      {/*/>*/}
      <Text as='button' span classes='mr-2' onClick={onClick}>
        {label}
      </Text>
      <input
        type="file"
        accept={ACCEPT_TYPE_FILE}
        ref={inputRef}
        onChange={handleOnChange}
        style={cssInput}
      />
    </Box>
  );
};

export default InputExcelFile;
