import { ReactNode } from "react";
import SVGComponent from "./SVGComponent";
import {motion} from 'framer-motion'

function DialogComponent({closeHandler, children}:{closeHandler: () => void, children: ReactNode}) {
  return ( <div className="w-screen h-screen fixed flex justify-center items-center bg-transparent/35">
    <motion.div className="flex gap-[1px]" animate={{translateY: [-250, 10, 0]}} transition={{duration: 0.4}} >
    <form className=" bg-white p-[30px] rounded-xl">
      {children}
    </form>
    <button className=" bg-white hover:scale-125 transition-all duration-300 rounded-full ml-2" type="button" onClick={closeHandler}><SVGComponent title="x"/></button>
    </motion.div>
  </div> );
}

export default DialogComponent;