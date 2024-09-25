/* import DottedBtn from "../../NewClient/DepositDetails/DottedBtn"; */
import ButtonComponent from "../../UI/ButtonComponent";
import CustomInput from "../../UI/CustomInput";
import DialogComponent from "../../UI/DialogComponent";
import DropDown from "../../UI/DropDown";
import SVGComponent from "../../UI/SVGComponent";

function Modals({
  clickHandler,
  page,
}: {
  clickHandler: () => void;
  page: string;
}) {
  if (page === "day") {
    return (
      <>
        <DialogComponent closeHandler={clickHandler}>
          <div className="w-[1000px] flex flex-col gap-y-[10px]">
            <h1 className="mb-1.5 font-bold text-black border-b-2 border-lombard-borders-grey text-[22px]">
              Добавить
            </h1>
            <div className="flex flex-row gap-x-[30px]">
              <div className="flex flex-col">
                <SVGComponent title="dialogCalendar" />
                {/* <button>Применить</button> */}
              </div>
              <CustomInput
                type={"textarea"}
                name={"windowInput"}
                placeholder="Основа"
                className="w-[370px] h-[80px] rounded-[8px]"
                label="Основа (суббота, воскресения)"
              />
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
    );
  } else if (page === "product") {
    return (
      <>
        <DialogComponent closeHandler={clickHandler}>
          <div className="w-[900px] flex flex-col gap-y-[20px]">
            <p className="mb-1.5 font-bold text-[#3B3B3B] border-b-2 border-lombard-borders-grey text-[24px]">
              Добавить кредитные продукты
            </p>
            <div className="flex flex-row items-center justify-center gap-x-[20px]">
              <div className="flex flex-col justify-center">
                <p className="font-bold text-[#3B3B3B]">ID</p>
                <p className="bg-[#EFF2F4] rounded-[8px] p-[10px] px-[20px] font-medium text-[14px] text-[#3B3B3B]">
                  0000
                </p>
              </div>
              <DropDown
                name="creditProducts"
                title="Выбрать"
                label="Названия продукта"
                className="h-[40px] text-[14px]"
                triggerType="click"
                listOfItems={[
                  { key: 1, label: "Шаблон1" },
                  { key: 2, label: "Шаблон2" },
                ]}
              />
            </div>
            <CustomInput
              type={"textarea"}
              name={"windowInput"}
              placeholder="Описание"
              className="w-full h-[80px] rounded-[8px]"
              label="Описание"
            />
            <div className="flex flex-row gap-x-[10px]">
              <CustomInput
                type={"date"}
                name={"actionProduct"}
                label="Дата действия продукта"
                className="w-full h-[40px]"
              />
              <CustomInput
                type={"date"}
                name={"derunProduct"}
                label="Дата деактивации продукта"
                className="w-full h-[40px]"
              />
            </div>
            <div className="flex flex-row gap-x-[10px]">
              <DropDown
                name="creditProducts"
                title="Выбрать"
                label="От"
                className="h-[40px] text-[14px]"
                triggerType="click"
                listOfItems={[
                  { key: 1, label: "Шаблон1" },
                  { key: 2, label: "Шаблон2" },
                ]}
              />
              <DropDown
                name="creditProducts"
                title="Выбрать"
                label="До"
                className="h-[40px] text-[14px]"
                triggerType="click"
                listOfItems={[
                  { key: 1, label: "Шаблон1" },
                  { key: 2, label: "Шаблон2" },
                ]}
              />
              <DropDown
                name="creditProducts"
                title="10%"
                label="Процентная ставка "
                className="h-[40px] text-[14px]"
                triggerType="click"
                listOfItems={[
                  { key: 1, label: "15%" },
                  { key: 2, label: "20%" },
                ]}
              />
              <DropDown
                name="creditProducts"
                title="15%"
                label="Ставка просрочки"
                className="h-[40px] text-[14px]"
                triggerType="click"
                listOfItems={[
                  { key: 1, label: "25%" },
                  { key: 2, label: "30%" },
                ]}
              />
              {/* <DottedBtn id={""}/> */}
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
                titleBtn="Отправить"
                clickHandler={clickHandler}
              />
            </div>
          </div>
        </DialogComponent>
      </>
    );
  } else if (page === "pledge") {
    return (
      <>
        <DialogComponent closeHandler={clickHandler}>
          <div className="w-[600px] flex flex-col gap-y-[10px]">
            <p className="mb-1.5 font-bold text-[#3B3B3B] border-b-2 border-lombard-borders-grey">
              Параметры залогов
            </p>
            <div className="flex flex-row items-center justify-center gap-x-[20px]">
              <div className="flex flex-col justify-center">
                <p className="font-bold text-[#3B3B3B]">ID</p>
                <p className="bg-[#EFF2F4] rounded-[8px] p-[10px] px-[20px] font-medium text-[14px] text-[#3B3B3B]">
                  0000
                </p>
              </div>
              <DropDown
                name="pledgeType"
                title="Выбрать"
                label="Тип залога"
                className="h-[40px] text-[14px]"
                triggerType="click"
                listOfItems={[
                  { key: 1, label: "Шаблон1" },
                  { key: 2, label: "Шаблон2" },
                ]}
              />
            </div>
            <div className="flex flex-row gap-x-[10px]">
              <DropDown
                name="Try"
                title="Выбрать"
                label="Проба"
                className="h-[40px] text-[14px]"
                triggerType="click"
                listOfItems={[
                  { key: 1, label: "Шаблон1" },
                  { key: 2, label: "Шаблон2" },
                ]}
              />
              <CustomInput
                type={"date"}
                name={"derunProduct"}
                label="Дата действия"
                className="w-full h-[40px]"
              />
            </div>
            <div className="flex flex-row gap-x-[10px]">
              <DropDown
                name="Price"
                title="Выбрать"
                label="Рыночная стоимость"
                className="h-[40px] text-[14px]"
                triggerType="click"
                listOfItems={[
                  { key: 1, label: "Шаблон1" },
                  { key: 2, label: "Шаблон2" },
                ]}
              />
              <DropDown
                name="RatingPrice"
                title="Выбрать"
                label="Оценочная стоимость"
                className="h-[40px] text-[14px]"
                triggerType="click"
                listOfItems={[
                  { key: 1, label: "Шаблон1" },
                  { key: 2, label: "Шаблон2" },
                ]}
              />
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
                titleBtn="Отправить"
                clickHandler={clickHandler}
              />
            </div>
          </div>
        </DialogComponent>
      </>
    );
  } else if (page === "filial") {
    return (
      <>
        <DialogComponent closeHandler={clickHandler}>
          <div className="w-[800px] flex flex-col gap-y-[10px]">
            <p className="mb-1.5 font-bold text-[#3B3B3B] border-b-2 border-lombard-borders-grey">
              Открыть Счет
            </p>
            <div className="flex flex-row gap-x-[10px]">
              <div className="flex flex-col">
                <p className="font-bold text-[#3B3B3B]">ID</p>
                <p className="bg-[#EFF2F4] rounded-[8px] p-[10px] px-[20px] font-medium text-[14px] text-[#3B3B3B]">
                  0000
                </p>
              </div>
              <div className="flex flex-col w-full">
                <p className="font-bold text-[#3B3B3B]">Код клиента</p>
                <p className="bg-[#EFF2F4] rounded-[8px] p-[10px] font-medium text-[14px] text-[#3B3B3B]">
                  0000000000000
                </p>
              </div>
            </div>
            <DropDown
              name="pledgeType"
              title="Выбрать"
              label="Балансовая строка"
              className="h-[40px] text-[14px]"
              triggerType="click"
              listOfItems={[
                { key: 1, label: "Шаблон1" },
                { key: 2, label: "Шаблон2" },
              ]}
            />
            <CustomInput
              type={"textarea"}
              name={"windowInput"}
              placeholder="Названия счета"
              className="w-full h-[80px] rounded-[8px]"
              label="Названия счета"
            />
            <div className="flex justify-end mt-5 gap-[6px]">
              <ButtonComponent
                color="bg-lombard-btn-grey"
                className="text-lombard-text-black"
                titleBtn="Отмена"
                clickHandler={clickHandler}
              />
              <ButtonComponent
                color="bg-lombard-btn-green"
                titleBtn="Отправить"
                clickHandler={clickHandler}
              />
            </div>
          </div>
        </DialogComponent>
      </>
    );
  }
}

export default Modals;
