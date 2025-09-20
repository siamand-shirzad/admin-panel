import React from 'react';
import ModalsContainer from '../../components/ModalsContainer';

const AddColors = () => {
	return (
		<>
			<button
				className="btn btn-success d-flex justify-content-center align-items-center"
				data-bs-toggle="modal"
				data-bs-target="#add_color_modal">
				<i className="fas fa-plus text-light"></i>
			</button>

			<ModalsContainer
      fullscreen={false}
      id={"add_color_modal"}
      title={"افزودن رنگ جدید"}
      >
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-12">
							<div class="input-group my-3 dir_ltr">
								<input type="text" class="form-control" placeholder="" />
								<span class="input-group-text w_8rem justify-content-center">نام رنگ</span>
							</div>
						</div>
						<div class="col-12">
							<label for="exampleColorInput" class="form-label">
								انتخاب رنگ
							</label>
							<input
								type="color"
								class="form-control form-control-color"
								id="exampleColorInput"
								value="#563d7c"
								title="Choose your color"
							/>
						</div>
						<div class="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
							<button class="btn btn-primary">ذخیره</button>
						</div>
					</div>
				</div>
			</ModalsContainer>
		</>
	);
};

export default AddColors;
