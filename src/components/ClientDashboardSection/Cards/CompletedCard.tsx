import React from 'react'
import { Reservation, Devis } from '../../../pages/ClientDashboard'
import { FaCheckCircle } from 'react-icons/fa' // Icône pour indiquer que la prestation est terminée
import Badge from '@mui/material/Badge'
import { Link } from 'react-router-dom'
import { IoChatboxOutline } from 'react-icons/io5'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'

interface CompletedCardProps {
  reservation: Reservation
  devis: Devis
}

const CompletedCard: React.FC<CompletedCardProps> = ({
  reservation,
  devis,
}) => {
  const notifDetails = useAppSelector((state) => state.ui.notifDetails)

  const reservationNotification = notifDetails.find(
    (notif) => notif.reservationId === reservation.id,
  )

  const showChatBadge = reservationNotification?.unreadMessages || false

  return (
    <div className="flex rounded-sm h-auto p-6 flex-col bg-secondaryLightGreen max-w-sm">
      {/* Titre et icône */}
      <div className="flex items-center">
        <h2 className="font-bold text-secondaryRegularBlue text-xl">
          Prestation terminée
        </h2>
        <FaCheckCircle className="text-green-500 text-3xl ml-auto" />
      </div>

      {/* Numéro de réservation */}
      <p className="text-gray-400 font-thin text-lg">
        #{reservation.reservationShortId}
      </p>

      <div className="my-auto">
        {/* Texte explicatif */}
        <p className="text-secondaryRegularBlue my-2 text-sm">
          La prestation a été réalisée avec succès. Vous pouvez consulter le
          rapport des travaux ci dessous.
        </p>
      </div>

      {/* Boutons */}
      <div className="flex flex-col gap-2 w-52 mt-auto">
        <a
          href={reservation.finalReportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          <button className="bg-secondaryRegularBlue text-white p-2 rounded-sm hover:bg-secondaryRegularBlue w-full text-sm">
            Voir le rapport final
          </button>
        </a>

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

export default CompletedCard
