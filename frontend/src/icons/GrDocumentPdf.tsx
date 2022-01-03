import * as React from "react";

function GrDocumentPdf(props: React.SVGProps<SVGSVGElement>) {
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
        d="M4.998 9V1H19.5L23 4.5V23H4M18 1v5h5M3 12h1.5c2 0 2.25 1.25 2.25 2s-.25 2-2.25 2H3.25v2H3v-6zm6.5 6v-6h1.705c1.137 0 2.295.5 2.295 3s-1.158 3-2.295 3H9.5zm7 1v-7h4m-4 3.5h3"
      />
    </svg>
  );
}

export default GrDocumentPdf;
