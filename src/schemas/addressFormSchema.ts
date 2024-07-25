import { z } from 'zod'

export const addressFormSchema = z.object({
  city: z.string().min(1, 'Veuillez séléctionner une ville'),
  address: z.string().min(5, { message: "L'adresse est requise" }),
  address2: z.string().optional(),
  specialInstructions: z.string().optional(),
  phone: z.string().min(10, {
    message: 'Le numéro de téléphone doit comporter au moins 10 chiffres',
  }),
})
