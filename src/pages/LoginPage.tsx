import { Link, useNavigate, useLocation } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next' // ✅ Ajouté

import { loginSchema } from '../schemas/loginFormSchema'
import { auth } from '../../firebase-config'
import {
  setEmail,
  setFirstName,
  setIsLoggedIn,
  setPhone,
  setRole,
  setShortId,
  setUserName,
} from '../redux/slices/userSlice'
import { useAppSelector } from '../redux/hooks/useAppSelector'
import getApiUrl from '../utils/getApiUrl'
import { createPredemand } from '../utils/createPredemand'
import { selectIsReadyForPredemande } from '../redux/selectors/worksForm'

type FormData = z.infer<typeof loginSchema>

interface SectionProps {
  formSectionRef?: React.RefObject<HTMLDivElement>
}

const LoginPage = ({ formSectionRef }: SectionProps) => {
  const { t } = useTranslation('authForm') // ✅ Ajouté
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const smallRepairsData = useAppSelector(
    (state) => state.form.formData.smallRepairs,
  )
  const shortId = useAppSelector((state) => state.user.shortId)
  const formStep = useAppSelector((state) => state.form.currentStep)
  const isReadyForPredemande = useAppSelector(selectIsReadyForPredemande)

  useEffect(() => {
    if (formSectionRef?.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [formSectionRef])

  const { register, handleSubmit, trigger } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)
    setErrorMessage(null)
    const apiUrl = getApiUrl()
    const { password, ...cleanData } = data
    const reservationData = { ...smallRepairsData, ...cleanData }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )
      const authToken = await userCredential.user.getIdToken()

      const response = await axios.get(`${apiUrl}/auth/login`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })

      Cookies.set('token', authToken, { expires: 7 })

      dispatch(setIsLoggedIn(true))
      dispatch(setUserName(response.data.name))
      dispatch(setFirstName(response.data.firstName))
      dispatch(setEmail(response.data.email))
      dispatch(setShortId(response.data.shortId))
      dispatch(setRole(response.data.role))
      dispatch(setPhone(response.data.phone))

      if (auth.currentUser && isReadyForPredemande) {
        await createPredemand(
          reservationData,
          response.data.shortId,
          response.data.email,
          response.data.name,
          response.data.firstName,
          response.data.phone,
        )
        toast.success(t('login.success'), { position: 'bottom-right' })
      }

      const redirectTo =
        location.state?.from?.pathname ||
        (formStep === 'serviceChoice'
          ? '/'
          : `${new URLSearchParams(location.search).get('redirectTo') || '/'}#formSection`)

      navigate(redirectTo, { replace: true })

      if (redirectTo.includes('#formSection')) {
        setTimeout(() => {
          const formSectionElement = document.querySelector('#formSection')
          formSectionElement?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }

      toast.success(t('login.success'), { position: 'bottom-right' })
    } catch (error: any) {
      if (error.code && error.code.startsWith('auth/')) {
        switch (error.code) {
          case 'auth/invalid-credential':
            setErrorMessage(t('login.errors.invalidCredentials'))
            break
          case 'auth/wrong-password':
            setErrorMessage(t('login.errors.wrongPassword'))
            break
          case 'auth/user-not-found':
            setErrorMessage(t('login.errors.userNotFound'))
            break
          default:
            setErrorMessage(t('login.errors.generic'))
        }
      } else if (axios.isAxiosError(error)) {
        toast.error('Erreur lors de la récupération des données.')
      } else {
        toast.error('Erreur lors de la connexion.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                {t('login.title')}
              </h1>
              <p className="mt-2 text-sm text-gray-600 ">
                {t('login.noAccount')}{' '}
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium "
                  to="/register"
                >
                  {t('login.signupLink')}
                </Link>
              </p>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 ">
                      {t('login.emailLabel')}
                    </label>
                    <div className="relative">
                      <input
                        {...register('email')}
                        type="email"
                        id="email"
                        name="email"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="block text-sm mb-2 ">
                        {t('login.passwordLabel')}
                      </label>
                      <Link
                        className="text-sm text-blue-600 decoration-2 hover:underline font-medium "
                        to="/forgot-password"
                      >
                        {t('login.forgotPassword')}
                      </Link>
                    </div>
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
                      {errorMessage && (
                        <p
                          className="text-xs text-red-600 mt-2"
                          id="password-error"
                        >
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        {...register('rememberMe')}
                        id="rememberme"
                        name="rememberme"
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500  "
                      />
                    </div>
                    <div className="ms-3">
                      <label htmlFor="remember-me" className="text-sm ">
                        {t('login.rememberMe')}
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none "
                    disabled={isLoading}
                    onClick={() => trigger()}
                  >
                    {isLoading ? (
                      <div
                        className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
                        role="status"
                        aria-label="loading"
                      ></div>
                    ) : (
                      t('login.submitButton')
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
