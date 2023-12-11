"use client";
import React, { useEffect } from "react";

type Props = { pdfUrl: string };

const PdfViewer = ({ pdfUrl }: Props) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     const pdfContainer = document.querySelector(
  //       ".ndfHFb-c4YZDc-s2gQvd-sn54Q"
  //     );
  //     pdfContainer?.setAttribute("style", "margin-left: 1px");
  //   }, 3000);
  // }, []);

  return (
    <div>
      <iframe
        className="w-full h-[100vh]"
        src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
      ></iframe>
    </div>
  );
};

export default PdfViewer;
