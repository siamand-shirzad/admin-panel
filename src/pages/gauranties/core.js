import { addNewGuarantyService } from '../../services/guaranty';
import { Alert } from '../../utils/alert';
import * as Yup from "yup";



export const initialValues = {
  title: '',
  descriptions: '',
  length: '',
  length_unit: ''
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required('لطفا این قسمت را پر کنید')
    .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, 'فقط از اعداد و حروف لاتین استفاده شود'),
  length: Yup.number(),
  descriptions: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, 'فقط از اعداد و حروف استفاده شود'),
  length_unit: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, 'فقط از اعداد و حروف لاتین استفاده شود')
});

export const onsubmit = async (values, actions, setData) => {
  const res = await addNewGuarantyService(values);
  console.log(res);
  
  if (res.status == 201) {
    Alert('انجام شد', res.data.message, 'success');
    setData(prev => [...prev, res.data.data]);
  }
};
