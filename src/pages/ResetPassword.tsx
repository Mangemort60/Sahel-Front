import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, confirmPasswordReset } from 'firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import resetPasswordSchema from '../schemas/resetPasswordSchema'

const ResetPassword: React.FC = () => {
  type FormData = z.infer<typeof resetPasswordSchema>

  const [message, setMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // Pour le champ mot de passe
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  })
  const location = useLocation()
  const navigate = useNavigate()

  // Récupération du oobCode de l'URL
  const queryParams = new URLSearchParams(location.search)
  const oobCode = queryParams.get('oobCode')

  if (!oobCode) {
    setMessage('Invalid or expired password reset code.')
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const auth = getAuth()

    if (!oobCode) {
      setMessage('Invalid or expired password reset code.')
      return
    }

    try {
      await confirmPasswordReset(auth, oobCode, data.newPassword)
      setMessage('Le mot de passe a été réinitialisé avec succès.')
      setTimeout(() => navigate('/login'), 3000)
    } catch (error: any) {
      // Gestion des erreurs spécifiques
      if (error.code === 'auth/weak-password') {
        setErrorMessage('Le mot de passe est trop faible.')
      } else if (error.message.includes('last password')) {
        setErrorMessage(
          'Vous ne pouvez pas utiliser le même mot de passe que le précédent.',
        )
      } else {
        setErrorMessage('Une erreur est survenue : ' + error.message)
      }
    }
  }

  return (
    <div>
      <main className="w-full max-w-lg mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Création d'un nouveau mot de passe
              </h1>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm mb-2">
                      Nouveau mot de passe
                    </label>
                    <div className="relative">
                      <input
                        {...register('newPassword')}
                        id="newPassword"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        required
                        type="password"
                        placeholder="Entrez un nouveau mot de passe"
                      />
                    </div>
                    {/* Affichage des erreurs sous le champ mot de passe */}
                    {errorMessage && (
                      <p className="text-xs text-red-600 mt-2">
                        {errorMessage}
                      </p>
                    )}
                    {errors.newPassword && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Réinitialiser
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      {/* Message général de succès ou d'erreur */}
      {message && (
        <p className="text-center mt-4 text-sm text-blue-600">{message}</p>
      )}
    </div>
  )
}

export default ResetPassword
