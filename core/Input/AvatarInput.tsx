import {ChangeEvent, useEffect, useRef, useState} from "react";
import {Text} from "../index";

interface AvatarInputProps {
  onFileChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  classesSpace?: string,
}

const AvatarInput = ({onFileChange, classesSpace}: AvatarInputProps) => {

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

    // free memory when ever this layout is unmounted
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
  }

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  }

  return (
    <div className={`form-control avatar-input ${classesSpace}`}>
      <div className='avatar-input__wrapper'>
        <div
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className='avatar-input__upload'>
          <div className='avatar-input__image'>
            <input type="file" onChange={onFileDrop}/>
            {selectedFile
              ? <img src={preview}/>
              : <div className='avatar-input__placeholder'>
                <i className="fa-solid fa-image "/>
                <Text>Upload file</Text>
              </div>
            }
          </div>
        </div>
      </div>
      <Text classes='avatar-input__notice'>
        Allowed *.jpeg, *.jpg, *.png, *.gif
        max size of 3.1 MB
      </Text>
    </div>
  );
}

export default AvatarInput;