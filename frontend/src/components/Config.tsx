import { css } from "@emotion/css";
import { TDIPResponse } from "@type/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";


interface Props {
  dataRes: TDIPResponse
}

export const Config = (props: Props) => {
  const{ dataRes } = props

  const onSaveHandle = () => {
    Object.entries(dataRes.data).forEach(([key, value]) => {
      var base64Image = "data:image/png;base64," + value;
      var link = document.createElement("a");
      link.href = base64Image;
      link.download = `${key}.png`
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }

  return (
    <>
     <div className={sWrapper} onClick={onSaveHandle}>
      <FontAwesomeIcon icon={faDownload} />
     </div>
    </>
  )
}

const sWrapper = css`
  display: block;
  position: relative;
  background-color: var(--accent1);
  color: #ffffff;
  font: 500 15px Poppins;
  text-align: center;
  padding: 1.12em 0;
  margin: auto;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: lowercase;

  &:hover {
    scale: 1.1;
  }
`