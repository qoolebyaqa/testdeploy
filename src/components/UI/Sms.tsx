import { useEffect, useState } from "react";
import DialogComponent from "../UI/DialogComponent";
import ButtonComponent from "./ButtonComponent";
import DropDown from "./DropDown";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { QueueReq, sendQueueReqSchema } from "../../helpers/validator";
import TimeDatePicker from "./TimeDatePicker";

function Sms({ closeHandler }: { closeHandler: () => void}) {
    /* const [groups, setGroups] = useState([]); */
    const [templates, setTemplates] = useState([]);
    const [formValues, setFormValues] = useState<{[key:string]: string}>({})

    const valueChangeHandler = (inputValue: {id?: string, title:string, value: string | string[]}) => {   
      setFormValues(prev => ({...prev, [inputValue.title]: Array.isArray(inputValue.value) ? inputValue.value[0] : inputValue.value}))
    }
    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({ mode: "onChange", resolver: yupResolver(sendQueueReqSchema) });
    
    
    useEffect(() => {
        const fetchGroups = async() => {
            try {
                /* const response = await ApiService.getCroups(); */
                const templates = await ApiService.getTemplates();
                /* const fetchedGroups = response.data.content.map((value:string) => ({key: (value as any).id, label: (value as any).name, enum: (value as any).id})) */
                const fetchedTemplates = templates.data.content.map((value:string) => ({key: (value as any).id, label: (value as any).message_id, enum: (value as any).id}))

                /* setGroups(fetchedGroups); */
                setTemplates(fetchedTemplates);
            } catch (err) {
                console.log(err)
            }
        }
        fetchGroups();
    },[])

    const submitHandler = async (formData: QueueReq) => {
        const dataToPost = {
            ...formData, 
            recipient_type: 'CLIENT', 
            recipient_ids: [12], 
            scheduled: !!formData.scheduled_at
        }
        console.log(dataToPost)
        try {
            await ApiService.addToQueue(dataToPost);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <DialogComponent closeHandler={closeHandler}>
                <form className="w-[280px] flex flex-col gap-y-[10px]" onSubmit={handleSubmit(submitHandler)}>
                    <p className="mb-1.5 font-bold text-black border-b-2 border-lombard-borders-grey">Отправить СМС</p>
                    {/* <DropDown name="group_id" title="Выбрать" label="Группа" listOfItems={groups} value={formValues.group_id} handleSelect={valueChangeHandler}/> */}
                    <TimeDatePicker name="scheduled_at" label="Дата и время" control={control} value={formValues.scheduled_at} handleChange={valueChangeHandler} />
                    <DropDown name="template_id" title="Выбрать" label="Выбор шаблона" listOfItems={templates} control={control} errorMsg={errors.template_id?.message} value={formValues.template_id} handleSelect={valueChangeHandler}/>
                    {/* <DropDown name="SMStypeDD" title="Выбрать" label="Тип сообщения" listOfItems={[{ key: 1, label: 'Увдомление' }, { key: 2, label: 'Подтверждение', }]}/> */}
                    <div className="flex justify-end mt-5 gap-[6px]">
                        <ButtonComponent color="bg-lombard-btn-grey" className="text-lombard-text-black" titleBtn="Отмена" clickHandler={closeHandler} />
                        <ButtonComponent color="bg-lombard-btn-green" titleBtn="Отправить" submit />
                    </div>
                </form>
            </DialogComponent>
        </>
    );
}

export default Sms;
