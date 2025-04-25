import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export const loginWithGoogle = async () => {
  const supabase = createClientComponentClient();
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

export const logout = async () => {
  const supabase = createClientComponentClient();
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Error logging out:", error);
    throw error;
  }
  
  redirect("/");
};

export const getUserSession = async () => {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error("Error getting user session:", error);
    return null;
  }
  
  return data.session;
};
