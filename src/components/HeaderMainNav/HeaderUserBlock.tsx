import SVGComponent from "../UI/SVGComponent";


function HeaderUserBlock() {
  return ( <div className="flex gap-2">
    <div>
      <h3 className="text-right font-bold text-[16px]">Равшан Азимжонов</h3>
      <p className="text-right text-red-600 font-bold text-[12px]">Админ</p>
    </div>
    <i><SVGComponent title="notifications"/></i>
    <i><SVGComponent title="userIcon"/></i>
  </div> );
}

export default HeaderUserBlock;