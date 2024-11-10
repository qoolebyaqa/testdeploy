import SVGComponent from "./SVGComponent";
import { createPortal } from "react-dom";
import DialogComponent from "./DialogComponent";
import ButtonComponent from "./ButtonComponent";
import { parseFilters } from "../../helpers/fnHelpers";
import DropDown from "./DropDown";
import CustomInput from "./CustomInput";

type FilterProps = {
  filters: React.ReactNode,
  isVisible: boolean,
  activeFilter: string,
  setVisibility: (state: boolean) => void,
  clearFilters: () => void,
  supportedFilters: any[],
  isDisabled: boolean | undefined,
}

function Filters({ filters, isVisible, setVisibility, activeFilter, clearFilters, supportedFilters, isDisabled }: FilterProps) {
  const appliedFilters = parseFilters(activeFilter);
  const showFilters = supportedFilters.filter((val:any) => Object.keys(appliedFilters).includes(val.name)).map((val:any) => {
    val.value = appliedFilters[val.name]
    return val;
  })
  
  return (
    <>
      <button
        className="bg-white rounded-md h-[32px] p-1"
        onClick={() => {
          setVisibility(true);
        }}
      >
        <i>
          <SVGComponent title="filters" />
        </i>
      </button>
      {showFilters.map((field:any) => {
        if (field.type === 'dropdown') {
          return (
            <DropDown
              key={field.name}
              name={field.name}
              containedLabel={field.label}
              listOfItems={field.items}
              value={field.value}
              isDisabled={isDisabled}
            />
          );
        } else {
          return (
            <CustomInput
              key={field.name}
              name={field.name}
              type={field.type}
              containedLabel={field.label}
              value={field.value}
              isDisabled={isDisabled}
            />
          );
        }
      })}

      {activeFilter && <ButtonComponent color="bg-lombard-main-blue" titleBtn='&#128940; Сбросить фильтры' clickHandler={clearFilters}/>}
      {isVisible &&
        createPortal(
          <DialogComponent
            closeHandler={() => {
              setVisibility(false);
            }}
          ><h3>Выставите фильтры</h3>
            {filters}
          </DialogComponent>,
          document.body
        )}
    </>
  );
}

export default Filters;
