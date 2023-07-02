import { createSignal, Show, lazy } from 'solid-js';
import { Toaster } from 'solid-toast';

const HomePage = lazy(() => import('./Pages/HomePage'));
const ResultsPage = lazy(() => import('./Pages/ResultsPage'));
const Time = lazy(() => import('./components/activeTime'));
const DropdownMenu = lazy(() => import('./components/dropDownMenu'));
const NotFoundPage = lazy(() => import('./Pages/404'));

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
