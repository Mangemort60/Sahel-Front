import React from 'react'
import { Reservation, Devis } from '../../../pages/ClientDashboard'
import { BiTime } from 'react-icons/bi'
import Badge from '@mui/material/Badge'
import { Link } from 'react-router-dom'
import { IoChatboxOutline } from 'react-icons/io5'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'

interface ServiceBookedProps {
  reservation: Reservation
  devis: Devis // Le devis associé
}

const ServiceBooked: React.FC<ServiceBookedProps> = ({
  reservation,
  devis,
}) => {
  const notifDetails = useAppSelector((state) => state.ui.notifDetails)

  const reservationNotification = notifDetails.find(
    (notif) => notif.reservationId === reservation.id,
  )

  const showChatBadge = reservationNotification?.unreadMessages || false

  return (
    <div className="flex rounded-sm h-auto p-6 flex-col bg-slate-200 max-w-sm">
      {/* Titre et icône */}
      <div className="flex items-center">
        <h2 className="font-bold text-secondaryRegularBlue text-xl">
          Service Réservé
        </h2>
        <BiTime className="text-secondaryRegularBlue text-3xl ml-auto" />
      </div>

      {/* Numéro de réservation */}
      <p className="text-gray-400 font-thin text-lg">
        #{reservation.reservationShortId}
      </p>

      <div className="my-auto">
        {/* Texte explicatif */}
        <p className="text-secondaryRegularBlue my-2 text-sm">
          Votre créneau a été fixé avec succès. L'intervention est prévue entre{' '}
          <strong>{reservation.serviceDates.startDate}</strong> et{' '}
          <strong>{reservation.serviceDates.endDate}</strong>.
        </p>
        {/* Montant du devis */}
        <p className="text-secondaryRegularBlue text-sm mb-2">
          <strong>Montant :</strong> {devis.amount} €
        </p>
      </div>

      {/* Boutons */}
      <div className="flex flex-col gap-2 w-52 mt-auto">
        {/* Lien pour voir le devis */}
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
            className="relative p-2 inline-flex items-center w-52 justify-center gap-x-2 rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 text-sm"
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

export default ServiceBooked
