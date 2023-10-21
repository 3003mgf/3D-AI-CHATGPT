/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import state from "../store/index";
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../config/helpers';
import CustomButton from './CustomButton';



const FilePicker = ({file, setFile, readFile}) => {

  const snap = useSnapshot(state);

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
        
        <p className='text-xs text-gray-500 truncate tracking-wide font-light mt-2'>
          {file === "" ? "No file selected" : file.name}
        </p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3' style={{fontFamily:"Josefin Sans"}}>
        <CustomButton
          type={"outline"}
          title={"Logo"}
          handleClick={()=> readFile("logo")}
          customStyles={"text-xs w-fit flex-1 py-1"}
        />
        <CustomButton
          type={"filled"}
          title={"Full"}
          handleClick={()=> readFile("full")}
          customStyles={"text-xs w-fit flex-1 py-1"}
        />
      </div>

    </div>
   );
}
 
export default FilePicker;