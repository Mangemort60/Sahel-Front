import React, { useState } from 'react'
import { Reservation, Devis } from '../../../pages/ClientDashboard'
import { Link, useNavigate } from 'react-router-dom'
import { createPaymentIntent } from '../../../services/createPaymentIntent'
import dayjs from 'dayjs' // Import de dayjs pour manipuler les dates

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
    <div className="flex rounded-lg space-y-2 p-8 flex-col justify-between bg-yellow-300 hover:bg-yellow-200 max-w-sm">
      <h2 className="text-black font-bold text-xl">
        Devis en attente de paiement pour la réservation n°{' '}
        {reservation.reservationShortId}
      </h2>
      <p className="text-gray-700">
        Veuillez payer le montant du devis pour commencer les travaux.
      </p>
      <p className="text-gray-700">
        <strong>Montant :</strong> {devis.amount} €
      </p>

      {/* Afficher la date de validité formatée avec dayjs */}
      <p className="text-gray-700">
        <strong>Date de validité :</strong>{' '}
        {validUntilDate.format('DD/MM/YYYY')}
      </p>

      <a
        href={devis.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Voir le devis
      </a>

      <div className="flex flex-col gap-2 w-52">
        {isExpired ? (
          // Si le devis est expiré, afficher un message à la place du bouton de paiement
          <p className="text-red-500 font-bold">
            Ce devis est expiré et ne peut plus être payé.
          </p>
        ) : (
          // Sinon, afficher le bouton de paiement
          <button
            onClick={handlePaymentClick}
            className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-400"
            disabled={isLoading}
          >
            {isLoading ? 'Création du paiement...' : 'Payer le devis'}
          </button>
        )}

        <Link
          to={`/client-dashboard/reservationSpace/${reservation.id}`}
          type="button"
          className="p-2 inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          Accéder au chat
        </Link>
      </div>
    </div>
  )
}

export default DevisNotPaidCard
