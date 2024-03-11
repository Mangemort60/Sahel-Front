// src/schemas/addressFormSchema.ts
import { z } from 'zod'

export const addressFormSchema = z.object({
  country: z.string(),
  city: z.string(),
  address: z.string().min(1, "L'adresse est requise"),
  address2: z.string().optional(),
  specialInstructions: z.string().optional(),
  phone: z
    .string()
    .min(10, 'Le numéro de téléphone doit comporter au moins 10 chiffres'),
})
