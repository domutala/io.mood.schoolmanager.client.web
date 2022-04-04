export interface User {
  id: string;
  name?: { first: string; last?: string };
  avatar?: string;
  phone?: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}
