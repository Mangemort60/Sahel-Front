import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import { loginSchema } from '../schemas/loginFormSchema'
import { auth } from '../../firebase-config'
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  setEmail,
  setFirstName,
  setIsLoggedIn,
  setShortId,
  setUserName,
} from '../redux/slices/userSlice'
import Cookies from 'js-cookie'
import { useAppSelector } from '../redux/hooks'

type FormData = z.infer<typeof loginSchema>

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)

    try {
      // Définir la persistance en fonction de l'état rememberMe
      // await setPersistence(
      //   auth,
      //   rememberMe ? browserLocalPersistence : browserSessionPersistence,
      // )

      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )
      console.log("L'utilisateur est connecté", userCredential.user)
      dispatch(setIsLoggedIn(true))
      navigate('/')

      // Récupère le token d'authentification Firebase
      const authToken = await userCredential.user.getIdToken()

      // Envoie une requête au serveur pour récupérer les données supplémentaires de l'utilisateur
      const response = await axios.get('http://localhost:3001/auth/login', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      dispatch(setUserName(response.data.name))
      dispatch(setFirstName(response.data.firstName))
      dispatch(setEmail(userCredential.user.email))
      dispatch(setShortId(response.data.shortId))

      Cookies.set('token', authToken, { expires: 7 })

      console.log('Données utilisateur récupérées:', response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Gestion des erreurs retournées par le serveur
        console.error(
          'Erreur lors de la récupération des données utilisateur:',
          error.response?.data.error,
        )
      } else {
        // Erreur inattendue ou non liée à Axios
        console.error('Erreur inattendue:', error)
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
              Connexion
            </h1>
            <p className="mt-2 text-sm text-gray-600 ">
              Pas encore de compte ?{' '}
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium "
                to="/register"
              >
                S'inscrire
              </Link>
            </p>
          </div>

          <div className="mt-5">
            {/* <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
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
              Se connecter avec Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 ">
              Ou
            </div> */}

            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-sm mb-2 ">
                      Mot de passe
                    </label>
                    <a
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium "
                      href="../examples/html/recover-account.html"
                    >
                      Mot de passe oublié ?
                    </a>
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
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="password-error"
                  >
                    8+ characters required
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    <input
                      {...register('rememberMe')}
                      id="rememberme"
                      name="rememberme"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500  "
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="remember-me" className="text-sm ">
                      Se souvenir de moi
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none "
                >
                  {isLoading ? (
                    <div
                      className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
                      role="status"
                      aria-label="loading"
                    ></div>
                  ) : (
                    'Se connecter'
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

export default LoginPage
