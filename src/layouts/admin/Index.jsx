import { useContext } from 'react';
import AdminContextProvider, { AdminContext } from '../../context/AdminLayoutContext';
import Navbar from './navbar/Index';
import Sidebar from './sidebar/Index';

const Index = () => {
	const { showSidebar } = useContext(AdminContext);

	return (
		<AdminContextProvider>
			<div>
				<Navbar />
				<Sidebar />
				<section id="content_section" className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}></section>
			</div>
		</AdminContextProvider>
	);
};

export default Index;
