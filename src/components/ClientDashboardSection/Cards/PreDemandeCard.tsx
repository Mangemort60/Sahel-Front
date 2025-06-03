import { IoChatboxOutline } from 'react-icons/io5'
import { Reservation } from '../../../pages/ClientDashboard'
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'
import { BiWrench } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

interface SmallRepairsCardProps {
  reservation: Reservation
}

const SmallRepairsCard = ({ reservation }: SmallRepairsCardProps) => {
  const notifDetails = useAppSelector((state) => state.ui.notifDetails)
  const reservationNotification = notifDetails.find(
    (notif) => notif.reservationId === reservation.id,
  )
  const showChatBadge = reservationNotification?.unreadMessages || false
  const { t } = useTranslation('clientDashboard')
  return (
    <div className="flex rounded-sm h-full p-6 flex-col bg-slate-200 max-w-sm">
      <div className="flex items-center">
        <h2 className="font-bold text-secondaryRegularBlue text-xl">
          Petits travaux
        </h2>
        <BiWrench className="text-secondaryRegularBlue text-3xl ml-auto" />
      </div>
      <p className="text-gray-400 font-thin text-lg">
        # {reservation.reservationShortId}
      </p>
      <p className="text-secondaryRegularBlue dark:text-gray-300 mt-2">
        {t('history.address')} : {reservation.address}
      </p>
      <p className="text-secondaryRegularBlue dark:text-gray-300 mb-4">
        {t('history.city')} : {reservation.city}
      </p>
      <div className="mt-auto w-52">
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

export default SmallRepairsCard
