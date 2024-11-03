import  { useState } from 'react';
import ButtonComponent from "../UI/ButtonComponent";
import LeftHand from '../UI/LeftHand';
import { ApiService } from '../../helpers/API/ApiSerivce';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { toast, ToastContainer } from 'react-toastify';
import RightHand from '../UI/RightHand';

const FingerPrintRegistration = () => {
  const [isActive,setIsActive] = useState(false);
  const dataRightFingers = useAppSelector(state => state.fingerPrintReducer.rightHandFingers)
  const dataLeftFingers = useAppSelector(state => state.fingerPrintReducer.leftHandFingers)
  const agentId = useAppSelector(state => state.fingerPrintReducer.agentId)
  const userData = useAppSelector(state => state.employeeStore.employeeChoosenOne)
  
  const notify = () => toast.success("Отпечаток пальца успешно сохранен !");
  
  const openActiveDialog=()=>{
    setIsActive(!isActive)
  }

  function saveFinger(){
    const listTemplates: string[] = []
    dataRightFingers.forEach((item:any)=>{
      listTemplates.push(item.templates)
    })
    dataLeftFingers.forEach((item:any)=>{
      listTemplates.push(item.templates)
    })
    const data:any ={
      login:userData.login,
      templates:listTemplates,
      agent_id:agentId,
    }
    
    try{
      const response= ApiService.registerFingers(data.agent_id, data.login,data.templates)
      console.log(response);
      notify()
    }catch(error){
      console.log(error);
    }
  }
  
  const renderHand = (side: 'left' | 'right') => {
    if(side==='right'){
      return(
        <div className="relative w-128 h-64">
        <svg viewBox="0 0 500 400" className="w-full h-full">
          <g  transform="translate(0, 0)">
            <RightHand fingerDialogFunc={openActiveDialog}/>
          </g>
        </svg>
      </div>
      )
    }
    if(side==='left'){
      return(
        <div className="relative w-128 h-64">
        <svg viewBox="0 0 500 400" className="w-full h-full">
          <g  transform="translate(0, 0)">
            <LeftHand />
          </g>
        </svg>
      </div>
      )
    }
  }

  return (
    <div className="w-[1000px] max-w-4xl bg-white rounded-3xl p-6">
      <ToastContainer />
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-bold text-black">Регистрация отпечатка пальцев</h2>
          <div className="flex gap-2">
            <ButtonComponent
              titleBtn="Сохранить"
              color="bg-lombard-btn-green"
              clickHandler={saveFinger}
            />
            <ButtonComponent
              titleBtn="Заново"
              color="bg-gray-200"
              clickHandler={()=>{}}
            />
            <ButtonComponent
              titleBtn="Удалить"
              color="bg-gray-200"
              clickHandler={()=>{}}
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-8">
          {renderHand('left')}
          
          <div className="w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 20,20 Q 50,80 80,20"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="8"
              />
            </svg>
          </div>
          
          {renderHand('right')}
        </div>

        <p className="text-gray-500 text-center">
          Для сканирования нажмите на палец
        </p>
      </div>

      
    </div>
  );
};

export default FingerPrintRegistration;
