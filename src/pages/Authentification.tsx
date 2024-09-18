import { useEffect, useState } from "react";
import Login from "../components/auth/Login";
import RecoveryPass from "../components/auth/RecoveryPass";
import SVGComponent from "../components/UI/SVGComponent";
import {motion} from 'framer-motion';
import Loader from "../components/UI/Loader";
import authBg from '/authBG.webp'
import { useAppSelector } from "../helpers/hooks/useAppSelector";

function Authentification({recoveryPass, restoreStep}:{recoveryPass?: string, restoreStep?: number}) {
  const [toggleRecoveryPass, setToggleRecoveryPass] = useState(recoveryPass || '');
  const [bgImage, setBgImage] = useState('');
  const [loading, setLoading] = useState(true);
  const loadingState = useAppSelector((state) => state.auth.authLoading);
  useEffect(() => {
    async function preLoad() {
      const image = new Image();
      image.src = authBg;
      image.onload = () => {
        setBgImage(image.src);
        setLoading(false);
      };
    }

    preLoad();
  }, []);

  const handleAnimationComplete = () => {
    if (toggleRecoveryPass === 'recovery') {
      setBgImage("/bgPassRecovery.png");
    } else if (toggleRecoveryPass === 'login') {
      setBgImage(authBg);
    }
  };

  return (<>{loading || loadingState ? <Loader /> : 
    <motion.div className="w-screen h-[100vh] bg-no-repeat bg-cover mx-auto flex lg:flex-row flex-col lg:p-[76px] p-2  bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}
    animate={toggleRecoveryPass === 'recovery' ? { opacity: [0.4, 0.5, 0.6, 0.8, 1]} :  { opacity: [0, 0.1, 0.6, 0.8, 1]}}
    onAnimationStart={handleAnimationComplete}>
      <h1>
        <SVGComponent title="logo" recoveryPass={toggleRecoveryPass} className="w-[204px] h-[164px]"/>
      </h1>
      <div className='mx-auto overflow-hidden py-10 h-[700px]'>
        <motion.div
        animate={toggleRecoveryPass === 'recovery' ? {y: [0, -400, -800, -1000, -980]} : toggleRecoveryPass === "login" ? {y: [-980, -800, -400, 0]}: {}}>
        <Login showRecoveryPass={() => setToggleRecoveryPass('recovery')}/>
        <RecoveryPass showRecoveryPass={() => setToggleRecoveryPass('login')} restoreStep={restoreStep}/>
        </motion.div>
      </div>
    </motion.div>}</>
  );
}

export default Authentification;
