import React from 'react'
import { Reservation, Devis } from '../../../pages/ClientDashboard'
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'
import { IoChatboxOutline } from 'react-icons/io5'

interface DevisPaidCardProps {
  reservation: Reservation
  devis: Devis // Le devis qui a été payé
}

const DevisPaidCard: React.FC<DevisPaidCardProps> = ({
  reservation,
  devis,
}) => {
  // Sélectionner les détails de notification correspondant à cette réservation
  const notifDetails = useAppSelector((state) => state.ui.notifDetails)
  const reservationNotification = notifDetails.find(
    (notif) => notif.reservationId === reservation.id,
  )

  // Vérifie si des messages non lus sont présents
  const showChatBadge = reservationNotification?.unreadMessages || false

  return (
    <div className="flex rounded-lg space-y-2 p-8 flex-col justify-between bg-green-200 hover:bg-green-100 max-w-sm">
      <h2 className="text-black font-bold text-xl">
        Devis Payé pour la Réservation n° {reservation.reservationShortId}
      </h2>
      <p className="text-gray-700">
        Le devis a été payé avec succès, les travaux sont en cours ou seront
        bientôt programmés.
      </p>
      <p className="text-gray-700">
        <strong>Montant du Devis :</strong> {devis.amount} €
      </p>
      <p className="text-gray-700">
        <strong>Date de Création :</strong>{' '}
        {new Date(devis.createdAt).toLocaleDateString('fr-FR')}
      </p>
      <a
        href={devis.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Voir le Devis
      </a>
      <div>
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
            className="p-2 inline-flex items-center w gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            Accéder au chat <IoChatboxOutline />
          </Link>
        </Badge>
      </div>
    </div>
  )
}

export default DevisPaidCard
