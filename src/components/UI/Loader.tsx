import SVGComponent from "./SVGComponent";
import {motion} from 'framer-motion';

function Loader() {
  return ( <motion.div animate={{scale: [1, 0.8, 1.2, 1]}} transition={{repeat: Infinity, duration: 4, repeatDelay: 0, ease: "linear"}} className="h-lvh flex items-center">
    <SVGComponent title="logo" recoveryPass = "recovery"/>
  </motion.div> );
}

export default Loader;