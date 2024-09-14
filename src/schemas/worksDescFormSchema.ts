import { z } from 'zod'

// Schéma Zod pour le type de travaux
export const worksDescFormSchema = z.object({
  // Catégorie des travaux
  workCategory: z
    .array(
      z.enum(['éléctricité', 'plomberie', 'maçonnerie', 'peinture', 'autre']),
    )
    .min(1, 'Veuillez sélectionner au moins une catégorie de travaux.'),
  // Description des travaux à réaliser (toujours obligatoire)
  workDescription: z
    .string()
    .min(1, 'Veuillez décrire les travaux à réaliser.'),

  // Urgence des travaux
  urgency: z.enum(
    ['immediate', 'dans les semaines à venir', 'dans les mois à venir'],
    {
      errorMap: () => ({
        message: "Veuillez sélectionner l'urgence des travaux.",
      }),
    },
  ),
})
