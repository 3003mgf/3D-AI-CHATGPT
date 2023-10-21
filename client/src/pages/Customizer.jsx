/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import state from "../store/index";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import AIPicker from "../components/AIPicker";
import FilePicker from "../components/FilePicker";
import ColorPicker from "../components/ColorPicker";
import Tab from "../components/Tab";
import CustomButton from "../components/CustomButton";
import { useState } from "react";


const Customizer = () => {

  const snap = useSnapshot(state);

  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  });

  // Show tab content dependidng on active tab
  const generateTabContent = () =>{
     switch(activeEditorTab){
      case "colorpicker":
      return <ColorPicker/>

      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />

      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />

      default:
        return null
     }
  };

  const handleSubmit = async(type) =>{
    if(!prompt) return alert("");

    setGeneratingImg(true);
    try{
      // Call Back End to generate Image
      const response = await fetch("https://3d-ai-chatgpt-mgf.up.railway.app/api/03/dalle", {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({prompt})
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.image}`);
    }catch(error){
      console.log(error);
    }finally{
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) =>{
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) =>{
    switch(tabName){
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    // After setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState)=> {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  };

  const readFile = (type) => {
    reader(file).then((result)=> {
      handleDecals(type, result);
      setActiveEditorTab("");
    })
  }

  return ( 
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key={"custom"}
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={()=> {setActiveEditorTab(tab.name)}}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{fontFamily:"Josefin Sans"}}
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type={"filled"}
              title={"Go Back"}
              handleClick={()=> state.intro = true}
              customStyles="w-fit px-3 py-2 text-xs text-white hover:opacity-90 transition-opacity duration-200"
            />
          </motion.div>

          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab)=> (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={()=> handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
 
export default Customizer;