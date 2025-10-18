import httpService from "./httpService"


export const getAllGuarantiesService =()=>{
  return httpService(`/admin/guarantees`,"get")
}
export const addNewGuarantyService =(data)=>{
  return httpService(`/admin/guarantees`,"post",data)
}
export const editGuarantyService =(guarantyId,data)=>{
  return httpService(`/admin/guarantees/${guarantyId}`,"put",data)
}
export const deleteGuarantyService =(guarantyId)=>{
  return httpService(`/admin/guarantees/${guarantyId}`,"delete")
}