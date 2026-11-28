import { z } from 'zod';

import i18n from '@/shared/i18n/i18n';

export const registerSchema = () =>
  z
    .object({
      fullName: z
        .string()
        .trim()
        .min(1, i18n.t('auth.validation.fullNameRequired'))
        .min(2, i18n.t('auth.validation.fullNameMin'))
        .max(100, i18n.t('auth.validation.fullNameMax')),

      email: z
        .string()
        .trim()
        .min(1, i18n.t('auth.validation.emailRequired'))
        .email(i18n.t('auth.validation.emailInvalid')),

      password: z
        .string()
        .min(1, i18n.t('auth.validation.passwordRequired'))
        .min(8, i18n.t('auth.validation.passwordMin'))
        .max(64, i18n.t('auth.validation.passwordMax'))
        .regex(/[A-Za-z]/, i18n.t('auth.validation.passwordLetter'))
        .regex(/[0-9]/, i18n.t('auth.validation.passwordNumber')),

      confirmPassword: z.string().min(1, i18n.t('auth.validation.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: i18n.t('auth.validation.confirmPasswordMismatch'),
      path: ['confirmPassword'],
    });

export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
