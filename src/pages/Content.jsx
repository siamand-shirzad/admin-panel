import Dashbord from './dashbord/Dashbord';
import Category from './category/Category';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminLayoutContext';
import Product from './product/Product';
import { Route, Routes } from 'react-router-dom';

const Content = () => {
  	const { showSidebar } = useContext(AdminContext);

	return (
		<section
			id="content_section"
			className={`bg-light py-2 px-3 ${showSidebar ? 'with_sidebar' : null}`}>
				<Routes>
					<Route path='/' element={<Dashbord/>} />
					<Route path='/categories' element={<Category />} />
					<Route path='/products' element={<Product/>} />
					<Route path='*' element={<Dashbord/>} />
				</Routes>
			
		</section>
	);
};

export default Content;
