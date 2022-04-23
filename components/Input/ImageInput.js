const ImageInput = ({onSelectFile}) => {
    return (
      <div className="flex justify-center mb-4">
        <div className="rounded-lg shadow-xl bg-gray-50 w-1/2 lg:w-full">
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">Images</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <i className="fa-solid fa-image text-3xl text-gray-400 group-hover:text-gray-600"/>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Select a photo</p>
                </div>
                <input type="file" className="opacity-0" onChange={onSelectFile}/>
              </label>
            </div>
          </div>
        </div>
      </div>

    );
}

export default ImageInput;