import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { css } from "@emotion/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { TImageData, TDIPResponse } from "@type/index";
import { dipPOST } from "@util/api";

import { Upload } from "@comp/Upload";
import { CategoryList } from "@comp/CategoryList";
import { Card } from "@comp/Card";
import { Config } from "@comp/Config";
import { SizeRange } from "@comp/SizeRange";

export default function IndexPage() {
  const [query, setQuery] = useState("");
  const [imgData, setImgData] = useState<TImageData>();
  const [dataRes, setDataRes] = useState<TDIPResponse>();
  const [param1, setParam1] = useState<number>(1);
  const [param2, setParam2] = useState<number>(1);

  const fetchData = async () => {
    await dipPOST(param1, param2, imgData!, query)
    .then((res) => {
      setDataRes(res.data)
    })
  }

  useEffect(() => {
    if (imgData) {
      toast.loading("Waiting response...", {
        autoClose: 100000
      })
      fetchData();
    } else {
      toast.warning("No Image Data!", {
        autoClose: 500
      })
    }
  }, [param1, param2, query, imgData])

  return (
    <>
    <div className={sGrid}>
      <div className={sFlexColumnWrapper}>
        <div className={sUploadWrapper}>
          <Upload imgData={imgData} setImgData={setImgData} setQuery={setQuery}/>
        </div>
        <div className={sCategoryWrapper}>
          <CategoryList setQuery={setQuery}/>
        </div>
      </div>

      <div className={sResultWrapper}>
        { dataRes
            ? <Card dataRes={dataRes}/>
            : null
        }
      </div>

      <div className={sConfigWrapper}>
        { dataRes
            ? <Config dataRes={dataRes}/>
            : null
        }
        { query == "log_tranform" || "conv"
            ? (
              <div className={sSizeRangeWrapper}>
                <SizeRange min={1} max={50} step={1} param={param1} setParam={setParam1}/>
                <SizeRange min={1} max={50} step={1} param={param2} setParam={setParam2}/>
              </div>
            )
            : null
        }
      </div>
    </div>
    </>
  )
}

const sSizeRangeWrapper = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30%;
  right: -1%;
  display: flex;
  flex-direction: column;
  row-gap: 15em;
`

const sGrid = css`
  display: flex;
  flex-direction: row;
  margin-top: 5em;
  column-gap: 1em;
`

const sFlexColumnWrapper = css`
  display: flex;
  flex-direction: column;
  height: 85vh;
  width: 12vw;
  row-gap: 1em;
`

const sUploadWrapper = css`
  border: 1px solid #ddd;
  overflow: hidden;
`

const sCategoryWrapper = css`
  border: 1px solid #ddd;
  height: 85vh;
`

const sResultWrapper = css`
  border: 1px solid #ddd;
  width: 70vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const sConfigWrapper = css`
  border: 1px solid #ddd;
  height: 85vh;
  width: 10vw;
`