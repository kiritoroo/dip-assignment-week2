import { css } from "@emotion/css";
import { Category } from "@comp/Category"

interface Props {
  setQuery: any
}

export const CategoryList = (props: Props) => {
  const { setQuery } = props;

  return (
    <>
      <div className={sWrapper}>
        <Category 
          name="original"
          queryString=""
          setQuery={setQuery}
        />
        <Category 
          name="grayscale"
          queryString="grayscale"
          setQuery={setQuery}
        />
        <Category 
          name="negative"
          queryString="cvt_negative"
          setQuery={setQuery}
        />
        <Category 
          name="split rgb v1"
          queryString="split_rgb_v1"
          setQuery={setQuery}
        />
        <Category 
          name="split rgb v2"
          queryString="split_rgb_v2"
          setQuery={setQuery}
        />
        <Category 
          name="split cmy"
          queryString="split_cmy"
          setQuery={setQuery}
        />
        <Category 
          name="split cmyk"
          queryString="split_cmyk"
          setQuery={setQuery}
        />
        <Category 
          name="split hsv"
          queryString="split_hsv"
          setQuery={setQuery}
        />
        <Category 
          name="convolution"
          queryString="conv"
          setQuery={setQuery}
        />
        <Category 
          name="log"
          queryString="log_tranform"
          setQuery={setQuery}
        />
        <Category 
          name="gamma"
          queryString="gamma"
          setQuery={setQuery}
        />
      </div>
    </>
  )
}

const sWrapper = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 2em 0.5em;
  column-gap: 2em;
  row-gap: 1.5em;
  margin: 1em;
`