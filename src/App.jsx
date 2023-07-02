import { createSignal, Show, lazy } from 'solid-js';
import { Toaster } from 'solid-toast';
import { useRoutes } from '@solidjs/router';

import NotFoundPage from './Pages/404';

const HomePage = lazy(() => import('./Pages/HomePage'));
const ResultsPage = lazy(() => import('./Pages/ResultsPage'));
const Time = lazy(() => import('./components/activeTime'));
const DropdownMenu = lazy(() => import('./components/dropDownMenu'));

const App = () => {
  const [currentRoute] = createSignal(window.location.pathname);

  const routeResult = useRoutes(() => [
    { path: '/', element: <HomePage /> },
    { path: '/results', element: <ResultsPage /> },
    { path: '/', element: <NotFoundPage /> },
  ]);

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
      {routeResult}
    </div>
  );
};

export default App;
