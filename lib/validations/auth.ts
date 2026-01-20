import { z } from 'zod';

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register validation schema
export const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  countryCode: z.string().min(1, 'Please select a country code'),
  phoneNumber: z.string()
    .min(6, 'Phone number must be at least 6 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^[0-9]+$/, 'Phone number must contain only digits'),
  shoppingPreference: z.enum(['Mens Fashion', 'Womens Fashion']).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Reusable field validators
export const validators = {
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  strongPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number'),
};

// Forgot password validation schema
export const forgotPasswordSchema = z.object({
  email: validators.email,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;



