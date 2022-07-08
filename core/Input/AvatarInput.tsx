import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Text} from "../index";

interface AvatarInputProps {
  onFileChange?: (name, formData: FormData) => void;
  // onFileChange?: (event: any[]) => void;
  classesSpace?: string,
  defaultValue?: string,
  name: string,
}

const AvatarInput = ({name, defaultValue, onFileChange, classesSpace}: AvatarInputProps) => {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState<string | null>('')

  useEffect(() => setPreview(defaultValue), [defaultValue])

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

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {

    const newFile = e.target.files
    if (!newFile || newFile.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple

    // @ts-ignore
    setSelectedFile(newFile[0])
    // @ts-ignore
    onFileChange(name, newFile[0]);
  }

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    // @ts-ignore
    onFileChange(name, updatedList);
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
            {preview
              ? <img src={preview} alt='img'/>
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