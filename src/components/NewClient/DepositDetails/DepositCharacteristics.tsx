import { useForm } from "react-hook-form";
import {
  CreateCollateralResp,
  ICollateralAttribute,
} from "../../../helpers/API/Schemas";
import ButtonComponent from "../../UI/ButtonComponent";
import CustomInput from "../../UI/CustomInput";
import DropDown from "../../UI/DropDown";
import { useTranslation } from "react-i18next";
import { convertDataToList4DropDown } from "../../../helpers/fnHelpers";
import { useParams } from "react-router";
import { ApiService } from "../../../helpers/API/ApiSerivce";
import { yupResolver } from "@hookform/resolvers/yup";
import { collateralAttributesSchema } from "../../../helpers/validator";

function DepositCharacteristics({
  closeHandler,
  itemFormValues,
  saveInputData,
  availableAttributes,
  contractNumber,
  collateralId,
  setPrice,
}: {
  itemFormValues: { [key: string]: any };
  closeHandler: () => void;
  saveInputData: (data: { [key: string]: any }) => void;
  availableAttributes: ICollateralAttribute[];
  contractNumber: number | null;
  collateralId?: string;
  setPrice: (value: CreateCollateralResp) => void;
}) {
  const { id_browse } = useParams();
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(collateralAttributesSchema(availableAttributes)),
    defaultValues: itemFormValues.attribute_values && {
      ...itemFormValues.attribute_values.reduce(
        (acc: any, { collateral_type_attribute_id, value }: any) => {
          acc[collateral_type_attribute_id] = value;
          return acc;
        },
        {}
      ),
      comments: itemFormValues.description,
    },
  });
  async function submitCharacteristics(formData: any) {
    if(!isDirty) {
      closeHandler();
      return;
    }
    const attributes = { ...formData };
    delete attributes.comments;
    const collateralToPost = {
      loan_agreement_id: contractNumber,
      customer_id: id_browse,
      collateral_type_id: collateralId,
      description: formData.comments,
      attribute_values: Object.entries(attributes).map(([key, value]) => ({
        collateral_type_attribute_id: parseInt(key, 10),
        value: value,
      })),
      storage_unit_id: 1,
    };
    try {
      if(itemFormValues.price && itemFormValues.price.id) {
        const response = await ApiService.updateCollateralForPO(collateralToPost, itemFormValues.price.id);
        setPrice(response.data);
        (collateralToPost as any).id = itemFormValues.id;
        (collateralToPost as any).price = response.data;
      } else {
        const response = await ApiService.createCollateralForPO(collateralToPost);
        console.log(response.data)
        setPrice(response.data);
        (collateralToPost as any).id = itemFormValues.id;
        (collateralToPost as any).price = response.data;
      }
      saveInputData(collateralToPost);
      closeHandler();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className="flex flex-col gap-2">
      <p className="mb-4 font-bold text-black border-b-2 border-lombard-borders-grey">
        Характеристика залога
      </p>
      <div className="flex gap-6">
        {availableAttributes?.map((attr) => {
          return attr?.dataType === "OPTIONS" ? (
            <div className="min-w-40">
              <DropDown
                key={attr.id}
                label={t(attr.name)}
                name={attr.id.toString()}
                listOfItems={convertDataToList4DropDown(attr.options)}
                control={control}
                errorMsg={errors[attr.id.toString()]?.message as string}
              />
            </div>
          ) : attr?.dataType === "DECIMAL" ? (
            <CustomInput
              key={attr.id}
              name={attr.id.toString()}
              label={t(attr.name)}
              type="number"
              control={control}
              errorMsg={errors[attr.id.toString()]?.message as string}
            />
          ) : (
            <CustomInput
              key={attr.id}
              name={t(attr.name)}
              label={t(attr.name)}
              type="text"
              control={control}
              errorMsg={errors[attr.id.toString()]?.message as string}
            />
          );
        })}
      </div>
      <CustomInput
        type="textarea"
        name="comments"
        label="Комментарии"
        placeholder="Комментарии"
        className="h-[105px]"
        control={control}
        errorMsg={errors.comments?.message as string}
      />
      <div className="flex self-end gap-2">
        <ButtonComponent
          titleBtn="Отмена"
          color="bg-lombard-btn-grey"
          className="text-lombard-text-black"
          clickHandler={closeHandler}
        />
        <ButtonComponent
          submit
          titleBtn="Сохранить"
          color="bg-lombard-btn-green"
          clickHandler={handleSubmit(submitCharacteristics)}
        />
      </div>
    </form>
  );
}

export default DepositCharacteristics;
