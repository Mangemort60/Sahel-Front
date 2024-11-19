import React, { useState } from 'react'
import { Reservation, Devis } from '../../../pages/ClientDashboard'
import { Link, useNavigate } from 'react-router-dom'
import { createPaymentIntent } from '../../../services/createPaymentIntent'
import dayjs from 'dayjs' // Import de dayjs pour manipuler les dates
import Badge from '@mui/material/Badge'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'
import { IoChatboxOutline } from 'react-icons/io5'
import { FaExclamationCircle } from 'react-icons/fa'

interface DevisNotPaidCardProps {
  reservation: Reservation
  devis: Devis // Le devis spécifique à payer
}

const DevisNotPaidCard: React.FC<DevisNotPaidCardProps> = ({
  reservation,
  devis,
}) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  // Utilisation de dayjs pour vérifier si le devis est expiré
  const currentDate = dayjs()
  const validUntilDate = dayjs(devis.validUntil) // Supposant que `devis.validUntil` est une chaîne de date valide
  const isExpired = currentDate.isAfter(validUntilDate)

  // Sélection des détails de notification pour cette réservation spécifique
  const notifDetails = useAppSelector((state) => state.ui.notifDetails)
  const reservationNotification = notifDetails.find(
    (notif) => notif.reservationId === reservation.id,
  )

  const showPaymentBadge =
    reservationNotification?.pendingInvoicePayments || false
  const showChatBadge = reservationNotification?.unreadMessages || false

  const handlePaymentClick = async () => {
    setIsLoading(true)
    try {
      const { clientSecret } = await createPaymentIntent(
        devis.amount * 100, // Convertir en centimes si nécessaire
        reservation.email,
        reservation.shortId,
        reservation.name,
        'devisPayment', // Type de paiement, ici 'devis'
        reservation.id,
        devis.id,
      )

      navigate('/stripe-checkout-form', {
        state: {
          clientSecret,
          reservationId: reservation.id,
          devisId: devis.id,
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
      {/* Titre et icône */}
      <div className="flex items-center">
        <h2 className="font-bold text-secondaryRegularBlue text-xl">
          Devis en attente de paiement
        </h2>
        <FaExclamationCircle className="text-secondaryRegularBlue text-3xl ml-auto" />
      </div>

      {/* Numéro de réservation */}
      <p className="text-gray-400 font-thin text-lg">
        #{reservation.reservationShortId}
      </p>

      {/* Texte explicatif */}
      <p className="text-secondaryRegularBlue my-2 text-sm">
        Veuillez payer le montant du devis pour commencer les travaux.
      </p>

      {/* Montant du devis */}
      <p className="text-secondaryRegularBlue text-sm mb-2">
        <strong>Montant :</strong> {devis.amount} €
      </p>

      {/* Date de validité */}
      <p className="text-secondaryRegularBlue text-sm">
        <strong>Date de validité :</strong>{' '}
        {validUntilDate.format('DD/MM/YYYY')}
      </p>

      {/* Lien pour voir le devis */}

      {/* Boutons */}
      <div className="flex flex-col gap-2 w-52 mt-4">
        <a
          href={devis.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          <button className="bg-secondaryRegularBlue text-white p-2 rounded-sm hover:bg-secondaryRegularBlue w-full text-sm">
            Voir le devis
          </button>
        </a>
        {isExpired ? (
          // Si le devis est expiré
          <p className="text-red-500 font-bold text-sm">
            Ce devis est expiré et ne peut plus être payé.
          </p>
        ) : (
          // Bouton de paiement avec badge conditionnel
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
              className="bg-secondaryDarkBlue text-white p-2 rounded-sm hover:bg-secondaryRegularBlue w-full text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Création du paiement...' : 'Payer le devis'}
            </button>
          </Badge>
        )}

        {/* Bouton pour accéder au chat */}
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
            className="relative p-2 inline-flex items-center w-full justify-center gap-x-2 rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 text-sm"
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

export default DevisNotPaidCard
