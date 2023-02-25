export type TImageData = {
  b64: string | ArrayBuffer | null
}

export type TDIPResponse = {
  title: string;
  dim: {
    w: string;
    h: string;
  }
  data: any
}