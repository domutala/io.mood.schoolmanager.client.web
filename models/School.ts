export interface School {
  id: string;
  name: string;
  abbreviation?: string;
  devise?: string;
  description?: string;
  type: string;
  created_date?: Date;
  logo?: string;

  academic_informations: {
    ministere?: string;
    ia?: string;
    ief?: string;
    iden?: string;
    type: string;
    language: { main: string; others: string[] };
  };

  contacts: {
    email?: string;
    phone?: string;
    address?: string;
    web_site?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };

  created_at: Date;
  updated_at: Date;
}
