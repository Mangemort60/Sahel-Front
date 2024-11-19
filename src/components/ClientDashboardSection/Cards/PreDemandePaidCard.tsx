import { Link } from 'react-router-dom'
import { Reservation } from '../../../pages/ClientDashboard'
import { IoChatboxOutline } from 'react-icons/io5'
import Badge from '@mui/material/Badge'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'
import { FaCheck } from 'react-icons/fa'
import { BiTime } from 'react-icons/bi'

interface PreDemandePaidCardProps {
  reservation: Reservation
  message: string
}

const PreDemandePaidCard = ({ reservation }: PreDemandePaidCardProps) => {
  // Sélectionner les détails de notification pour la réservation actuelle
  const notifDetails = useAppSelector((state) => state.ui.notifDetails)
  const reservationNotification = notifDetails.find(
    (notif) => notif.reservationId === reservation.id,
  )

  // Afficher le badge si des messages non lus existent
  const showChatBadge = reservationNotification?.unreadMessages || false

  return (
    <div className="flex rounded-sm h-auto p-6 flex-col justify-between  bg-slate-200 max-w-sm">
      {/* Titre et icône */}
      <div className="flex items-center">
        <h2 className="font-bold text-secondaryRegularBlue text-xl">
          {reservation.keyReceived ? 'Clés reçues' : `Frais de service payés`}
        </h2>
        <BiTime className="text-secondaryRegularBlue text-3xl ml-auto" />
      </div>
      <p className="text-gray-400 font-thin text-lg">
        # {reservation.reservationShortId}
      </p>
      {/* Sous-titre */}

      {/* Texte conditionnel */}
      <p className="text-secondaryRegularBlue my-4 text-sm">
        {reservation.keyReceived
          ? 'Nous avons bien reçu vos clés, nous allons effectuer la visite et vous transmettre un devis très bientôt.'
          : `Les frais de service ont bien été réglés. Nous vous invitons à nous transmettre vos clés pour avancer dans le processus. Les instructions détaillées pour l 'envoi vous ont été communiquées par email.`}
      </p>

      {/* Bouton avec badge pour accéder au chat */}
      <div className="flex flex-col gap-2 w-52">
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

export default PreDemandePaidCard
