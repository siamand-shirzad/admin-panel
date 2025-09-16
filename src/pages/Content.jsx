import Dashbord from './dashbord/Dashbord';
import Category from './category/Category';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminLayoutContext';
import Product from './product/Product';

const Content = () => {
  	const { showSidebar } = useContext(AdminContext);

	return (
		<section
			id="content_section"
			className={`bg-light py-2 px-3 ${showSidebar ? 'with_sidebar' : null}`}>
			{/* <Dashbord/> */}
			{/* <Category /> */}
			<Product/>
		</section>
	);
};

export default Content;
