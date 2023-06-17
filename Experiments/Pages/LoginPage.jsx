import { createSignal } from 'solid-js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const LoginPage = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { user, error } = await supabase.auth.signIn({
        email: email(),
        password: password(),
      });

      if (error) {
        console.error('Login error:', error.message);
      } else {
        console.log('Logged in:', user);
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-md p-4">
        <h2 class="text-3xl font-bold text-center mb-4">Login</h2>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input
              type="email"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="Enter your email"
              value={email()}
              onInput={(event) => setEmail(event.target.value)}
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              type="password"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="Enter your password"
              value={password()}
              onInput={(event) => setPassword(event.target.value)}
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <p class="text-sm text-gray-600">
              Don't have an account?{' '}
              <a class="text-blue-500 hover:text-blue-700" href="/signup">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
