import { useCallback, useEffect, useState } from "react";
import DropDown from "../../UI/DropDown";
import { ApiService } from "../../../helpers/API/ApiSerivce";
import { convertDataToList4DropDown } from "../../../helpers/fnHelpers";
import { useForm } from "react-hook-form";
import { IProduct } from "../../../helpers/API/Schemas";
import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../../helpers/validator";
import { useParams } from "react-router";
import useActions from "../../../helpers/hooks/useActions";

function Deal({setContractNumber}: {setContractNumber: (poN: number) => void}) {
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const { id_browse } = useParams();
  const dispatch = useActions();

  useEffect(() => {
    const getProducts = async () => {
      const prods = await ApiService.getLoanProducts();
      setProducts(prods.data);
    };
    getProducts();
  }, []);
  
  const {
    handleSubmit,
    control,
    formState: { errors  },
  } = useForm({ mode: "onChange", resolver: yupResolver(productSchema) });
  
  const listOfItems = useCallback(
    () => convertDataToList4DropDown(products),
    [products]
  );

  const codeSubmit = async (formData: any) => {
    if(id_browse) 
    try {
      const selectedProduct = products.filter(
        (item) => item.id === Number(formData.loan_product_id)
      )[0];
      const productDataToPost = {
        loan_product_id: Number(formData.loan_product_id),
        branch_id: selectedProduct.branch_id,
        customer_id: id_browse,
      };
      const resHoldPO = await ApiService.createPOinHold(productDataToPost);/* {data: {loan_id: 64}} */
      setContractNumber(resHoldPO.data.loan_id)
      toast.success(`Драфт договора №${resHoldPO.data.loan_id} создан`);
      dispatch.setStepState({id: 2, step:'collateral', maxStep: 2})
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      className="flex items-center justify-center gap-4 my-6"
      id="hold"
      onSubmit={handleSubmit(codeSubmit)}
    >
      <DropDown
        title="Код продукта"
        listOfItems={listOfItems()}
        name="loan_product_id"
        label="Код продукта"
        control={control}
        errorMsg={errors.loan_product_id?.message}
      />
      <ToastContainer />
    </form>
  );
}

export default Deal;
