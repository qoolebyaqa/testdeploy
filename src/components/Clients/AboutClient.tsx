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

interface ICommentList{
  id:number,
  customer_id:number,
  author_first_name:string,
  author_last_name:string,
  author_role_id:string,
  content:string,
  created_at:string,
  created_time?:string,
  created_date?:string,
  updated_at:string,
}


function AboutClient({closeHandler}:{closeHandler: () => void,}) {
const modalRef = useRef<HTMLDivElement>(null);
 const params=useParams()
 const id = params.id_browse ? params.id_browse :"";
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
  const fetchCustomerComments=()=>{
    ApiService.getCustomerComments(id)
    .then((response)=>{
      const formattedComments = response.data.map((comment:ICommentList) => {
        const createdAt = new Date(comment.created_at);
        return {
          ...comment,
          created_at: createdAt,
          created_time:createdAt.toLocaleTimeString().replace(/\//g, '.'),
          created_date:createdAt.toLocaleDateString().replace(/\//g, '.'),
        };
      });
      setCommentsList(formattedComments);
    })
  }
  
  useEffect(()=>{
    ApiService.getDocuments(id,"document")
    .then((response)=>{
      setDocList(response.data)
    });
    fetchCustomerComments()
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

  const [comment, setComment] = useState('');
  const [commentsList,setCommentsList] = useState<ICommentList[]>([])
  function saveComment(){
    const data = {
      content:comment
    }
    ApiService.addCustomerComments(id,data)
    .then((): void =>{
      fetchCustomerComments()
    })
    setComment("")
  }
  const handleCommentChange = (inputValue: {id?: string, title:string, value: string | string[]}) => {  
    setComment(inputValue.value as string);
  };
  return ( <div className="w-[520px] h-screen fixed top-20 left-[150px]  inset-0 z-50 ">
    <motion.div ref={modalRef} className="flex gap-[1px]" animate={{translateY: [-10, 10, 0]}} transition={{duration: 0.4}} >
    <form className=" bg-white p-[30px] rounded-xl border-lombard-borders-grey border-[1px]">
      <div className="mb-4">
        <CollapseWrapper title={`Документы  (${docList.length})`} >
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
        <CollapseWrapper title={`Комментарии  (${commentsList.length})`}>
          <>
            <ul className="list-none">
              {commentsList.map((item,idx)=>{
                return(
                  <li className="bg-transparent/5 py-2 px-2 mb-2 rounded-lg text-sm " key={idx} >
                    <div className="flex items-start">
                      <img className="rounded-sm mr-2" src={'/defaultAvatarMale.png'} alt="avatar" width={45} height={32} />
                      <div className="flex flex-col flex-grow">
                        <div className="font-bold flex justify-between"><span>{item.author_first_name}</span><span>{item.created_date}</span></div>
                        <span className=" font-medium mb-2 flex justify-between"><span className="text-red-600">{item.author_role_id}</span> {item.created_time}</span>
                        <span>{item.content}</span>
                      </div>                      
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        </CollapseWrapper>
      </div>

      <div className="w-full">
        <CustomInput className="w-full" type="textarea" name="Комментарий" value={comment} handleChange={handleCommentChange} placeholder="Комментарий" />
      </div>

      <ButtonComponent
        color="bg-lombard-btn-green"
        titleBtn="Добавить"
        clickHandler={saveComment}
        className="w-full mt-4"
      />
    </form>
    <button className=" bg-white hover:scale-125 transition-all duration-300 rounded-full ml-2" type="button" onClick={closeHandler}><SVGComponent title="x"/></button>
    </motion.div>
  </div> );
}

export default AboutClient;