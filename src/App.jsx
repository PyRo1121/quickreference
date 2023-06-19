import { Routes, Route, useNavigate, useLocation } from '@solidjs/router';
import { onMount, createSignal, onCleanup } from 'solid-js';
import HomePage from './Pages/HomePage';
import ResultsPage from './Pages/ResultsPage';
import Time from './components/activeTime';
import DropdownMenu from './components/dropDownMenu';
import { Toaster } from 'solid-toast';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [user, setUser] = createSignal(null);
  const navigate = useNavigate();
  const location = useLocation();

  onMount(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(supabase.auth.user());

      if (
        event === 'SIGNED_OUT' &&
        location.pathname !== '/login' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/forgotpassword'
      ) {
        navigate('/login');
      } else if (event === 'SIGNED_IN' && location.pathname === '/login') {
        navigate('/');
      }
    });

    onCleanup(() => {
      authListener.unsubscribe();
    });
  });

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
        <Route path='/' element={user() ? <HomePage /> : <LoginPage />} end />

        {/* Results Page */}
        <Route path='/results' element={user() ? <ResultsPage /> : <LoginPage />} />

        {/* Login Page */}
        <Route path='/login' element={<LoginPage />} />

        {/* Sign Up Page */}
        <Route path='/signup' element={<SignUpPage />} />

        {/* Forgot Password Page */}
        <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
      </Routes>
    </div>
  );
};

export default App;
