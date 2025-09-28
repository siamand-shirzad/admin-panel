import Swal from 'sweetalert2';

export const Alert = (title, text, icon) => {
	Swal.fire({
		title,
		text,
		icon,
		confirmButtonText: 'متوجه شدم'
	});
};

