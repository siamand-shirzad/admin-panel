import httpService from "./httpService"


export const getAllGuarantiesService =()=>{
  return httpService(`/admin/guarantees`,"get")
}