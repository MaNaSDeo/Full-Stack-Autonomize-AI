export interface iRepo {
  html_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  visibility: string;
  language: string | null;
  default_branch: string;
  size: number;
  id: number;
  name: string;
}

export interface iFollowerData {
  username: string;
  id: number;
  avatar_url: string;
}

export interface iUser {
  username: string;
  id: number;
  avatar_url: string;
  type: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  friends: string[];
  repos: iRepo[];
  followersData: iFollowerData[];
  isDeleted: boolean;
}
