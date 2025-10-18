import { Form, Formik } from 'formik';
import ModalsContainer from '../../components/ModalsContainer';
import { initialValues, onsubmit, validationSchema } from './core';
import FormikControl from '../../components/form/FormikControl';
import SubmitButton from '../../components/form/SubmitButton';
import { useEffect, useState } from 'react';

const AddGuaranty = ({setData,setGuarantyToEdit,guarantyToEdit}) => {
  const [reInitValues, setReInitValues] = useState(null)
  useEffect(() => {
    if (guarantyToEdit)
      setReInitValues({
        title: guarantyToEdit.title,
        descriptions: guarantyToEdit.descriptions || "",
        length: guarantyToEdit.length || "",
        length_unit: guarantyToEdit.length_unit || "",
      });
    else setReInitValues(null);
  }, [guarantyToEdit]);
  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_guarantee_modal"
        onClick={()=>setGuarantyToEdit(null)}>
        <i className="fas fa-plus text-light"></i>
      </button>

      <ModalsContainer id={'add_guarantee_modal'} fullscreen={false} title={guarantyToEdit ? "ویرایش گارانتی" : "افزودن گارانتی"}>
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={ reInitValues || initialValues}
              onSubmit={(values, actions) => onsubmit(values, actions, setData, guarantyToEdit)}
              validationSchema={validationSchema}
              enableReinitialize>
              <Form>
                <FormikControl
								 control="input" type="text" name="title" label="عنوان" placeholder="فقط حروف و اعداد" />
                <FormikControl
                  control="textarea"
                  type="text"
                  name="descriptions"
                  label="توضیحات"
                  placeholder="فقط حروف و اعداد"
                />
                <FormikControl
                  control="input"
                  type="number"
                  name="length"
                  label="مدت گارانتی"
                  placeholder="فقط اعداد"
                />
                <FormikControl control="input" type="text" name="length_unit" label="واحد" placeholder="فقط حروف " />
                <div className="btn_box text-center col-12">
                  <SubmitButton />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </ModalsContainer>
    </>
  );
};

export default AddGuaranty;
