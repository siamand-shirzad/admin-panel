import { convertToFormData } from "../utils/converToFormData";
import httpService from "./httpService";

export const getProductsService = (page, countOnPage, searchChar) => {
  return httpService(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`, "get");
};
export const deleteProductsService = (productId) => { 
  return httpService(`/admin/products/${productId}`,'delete')
 }

export const createNewProductService = (data) => {
  return httpService("/admin/products", "post",data.image ? convertToFormData(data) : data);
};