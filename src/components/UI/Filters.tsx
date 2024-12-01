import SVGComponent from "./SVGComponent";
import { createPortal } from "react-dom";
import DialogComponent from "./DialogComponent";
import DropDown from "./DropDown";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { SupportedFilters } from "../../helpers/types";
import { getFilter } from "../../helpers/fnHelpers";

type FilterProps = {
  filters: React.ReactNode;
  isVisible: boolean;
  activeFilter: string;
  setVisibility: (state: boolean) => void;  
  setTblHeaderFilter: (state: string) => void;  
  setExternalFilters: (filter: string) => void;
  supportedFilters: SupportedFilters[];
  activeFilterValue: string
};

function Filters({
  filters,
  isVisible,
  setVisibility,
  activeFilter,
  setExternalFilters,
  supportedFilters,
  setTblHeaderFilter,
  activeFilterValue
}: FilterProps) {
  const headerFilter = useMemo(() => {
    return supportedFilters.find((val: any) => val.name === activeFilter);
  }, [activeFilter]);

  const {
    handleSubmit,
    control,
    reset,
    formState: {isDirty},
  } = useForm({ mode: "onChange" });

  async function headerFilterSubmit(formData: any) {
    if(!isDirty) {
      setExternalFilters('');
      setTblHeaderFilter('')
      reset({[activeFilter]: ''});
    } else {
      setExternalFilters(getFilter(formData))
      reset(formData)
    }
  }

  console.log(activeFilter)

  return (
    <>
      <form className={`flex gap-2 ${headerFilter ? 'items-end pb-[14px]' : ''}`} onSubmit={handleSubmit(headerFilterSubmit)}>
        <button
          className={`${!activeFilterValue ? 'bg-white' : 'bg-lombard-main-blue'} rounded-md h-[32px] p-1`}
          type="button"
          onClick={() => {
            setVisibility(true);
          }}
        >
          <i>
            <SVGComponent title="filters" color={!activeFilterValue ? '#3B3B3B' : 'white'} />
          </i>
        </button>
        {!!headerFilter && (
          <div className="flex items-end gap-2 min-w-[330px]">
            {
              (headerFilter?.type === "dropdown") ?(
                  <DropDown
                    key={headerFilter.name}
                    name={headerFilter.name}
                    containedLabel={headerFilter.label}
                    listOfItems={headerFilter.items!}
                    control={control}
                  />
                ) : (
                  <CustomInput
                    key={headerFilter.name}
                    name={headerFilter.name}
                    type={headerFilter.type}
                    containedLabel={headerFilter.label}
                    control={control}
                  />
                )
            }
            <button
              className={`${isDirty
                ? "bg-lombard-btn-green text-white"
                : "bg-lombard-btn-grey text-black"}`}
              type="submit"
            >
              {isDirty ? 'Применить' : 'Сбросить'}
            </button>
          </div>
        )}
      </form>
      {isVisible &&
        createPortal(
          <DialogComponent
            closeHandler={() => {
              setVisibility(false);
            }}
          >
            <h3>Выставите фильтры</h3>
            {filters}
          </DialogComponent>,
          document.body
        )}
    </>
  );
}

export default Filters;
