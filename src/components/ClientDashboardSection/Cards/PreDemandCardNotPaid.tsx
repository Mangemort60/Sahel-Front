import { Link, useNavigate } from 'react-router-dom'
import { Reservation } from '../../../pages/ClientDashboard'
import { IoChatboxOutline } from 'react-icons/io5'
import { createPaymentIntent } from '../../../services/createPaymentIntent'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'
import { setReservationType } from '../../../redux/slices/formSlice'
import Badge from '@mui/material/Badge'
import { FaCheck, FaExclamationCircle } from 'react-icons/fa'

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
    <div className="flex rounded-sm h-auto p-6 flex-col justify-between bg-slate-200 max-w-sm">
      <div className="flex items-center">
        <h2 className="font-bold text-secondaryRegularBlue text-xl">
          Pré-demande confirmée
        </h2>
        <FaExclamationCircle className="text-secondaryRegularBlue text-3xl ml-auto" />{' '}
      </div>
      <p className="text-gray-400 font-thin text-lg">
        # {reservation.reservationShortId}
      </p>
      <p className="text-secondaryRegularBlue my-2 text-sm">
        Les frais de service couvrent les premières étapes nécessaires à la
        réalisation de votre projet. Ils incluent notamment :
      </p>
      <ul className="list-disc pl-5 text-secondaryRegularBlue my-6 text-sm">
        <li>L 'envoi et la réception sécurisée de vos clés.</li>
        <li>
          La planification et la réalisation d'une visite sur place pour évaluer
          les travaux.
        </li>
        <li>
          La coordination des premières étapes administratives et logistiques.
        </li>
      </ul>
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
            className="bg-secondaryDarkBlue text-white p-2 rounded-sm hover:bg-secondaryRegularBlue w-full"
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
            className="relative p-2 inline-flex items-center w-full justify-center gap-x-2 rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
