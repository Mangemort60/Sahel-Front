import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { registerSchema } from '../schemas/registerFormSchema'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import getApiUrl from '../utils/getApiUrl'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import {
  setEmail,
  setFirstName,
  setIsLoggedIn,
  setRole,
  setShortId,
  setUserName,
  setPhone,
} from '../redux/slices/userSlice'
import toast from 'react-hot-toast'
import { useAppSelector } from '../redux/hooks/useAppSelector'
import { createPredemand } from '../utils/createPredemand'
import { selectIsReadyForPredemande } from '../redux/selectors/worksForm'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { useTranslation } from 'react-i18next' // ✅ Ajouté

type FormData = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const { t } = useTranslation('authForm') // ✅ Ajouté
  const [isLoading, setIsLoading] = useState(false)
  const apiUrl = getApiUrl()
  const navigate = useNavigate()
  const auth = getAuth()
  const dispatch = useDispatch()
  const isReadyForPredemande = useAppSelector(selectIsReadyForPredemande)
  const smallRepairsData = useAppSelector(
    (state) => state.form.formData.smallRepairs,
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  })

  const [emailError, setEmailError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)
    setEmailError(null)

    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        name: data.name,
        firstName: data.firstname,
        email: data.email,
        password: data.password,
        phone: data.phone,
      })

      const { token, shortId, role } = response.data
      await signInWithCustomToken(auth, token)

      dispatch(setIsLoggedIn(true))
      dispatch(setUserName(data.name))
      dispatch(setFirstName(data.firstname))
      dispatch(setEmail(data.email))
      dispatch(setShortId(shortId))
      dispatch(setRole(role))
      dispatch(setPhone(data.phone))

      navigate('/', {
        state: {
          success: true,
          scrollToForm: true, // 👈 ajoute ceci
        },
      })

      toast.success(t('register.success')) // ✅
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error
        console.error(
          "Erreur lors de la création de l'utilisateur :",
          errorMessage,
        )

        if (error.response?.status === 409) {
          setEmailError(t('register.errors.emailInUse')) // ✅
        } else {
          toast.error(t('register.errors.generic')) // ✅
        }
      } else {
        console.error('Erreur inattendue :', error)
        toast.error(t('register.errors.generic')) // ✅
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 ">
              {t('register.title')}
            </h1>
            <p className="mt-2 text-sm text-gray-600 ">
              {t('register.alreadyAccount')}{' '}
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium "
                to="/login"
              >
                {t('register.loginLink')}
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  {t('register.lastNameLabel')}
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  name="name"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  required
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="firstname" className="block text-sm mb-2">
                  {t('register.firstNameLabel')}
                </label>
                <input
                  {...register('firstname')}
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  required
                />
                {errors.firstname && (
                  <p className="text-xs text-red-600 mt-2">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div className="my-2">
                <label htmlFor="password" className="block text-sm mb-2 ">
                  {t('register.phoneLabel')}
                </label>
                <PhoneInput
                  defaultCountry="fr"
                  style={{ width: '100%' }}
                  onChange={(phone) => setValue('phone', phone)}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 ">
                    {t('register.emailLabel')}
                  </label>
                  <div className="relative">
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-2">
                      {errors.email.message}
                    </p>
                  )}
                  {emailError && (
                    <p className="text-xs text-red-600 mt-2">{emailError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm mb-2 ">
                    {t('register.passwordLabel')}
                  </label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      type="password"
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                      required
                      aria-describedby="password-error"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-600 mt-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm mb-2 "
                  >
                    {t('register.confirmPasswordLabel')}
                  </label>
                  <div className="relative">
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      id="confirm-password"
                      name="confirmPassword"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                      required
                      aria-describedby="confirm-password-error"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600 mt-2">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    <input
                      {...register('termsAccepted')}
                      id="termsAccepted"
                      name="termsAccepted"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 "
                    />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="termsAccepted" className="text-sm ">
                      {t('register.terms')}.{' '}
                      <a
                        className="text-blue-600 decoration-2 hover:underline font-medium "
                        href="#"
                      >
                        cliquez ici pour les consulter
                      </a>
                    </label>
                    {errors.termsAccepted && (
                      <p className="text-xs text-red-600">
                        {errors.termsAccepted.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700  disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <div
                      className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    t('register.submitButton')
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
