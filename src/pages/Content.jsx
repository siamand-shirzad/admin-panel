import Dashbord from './dashbord/Dashbord';
import Category from './category/Category';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminLayoutContext';
import Product from './product/Product';
import { Route, Routes } from 'react-router-dom';
import Colors from './colors/colors';
import Gauranties from './gauranties/Gauranties';
import Brands from './brands/Brands';
import Discounts from './discounts/Discounts';
import ManageCarts from './manageCarts/ManageCarts';
import Orders from './orders/Orders';

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
					<Route path='/colors' element={<Colors/>} />
					<Route path='/gauranties' element={<Gauranties/>} />
					<Route path='/brands' element={<Brands/>} />
					<Route path='/discounts' element={<Discounts/>} />
					<Route path='/manage-carts' element={<ManageCarts/>} />
					<Route path='/orders' element={<Orders/>} />
				</Routes>
			
		</section>
	);
};

export default Content;
