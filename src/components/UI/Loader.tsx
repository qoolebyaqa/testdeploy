import { useEffect } from "react";
import SVGComponent from "./SVGComponent";
import { motion } from "framer-motion";

function Loader({ justWhite }: { justWhite?: boolean | undefined }) {
  document.body.style.overflowY = 'hidden'
  useEffect(() => {
    return () => {document.body.style.overflowY = 'auto'}
  }, [])
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-10 bg-white flex justify-center items-center">
      <motion.div
        animate={{ scale: [1, 0.8, 1.2, 1] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          repeatDelay: 0,
          ease: "linear",
        }}
        className="h-[90vh] w-[200px] flex items-center"
      >
        {!justWhite && <SVGComponent title="logo" recoveryPass="recovery" />}
      </motion.div>{" "}
    </div>
  );
}

export default Loader;
