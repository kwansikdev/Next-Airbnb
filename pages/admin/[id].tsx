import { NextPage } from 'next';
import AdminManagement from '../../components/admin/AdminManagement';

const adminManagement: NextPage = () => {
  return <AdminManagement />;
};

adminManagement.getInitialProps = async (coords) => {
  return {};
};

export default adminManagement;
