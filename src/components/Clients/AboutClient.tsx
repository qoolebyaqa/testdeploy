import {  useEffect, useRef, useState } from "react";
import SVGComponent from "../UI/SVGComponent";
import {motion} from 'framer-motion'
import CollapseWrapper from "../UI/CollapseWrapper";
import ButtonComponent from "../UI/ButtonComponent";
import CustomInput from "../UI/CustomInput";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { useParams } from "react-router";

interface IDocumentList{
  customer_id:number,
  document_id:number,
  document_url:string,
  version:number,
  title?:string,
}


function AboutClient({closeHandler}:{closeHandler: () => void,}) {
  const modalRef = useRef<HTMLDivElement>(null);
 const params=useParams()
 const id = params.id_browse ? params.id_browse.slice(params.id_browse.indexOf("=") + 1):"";
 const [docList,setDocList] = useState<IDocumentList[]>([]) 
 

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeHandler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeHandler]);

  useEffect(()=>{
    ApiService.getDocuments(id,"document")
    .then((response)=>{
      setDocList(response.data)
    })
  },[id])
  function downloadFile(fileUrl:string) {
    const filename = fileUrl.split('/').pop();
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename?filename:"file");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  }

  const userList=[
    {name:"Равшан Азимжонов", role:"Админ", date:"01.01.2024", time:"09:08", comment:"“Постоянный клиент, регулярно обращается. Надежный, всегда вовремя выкупает имущество.”", gender:"FEMALE"},
    {name:"Равшан Азимжонов", role:"Админ", date:"01.01.2024", time:"09:08", comment:"“Постоянный клиент, регулярно обращается. Надежный, всегда вовремя выкупает имущество.”", gender:"MALE"},
  ]
  return ( <div className="w-[520px] h-screen fixed top-20 left-[150px]  inset-0 z-50 ">
    <motion.div ref={modalRef} className="flex gap-[1px]" animate={{translateY: [-10, 10, 0]}} transition={{duration: 0.4}} >
    <form className=" bg-white p-[30px] rounded-xl">
      <div className="mb-4"> 
        <CollapseWrapper title="Документы  (4)" >
          <>
          <ul className="list-none">
            {docList.map((item,idx)=>{
              return(
                <li className="bg-transparent/5 py-2 px-6 mb-2 rounded-lg text-sm flex items-center justify-between" key={idx} >
                  {item.title ? item.title : "Кредит№001.pdf"}
                  
                <button className="hover:scale-125 transition-all duration-300 rounded-full ml-2 cursor-pointer" onClick={() => downloadFile(item.document_url)} type="button" ><SVGComponent title="uploadFile"/></button>

                </li>
              )
            })}
          </ul>
            
          </>
        </CollapseWrapper>
      </div>
      <div className="mb-10">
        <CollapseWrapper title="Компентарии  (2)">
          <>
            <ul className="list-none">
              {userList.map((item,idx)=>{
                return(
                  <li className="bg-transparent/5 py-2 px-2 mb-2 rounded-lg text-sm " key={idx} >
                    <div className="flex items-start">
                      <img className="rounded-sm mr-2" src={item.gender === 'FEMALE' ? '/defaultAvatarFemale.png': '/defaultAvatarMale.png'} alt="avatar" width={45} height={32} />
                      <div className="flex flex-col">
                        <div className="font-bold flex justify-between"><span>{item.name}</span> <span>{item.date}</span></div>
                        <span className=" font-medium mb-2 flex justify-between"><span className="text-red-600">{item.role}</span> <span>{item.time}</span></span>
                        <span>{item.comment}</span>
                      </div>                      
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        </CollapseWrapper>
      </div>

      <CustomInput type="textarea" name="Комментарий" placeholder="Комментарий" />

      <ButtonComponent
        color="bg-lombard-btn-green"
        titleBtn="Добавить"
        clickHandler={closeHandler}
        className="w-full mt-4"
      />
    </form>
    <button className=" bg-white hover:scale-125 transition-all duration-300 rounded-full ml-2" type="button" onClick={closeHandler}><SVGComponent title="x"/></button>
    </motion.div>
  </div> );
}

export default AboutClient;