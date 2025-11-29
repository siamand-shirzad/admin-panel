import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ErrorMessage, Field } from 'formik';
import FormikError from './FormikError';
const CkEditor = ({ name, label, className, placeholder }) => {
  return (
    <Field>
      {/* //? farakhanie form az field ba formik az khode formik farghesh ??? */}
      {({ form }) => {
        console.log(form);
        
        return (
          <div className={`col-12 ${className} mb-2`}>
            <CKEditor
              editor={ClassicEditor}
              // config={{
              //   licenseKey:'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3OTU5OTY3OTksImp0aSI6IjJlMGU4ZDE5LWZhYWItNDJiYy05ZWFkLWUwMzcwMzZhMjkzNCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCIsIkUyUCIsIkUyVyJdLCJyZW1vdmVGZWF0dXJlcyI6WyJQQiIsIlJGIiwiU0NIIiwiVENQIiwiVEwiLCJUQ1IiLCJJUiIsIlNVQSIsIkI2NEEiLCJMUCIsIkhFIiwiUkVEIiwiUEZPIiwiV0MiLCJGQVIiLCJCS00iLCJGUEgiLCJNUkUiXSwidmMiOiJkOGQ4N2MzMiJ9.yC1mtzBtHZJlrJBIjmDBzOOEYsleQb7GyJnhdPmo6jc9XYzYay8pLGEPOc68wwvoTfG_MMcGzhwzxnfm4Yu0yg'
              //   // toolbar: ['undo', 'redo', '|', 'bold', 'italic']
              // }}
              data={form.values[name]||`<p>${label} : ${placeholder}</p>`}
              onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor 1 is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                form.setFieldValue(name, data)
              }}
              onBlur={(event, editor) => {
                form.setFieldTouched(name)
                // editor.setData(`<p>${label} : ${placeholder}</p>`)
              }}
              onFocus={(event, editor) => {
                editor.getData() == `<p>${label} : ${placeholder}</p>` ? editor.setData(''): null;

              }}
            />

            <ErrorMessage name={name} component={FormikError} />
          </div>
        );
      }}
    </Field>
  );
};

export default CkEditor;
