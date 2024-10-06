import { User as AdapterUser } from "next-auth"; 

declare module "next-auth" {
  interface User extends AdapterUser {
    googleId?: string; 
    id: string; 
    email: string;
    name: string;
    dateDeNaissance?: string; 
    adresse?: string; 
    telephone?: string; 
  }

  interface Session {
    user: User; 
  }

  interface Profile {
    id: string; 
    email: string;
    name: string;
    given_name?: string; 
    family_name?: string; 
  }
}
