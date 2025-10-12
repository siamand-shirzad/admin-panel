import { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import AddBrands from './AddBrands';
import Actions from './tableAdditional/Actions';
import { getAllBrandsService } from '../../services/brands';
import { apiPath } from '../../services/httpService';

const BrandsTable = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	const dataInfo = [
		{ field: 'id', title: '#' },
		{ field: 'original_name', title: 'عنوان لاتین' },
		{ field: 'persian_name', title: 'عنوان فارسی' },
		{ field: 'descriptions', title: 'توضیحات' }
	];
	const additionField = [
		{ title: 'لوگو', elements: (rowData) => rowData.logo ? <img src={apiPath+"/"+rowData.logo} width="40" /> : null },
		{ title: 'عملیات', elements: (rowData) => <Actions rowData={rowData} /> }
	];
	const searchParams = {
		title: 'جستجو',
		placeholder: 'قسمتی از عنوان را وارد کنید',
		searchField: 'original_name'
	};
	const handleGetAllBrands = async () => {
		setLoading(true);
		const res = await getAllBrandsService();
		res && setLoading(false)
		if (res?.status === 200) {
			setData(res.data.data);
		}

	}
	useEffect(() => {
		handleGetAllBrands()
	}, []);

	return (
		<>
			<PaginatedTable
				data={data}
				dataInfo={dataInfo}
				additionField={additionField}
				numOfPage={4}
				loading={loading}
				searchParams={searchParams}>
				<AddBrands setData={setData} />
			</PaginatedTable>
		</>
	);
};

export default BrandsTable;
