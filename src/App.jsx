import { Routes, Route } from '@solidjs/router';
import HomePage from './Pages/HomePage';
import ResultsPage from './Pages/ResultsPage';
import Time from './components/activeTime';
import DropdownMenu from './components/dropDownMenu';

const App = () => {
  return (
    <div class="w-95 m-2 flex flex-col">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <DropdownMenu />
        </div>
        <div class="flex flex-grow justify-center">
          <Time />
        </div>
      </div>
      <div class="divider"></div>        
      <Routes>
        <Route path="/" element={<HomePage />} end />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
};

export default App;
