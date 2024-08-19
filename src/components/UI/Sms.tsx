import DialogComponent from "../UI/DialogComponent";
import ButtonComponent from "./ButtonComponent";
import CustomInput from "./CustomInput";
import DropDown from "./DropDown";

function Sms({ clickHandler, page }: { clickHandler: () => void, page: string}) {
    if (page === 'notification') {
        return (
            <>
                <DialogComponent closeHandler={clickHandler}>
                    <div className="w-[280px] flex flex-col gap-y-[10px]">
                        <p className="mb-1.5 font-bold text-black border-b-2 border-lombard-borders-grey">Отправить СМС</p>
                        <DropDown name="SMSgroupDD" title="Выбрать" label="Группа" triggerType="click" listOfItems={[{ key: 1, label: 'Группа1' }, { key: 2, label: 'Группа2', }]} />
                        <CustomInput type="date" name="SMSdate" defaultValue={new Date().toLocaleString()} label="Дата и время" />
                        <DropDown name="SMStemplateDD" title="Выбрать" label="Выбор шаблона" triggerType="click" listOfItems={[{ key: 1, label: 'Шаблон1' }, { key: 2, label: 'Шаблон2', }]} />
                        <DropDown name="SMStypeDD" title="Выбрать" label="Тип сообщения" triggerType="click" listOfItems={[{ key: 1, label: 'Увдомление' }, { key: 2, label: 'Подтверждение', }]} />
                        <div className="flex justify-end mt-5 gap-[6px]">
                            <ButtonComponent color="bg-lombard-btn-grey" className="text-lombard-text-black" titleBtn="Отмена" clickHandler={clickHandler} />
                            <ButtonComponent color="bg-lombard-btn-green" titleBtn="Отправить" clickHandler={clickHandler} />
                        </div>
                    </div>
                </DialogComponent>
            </>
        );
    } else if (page === 'client') {
        return (
            <>
                <DialogComponent closeHandler={clickHandler}>
                    <div className="w-[280px] flex flex-col gap-y-[10px]">
                        <p className="mb-1.5 font-bold text-[#3B3B3B] border-b-2 border-lombard-borders-grey">Отправить СМС</p>
                        <p className="font-bold text-black">Номер телефона</p>
                        <p className="font-normal text-[#3B3B3B] border-2 border-[D2DBE1] border-solid rounded-[12px] p-[10px]">+998 (99) 088-80-60</p>
                        <div className="flex justify-end mt-5 gap-[6px]">
                            <ButtonComponent color="bg-lombard-btn-grey" className="text-lombard-text-black" titleBtn="Отмена" clickHandler={clickHandler} />
                            <ButtonComponent color="bg-lombard-btn-green" titleBtn="Отправить" clickHandler={clickHandler} />
                        </div>
                    </div>
                </DialogComponent>
            </>
        )
    }
}

export default Sms
