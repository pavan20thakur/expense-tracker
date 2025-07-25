import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { CurrencyCode } from '@/lib/currency';

interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  monthly_salary: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Pick<UserProfile, 'monthly_salary' | 'currency'>>) => {
    if (!user) return { error: new Error('No user found') };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Profile update error:', error);
        return { error };
      }

      setProfile(data);
      return { data, error: null };
    } catch (error) {
      console.error('Profile update catch error:', error);
      return { error: error as Error };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile,
  };
};
