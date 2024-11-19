import { IoChatboxOutline } from 'react-icons/io5'
import { Reservation } from '../../../pages/ClientDashboard'
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'
import { BiTime } from 'react-icons/bi'

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
    <div className="flex rounded-sm h-full p-6 flex-col  bg-slate-200 max-w-sm">
      <div className="flex items-center">
        <h2 className="font-bold text-secondaryRegularBlue text-xl">
          Pré-demande
        </h2>
        <BiTime className="text-secondaryRegularBlue text-3xl ml-auto" />
      </div>
      <p className="text-gray-400 font-thin text-lg">
        # {reservation.reservationShortId}
      </p>
      <p className="text-secondaryRegularBlue my-2 text-sm">
        Votre demande est en attente de confirmation. Si nous avons besoin de
        précisions, nous vous contacterons via le chat. Vous pouvez également
        nous écrire pour toute question ou information complémentaire.{' '}
      </p>
      <div className="mt-auto">
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
            className="p-2 inline-flex items-center w gap-x-2 rounded-sm border border-gray-200 bg-white text-secondaryRegularBlue shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
