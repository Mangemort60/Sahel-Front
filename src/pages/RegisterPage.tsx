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
} from '../redux/slices/userSlice'

type FormData = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const apiUrl = getApiUrl()
  const navigate = useNavigate()
  const auth = getAuth() // Initialize Firebase Authentication
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)
    try {
      // Envoie les données d'inscription au backend
      const response = await axios.post(`${apiUrl}/auth/register`, {
        name: data.name,
        firstName: data.firstname,
        email: data.email,
        password: data.password,
      })

      const { token, email, shortId, role } = response.data // Récupère les données du backend

      // Utilise Firebase pour connecter l'utilisateur avec le token personnalisé
      const userCredential = await signInWithCustomToken(auth, token)

      // Dispatch les données dans Redux
      dispatch(setIsLoggedIn(true))
      dispatch(setUserName(data.name)) // Met à jour le nom
      dispatch(setFirstName(data.firstname)) // Met à jour le prénom
      dispatch(setEmail(email || userCredential.user.email)) // Met à jour l'email
      dispatch(setShortId(shortId)) // Met à jour le shortId
      dispatch(setRole(role)) // Met à jour le rôle

      // Redirige vers la page d'accueil après la connexion réussie
      navigate('/', { state: { success: true } })

      console.log('User created successfully:', response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating user:', error.response?.data)
      } else {
        console.error('Unexpected error:', error)
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
              Inscription
            </h1>
            <p className="mt-2 text-sm text-gray-600 ">
              Déjà un compte ?{' '}
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium "
                to="/login"
              >
                Connectez vous
              </Link>
            </p>
          </div>

          <div className="mt-5">
            {/* <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
            >
              <svg
                className="w-4 h-auto"
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
              >
                <path
                  d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                  fill="#34A853"
                />
                <path
                  d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                  fill="#FBBC05"
                />
                <path
                  d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                  fill="#EB4335"
                />
              </svg>
              S'inscrire avec Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 ">
              Ou
            </div> */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Nom
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
                  Prénom
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

              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 ">
                    Email
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
                    {errors.email && (
                      <div className=" absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                          className="size-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-sm mb-2 ">
                      Mot de passe
                    </label>
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
                    {errors.password && (
                      <div className=" absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                          className="size-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    )}
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
                    Confirmer le mot de passe
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
                    {errors.confirmPassword && (
                      <div className=" absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                          className="size-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    )}
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
                      J'accepte{' '}
                      <a
                        className="text-blue-600 decoration-2 hover:underline font-medium "
                        href="#"
                      >
                        les termes et conditions
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
                    "s'inscrire"
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
