// src/atoms/userAtom.ts
import { atomWithStorage } from 'jotai/utils';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const userAtom = atomWithStorage<User | null>('user', null);
export const accessTokenAtom = atomWithStorage<string | null>('accessToken', null);
export const refreshTokenAtom = atomWithStorage<string | null>('refreshToken', null);
