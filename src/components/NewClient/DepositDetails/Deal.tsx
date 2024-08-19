import DropDown from "../../UI/DropDown";

function Deal() {
    return (
        <div className="flex items-center justify-center gap-4 my-5">
            <DropDown
                title="Код продукта"
                listOfItems={[
                    { label: "583", key: 1 },
                    { label: "585", key: 2 },
                ]}
                triggerType="click"
                name="creditType"
                label="Код продукта"
                className="h-[41px]"
            />
        </div>
    )
}

export default Deal
