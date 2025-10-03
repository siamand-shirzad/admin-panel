import { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import { getCategoriesService } from '../../services/category';
import { Alert } from '../../utils/alert';
import ShowInMenu from './tableAdditions/ShowInMenu';
import Actions from './tableAdditions/Actions';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { convertDateToJalali } from '../../utils/convertDateToJalali';

const CategoryTable = () => {
	const params = useParams();
	const location = useLocation();
	const [data, setData] = useState([]);
	const handleGetCategories = async () => {
		try {
			const res = await getCategoriesService(params?.categoryId);
			if (res.status == 200) {
				setData(res.data.data);
			} else {
				Alert('خطا  !', res.data.message, 'error');
			}
		} catch (error) {
			Alert('خطا  !', error.message, 'error');
		}
	};
	useEffect(() => {
		console.log(location);

		handleGetCategories();
	}, [params]);

	const dataInfo = [
		{ field: 'id', title: '#' },
		{ field: 'title', title: 'عنوان محصول' },
		{ field: 'parent_id', title: 'والد' },
	];

	const additionField = [
		{title:"تاریخ", elements: (rowData)=>convertDateToJalali(rowData.created_at) },
		{ title: 'نمایش در منو', elements: rowData => <ShowInMenu rowData={rowData} /> },
		{
			title: 'عملیات',
			elements: rowData => <Actions rowData={rowData} />
		}
	];
	return (
		<>
			<Outlet/>
			<PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField} numOfPage={2} />
		</>
	);
};

export default CategoryTable;
