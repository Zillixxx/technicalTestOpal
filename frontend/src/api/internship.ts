import axios from 'axios';
import type { Internship, CreateInternshipPayload } from '../types/Internship';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});

// Récupérer toutes les demandes
export async function fetchInternships(): Promise<Internship[]> {
  const res = await api.get<Internship[]>('/internship');
  return res.data;
}

// Créer une demande
export async function createInternship(payload: CreateInternshipPayload): Promise<Internship> {
  const res = await api.post<Internship>('/internship', payload);
  return res.data;
}

// Mettre à jour le status d'une demande
export async function updateInternshipStatus(id: number, status: string): Promise<Internship> {
  const res = await api.patch<Internship>(`/internship/${id}`, { status });
  return res.data;
}

export default api;
