export type InternshipStatus = 'pending' | 'acceptee' | 'refusee' | string;

export interface Internship {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  service: string;
  dateDebut: string;
  dateFin: string;
  motivation?: string | null;
  status: InternshipStatus;
  createdAt: string;
  updatedAt?: string | null;
}

/**
 * Type utilisé pour la création depuis le formulaire front.
 * dateDebut/dateFin doivent être des ISO strings (ex: new Date().toISOString()).
 */
export interface CreateInternshipPayload {
  nom: string;
  prenom: string;
  email: string;
  service: string;
  dateDebut: string;
  dateFin: string;
  motivation?: string | null;
  status?: InternshipStatus;
}