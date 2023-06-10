import Image from "next/image";
import React, { useState } from "react";

const LightBox = ({ children, src, alt, zIndex = 100 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div onClick={toggleIsOpen} style={{ height: "100%" }}>
      {children}
      {isOpen ? (
        <div
          onClick={toggleIsOpen}
          onMouseDown={stopPropagation} // Stop click event propagation on the inner div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.7)",
            cursor: "pointer",
            zIndex,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={1080}
            height={800}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "none",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LightBox;
