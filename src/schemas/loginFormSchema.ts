import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z
    .string()
    .min(8, {
      message: 'Le mot de passe doit contenir au moins 8 caractères',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@?#$%^&*])/, {
      message:
        'Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial (!@?#$%^&*)',
    }),
  rememberMe: z.boolean(),
})
