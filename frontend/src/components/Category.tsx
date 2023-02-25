import { css } from "@emotion/css";

interface Props {
  name: string,
  queryString: string,
  setQuery: any
}

export const Category = (props: Props) => {
  const { name, queryString, setQuery } = props;

  const onClickHandle = () => {
    setQuery(queryString)
  }

  return (
    <>
      <div className={sWrapper} >
        <div className={sCategory} onClick={onClickHandle}>{name}</div>
      </div>
    </>
  )
}

const sWrapper = css`
  
`

const sCategory = css`
  width: 150px;
  padding: 1em;
  background: linear-gradient(to left, white 50%, var(--c-green-200) 50%) right;
  background-size: 200%;
  transition: 0.2s ease-out;
  border: solid 1px #dddddd;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  color: var(--accent1);
  &:hover {
    background-position: left;
    cursor: pointer;    
  }
`