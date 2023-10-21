/* eslint-disable react/prop-types */
import { getContrastingColor } from "../config/helpers";
import state from "../store/index";
import { useSnapshot } from "valtio";

const CustomButton = ({type, title, handleClick, customStyles}) => {

  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if(type === "filled"){
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color)
      }
    }else if(type === "outline"){
      return {
        borderWidth:"1px",
        borderColor: snap.color,
        color: snap.color
      }
    }
  }

  return (
    <button
      className={`${customStyles} mt-2 rounded-sm`}
      onClick={handleClick}
      style={type ? generateStyle(type) : {}}
    >
      {title}
    </button>
  );
}
 
export default CustomButton;