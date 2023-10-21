/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';



const FilePicker = ({file, setFile, readFile}) => {
  return ( 
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input 
          type="file" 
          id='file-upload'
          accept='image/*'
          onChange={(e)=> setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className='filepicker-label'>Upload File</label>
        
        <p className='text-xs md:text-sm tracking-wide font-light mt-2'>
          {file === "" ? "No file selected" : file.name}
        </p>
      </div>
    </div>
   );
}
 
export default FilePicker;