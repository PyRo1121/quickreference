import { createSignal } from 'solid-js';
import HomePage from './Pages/HomePage';
import ResultsPage from './Pages/ResultsPage';
import Time from './components/ActiveTime';
import DropdownMenu from './components/DropDownMenu';
import { Toaster } from 'solid-toast';
import NotFoundPage from './Pages/404';

const App = () => {
  const [currentRoute] = createSignal(window.location.pathname);

  const renderPage = () => {
    switch (currentRoute()) {
    case '/':
      return (
        <>
          <DropdownMenu />
          <Toaster />
          <HomePage />
        </>
      );
    case '/results':
      return (
        <>
          <DropdownMenu />
          <Toaster />
          <ResultsPage />
        </>
      );
    default:
      return (
        <>
          <NotFoundPage />
        </>
      );
    }
  };

  return (
    <div class='w-95 m-2 flex flex-col'>
      {/* Header */}
      <div class='flex justify-between items-center' role='banner'>
        <div class='flex items-center'>
          {/* Dropdown Menu */}
          {currentRoute() === '/' && <DropdownMenu />}
          <Toaster />
        </div>
        <div class='flex flex-grow justify-center'>
          {/* Active Time */}
          {currentRoute() === '/' && <Time />}
        </div>
      </div>

      {/* Divider */}
      {currentRoute() === '/' && <div class='divider' role='separator' />}

      {/* Render Page */}
      {renderPage()}
    </div>
  );
};

export default App;
