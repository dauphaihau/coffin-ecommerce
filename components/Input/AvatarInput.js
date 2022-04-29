import {useEffect, useRef, useState} from "react";
import filePng from "../../public/images/file-png-solid-240.png";

const AvatarInput = ({onFileChange, classesSpace}) => {

  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onFileDrop = (e) => {

    const newFile = e.target.files
    if (!newFile || newFile.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(newFile[0])

    // const newFile = e.target.files[0]
    // if (newFile) {
    //   const convertUrlImg = URL.createObjectURL(newFile)
    //   setFileList([...fileList, convertUrlImg])
    //   onFileChange(fileList);
    // }
  }

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  }

  return (
    <div className={`form-control ${classesSpace} flex-center flex-col`}>
      <div className="flex justify-center border-2 border-dotted rounded-full text-gray-300 w-1/2 h-48">
        <div className="rounded-full drop-shadow-md  bg-transparent w-fit lg:w-[94%]">
          <div
               ref={wrapperRef}
               onDragEnter={onDragEnter}
               onDragLeave={onDragLeave}
               onDrop={onDrop}
          >
            <div className="flex items-center justify-center w-full cursor-pointer "
            >
              {/*<label className="flex flex-col w-full h-52 relative border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">*/}

                {/*<div className="flex-center content-center flex-col pt-12 ">*/}
                {/*  <i className="fa-solid fa-image text-4xl text-gray-400 group-hover:text-gray-600"/>*/}
                {/*  <p className="pt-1 text-xl font-bold tracking-wider text-black group-hover:text-gray-600">*/}
                {/*    Update photo*/}
                {/*  </p>*/}
                {/*</div>*/}
              {/*</label>*/}
                <input type="file" className="opacity-0 w-full absolute inset-0 z-30" onChange={onFileDrop}
                  // onChange={onSelectFile}
                />

              {selectedFile ? <img src={preview} className='w-full rounded-full h-[11.4rem] pt-[5px]' />
                :
                <div className="flex-center bg-gray-100 content-center flex-col absolute rounded-full top-[8px] right-[9px] h-[91%] w-[91%] ">
                  <i className="fa-solid fa-image text-2xl text-gray-400 group-hover:text-gray-600"/>
                  <p className="text-gray-500 text-base">Upload file</p>
                </div>
                // <div className='bg-gray-500'></div>
              }
            </div>
          </div>
        </div>
      </div>

      <p className='mt-4 text-xs text-gray-500 w-1/2 text-center leading-4'>Allowed *.jpeg, *.jpg, *.png, *.gif
        max size of 3.1 MB</p>
      {/*<div className='mt-3 flex gap-2'>*/}
      {/*  {*/}
      {/*    fileList.map((file, id) => {*/}
      {/*      return (*/}
      {/*        <div key={id} className='relative'>*/}
      {/*          <img src={file} className='w-20 h-20 relative rounded-xl border'/>*/}
      {/*          <i className="fa-solid fa-x*/}
      {/*           cursor-pointer flex-center*/}
      {/*           rounded-full text-white  bg-black hover:bg-opacity-[0.5] w-[20%] h-[20%]*/}
      {/*          bg-opacity-[0.7] animate text-[7px] absolute top-1 right-1"*/}
      {/*             onClick={() => fileRemove(file)}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      )*/}
      {/*    })*/}
      {/*  }*/}
      {/*</div>*/}
    </div>


);
}

export default AvatarInput;