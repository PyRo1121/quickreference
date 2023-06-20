import { Routes, Route } from '@solidjs/router';
import HomePage from './Pages/HomePage';
import ResultsPage from './Pages/ResultsPage';
import Time from './components/activeTime';
import DropdownMenu from './components/dropDownMenu';
import { Toaster } from 'solid-toast';
import NotFoundPage from './Pages/404';

const App = () => {
  return (
    <div class='w-95 m-2 flex flex-col'>
      {/* Header */}
      <div class='flex justify-between items-center' role='banner'>
        <div class='flex items-center'>
          {/* Dropdown Menu */}
          <DropdownMenu />
          <Toaster />
        </div>
        <div class='flex flex-grow justify-center'>
          {/* Active Time */}
          <Time />
        </div>
      </div>

      {/* Divider */}
      <div class='divider' role='separator' />

      {/* Routes */}
      <Routes>
        {/* Home Page */}
        <Route path='/' element={<HomePage />} end />

        {/* Results Page */}
        <Route path='/results' element={<ResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
