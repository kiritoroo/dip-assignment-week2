import axios from '@util/axiosUtil'
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { TImageData } from '@type/index';

export const dipPOST = (param1: number, param2: number, data: TImageData, query: string) => {
  const formData = new FormData()
  formData.append("param1", param1.toString())
  formData.append("param2", param2.toString())
  formData.append("b64", data.b64?.toString()!)

    return axios.post(`dip/${query}`, formData)
    .then((res: any) => {
      toast.dismiss()
      toast.success("Success!", {
        autoClose: 1000
      })

      return Promise.resolve(res);
    })
    .catch((err: any) => {
      return Promise.reject(err);
    })
}