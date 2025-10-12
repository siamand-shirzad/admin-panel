import * as Yup from 'yup';
import { addNewBrandService, editBrandService } from '../../services/brands';
import { Alert } from '../../utils/alert';

export const initialValues = {
	original_name: '',
	persian_name: '',
	descriptions: '',
	logo: null
};

export const onSubmit = async (values, actions, setData, brandToEdit) => {
	if (brandToEdit) {
		const res = await editBrandService(brandToEdit.id, values);
		console.log(res);
		if (res.status == 200) {
			Alert('انجام شد', res.data.message, 'success');
			// 👇 بستن مودال بعد از موفقیت
			const modalEl = document.getElementById('add_brand_modal'); // id مودال
			const modalInstance = bootstrap.Modal.getInstance(modalEl); // گرفتن instance مودال باز شده
			modalInstance.hide(); // بستن مودال

			setData(prev => {
				let newData = [...prev];
				let index = newData.findIndex(d => d.id == brandToEdit.id);
				newData[index] = res.data.data;
				return newData;
			});
		}
	} else {
		const res = await addNewBrandService(values);
		console.log(res);
		if (res.status === 201) {
			Alert('انجام شد', res.data.message, 'success');
			actions.resetForm();
			setData(lastData => [...lastData, res.data.data]);

			// 👇 بستن مودال بعد از موفقیت
			const modalEl = document.getElementById('add_brand_modal'); // id مودال
			const modalInstance = bootstrap.Modal.getInstance(modalEl); // گرفتن instance مودال باز شده
			modalInstance.hide(); // بستن مودال
		}
	}
};

export const validationSchema = Yup.object({
	original_name: Yup.string()
		.required('لطفا این قسمت را پر کنید')
		.matches(/^[a-zA-Z0-9\s@!%$?&]+$/, 'فقط از اعداد و حروف لاتین استفاده شود'),
	persian_name: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, 'فقط از اعداد و حروف استفاده شود'),
	descriptions: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, 'فقط از اعداد و حروف استفاده شود'),
	logo: Yup.mixed()
		.nullable()
		.test('filesize', 'حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد', value => (!value ? true : value.size <= 500 * 1024))
		.test('format', 'فرمت فایل باید jpg باشد', value =>
			!value ? true : value.type === 'image/jpeg' || value.type === 'image/png'
		)
});
