export interface User {
  id: string;
  email?: string;
  name?: string;
  avatar_url?: string;
}

export interface CV {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface CVSection {
  id: string;
  cv_id: string;
  type: string;
  content: any;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  name?: string;
  bio?: string;
  avatar_url?: string;
  updated_at?: string;
}
