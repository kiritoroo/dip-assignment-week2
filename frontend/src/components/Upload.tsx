import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { css } from "@emotion/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

import { TImageData } from "@type/index";

interface Props {
  imgData: TImageData | undefined,
  setImgData: any,
  setQuery: any
}


export const Upload = (props: Props) => {
  const { setQuery, imgData, setImgData } = props;

  const onUploadImage = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (file && file['type'].split('/')[0] === 'image') {
          setImgData({ b64: reader.result })
          setQuery('/')
          toast.success("Load Image Success!", {
            autoClose: 500
          })
        } else {
          toast.error("Wrong Image Format!", {
            autoClose: 500
          })
        }
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div className={sWrapper}>
        <form className={sFormWrapper}>
          <div className={sInputWrapper}>
            <input
              id="file-input"  
              className={sInput}
              type="file" 
              accept="image/*" 
              onChange={(e) => onUploadImage(e)}
              required
            />
            <label htmlFor="file-input">
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
              {/* &nbsp; Choose Image */}
            </label>
          </div>
        </form>
      </div>
    </>
  )
}

const sWrapper = css`

`

const sFormWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1em;
`

const sInputWrapper = css`

  input[type="file"] {
    display: none;
  }

  label {
    display: block;
    position: relative;
    background-color: var(--accent1);
    color: #ffffff;
    font: 500 15px Poppins;
    text-align: center;
    width: 20em;
    padding: 1.12em 0;
    margin: auto;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-transform: lowercase;

    &::before {
      content: "";
      display: block;
      position: absolute;
      z-index: 1;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background: linear-gradient(45deg, var(--bg3), transparent);
      opacity: 0.35;
    }

    &:hover {
      scale: 1.1;
    }
  }
`

const sInput = css`
  width: 70%;
  height: 100%;
  font-size: 1em;
  padding: 0.5em;
`