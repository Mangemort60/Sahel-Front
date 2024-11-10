import { Link, useNavigate } from 'react-router-dom'
import { Reservation } from '../../../pages/ClientDashboard'
import { IoChatboxOutline } from 'react-icons/io5'
import { createPaymentIntent } from '../../../services/createPaymentIntent'
import { useState } from 'react'
import { useAppDispatch } from '../../../redux/hooks/useAppDispatch'
import { setReservationType } from '../../../redux/slices/formSlice'

interface ConfirmedCardProps {
  reservation: Reservation
}

const PreDemandCardNotPaid = ({ reservation }: ConfirmedCardProps) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const handlePaymentClick = async () => {
    setIsLoading(true)
    dispatch(setReservationType(reservation.reservationType))
    try {
      const serviceFees = 5000
      const feesType = 'serviceFees'

      console.log('Fees Type envoyé :', feesType)

      const { clientSecret } = await createPaymentIntent(
        serviceFees,
        reservation.email,
        reservation.shortId,
        reservation.name,
        feesType,
        reservation.id,
      )

      navigate('/stripe-checkout-form', {
        state: {
          clientSecret,
          reservationId: reservation.id,
        },
      })
    } catch (error) {
      console.error('Erreur lors de la création du PaymentIntent:', error)
      alert(
        'Une erreur est survenue lors de la création du paiement. Veuillez réessayer.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex rounded-lg space-y-2 p-8 flex-col justify-between bg-blue-300 hover:bg-blue-200 max-w-sm">
      <h2 className="text-black font-bold text-xl">
        Demande confirmée n° {reservation.reservationShortId}
      </h2>
      <p className="text-gray-700">
        Veuillez payer les frais de service pour commencer la prestation.
      </p>
      <div className="flex flex-col gap-2 w-52">
        {/* Remplacer Link par un bouton qui déclenche handlePaymentClick */}
        <button
          onClick={handlePaymentClick}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400"
          disabled={isLoading}
        >
          {isLoading ? 'Création du paiement...' : 'Payer les frais de service'}
        </button>

        <Link
          to={`/client-dashboard/reservationSpace/${reservation.id}`}
          type="button"
          className="p-2 inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          Accéder au chat <IoChatboxOutline />
        </Link>
      </div>
    </div>
  )
}

export default PreDemandCardNotPaid
