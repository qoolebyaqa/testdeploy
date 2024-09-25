import { motion } from "framer-motion";
import { useEffect } from "react";

interface IErrorMessage {
  shownMessage: string
  setShownMessage: (message: string) => void
}

function ErrorMessage({ shownMessage, setShownMessage }: IErrorMessage) {

  useEffect(() => {
    const closeMessage = setTimeout(() => {
      setShownMessage('');
    }, 8000);
    if(!shownMessage) {
      clearTimeout(closeMessage)
    }
    return () => clearTimeout(closeMessage)
  }, []);
  return (
    <>
      {shownMessage && (
        <motion.div
          className="bg-slate-600 opacity-80 text-lombard-btn-yellow text-2xl text-right px-10 absolute top-0 left-0 w-screen flex items-center justify-end"
          animate={{ y: [-80, 0, 5, 0] }}
        >
          <p>{shownMessage}</p>
          <button className="py-0 pl-4 hover:scale-75 transition-all duration-200" onClick={() => {setShownMessage('')}}>x</button>
        </motion.div>
      )}
    </>
  );
}

export default ErrorMessage;
