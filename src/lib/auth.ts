import { supabase } from "@/integrations/supabase/client";

export const cleanupAuthState = () => {
  localStorage.removeItem('supabase.auth.token');
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const signUp = async (email: string, password: string) => {
  cleanupAuthState();
  
  try {
    await supabase.auth.signOut({ scope: 'global' });
  } catch (err) {
    // Continue even if this fails
  }
  
  const redirectUrl = `${window.location.origin}/`;
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl
    }
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  cleanupAuthState();
  
  try {
    await supabase.auth.signOut({ scope: 'global' });
  } catch (err) {
    // Continue even if this fails
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  try {
    cleanupAuthState();
    await supabase.auth.signOut({ scope: 'global' });
    window.location.href = '/auth';
  } catch (error) {
    console.error('Error signing out:', error);
    window.location.href = '/auth';
  }
};