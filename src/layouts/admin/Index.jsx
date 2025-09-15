import AdminContextProvider, { AdminContext } from '../../context/AdminLayoutContext';
import Content from '../../pages/Content';
import Navbar from './navbar/Index';
import Sidebar from './sidebar/Index';

const Index = () => {
	return (
		<AdminContextProvider>
			<>
				<Content />
				<Navbar />
				<Sidebar />
			</>
		</AdminContextProvider>
	);
};

export default Index;
