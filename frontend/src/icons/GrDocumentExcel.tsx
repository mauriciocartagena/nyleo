import * as React from "react";

function GrDocumentExcel(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      {...props}
    >
      <path
        fill="none"
        stroke={props.color ? props.color : "#000"}
        strokeWidth="2"
        d="M4.998 9V1H19.5L23 4.5V23H4M18 1v5h5M9.25 12l-2 3.25-2-3.25H5l2.25 3.5-2.5 3.5H5l2.25-3.25L9.5 19h.25l-2.5-3.5L9.5 12h-.25z"
      />
    </svg>
  );
}

export default GrDocumentExcel;
