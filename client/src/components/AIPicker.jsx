/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import CustomButton from "./CustomButton";


const AIPicker = ({prompt, setPrompt, generatingImg, handleSubmit}) => {
  return ( 
    <div className="aipicker-container">
      <textarea
        placeholder="Ask AI..."
        value={prompt}
        rows={5}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      >

      </textarea>
      <div className="flex flex-wrap gap-3">
          {generatingImg ? (
            <CustomButton
              type="filled"
              title="Asking AI..."
              customStyles="text-xs flex-1 py-1 mt-0 animate-pulse"
            />
          ):(
            <>
              <CustomButton
                type="outline"
                title="AI Logo"
                handleClick={()=> handleSubmit('logo')}
                customStyles="text-xs flex-1 py-1 mt-0"
              />
              <CustomButton
                type={"filled"}
                title={"AI Full"}
                handleClick={()=> handleSubmit('full')}
                customStyles={"text-xs flex-1 py-1 mt-0"}
              />
            </>
          )}
        </div>
    </div>
   );
}
 
export default AIPicker;