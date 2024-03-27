import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppSelector } from '../../redux/hooks'

interface Reservation {
  bookingFormData: {
    city: string
    address: string
  }
  serviceDate: string
  quote: number
  formData: {
    sizeRange: string | undefined
    numberOfFloors: string
    beforeOrAfter: string
    fruitBasketSelected: string
  }
}

export const ReservationHistory = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null)

  const [_isLoading, setIsLoading] = useState(true)
  const [_error, setError] = useState('')

  const shortID = useAppSelector((state) => state.user.shortId)

  const formatSizeRange = (sizeRange: string | undefined) => {
    switch (sizeRange) {
      case 'lessThan40':
        return 'Moins de 40m²'
      case 'from40to80':
        return 'Entre 40m² et 80m²'
      case 'from80to120':
        return 'Entre 80m² et 120m²'
      case 'moreThan120':
        return 'Plus de 120m²'
      default:
        return sizeRange
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetch data')

      setIsLoading(true)
      try {
        if (!shortID) {
          console.error('ID utilisateur non disponible')
          setIsLoading(false)
          return
        }
        const response = await axios.get(
          'http://localhost:3000/mes-reservations',
          {
            params: { shortID },
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
      <div className=" text-xl font-semibold flex justify-center mb-4">
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
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-blue-900 hover:text-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                          data-hs-overlay="#hs-basic-modal"
                          onClick={() => setSelectedReservation(reservation)}
                        >
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        id="hs-basic-modal"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto ">
            <div className="flex justify-between items-center py-3 px-4 border-b ">
              <h3 className="font-bold m-auto text-gray-800 ">
                Votre reservation
              </h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                data-hs-overlay="#hs-basic-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex flex-col gap-3">
              <div className="flex justify-between">
                <p>Nombre d'étages</p>
                <p className="text-gray-500">
                  {selectedReservation?.formData?.numberOfFloors}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Surface</p>
                <p className="text-gray-500">
                  {formatSizeRange(selectedReservation?.formData?.sizeRange)}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Panier de fruits</p>
                <p className="text-gray-500">
                  {selectedReservation?.formData?.fruitBasketSelected
                    ? 'oui'
                    : 'non'}
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  Le nettoyage sera fait{' '}
                  {selectedReservation?.formData?.fruitBasketSelected ===
                  'Before'
                    ? 'avant'
                    : 'après'}{' '}
                  votre arrivée
                </p>
              </div>
              <div className="flex justify-between ">
                <p>Date du nettoyage prévu</p>
                <p className="text-gray-500">
                  {selectedReservation?.serviceDate}
                </p>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 ">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-basic-modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
