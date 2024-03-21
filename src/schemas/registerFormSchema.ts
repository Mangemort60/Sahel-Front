import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Le nom est requis' }),
    firstname: z.string().min(1, { message: 'Le prénom est requis' }),
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
    confirmPassword: z.string(),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Vous devez accepter les termes et conditions.',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'], // Ceci indique que l'erreur de validation doit être associée au champ confirmPassword
  })
