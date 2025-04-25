'use client';

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CV, CVSection } from "@/lib/types";

export function useCV(cvId: string) {
  const [cv, setCV] = useState<CV | null>(null);
  const [sections, setSections] = useState<CVSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        setIsLoading(true);
        
        // Fetch CV
        const { data: cvData, error: cvError } = await supabase
          .from("cvs")
          .select("*")
          .eq("id", cvId)
          .single();

        if (cvError) throw cvError;
        
        setCV(cvData);
        
        // Fetch Sections
        const { data: sectionsData, error: sectionsError } = await supabase
          .from("cv_sections")
          .select("*")
          .eq("cv_id", cvId)
          .order("order", { ascending: true });

        if (sectionsError) throw sectionsError;
        
        setSections(sectionsData || []);
      } catch (err) {
        console.error("Error fetching CV:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    if (cvId) {
      fetchCV();
    }
  }, [cvId, supabase]);

  return { cv, sections, isLoading, error };
}

export default useCV;
