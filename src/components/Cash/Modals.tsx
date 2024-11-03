import ButtonComponent from "../UI/ButtonComponent";
import CustomInput from "../UI/CustomInput";
import DialogComponent from "../UI/DialogComponent";
import DropDown from "../UI/DropDown";

function Modals({
  clickHandler,
  page,
}: {
  clickHandler: () => void;
  page: string;
}) {
  if(page==='debet'){
    return(
      <>
        <DialogComponent closeHandler={clickHandler}>
          <div className="w-[600px] flex flex-col gap-y-[10px]">
            <h1 className="mb-1.5 font-bold text-black border-b-2 border-lombard-borders-grey text-[22px]">
              Создать
            </h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="">
                <CustomInput
                  type={"date"}
                  name={"actionProduct"}
                  label="Дата"
                  className="w-full h-[40px]"
                />
              </div>
              <div className="col-span-2">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="ФИО"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="ФИО"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"textarea"}
                  name={"windowInput"}
                  placeholder="Основание"
                  className="w-full h-[80px] rounded-[8px]"
                  label="Основание"
                />
              </div>
              
              <div >
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="0"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Сумма"
                />
              </div>
              <div >
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="0"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Процент (%)"
                />
              </div>
              <div >
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="0"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Пеня (%)"
                />
              </div>
            </div>
            <div className="flex justify-end mt-5 gap-[6px]">
              <ButtonComponent
                color="bg-lombard-btn-grey"
                className="text-lombard-text-black"
                titleBtn="Отмена"
                clickHandler={clickHandler}
              />
              <ButtonComponent
                color="bg-lombard-btn-green"
                titleBtn="Сохранить"
                clickHandler={clickHandler}
              />
            </div>
          </div>
        </DialogComponent>
      </>
    )
  }
  if(page==='credit'){
    return(
      <>
        <DialogComponent closeHandler={clickHandler}>
          <div className="w-[600px] flex flex-col gap-y-[10px]">
            <h1 className="mb-1.5 font-bold text-black border-b-2 border-lombard-borders-grey text-[22px]">
              Создать
            </h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="">
                <CustomInput
                  type={"date"}
                  name={"actionProduct"}
                  label="Дата"
                  className="w-full h-[40px]"
                />
              </div>
              <div className="col-span-2">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="ФИО"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="ФИО"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"textarea"}
                  name={"windowInput"}
                  placeholder="Основание"
                  className="w-full h-[80px] rounded-[8px]"
                  label="Основание"
                />
              </div>
              
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="0"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Сумма"
                />
              </div>
            </div>
            <div className="flex justify-end mt-5 gap-[6px]">
              <ButtonComponent
                color="bg-lombard-btn-grey"
                className="text-lombard-text-black"
                titleBtn="Отмена"
                clickHandler={clickHandler}
              />
              <ButtonComponent
                color="bg-lombard-btn-green"
                titleBtn="Сохранить"
                clickHandler={clickHandler}
              />
            </div>
          </div>
        </DialogComponent>
      </>
    )
  }
  if(page==='general'){
    return(
      <>
        <DialogComponent closeHandler={clickHandler}>
          <div className="w-[600px] flex flex-col gap-y-[10px]">
            <h1 className="mb-1.5 font-bold text-black border-b-2 border-lombard-borders-grey text-[22px]">
              Создать
            </h1>
            <div className="grid grid-cols-6 gap-4">
            <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Названия"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Названия"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"date"}
                  name={"actionProduct"}
                  label="Дата"
                  className="w-full h-[40px]"
                />
              </div>
              
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Номер акта"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Номер акта"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Номер карточки"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Номер карточки"
                />
              </div>
              <div className="col-span-3">
                <DropDown title="Выбрать" className="h-[40px]" label="Тип" listOfItems={[{label: 'Все', key: 1, enumvalue: 'ALL'}, {label: 'Открыт', key: 2, enumvalue: 'OPEN'}]} name="contractsSelect"/>
              </div>
              <div className="col-span-3">
                <DropDown title="Выбрать" className="h-[40px]" label="Тип взноса" listOfItems={[{label: 'Все', key: 1, enumvalue: 'ALL'}, {label: 'Открыт', key: 2, enumvalue: 'OPEN'}]} name="contractsSelect"/>
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="От кого"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="От кого"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Номер завода"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Номер завода"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Текущий сумма взноса"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Текущий сумма взноса"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Годовая сумма амортизации"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Годовая сумма амортизации"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Приход"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Приход"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Ответственный"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Ответственный"
                />
              </div>
              
            </div>
            <div className="flex justify-end mt-5 gap-[6px]">
              <ButtonComponent
                color="bg-lombard-btn-grey"
                className="text-lombard-text-black"
                titleBtn="Отмена"
                clickHandler={clickHandler}
              />
              <ButtonComponent
                color="bg-lombard-btn-green"
                titleBtn="Сохранить"
                clickHandler={clickHandler}
              />
            </div>
          </div>
        </DialogComponent>
      </>
    )
  }
  if(page==='received'){
    return(
      <>
        <DialogComponent closeHandler={clickHandler}>
          <div className="w-[600px] flex flex-col gap-y-[10px]">
            <h1 className="mb-1.5 font-bold text-black border-b-2 border-lombard-borders-grey text-[22px]">
              Создать
            </h1>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-2">
                <CustomInput
                  type={"date"}
                  name={"actionProduct"}
                  label="Дата"
                  className="w-full h-[40px]"
                />
              </div>
              <div className="col-span-2">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="0"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Годовой процент (%)"
                />
              </div>
              <div className="col-span-2">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="0"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Сумма кредита"
                />
              </div>
              <div className="col-span-6">
                <CustomInput
                  type={"textarea"}
                  name={"windowInput"}
                  placeholder="Цель кредита"
                  className="w-full h-[80px] rounded-[8px]"
                  label="Цель кредита"
                />
              </div>
              
              <div className="col-span-3">
                <CustomInput
                  type={"date"}
                  name={"actionProduct"}
                  label="Дата кредитования"
                  className="w-full h-[40px]"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"date"}
                  name={"actionProduct"}
                  label="Срок окончания кредита"
                  className="w-full h-[40px]"
                />
              </div>
              <div className="col-span-6">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder=""
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Названия банка"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder=""
                  className="w-full  h-[40px] rounded-[8px]"
                  label="МФО банка"
                />
              </div>
              <div className="col-span-3">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder=""
                  className="w-full  h-[40px] rounded-[8px]"
                  label="ИНПС банка"
                />
              </div>
            </div>
            <div className="flex justify-end mt-5 gap-[6px]">
              <ButtonComponent
                color="bg-lombard-btn-grey"
                className="text-lombard-text-black"
                titleBtn="Отмена"
                clickHandler={clickHandler}
              />
              <ButtonComponent
                color="bg-lombard-btn-green"
                titleBtn="Сохранить"
                clickHandler={clickHandler}
              />
            </div>
          </div>
        </DialogComponent>
      </>
    )
  }
  if(page==='lowcost'){
    return(
      <>
        <DialogComponent closeHandler={clickHandler}>
          <div className="w-[600px] flex flex-col gap-y-[10px]">
            <h1 className="mb-1.5 font-bold text-black border-b-2 border-lombard-borders-grey text-[22px]">
              Создать
            </h1>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-2">
                <CustomInput
                  type={"date"}
                  name={"actionProduct"}
                  label="Дата"
                  className="w-full h-[40px]"
                />
              </div>
              <div className="col-span-4">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Названия"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Названия"
                />
              </div>
              <div className="col-span-2">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Единица измерения"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Единица измерения"
                />
              </div>
              <div className="col-span-2">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Цена"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Цена"
                />
              </div>
              <div className="col-span-2">
                <CustomInput
                  type={"input"}
                  name={"windowInput"}
                  placeholder="Количество"
                  className="w-full  h-[40px] rounded-[8px]"
                  label="Количество"
                />
              </div>
              <div className="col-span-6">
                <DropDown title="Выбрать" className="h-[40px]" label="Кредит" listOfItems={[{label: 'Все', key: 1, enumvalue: 'ALL'}, {label: 'Открыт', key: 2, enumvalue: 'OPEN'}]} name="contractsSelect"/>
              </div>
              
              
            </div>
            <div className="flex justify-end mt-5 gap-[6px]">
              <ButtonComponent
                color="bg-lombard-btn-grey"
                className="text-lombard-text-black"
                titleBtn="Отмена"
                clickHandler={clickHandler}
              />
              <ButtonComponent
                color="bg-lombard-btn-green"
                titleBtn="Сохранить"
                clickHandler={clickHandler}
              />
            </div>
          </div>
        </DialogComponent>
      </>
    )
  }
}

export default Modals