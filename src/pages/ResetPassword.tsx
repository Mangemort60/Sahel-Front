import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { z } from 'zod'
import { forgotPasswordSchema } from '../schemas/forgotPasswordSchema'
import axios from 'axios'
import getApiUrl from '../utils/getApiUrl'
import { useTranslation } from 'react-i18next' // ✅ Ajouté

type FormData = z.infer<typeof forgotPasswordSchema>

const apiUrl = getApiUrl()

const ForgotPassword = () => {
  const { t } = useTranslation('authForm') // ✅ Ajouté
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await axios.post(`${apiUrl}/auth/forgot-password`, {
        email: data.email,
      })
      setMessage(t('forgotPassword.success')) // ✅
      console.log(response.data)
    } catch (error: any) {
      setMessage(
        error.response?.data?.error || t('forgotPassword.error'), // ✅
      )
    } finally {
      setIsLoading(false)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  return (
    <div>
      <main className="w-full max-w-lg mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                {t('forgotPassword.title')}
              </h1>
            </div>
            <div
              className="mt-2 bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500"
              role="alert"
            >
              {t('forgotPassword.instruction')}
            </div>
            <div className="mt-5">
              {message && (
                <div
                  className="my-2 bg-green-100 border border-green-200 text-sm text-green-800 rounded-lg p-4 dark:bg-green-800/10 dark:border-green-900 dark:text-green-500"
                  role="alert"
                >
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">
                      {t('forgotPassword.emailLabel')}
                    </label>
                    <div className="relative">
                      <input
                        {...register('email')}
                        id="email"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        required
                        aria-describedby="email-error"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div
                          className="animate-spin inline-block h-5 w-5 border-[3px] border-current border-t-transparent rounded-full"
                          role="status"
                          aria-label="loading"
                        ></div>
                      ) : (
                        t('forgotPassword.submitButton')
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ForgotPassword
