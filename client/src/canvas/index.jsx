/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import CameraRig from "./CameraRig";
import Shirt from "./Shirt";
import state from "../store/index";
import { useSnapshot } from "valtio";
import Backdrop from "./Backdrop";

const CanvasComponent = () => {

  const snap = useSnapshot(state);

  return ( 
    <Canvas className={`${snap.intro && "hidden"} w-full max-w-full h-full transition-all ease-in`}
      shadows
      camera={{position: [0, 0, 0], fov: 25}}
      gl={{preserveDrawingBuffer: true}}
    >
        <ambientLight intensity={0.5}/>
        <Environment preset="city"/>

        <CameraRig>
          {/* <Backdrop/> */}
          <Center>
            <Shirt/>
          </Center>
        </CameraRig>
    </Canvas>
   );
}
 
export default CanvasComponent;