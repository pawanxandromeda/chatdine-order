// src/atoms/userAtom.ts
import { atom } from 'jotai';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  // Add other fields as needed from IUser
}

export const userAtom = atom<User | null>(null);
export const accessTokenAtom = atom<string | null>(null);
export const refreshTokenAtom = atom<string | null>(null);