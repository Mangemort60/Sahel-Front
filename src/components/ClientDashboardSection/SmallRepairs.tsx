import { motion } from 'framer-motion'
import { Reservation } from '../../pages/ClientDashboard'
import SmallRepairsCard from '../ClientDashboardSection/Cards/PreDemandeCard'

interface SmallRepairsProps {
  reservations: Reservation[]
}

const variants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

const SmallRepairs = ({ reservations }: SmallRepairsProps) => {
  const smallRepairsReservations = reservations.filter(
    (reservation) => reservation.reservationType === 'petits-travaux',
  )

  return (
    <div className="flex flex-wrap gap-4 m-auto h-auto">
      {smallRepairsReservations.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>Vous n'avez aucune réservation pour le moment.</p>
        </div>
      ) : (
        smallRepairsReservations.map((reservation) => (
          <motion.div
            key={reservation.id}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="w-full sm:w-auto"
          >
            <SmallRepairsCard reservation={reservation} />
          </motion.div>
        ))
      )}
    </div>
  )
}

export default SmallRepairs
