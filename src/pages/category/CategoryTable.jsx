import { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import { deleteCategoryService, getCategoriesService } from '../../services/category';
import ShowInMenu from './tableAdditions/ShowInMenu';
import Actions from './tableAdditions/Actions';
import { Outlet, useParams } from 'react-router-dom';
import { convertDateToJalali } from '../../utils/convertDateToJalali';
import { Alert, Confirm } from '../../utils/alert';
import AddCategory from './AddCategory';

const CategoryTable = () => {
	const params = useParams();
	const [data, setData] = useState([]);
	const [forceRender, setForceRender] = useState(0);
	const [loading, setLoading] = useState(false);
	const handleGetCategories = async () => {
		setLoading(true);
		try {
			const res = await getCategoriesService(params?.categoryId);
			if (res.status == 200) {
				setData(res.data.data);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};
	const handleDeleteCategory = async rowData => {
		const result = await Confirm('حذف دسته بندی', `آیا از حذف ${rowData.title} اطمینان دارید؟`);
		if (result.isConfirmed) {
			try {
				const res = await deleteCategoryService(rowData.id);

				if (res.status == 200) {
					Alert('انجام شد', res.data.message, 'success');
					setData(data.filter(i => i.title != rowData.title));
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		handleGetCategories();
	}, [params, forceRender]);

	const dataInfo = [
		{ field: 'id', title: '#' },
		{ field: 'title', title: 'عنوان محصول' },
		{ field: 'parent_id', title: 'والد' }
	];

	const additionField = [
		{ title: 'تاریخ', elements: rowData => convertDateToJalali(rowData.created_at) },
		{ title: 'نمایش در منو', elements: rowData => <ShowInMenu rowData={rowData} /> },
		{
			title: 'عملیات',
			elements: rowData => <Actions rowData={rowData} handleDeleteCategory={handleDeleteCategory} />
		}
	];

	const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };
	return (
		<>
			<Outlet />
			<PaginatedTable
				data={data}
				dataInfo={dataInfo}
				additionField={additionField}
				numOfPage={7}
				loading={loading}
				searchParams={searchParams}
			>
				<AddCategory  setForceRender={setForceRender}/>
			</PaginatedTable>
		</>
	);
};

export default CategoryTable;
