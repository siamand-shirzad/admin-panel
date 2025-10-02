import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// نمایش لودینگ
export const showLoadingAlert = (title = 'لطفاً صبر کنید...') => {
  Swal.fire({
    title,
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

// بستن لودینگ
export const closeLoadingAlert = () => {
  Swal.close();
};

// alert error or success
export const Alert = (title, text, icon) => {
	Swal.fire({
		title,
		text,
		icon,
		confirmButtonText: 'متوجه شدم'
	});
};

