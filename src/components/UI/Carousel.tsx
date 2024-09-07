import { Image } from "antd";
import { IFileSlide } from "./DragNDrop";

function Carousel({
  slides,
  currentIndex,
}: {
  slides: IFileSlide[];
  currentIndex: number;
}) {
  return (
    <>
      <div className="w-[320px] overflow-hidden ml-8">
        <ul
          className={`relative flex justify-start transition-all delay-300`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((item) => (
            <li key={item.fileUid}>
              <Image
                src={item.convertedSTR}
                alt="upload_preview"
                width={320}
                className="max-h-[180px] object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Carousel;
