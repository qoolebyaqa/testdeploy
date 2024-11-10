import ButtonComponent from "../UI/ButtonComponent";
import LeftHand from '../UI/LeftHand';
import { ApiService } from '../../helpers/API/ApiSerivce';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { toast, ToastContainer } from 'react-toastify';
import useActions from "../../helpers/hooks/useActions";
import RightHand from '../UI/RightHand'

const FingerPrintRegistration = () => {
  const dataRightFingers = useAppSelector(state => state.fingerPrintReducer.rightHandFingers)
  const dataLeftFingers = useAppSelector(state => state.fingerPrintReducer.leftHandFingers)
  const agentId = useAppSelector(state => state.fingerPrintReducer.agentId)
  const userData = useAppSelector(state => state.employeeStore.employeeChoosenOne)
  const dispatch = useActions();


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
      const res= ApiService.registerFingers(data.agent_id, data.login,data.templates)
      res.catch(({response})=>{
        console.log(response);
        toast.error(`${response.data.message}`)
      })
      res.then((response)=>{
        console.log(response); 
        toast.success("Отпечаток пальца успешно сохранен !");
      })
    }catch(error){
      console.log(error);
    }
  }

  const resetFingerPrints=()=>{
    dispatch.setRightHandFingerTemplates([])
    dispatch.setLeftHandFingerTemplates([])

  }
  
  const renderHand = (side: 'left' | 'right') => {
    if(side==='right'){
      return(
        <div className="relative w-128 h-64">
        <svg viewBox="0 0 500 400" className="w-full h-full">
          <g  transform="translate(0, 0)">
            <RightHand/>
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

  const rightHandId=[0,1,2,3,4]
  const leftHandId=[5,6,7,8,9]

  const counter = (count:number) => {
    return(
      <div className={`${count!==0?"bg-green-600":"bg-red-400"} p-2 w-[40px] rounded-full text-white text-center `}>
        {count}
      </div>
    )
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
              color="bg-lombard-btn-red"
              clickHandler={resetFingerPrints}
            />
            <ButtonComponent
              titleBtn="Удалить"
              color="bg-gray-200"
              clickHandler={()=>{}}
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-8">
          
          <div className="flex flex-col items-center ">
            {renderHand('left')}
            <div className="flex gap-2 mt-4 flex-row-reverse">
              {leftHandId.map((item)=>{
                let count = 0
                dataLeftFingers.forEach((finger:any)=>{
                  if(finger?.index===item){
                    count =finger?.templates.length
                  }
                })
                return(
                  <div key={item}>
                    {counter(count)}
                  </div>
                )
              })}
            </div>
          </div>
          
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
          
          <div className="flex flex-col items-center">
            {renderHand('right')}
            <div className="flex gap-2 mt-4">
              {rightHandId.map((item)=>{
                let count = 0
                dataRightFingers.forEach((finger:any)=>{
                  if(finger?.index===item){
                    count =finger?.templates.length
                  }
                })
                return(
                  <div key={item}>
                    {counter(count)}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-center">
          Для сканирования нажмите на палец
        </p>
      </div>

      
    </div>
  );
};

export default FingerPrintRegistration;
