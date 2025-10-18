import { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import AddGuaranty from './AddGuaranty';
import { deleteGuarantyService, getAllGuarantiesService } from '../../services/guaranty';
import Actions from './tableAction/Actions';
import { Alert, Confirm } from '../../utils/alert';

const GuarantiesTable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [guarantyToEdit, setGuarantyToEdit] = useState(null);
  const handleDeleteGuaranty = async guaranty => {
    const resault = await Confirm('حذف برند ', `آیا از حذف ${guaranty.title}مطعن هستید؟`);
    if (!resault.isConfirmed) return;
    const res = await deleteGuarantyService(guaranty.id);
    if (res.status == 200) {
      Alert('انجام شد', res.data?.message || 'با موفقیت حذف شد', 'success');
      setData(prev => prev.filter(i => i.id !== guaranty.id));
    }
  };

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
        <Actions rowData={rowData} setGuarantyToEdit={setGuarantyToEdit} handleDeleteGuaranty={handleDeleteGuaranty} />
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
      setData(res.data.data);
    }
  };

  useEffect(() => {
    handleGetAllGuaranties();
  }, []);

  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      additionField={additionField}
      numOfPage={8}
      loading={loading}
      searchParams={searchParams}>
      <AddGuaranty setData={setData} setGuarantyToEdit={setGuarantyToEdit} guarantyToEdit={guarantyToEdit} />
    </PaginatedTable>
  );
};

export default GuarantiesTable;
