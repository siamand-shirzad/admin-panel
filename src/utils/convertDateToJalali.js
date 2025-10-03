
export const convertDateToJalali = isoDate => {
	return new Date(isoDate).toLocaleDateString('fa-IR');
};
