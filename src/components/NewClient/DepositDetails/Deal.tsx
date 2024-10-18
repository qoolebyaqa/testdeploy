import DropDown from "../../UI/DropDown";

function Deal() {
    return (
        <div className="flex items-center justify-center gap-4 my-6">
            <DropDown
                title="Код продукта"
                listOfItems={[
                    { label: "583", key: 1 },
                    { label: "585", key: 2 },
                ]}
                name="creditType"
                label="Код продукта"
            />
        </div>
    )
}

export default Deal
