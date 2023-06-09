import React, { useEffect, useRef } from "react";

import { morphAnimation } from "../../utils/animation";

import "./text-morph.css";

const TextMorph = ({ transform }) => {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    morphAnimation(text1Ref.current, text2Ref.current);
  }, []);

  return (
    <div
      style={{
        transform: transform,
        transition: ".3s all ease-out",
      }}
    >
      <div id="morph-container">
        <span id="text1" ref={text1Ref}></span>
        <span id="text2" ref={text2Ref}></span>
      </div>

      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default TextMorph;
