/* eslint-disable react/prop-types */


const CustomButton = ({title, handleClick, customStyles}) => {
  
  return (
    <button
      className={`${customStyles} bg-white mt-2 rounded-sm`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
 
export default CustomButton;