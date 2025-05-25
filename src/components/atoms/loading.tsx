import Image from "next/image";
import React from "react";

const Loading = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <div className="w-full h-full flex-center">
      <Image
        src="/assets/images/m-logo.svg"
        alt="loading..."
        width={width ? width : 100}
        height={height ? height : 100}
        className="animate-pulse"
      />
    </div>
  );
};

export default Loading;
