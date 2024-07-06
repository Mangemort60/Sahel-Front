import { z } from 'zod'

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export default resetPasswordSchema
