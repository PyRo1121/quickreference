import { createSignal } from 'solid-js';
import { supabase } from '../components/supabaseClient';

export default function SignUpPage() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const signUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({
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
      <h2 class='text-3xl font-bold mb-4'>Sign Up</h2>
      <div class='mb-4'>
        <label class='block text-sm font-bold mb-2' for='email'>
          Email
        </label>
        <input
          type='email'
          id='email'
          class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
          class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
        />
      </div>
      <div class='flex mx-auto space-x-5'>
        <a
          href='/login'
          class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Sign in
        </a>
        <button
          class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={signUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
