import { Route } from '@solidjs/router';
import { useContext, Show } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import { AuthContext } from './AuthProvider';

const PrivateRoute = (props) => {
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!session) {
    navigate('/login');
    return null; // Return null to avoid rendering the component if the user is not authenticated
  }

  return <Route {...props} />;
};

export default PrivateRoute;
