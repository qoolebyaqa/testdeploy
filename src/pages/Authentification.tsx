import { useState } from "react";
import Login from "../components/auth/Login";
import RecoveryPass from "../components/auth/RecoveryPass";
import SVGComponent from "../components/UI/SVGComponent";
import {motion} from 'framer-motion';

function Authentification() {
  const [toggleRecoveryPass, setToggleRecoveryPass] = useState('');
  const [bgImage, setBgImage] = useState({});

  const handleAnimationComplete = () => {
    if (toggleRecoveryPass === 'recovery') {
      setBgImage("/bgPassRecovery.png");
    } else if (toggleRecoveryPass === 'login') {
      setBgImage("/authBG.png");
    }
  };

  return (
    <motion.div className="w-screen h-dvh bg-no-repeat bg-cover mx-auto flex p-[76px] bg-[url('/authBG.png')]"
    style={{ backgroundImage: `url(${bgImage})` }}
    animate={toggleRecoveryPass === 'recovery' ? { opacity: [0.4, 0.5, 0.6, 0.8, 1]} :  { opacity: [0, 0.1, 0.6, 0.8, 1]}}
    onAnimationStart={handleAnimationComplete}>
      <h1>
        <SVGComponent title="logo" recoveryPass={toggleRecoveryPass}/>
      </h1>
      <div className='mx-auto overflow-hidden py-10'>
        <motion.div
        animate={toggleRecoveryPass === 'recovery' ? {y: [0, -400, -800, -1000, -980]} : toggleRecoveryPass === "login" ? {y: [-980, -800, -400, 0]}: {}}>
        <Login showRecoveryPass={() => setToggleRecoveryPass('recovery')}/>
        <RecoveryPass showRecoveryPass={() => setToggleRecoveryPass('login')}/>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Authentification;
