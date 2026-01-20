import { useLocation } from 'react-router-dom';
import { getCategoryAttrsService } from '../../../services/categoryAttr';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import PrevPageButton from '../../../components/PrevPageButton';
import SpinnerLoad from '../../../components/SpinnerLoad';
import SubmitButton from '../../../components/form/SubmitButton';

const SetAttribute = () => {
	const location = useLocation();
	const { selectedProduct } = location.state;

	const [attrs, setAttrs] = useState();
	const handleGetAttributes = async () => {
		console.log(selectedProduct);
		Promise.all(
			selectedProduct.categories.map(async cat => {
				const res = await getCategoryAttrsService(cat.id);
				if (res.status === 200) {
					setAttrs(oldAttrs => {
						return oldAttrs
							? [...oldAttrs, { groupTitle: cat.title, data: res.data.data }]
							: [{ groupTitle: cat.title, data: res.data.data }];
					});
				}
			})
		);
	};
	useEffect(() => {
		handleGetAttributes();
	}, []);

	return (
		<Formik>
			<Form>

				<div className='container'>
					<h4 className='text-center my-3'>افزودن ویژگی محصول: <span className='text-primary'>{selectedProduct.title}</span></h4>
					<div className="m-auto text-left col-md-6 col-lg-8">
						<PrevPageButton />
					</div>
					<div className='row justify-content-center my-2'>
						{
							attrs ? (

								attrs.map((attr, index) => (
									<div key={'group' + index} className='row justify-content-center '>
										<h6 className="text-center">گروه : {attr.groupTitle}</h6>
										{
											attr.data.length > 0 ? (
												attr.data.map(attrData => (
													<div className="col-12 col-md-6 col-lg-8" key={attrData.id}>
														<div className="input-group my-2 dir_ltr">
															<span className='input-group-text flex justify-content-center w_6rem'>{attrData.unit}</span>
															<input type="text" className='form-control' />
															<span className='input-group-text w_8rem'>{attrData.title}</span>
														</div>
													</div>
												))
											) : (
												<div className='text-danger text-center'>هیچ ویژگی تعریف نشده </div>
											)
										}
									</div>
								))

							) : (
								<SpinnerLoad />
							)

						}
					</div>
					<div className="btn_box text-center  mt-4">
						<SubmitButton />
						<PrevPageButton className="me-2" />{' '}
					</div>
				</div>
			</Form>
		</Formik>
	)
};

export default SetAttribute;
