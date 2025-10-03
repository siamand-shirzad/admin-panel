import { useLocation } from "react-router-dom";

const CategoryChildren = () => {
  const location = useLocation()
	return (
		<>
			<h5 className="text-center">
				<span>زیرگروه: </span>
				<span className="text-info">{location.state.parentData.title}</span>
			</h5>
		</>
	);
};

export default CategoryChildren;
