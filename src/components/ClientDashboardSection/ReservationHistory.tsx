import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { Link } from 'react-router-dom'
import { Reservation } from '../../pages/ClientDashboard'
import { AnimatePresence, motion } from 'framer-motion'
import { IoChatboxOutline } from 'react-icons/io5'
import { Badge } from '@mui/material'

const variants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

interface ReservationHistoryProps {
  reservations: Reservation[]
}

export const ReservationHistory = ({
  reservations,
}: ReservationHistoryProps) => {
  const activeTab = useAppSelector((state) => state.ui.activeTab)

  // Récupération des notifications détaillées par réservation depuis le store Redux
  const notifDetails = useAppSelector((state) => state.ui.notifDetails)

  function getTabColorClasses(activeTab: string): string {
    const colorMap: { [key: string]: string } = {
      cuisine: 'bg-sahelPurpleTealDarker hover:bg-sahelPurpleTeal',
      ménage: 'bg-sahelBlueTealDarker hover:bg-sahelBlueTeal',
      works: 'bg-sahelFlashBlueDarker hover:bg-sahelFlashBlue',
    }
    return colorMap[activeTab] || 'bg-gray-200 hover:bg-gray-300'
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5 }}
        style={{ height: '100%' }}
        className="h-full"
      >
        <div>
          <div className="flex sm:flex-wrap sm:flex-row flex-col gap-4 m-auto">
            {reservations
              .filter(
                (reservation) => reservation.reservationType === activeTab,
              )
              .map((reservation) => {
                // Obtenez les détails des notifications pour cette réservation spécifique
                const reservationNotif = notifDetails.find(
                  (notif) => notif.reservationId === reservation.id,
                )
                const notificationCount =
                  reservationNotif?.notificationCount || 0

                return (
                  <div className="transition transform hover:scale-105 max-w-sm">
                    <div
                      className={`relative flex rounded-lg h-full dark:bg-gray-800 ${getTabColorClasses(
                        activeTab,
                      )} p-8 flex-col`}
                    >
                      <div className="flex items-center mb-3">
                        <h2 className="text-white dark:text-white font-bold text-xl">
                          Réservation n°{' '}
                          <span className="text-base font-thin">
                            {reservation.reservationShortId}
                          </span>
                        </h2>
                      </div>
                      <div className="flex flex-col justify-between flex-grow">
                        <p className="text-white dark:text-gray-300">
                          Montant : {reservation.quote}€
                        </p>
                        <p className="text-white dark:text-gray-300 mb-2">
                          Intervention prévue le : {reservation.serviceDate}
                        </p>
                        <hr className="border" />
                        <p className="text-white dark:text-gray-300 mt-2">
                          Adresse : {reservation.address}
                        </p>
                        <p className="text-white dark:text-gray-300">
                          Ville : {reservation.city}
                        </p>
                      </div>{' '}
                      {/* Badge de notification pour la carte de réservation */}
                      <Link
                        to={`/client-dashboard/reservationSpace/${reservation.id}`}
                        type="button"
                        className="relative mt-2 p-2 inline-flex items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        Accéder au chat <IoChatboxOutline />
                        {notificationCount > 0 && (
                          <Badge
                            badgeContent="!"
                            color="error"
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            className="absolute bottom-6 left-8"
                          />
                        )}{' '}
                      </Link>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
