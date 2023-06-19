import { createSignal } from 'solid-js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function LoginPage() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const signIn = async () => {
    try {
      const { error } = await supabase.auth.signIn({
        email: email(),
        password: password(),
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div class='container flex flex-col max-w-lg mx-auto'>
      <h2 class='text-3xl font-bold mb-4'>Login</h2>
      <div class='mb-4'>
        <label class='block text-sm font-bold mb-2' for='email'>
          Email
        </label>
        <input
          type='email'
          id='email'
          class='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class='mb-4'>
        <label class='block text-sm font-bold mb-2' for='password'>
          Password
        </label>
        <input
          type='password'
          id='password'
          class='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
        />
      </div>
      <div class='flex mx-auto'>
        <div class='flex flex-row space-x-7'>
          <a
            href='/signup'
            class='text-blue-500 hover:text-blue-700 font-bold text-sm focus:outline-none'
          >
            Sign Up
          </a>
          <a
            href='/forgotpassword'
            class='text-blue-500 hover:text-blue-700 font-bold text-sm focus:outline-none ml-2'
          >
            Forgot Password
          </a>
          <button
            class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={signIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
