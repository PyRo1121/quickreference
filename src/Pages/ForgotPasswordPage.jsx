import { createSignal } from 'solid-js';
import { supabase } from '../components/supabaseClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = createSignal('');

  const forgotPassword = async () => {
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email());
      if (error) {
        throw error;
      }
      alert('Password reset email has been sent.');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div class='container flex flex-col max-w-lg mx-auto'>
      <h2 class='text-3xl font-bold mb-4'>Forgot Password</h2>
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
      <div class='flex mx-auto space-x-5'>
        <a
          href='/login'
          class='text-blue-500 hover:text-blue-700 font-bold text-sm focus:outline-none'
        >
          Sign In
        </a>
        <button
          class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={forgotPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
