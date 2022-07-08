import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Box, Row} from "../Layout";
import {Text} from "../index";

interface propsImageInput {
  onFileChange: (event: any[]) => void;
  classesSpace: string,
}

const ImageInput = ({onFileChange, classesSpace}: propsImageInput) => {

  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onFileDrop = (e) => {
    const newFile = e.target.files[0]
    if (newFile) {
      const convertUrlImg = URL.createObjectURL(newFile)
      setFileList([...fileList, convertUrlImg])
      onFileChange(fileList);
    }
  }

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  }

  return (
    <Box classes={`form-control ${classesSpace}`}>
      <Text label>Images *</Text>
      <Row justify='center'>
        <Box classes='rounded-lg drop-shadow-md bg-gray-50 w-full'>
          <Box classes='m-4'
               ref={wrapperRef}
            // @ts-ignore
               onDragEnter={onDragEnter}
               onDragLeave={onDragLeave}
               onDrop={onDrop}
          >
            <Box classes='flex items-center justify-center w-full cursor-pointer'
            >
              <label className='flex flex-col w-full h-52 relative border-4 border-dashed hover:bg-gray-100 hover:border-gray-300'>
                <Box classes='flex-center text-center content-center flex-col pt-12 '>
                  <i className='fa-solid fa-image text-4xl text-gray-400 group-hover:text-gray-600'/>
                  <p className='pt-1 text-xl font-bold tracking-wider text-black group-hover:text-gray-600'>
                    Drop or Select file
                  </p>
                  <p className='text-gray-500'>Drop files here or click
                    <span className='underline text-black mx-1'>browse</span>
                    thorough your machine
                  </p>
                </Box>
                <input type='file' className='opacity-0 h-full w-full absolute inset-0 z-30' onChange={onFileDrop}
                  // onChange={onSelectFile}
                />
              </label>
            </Box>
          </Box>
        </Box>
      </Row>
      <Box classes='mt-3 flex gap-2'>
        {
          fileList.map((file, id) => {
            return (
              <Box key={id} classes='relative'>
                <img src={file} className='w-20 h-20 relative rounded-xl border'/>
                <i className='fa-solid fa-x
                 cursor-pointer flex-center
                 rounded-full text-white  bg-black hover:bg-opacity-[0.5] w-[20%] h-[20%]
                bg-opacity-[0.7] animate text-[7px] absolute top-1 right-1'
                   onClick={() => fileRemove(file)}
                />
              </Box>
            )
          })
        }
      </Box>
    </Box>
  );
}

export default ImageInput;