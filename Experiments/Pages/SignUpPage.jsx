import { createSignal } from 'solid-js';
import { createClient } from '@supabase/supabase-js';
import { Link, useNavigate } from '@solidjs/router';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [number, setNumber] = createSignal('');

  const handleSignup = async () => {
    const { user, error } = await supabase.auth.signUp({
      email: email(),
      password: password(),
    });

    if (error) {
      console.error('Error signing up:', error);
      // Handle the sign-up error here
    } else {
      // Store additional user data in the Supabase table
      const { data, error } = await supabase
        .from('users')
        .insert([{ name: name(), email: email(), number: number() }]);

      if (error) {
        console.error('Error storing user data:', error);
        // Handle the data storage error here
      } else {
        console.log('User data stored:', data);
        // Redirect to the desired page after successful sign-up
        navigate('/home');
      }
    }
  };

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h1 class="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form class="space-y-4" onSubmit={handleSignup}>
          <div>
            <label class="block mb-1 font-semibold" htmlFor="name">Name:</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              value={name()}
              onInput={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label class="block mb-1 font-semibold" htmlFor="email">Email:</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label class="block mb-1 font-semibold" htmlFor="number">Number:</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="number"
              value={number()}
              onInput={(e) => setNumber(e.target.value)}
            />
          </div>
          <div>
            <label class="block mb-1 font-semibold" htmlFor="password">Password:</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p class="mt-4 text-center">
          Already have an account? <Link href="/login" class="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
