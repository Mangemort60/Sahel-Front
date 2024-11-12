import { Link, useNavigate } from 'react-router-dom'
import { Reservation } from '../../../pages/ClientDashboard'
import { IoChatboxOutline } from 'react-icons/io5'
import { createPaymentIntent } from '../../../services/createPaymentIntent'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'
import { setReservationType } from '../../../redux/slices/formSlice'
import Badge from '@mui/material/Badge'

interface ConfirmedCardProps {
  reservation: Reservation
}

const PreDemandCardNotPaid = ({ reservation }: ConfirmedCardProps) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  // Sélectionner les détails de notification correspondant à cette réservation
  const notifDetails = useAppSelector((state) => state.ui.notifDetails)
  const reservationNotification = notifDetails.find(
    (notif) => notif.reservationId === reservation.id,
  )

  const showPaymentBadge = reservationNotification?.pendingServiceFees || false
  const showChatBadge = reservationNotification?.unreadMessages || false

  const handlePaymentClick = async () => {
    setIsLoading(true)
    dispatch(setReservationType(reservation.reservationType))
    try {
      const serviceFees = 5000
      const feesType = 'serviceFees'

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
        {/* Bouton pour payer les frais de service avec badge conditionnel */}
        <Badge
          badgeContent={showPaymentBadge ? '!' : null}
          color="error"
          invisible={!showPaymentBadge}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <button
            onClick={handlePaymentClick}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400 w-full"
            disabled={isLoading}
          >
            {isLoading
              ? 'Création du paiement...'
              : 'Payer les frais de service'}
          </button>
        </Badge>

        {/* Bouton pour accéder au chat avec badge conditionnel */}
        <Badge
          badgeContent={showChatBadge ? '!' : null}
          color="error"
          invisible={!showChatBadge}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Link
            to={`/client-dashboard/reservationSpace/${reservation.id}`}
            type="button"
            className="relative p-2 inline-flex items-center w-full justify-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            <span className="inline-flex items-center gap-x-2">
              Accéder au chat <IoChatboxOutline />
            </span>
          </Link>
        </Badge>
      </div>
    </div>
  )
}

export default PreDemandCardNotPaid
