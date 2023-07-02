import { createSignal, Show } from 'solid-js';
import HomePage from './Pages/HomePage';
import ResultsPage from './Pages/ResultsPage';
import Time from './components/activeTime';
import DropdownMenu from './components/dropDownMenu';
import { Toaster } from 'solid-toast';
import NotFoundPage from './Pages/404';

const App = () => {
  const [currentRoute] = createSignal(window.location.pathname);

  return (
    <div class="w-95 m-2 flex flex-col">
      {/* Header */}
      <div class="flex justify-between items-center" role="banner">
        <div class="flex items-center">
          {/* Dropdown Menu */}
          <Show when={currentRoute() === '/' || currentRoute() === '/results'}>
            <DropdownMenu />
          </Show>
          <Toaster />
        </div>
        <div class="flex flex-grow justify-center">
          {/* Active Time */}
          <Show when={currentRoute() === '/' || currentRoute() === '/results'}>
            <Time />
          </Show>
        </div>
      </div>

      {/* Divider */}
      <Show when={currentRoute() === '/' || currentRoute() === '/results'}>
        <div class="divider" role="separator" />
      </Show>

      {/* Render Page */}
      <Show when={true}>
        <Show when={currentRoute() === '/'}>
          <HomePage />
        </Show>
        <Show when={currentRoute() === '/results'}>
          <>
            <Toaster />
            <ResultsPage />
          </>
        </Show>
        <Show when={currentRoute() !== '/' && currentRoute() !== '/results'}>
          <NotFoundPage />
        </Show>
      </Show>
    </div>
  );
};

export default App;
