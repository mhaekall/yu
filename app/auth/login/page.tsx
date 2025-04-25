'use client';

import GoogleButton from "@/components/auth/GoogleButton";
import Link from "next/link";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    
    checkUser();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in to CV Builder</h1>
          <p className="mt-2 text-gray-600">
            Get started building your professional CV
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <GoogleButton />
          
          <div className="text-sm text-center mt-6">
            <p className="text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
