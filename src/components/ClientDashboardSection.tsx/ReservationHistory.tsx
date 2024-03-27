import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

export const ReservationHistory = () => {
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  console.log('state reservation', reservations)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const userId = Cookies.get('userId')
        if (!userId) {
          console.error('ID utilisateur non disponible')
          setIsLoading(false)
          return
        }
        const response = await axios.get(
          'http://localhost:3000/mes-reservations',
          {
            params: { userId },
          },
        )
        setReservations(response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error)
        setError('Une erreur est survenue lors de la récupération des données.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <div className="flex justify-center mb-4">
        <Link to="overview">Votre historique de réservations</Link>
      </div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Ville
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Adresse
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Date prévue
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Montant
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {reservations.map((reservation, index) => (
                    <tr className="hover:bg-gray-100" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                        {reservation.bookingFormData.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                        {reservation.bookingFormData.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                        {reservation.serviceDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                        {reservation.quote} €
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <div className="hs-dropdown relative inline-flex">
                          <button
                            id="hs-dropdown-custom-icon-trigger"
                            type="button"
                            className="hs-dropdown-toggle flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                          >
                            <svg
                              className="flex-none size-4 text-gray-600"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </button>

                          <div
                            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 "
                            aria-labelledby="hs-dropdown-custom-icon-trigger"
                          >
                            <a
                              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 "
                              href="#"
                            >
                              Newsletter
                            </a>
                            <a
                              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 "
                              href="#"
                            >
                              Purchases
                            </a>
                            <a
                              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 "
                              href="#"
                            >
                              Downloads
                            </a>
                            <a
                              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 "
                              href="#"
                            >
                              Team Account
                            </a>
                          </div>
                        </div>{' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
