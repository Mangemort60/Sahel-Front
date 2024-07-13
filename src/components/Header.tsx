import { Link } from 'react-router-dom'
import logo from '../assets/Logo-2-copie.webp'
import { useAppSelector } from '../redux/hooks'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'
import { useAppDispatch } from '../redux/hooks'
import { setIsLoggedIn } from '../redux/slices/userSlice'
import { useState } from 'react'
import { AlertSuccess } from './common/AlertSuccess'
import Cookies from 'js-cookie'
import { setCurrentStep } from '../redux/slices/formSlice'

const Header = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log('Déconnexion réussie')
      dispatch(setIsLoggedIn(false))
      dispatch(setCurrentStep('form'))
      setIsLoggedOut(true)
      Cookies.remove('token')
      setTimeout(() => {
        setIsLoggedOut(false)
      }, 5000)
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0">
        <nav
          className="relative  w-full mx-auto px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link to={'/'}>
              <img className="h-24" src={logo} alt="logo sahel" />
            </Link>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden size-4"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <svg
                  className="hs-collapse-open:block flex-shrink-0 hidden size-4"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              <Link
                className="font-medium  text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500"
                to="/about-us"
                aria-current="page"
              >
                Qui sommes nous
              </Link>
              <a
                className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500"
                href="#"
              >
                Comment ça marche
              </a>
              <a
                className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500"
                href="#"
              >
                Souscrire
              </a>
              <Link
                className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500"
                to="/contact"
              >
                Contact
              </Link>

              <div>
                {isLoggedIn ? (
                  <div className="flex">
                    <Link
                      className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600  sm:my-6 sm:ps-6 "
                      to="/client-dashboard"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>
                      Mon espace
                    </Link>
                    <Link
                      className="flex items-center gap-x-2 font-medium  text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 ml-2 sm:my-6 sm:ps-6 "
                      to="/"
                      onClick={() => handleLogout()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 17l5-5-5-5M19.8 12H9M13 22a10 10 0 1 1 0-20" />
                      </svg>
                      Se deconnecter
                    </Link>
                  </div>
                ) : (
                  <Link
                    className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600  sm:my-6 sm:ps-6 "
                    to="/login"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    Se connecter
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      {isLoggedOut && (
        <AlertSuccess description="Deconnexion réussi" title="A bientôt !" />
      )}
    </>
  )
}

export default Header
