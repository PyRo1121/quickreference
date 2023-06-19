import { Router } from '@solidjs/router';
import HomePage from './Pages/HomePage';
import ResultsPage from './Pages/ResultsPage';
import { LoginPage } from './Pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthProvider';
import Time from './components/activeTime';
import DropdownMenu from './components/dropDownMenu';

const App = () => {
  return (
    <AuthProvider>
      <div class='w-95 m-2 flex flex-col'>
        {/* Header */}
        <div class='flex justify-between items-center' role='banner'>
          <div class='flex items-center'>
            {/* Dropdown Menu */}
            <DropdownMenu />
          </div>
          <div class='flex flex-grow justify-center'>
            {/* Active Time */}
            <Time />
          </div>
        </div>

        {/* Divider */}
        <div class='divider' role='separator' />

        {/* Routes */}
        <Router>
          <PrivateRoute path='/' component={HomePage} />
          <PrivateRoute path='/results' component={ResultsPage} />
          <Router outlet={<LoginPage />} />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
