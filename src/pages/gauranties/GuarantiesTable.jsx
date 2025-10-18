import { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import AddGuaranty from './AddGuaranty';
import {  getAllGuarantiesService } from '../../services/guaranty';
import Actions from './tableAction/Actions';

const GuarantiesTable = () => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([]);
	const dataInfo = [
		{ field: 'id', title: '#' },
		{ field: 'title', title: 'عنوان' },
		{ field: 'descriptions', title: 'توضیحات' },
		{ field: 'length', title: 'مدت گارانتی' },
		{ field: 'length_unit', title: 'واحد' }
	];
	const additionField = [
  	{
			title: 'عملیات',
			elements: rowData => (
				<Actions
					rowData={rowData}
				/>
			)
		}
	];
	const searchParams = {
		title: 'جستجو',
		placeholder: 'قسمتی از عنوان را وارد کنید',
		searchField: 'title'
	};
	const handleGetAllGuaranties = async () => {		
		setLoading(true);
		const res = await getAllGuarantiesService();
		
		res && setLoading(false);
		if (res?.status === 200) {
			console.log(res.data.data);
			
			setData(res.data.data);
		}
	};

	useEffect(() => {
		handleGetAllGuaranties()
	}, [])
	
	return (
		<PaginatedTable data={data}
				dataInfo={dataInfo}
				additionField={additionField}
				numOfPage={8}
				loading={loading}
				searchParams={searchParams} 
		>
			<AddGuaranty setData={setData} />
		</PaginatedTable>
	);
};

export default GuarantiesTable;
