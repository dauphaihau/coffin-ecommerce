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
    <div className={`form-control ${classesSpace}`}>
      <div className="flex justify-center  border-2 border-sky-500">
        <div className="rounded-lg drop-shadow-md bg-gray-50 w-1/2 lg:w-full">
          <div className="m-4"
               ref={wrapperRef}
               onDragEnter={onDragEnter}
               onDragLeave={onDragLeave}
               onDrop={onDrop}
          >
            <div className="flex items-center justify-center w-full  cursor-pointer "
            >
              {/*<label className="flex flex-col w-full h-52 relative border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">*/}

                {/*<div className="flex-center content-center flex-col pt-12 ">*/}
                {/*  <i className="fa-solid fa-image text-4xl text-gray-400 group-hover:text-gray-600"/>*/}
                {/*  <p className="pt-1 text-xl font-bold tracking-wider text-black group-hover:text-gray-600">*/}
                {/*    Update photo*/}
                {/*  </p>*/}
                {/*</div>*/}
              {/*</label>*/}
                <input type="file" className="opacity-0 h-full w-full absolute inset-0 z-30" onChange={onFileDrop}
                  // onChange={onSelectFile}
                />
            </div>
          </div>
        </div>
      </div>


      {selectedFile &&  <img src={preview} /> }

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