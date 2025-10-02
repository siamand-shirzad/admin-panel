import { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import { getCategoriesService } from '../../services/category';
import { Alert } from '../../utils/alert';
import ShowInMenu from './tableAdditions/ShowInMenu';
import Actions from './tableAdditions/Actions';

const CategoryTable = () => {
	const [data, setData] = useState([]);
	const handleGetCategories = async () => {
		try {
			const res = await getCategoriesService();
			if (res.status == 200) {
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
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "parent_id", title: "والد" },
    { field: "created_at", title: "تاریخ" },
  ];


	const additionField =[
		{title: "نمایش در منو",
			elements: (rowData)=> <ShowInMenu rowData={rowData}/>
		}
		, {
		title: 'عملیات',
		elements: rowData => <Actions rowData={rowData}/>
	}
];
	return (
		<>
			<PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField} numOfPage={2} />
		</>
	);
};

export default CategoryTable;
