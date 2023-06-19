import { createSignal, onCleanup, createContext } from 'solid-js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [session, setSession] = createSignal(null);

  const subscription = supabase.auth.onAuthStateChange((event, session) => {
    setSession(session);
  });

  onCleanup(() => {
    subscription?.unsubscribe?.();
  });

  return (
    <AuthContext.Provider value={{ session, supabase }}>{props.children}</AuthContext.Provider>
  );
}
