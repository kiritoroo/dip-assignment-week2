import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { css } from "@emotion/css"
import { dipPOST } from '@util/api'
import { TDIPResponse } from '@type/index'

interface Props {
  dataRes: TDIPResponse,
}

export const Card = (props: Props) => {
  const { dataRes } = props;

  return (
    <>     
    { dataRes ? (
      <div className={sWrapper}>
        <div className={sTop}>
        <h1>Digital Image Processing</h1>
        { dataRes.title }
        </div>

        <div className={sImages}>
          { Object.entries(dataRes.data).map(([key, value]) => {
            return (
              <img key={key} src={"data:image/jpg;base64," + value} />
            )
          }
          )}
        </div>

        <div className={sBottom}>
          <div>{dataRes.dim.w} x {dataRes.dim.h}</div>
        </div>
      </div>    
      ) : (null)
    }
    </>
  )
}

const sWrapper = css`
  width: 70%;
  max-width: 70%;
  margin: 35px auto;
  background-color: #444;
  color: var(--txt1);
  font: 12.5px Inter, sans-serif;
  letter-spacing: 0.25px;
  position: relative;
`

const sTop = css`
  border: solid 1px var(--border);
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font: 800 36px Poppins;
  color: var(--accent1);
  line-height: 30px;
  letter-spacing: 0px;
  background-color: var(--bg2);
  text-transform: lowercase;
  border-bottom: 0px;
  position: relative;
  overflow: hidden;

  h1 {
    margin: 0px 0px 20px 0px;
    font: 10px var(--font1);
    line-height: 10px;
    letter-spacing: 1.5px;
    padding: 9px;
    border: solid 1px var(--border);
    background-color: var(--bg3);
    color: var(--txt1);
    text-transform: uppercase;
  }
`

const sBottom = css`
  border: solid 1px var(--border);
  border-top: none;
  background-color: var(--bg2);
  margin-top: -3px;
  position: relative;
  z-index: 1;
  padding: 25px;
  display: flex;
  justify-content: flex-end;

  div {
    font: 600 10px var(--font1);
    line-height: 10px;
    letter-spacing: 1.5px;
    padding: 17px;
    border: solid 3px var(--bg2);
    background-color: var(--accent1);
    color: var(--txt1);
    text-transform: uppercase;
    margin-top: -50px;
    color: var(--bg2);
    position: relative;

    &::before {
      content: "";
      display: block;
      position: absolute;
      z-index: 1;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background: linear-gradient(35deg, var(--bg3), transparent);
      opacity: 0.35;
    }
  }
`

const sImages = css`
  mix-blend-mode: lighten;
  background-color: var(--bg2);
  display: grid;
  grid-template-columns: auto auto;
  gap: 3px;
  column-gap: 5px;
  border-left: solid 1px var(--border);
  border-right: solid 1px var(--border);

  img {
    width: calc(100% + 2px);
    margin: 0px -1px;
  }
`