import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAuth, confirmPasswordReset } from 'firebase/auth'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const oobCode = searchParams.get('oobCode') || ''
  const [newPassword, setNewPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const auth = getAuth()
      await confirmPasswordReset(auth, oobCode, newPassword)
      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      setError('Erreur : lien invalide ou expiré.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!oobCode) {
    return (
      <p className="text-red-600 text-center">
        Lien de réinitialisation invalide.
      </p>
    )
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 bg-green-100 text-green-800 rounded">
        🎉 Mot de passe modifié avec succès. Vous pouvez maintenant vous
        connecter.
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white border rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">
        Définir un nouveau mot de passe
      </h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <div className="mb-4">
        <label className="block mb-1 text-sm">Nouveau mot de passe</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? 'En cours...' : 'Réinitialiser mon mot de passe'}
      </button>
    </form>
  )
}

export default ResetPassword
