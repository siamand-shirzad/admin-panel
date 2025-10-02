import { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import { getCategoriesService } from '../../services/category';
import { Alert } from '../../utils/alert';

const CategoryTable = () => {
	const [data, setData] = useState([]);
	const handleGetCategories = async () => {
		try {
			const res = await getCategoriesService();
			if (res.status == 200) {
				console.log(res.data.data);
				setData(res.data.data)
			} else {
				Alert('خطا  !', res.data.message, 'error');
			}
		} catch (error) {
			Alert('خطا  !', error.message, 'error');
		}
	};
	useEffect(() => {
		handleGetCategories();
	}, []);

	const dataInfo = [
		{ field: 'id', title: '#' },
		{ field: 'title', title: 'عنوان محصول' },
		{ field: 'price', title: 'قیمت محصول' }
	];
	const additionField = {
		title: 'عملیات',
		elements: itemId => additionalElements(itemId)
	};
	const additionalElements = itemId => {
		return (
			<>
				<i
					className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
					title="زیرمجموعه"
					data-bs-toggle="tooltip"
					data-bs-placement="top"></i>
				<i
					className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
					title="ویرایش دسته"
					data-bs-toggle="modal"
					data-bs-placement="top"
					data-bs-target="#add_product_category_modal"></i>
				<i
					className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
					title="افزودن ویژگی"
					data-bs-toggle="modal"
					data-bs-target="#add_product_category_attr_modal"></i>
				<i
					className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
					title="حذف دسته"
					data-bs-toggle="tooltip"
					data-bs-placement="top"></i>
			</>
		);
	};
	return (
		<>
			<PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField} numOfPage={2} />
		</>
	);
};

export default CategoryTable;
