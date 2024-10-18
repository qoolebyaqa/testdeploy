import {motion} from 'framer-motion'

function ValidationError({errMsg}:{errMsg: string | undefined}) {
  if (errMsg) {
    return ( <motion.p className="relative text-sm text-lombard-btn-red" animate={{y: [20, -10, 0]}}>
      {errMsg}
    </motion.p> );
  } else {
    return <></>
  }
}

export default ValidationError;