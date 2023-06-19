import { createSignal } from 'solid-js';
import { supabase } from '../components/supabaseClient';
import { useNavigate, useParams } from '@solidjs/router';

export default function RecoverPasswordPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [password, setPassword] = createSignal('');
  const [passwordConfirmation, setPasswordConfirmation] = createSignal('');

  const recoverPassword = async () => {
    if (password() !== passwordConfirmation()) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.update({
        password: password(),
        access_token: params.access_token,
      });

      if (error) {
        throw error;
      }

      alert('Your password has been updated. Redirecting to login.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div class='container flex flex-col max-w-lg mx-auto'>
      <h2 class='text-3xl font-bold mb-4'>Reset Password</h2>

      <div class='mb-4'>
        <label class='block text-sm font-bold mb-2' for='password'>
          New Password
        </label>
        <input
          type='password'
          id='password'
          class='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
        />
      </div>

      <div class='mb-4'>
        <label class='block text-sm font-bold mb-2' for='passwordConfirmation'>
          Confirm New Password
        </label>
        <input
          type='password'
          id='passwordConfirmation'
          class='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
          value={passwordConfirmation()}
          onInput={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>

      <div class='flex mx-auto'>
        <button
          class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={recoverPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
