// contactSchema.js
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  firstname: z.string().min(1, 'Prénom requis'),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(10, 'Le numéro de téléphone doit comporter au minimum 10 chiffres')
    .regex(/^\d+$/, 'Le numéro de téléphone ne doit contenir que des chiffres'),
  details: z.string().min(1, 'Ecrivez un message'),
})
