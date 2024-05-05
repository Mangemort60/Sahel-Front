import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppSelector } from '../../redux/hooks'
import Modal from '../common/Modal'

type StatusColorMap = {
  [key: string]: string
  'à venir': 'text-blue-500'
  'en cours': 'text-green-500'
  terminée: 'text-gray-500'
  suspendue: 'text-red-500'
}

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
  status: string
  bookingStatus: string
  serviceStatus: string
}

export const ReservationHistory = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selectedReservation, setSelectedReservation] = useState<Reservation>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  console.log('selectedReservation', selectedReservation)

  const statusColorMap: StatusColorMap = {
    'à venir': 'text-blue-500',
    'en cours': 'text-green-500',
    terminée: 'text-gray-500',
    suspendue: 'text-red-500',
  }

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
          'http://localhost:3001/mes-reservations',
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
      <div className="flex flex-col mt-8">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden rounded-sm shadow-md">
              <table className="min-w-full ">
                <thead className="bg-[#ab5e3f] text-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium  uppercase"
                    >
                      Ville
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium  uppercase"
                    >
                      Adresse
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium  uppercase"
                    >
                      Date prévue
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium  uppercase"
                    >
                      Montant
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium  uppercase"
                    >
                      status réservation
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium  uppercase"
                    >
                      status prestation
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-bold">
                        {reservation.bookingStatus}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${statusColorMap[reservation.serviceStatus] || 'text-gray-500'}`}
                      >
                        {reservation.serviceStatus}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          className="py-3 px-4 text-sm font-semibold rounded-sm border border-gray-400 text-gray-800 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50"
                          onClick={() => {
                            setSelectedReservation(reservation)
                            setIsModalOpen(true)
                          }}
                        >
                          Détails
                        </button>{' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Détails de votre reservation
        </h3>
        <div className="mt-2">
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
                {selectedReservation?.formData?.fruitBasketSelected === 'Before'
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
        </div>
      </Modal>
    </div>
  )
}
