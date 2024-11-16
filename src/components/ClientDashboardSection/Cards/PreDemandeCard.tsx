import { IoChatboxOutline } from 'react-icons/io5'
import { Reservation } from '../../../pages/ClientDashboard'
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'

interface PredemandCardProps {
  reservation: Reservation
}

const PreDemandeCard = ({ reservation }: PredemandCardProps) => {
  // Sélectionner les détails de notification correspondant à cette réservation
  const notifDetails = useAppSelector((state) => state.ui.notifDetails)
  const reservationNotification = notifDetails.find(
    (notif) => notif.reservationId === reservation.id,
  )

  // Vérifie si des messages non lus sont présents
  const showChatBadge = reservationNotification?.unreadMessages || false

  return (
    <div className="flex rounded-lg h-48 p-8 flex-col justify-between bg-gray-300 hover:bg-gray-200 max-w-sm">
      <h2 className="text-black font-bold text-xl">
        Demande n° {reservation.reservationShortId}
      </h2>
      <p className="text-gray-700">
        Votre demande est en attente de confirmation.
      </p>
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
      {/* Pas d'action pour l'utilisateur */}
    </div>
  )
}

export default PreDemandeCard
