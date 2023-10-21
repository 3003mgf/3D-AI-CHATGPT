// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store/index";
import {
  headContainerAnimation,
  headTextAnimation,
  headContentAnimation,
  slideAnimation
} from "../config/motion";
import CustomButton from "../components/CustomButton";

const HomePage = () => {

  const snap = useSnapshot(state);

  return ( 
    <div>
      {snap.intro && (
        <div>
          <motion.section className="home absolute h-full" {...slideAnimation("left")}>
            <motion.header {...slideAnimation("down")}>
              <img src="./astronaut.svg" alt="logo" className="w-[4rem] h-[4rem] object-contain" />
            </motion.header>

            <motion.div className="home-content" {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <h1 className="head-text text-white">
                  {"3003' MGF 3D."}
                </h1>
              </motion.div>
              <motion.div {...headContentAnimation} className="flex flex-col gap-5">
                <p className="max-w-md font-normal text-gray-200 text-base" style={{fontFamily: 'Josefin Sans'}}>
                  {"Create your unique and exclusive shirt with MGF's brand new customization tool."} <strong>Unleash your imagination</strong>&nbsp;and define your own style.
                </p>

                {/* Button */}
                <CustomButton
                  title="Get Started!"
                  handleClick={()=> state.intro = false}
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm hover:opacity-90 bg-white"
                />
              </motion.div>
            </motion.div>
          </motion.section>
          <div className="w-full h-screen"
          style={{background: "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)"}}>
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>
          </div>
        </div>
      )}
    </div>
   );
}
 
export default HomePage;