import { MouseEvent, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import SVGComponent from "./SVGComponent";

export default function PdfContainer({
  fileUrl,
  contained,
}: {
  fileUrl: string | Blob;
  contained?: boolean | undefined;
}) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [showPagination, setShowPagination] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  function paginator(e: MouseEvent, direction: string) {
    e.stopPropagation();
    if (direction === "next") {
      setPageNumber((prev) => prev + 1);
    } else {
      setPageNumber((prev) => prev - 1);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center max-h-[850px] relative" onMouseEnter={() => setShowPagination(true)} onMouseLeave={() => setShowPagination(false)}>
      <div
        className={`${
          contained ? "max-h-[220px]" : "max-h-[820px]"
        } overflow-hidden`}
      >
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={pageNumber}
              width={contained ? 170 : undefined}
            />
          ))}
        </Document>
      </div>
      {!!numPages && numPages > 1 && showPagination && <div className="flex absolute z-30 bottom-0 items-center">        
        <button
          onClick={(e) => paginator(e, "prev")}
          type="button"
          disabled={pageNumber === 1}
        >
          <i>
            <SVGComponent title="arrowLeft" />
          </i>
        </button>        
        <p className="px-2 m-0 text-xs bg-lombard-bg-inactive-grey rounded-md">
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={(e) => paginator(e, "next")}
          type="button"
          disabled={pageNumber === numPages}
        >
          <i>
            <SVGComponent title="arrowRight" />
          </i>
        </button>
      </div>}
    </div>
  );
}
