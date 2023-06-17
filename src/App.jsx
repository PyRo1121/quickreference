import { Routes, Route } from '@solidjs/router';
import HomePage from './Pages/HomePage';
import ResultsPage from './Pages/ResultsPage';
import Time from './components/activeTime';
import DropdownMenu from './components/dropDownMenu';

const App = () => {
  return (
    <div>
      <Time />
      <div class="divider"></div>
      <DropdownMenu />
      <Routes>
        <Route path="/" element={<HomePage />} end />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
};

export default App;
