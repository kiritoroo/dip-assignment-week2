import React, { ChangeEvent } from "react";
import { css } from "@emotion/css";

interface Props {
  min: number,
  max: number,
  step: number,
  param: number
  setParam: any
}

export const SizeRange = (props: Props) => {
  const { min, max, step, param, setParam } = props

  const onChangeHandle = (e: any) => {
    setParam(e.target.value)
  }

  return (
    <div className={sWrapper}>
      <div className={sSlideContainer}>
        <input 
          className={sSlide}
          type={"range"}
          value={param}
          min={min} max={max} 
          step={step}
          onChange={onChangeHandle}
        />
      <div>
        {param}
      </div>
      </div>
    </div>
  )
}

const height = "50px";
const trackHeight = "10px";
const thumbHeight = 30;

const upperColor = "#dfdfdf";
const lowerColor = "#b09eb0";
const thumbColor = "#ffffff";
const thumbHoverColor = "#ffffff";
const upperBackground = `linear-gradient(to bottom, ${upperColor}, ${upperColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;
const lowerBackground = `linear-gradient(to bottom, ${lowerColor}, ${lowerColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;

// Webkit cannot style progress so we fake it with a long shadow on the thumb element
const makeLongShadow = (color: string, size: string) => {
  let i = 18;
  let shadow = `${i}px 0 0 ${size} ${color}`;
  for (; i < 706; i++) {
    shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`;
  }
  return shadow;
};

const sWrapper = css`

`;

const sSlideContainer = css`
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
  width: 300px;
  padding: 5px 15px;
  border: 1px solid #ddd;
  background: white;
`;

const sSlide = css`
  overflow: hidden;
  display: block;
  appearance: none;
  max-width: 700px;
  width: 100%;
  margin: 0;
  height: ${height};
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${height};
    background: ${lowerBackground};
  }

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: ${thumbHeight}px;
    width: ${thumbHeight}px;
    background: ${thumbColor};
    border-radius: 100%;
    border: 1px solid #ddd;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: ${makeLongShadow(upperColor, "-10px")};
    transition: background-color 150ms;
  }

  &::-moz-range-track,
  &::-moz-range-progress {
    width: 100%;
    height: ${height};
    background: ${upperBackground};
  }

  &::-moz-range-progress {
    background: ${lowerBackground};
  }

  &::-moz-range-thumb {
    appearance: none;
    margin: 0;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${thumbColor};
    border-radius: 100%;
    border: 2px solid black;
    transition: background-color 150ms;
  }

  &::-ms-track {
    width: 100%;
    height: ${height};
    border: 0;
    color: transparent;
    background: transparent;
  }

  &::-ms-fill-lower {
    background: ${lowerBackground};
  }

  &::-ms-fill-upper {
    background: ${upperBackground};
  }

  &::-ms-thumb {
    appearance: none;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${thumbColor};
    border: 2px solid black;
    border-radius: 100%;
    transition: background-color 150ms;
    top: 0;
    margin: 0;
    box-shadow: none;
  }

  &:hover {
    &::-webkit-slider-thumb {
      background-color: ${thumbHoverColor};
    }
    &::-moz-range-thumb {
      background-color: ${thumbHoverColor};
    }
    &::-ms-thumb {
      background-color: ${thumbHoverColor};
    }
  }
`;
