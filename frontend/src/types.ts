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
