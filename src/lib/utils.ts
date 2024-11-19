import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds}`;
}

export const passwordSchema = z
  .string()
  .min(8, 'Password must have at least 8 characters')
  .regex(/[A-Z]/, 'Password must have at least one letter in uppercase')
  .regex(/[a-z]/, 'Password must have at least one letter in lowercase')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[@$!%*?&]/,
    'Password must contain at least one special character (@$!%*?&)',
  );
