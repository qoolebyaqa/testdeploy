import { createPortal } from "react-dom";
import CustomInput from "../../UI/CustomInput";
import DialogComponent from "../../UI/DialogComponent";
import DropDown from "../../UI/DropDown";
import SVGComponent from "../../UI/SVGComponent";
import DepositCharacteristics from "./DepositCharacteristics";
import DottedBtn from "./DottedBtn";
import { useState } from "react";
import { motion } from "framer-motion";
import { CreateCollateralResp, ICollateralType, LocalcollateralItem } from "../../../helpers/API/Schemas";
import { convertDataToList4DropDown } from "../../../helpers/fnHelpers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collateralPriceSchema, collateralSchema } from "../../../helpers/validator";
import { useTranslation } from "react-i18next";

function DepositItem({
  item,
  pushNewIndex,
  deleteIndex,
  formDepositItems,
  saveInputData,
  collateralTypes,
  contractNumber
}: {
  item: LocalcollateralItem;
  pushNewIndex: () => void;
  deleteIndex: (id: LocalcollateralItem) => void;
  formDepositItems: { [key: string]: any }[];
  saveInputData: (data: { [key: string]: string | string[] }) => void;
  collateralTypes: ICollateralType[];
  contractNumber: number | null
}) {
  const [showDialog, setShowDialog] = useState(false);
  const {t} = useTranslation();
  const [price, setPrice] = useState<CreateCollateralResp>({
    "estimated_value": 0,
    "estimated_value_min": 0,
    "estimated_value_max": 0
  });
  const itemFormValues = formDepositItems.find(val => val.id === item.id);
  
  const {
    handleSubmit,
    control, getValues,
    formState: { errors },
    // @ts-ignore
  } = useForm({ mode: "onChange", resolver: yupResolver(collateralSchema), defaultValues: {
    collateralType: item.collateral_type_id?.toString()
  } });

  const {
    control: priceControl,
    reset: priceReset,
    getValues: getPriceValue,
    formState: { errors: priceErrors, isValid: isPriceValid },
  } = useForm({ mode: "onChange", 
    // @ts-ignore
    resolver: item.price?.estimated_value ? yupResolver(collateralPriceSchema(item.price?.estimated_value_min, item.price?.estimated_value_max)) : yupResolver(collateralPriceSchema(price.estimated_value_min, price.estimated_value_max)), 
    defaultValues: {price: price.estimated_value || item.price?.estimated_value} });

  const handleSetPrice = (value: CreateCollateralResp) => {
    setPrice(value);
    priceReset({price: value.estimated_value})
  }
  
  const availableAttributes = getValues('collateralType') ? collateralTypes.find(val => String(val.id) === getValues('collateralType'))!.attributes : [];
  const itemFormConverted = itemFormValues?.attribute_values && itemFormValues.attribute_values.reduce(
    (acc: any, { collateral_type_attribute_id, value }: any) => {
      acc[collateral_type_attribute_id] = value;
      return acc;
    },
    {}
  )
  const infoData = itemFormConverted && availableAttributes && (availableAttributes as ICollateralType[]).map(attr => ({name: attr.name, value: itemFormConverted[attr.id]}))
  const info = infoData?.reduce((acc:string, cur: {name: string, value: string}) => {return acc + `${t(cur.name)} ${cur.value}, `}, '');

  return (
    <motion.li
      className="flex mt-5"
      animate={{ y: [-100, 100, 50, 0] }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-5/12 mr-2">
        <form className="flex gap-1 items-center" onSubmit={handleSubmit(() => setShowDialog(true))}>
          <DropDown
            title="Выбрать"
            listOfItems={convertDataToList4DropDown(collateralTypes)}
            label="Тип залога"
            name="collateralType"
            control={control}
            errorMsg={errors.collateralType?.message}
          />
          <button
            className="self-end p-0 m-0 flex h-[60px] max-w-[300px] min-w-[45px] overflow-hidden text-lg"
          >
            <i className="self-end">
              <SVGComponent title="message" />
            </i>
            {info && (
              <p className="text-black py-2 text-[10px] whitespace-normal leading-3">{info}</p>
            )}
          </button>
        </form>
      </div>
      <div className="grow mr-12">
        <form className="flex gap-1">
          <CustomInput
            type="number"
            label="Цена"
            name="price"
            className="h-[35px]"
            control={priceControl}
            errorMsg={priceErrors.price?.message}
            isDisabled={!itemFormValues?.attribute_values}
          />
          <DottedBtn
            currentItem={item}
            pushNewIndex={pushNewIndex}
            deleteIndex={deleteIndex}
            items={formDepositItems}
            isValid={isPriceValid && getPriceValue('price') !== 0}
          />
        </form>
      </div>
      {showDialog &&
        createPortal(
          <DialogComponent closeHandler={() => setShowDialog(false)}>
            <DepositCharacteristics
              closeHandler={() => setShowDialog(false)}
              availableAttributes={availableAttributes}
              saveInputData={saveInputData}
              contractNumber={contractNumber}
              collateralId={getValues('collateralType')}
              itemFormValues={itemFormValues!}
              setPrice={handleSetPrice}
            />
          </DialogComponent>,
          document.body
        )}
    </motion.li>
  );
}

export default DepositItem;
