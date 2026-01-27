import { useLocation } from 'react-router-dom';
import { getCategoryAttrsService } from '../../../services/categoryAttr';
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import PrevPageButton from '../../../components/PrevPageButton';
import SpinnerLoad from '../../../components/SpinnerLoad';
import SubmitButton from '../../../components/form/SubmitButton';
import { onSubmit } from './core';

const SetAttribute = () => {
	const location = useLocation();
	const { selectedProduct } = location.state;

	const [attrs, setAttrs] = useState();
	const [initialValues, setInitialValues] = useState(null);

	const handleGetAttributes = async () => {
		let attrsVar = [];
		let initials = {};
		// console.log(selectedProduct);
		Promise.all(
			selectedProduct.categories.map(async cat => {
				const res = await getCategoryAttrsService(cat.id);
				if (res.status === 200) {
					attrsVar = [...attrsVar, { groupTitle: cat.title, data: res.data.data }];
					if (res.data.data.length > 0) {
						for (const d of res.data.data) {
							initials = { ...initials, [d.id]: '' };
						}
					}
				}
			}),
		).then(() => {
			setAttrs(attrsVar);
			setInitialValues(initials);
		});
	};
	useEffect(() => {
		handleGetAttributes();
	}, []);

	return (
		<div className="container">
			<h4 className="text-center my-3">
				افزودن ویژگی محصول: <span className="text-primary">{selectedProduct.title}</span>
			</h4>
			<div className="m-auto text-left col-md-6 col-lg-8">
				<PrevPageButton />
			</div>
			{initialValues ? (
				<Formik
                initialValues={initialValues}
                onSubmit={(values,actions) => onSubmit(values,actions,selectedProduct.id)}
                >
					<Form>
						<div className="row justify-content-center my-2">
							{attrs.map((attr, index) => (
								<div key={'group' + index} className="row justify-content-center ">
									<h6 className="text-center">گروه : {attr.groupTitle}</h6>
									{attr.data.length > 0 ? (
										attr.data.map(attrData => (
											<div className="col-12 col-md-6 col-lg-8" key={attrData.id}>
												<div className="input-group my-2 dir_ltr">
													<span className="input-group-text flex justify-content-center w_6rem">
														{attrData.unit}
													</span>
													<Field name={attrData.id} type="text" className="form-control" />
													<span className="input-group-text w_8rem">{attrData.title}</span>
												</div>
											</div>
										))
									) : (
										<div className="text-danger text-center">هیچ ویژگی تعریف نشده </div>
									)}
								</div>
							))}
						</div>
						<div className="btn_box text-center  mt-4">
							<SubmitButton />
							<PrevPageButton className="me-2" />{' '}
						</div>
					</Form>
				</Formik>
			) : (
				<SpinnerLoad />
			)}
		</div>
	);
};

export default SetAttribute;
