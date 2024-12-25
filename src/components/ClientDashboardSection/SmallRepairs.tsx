import { Devis, Reservation } from '../../pages/ClientDashboard'
import { motion } from 'framer-motion'

// Composants de carte
import PreDemandeCard from '../ClientDashboardSection/Cards/PreDemandeCard'
import PreDemandCardNotPaid from './Cards/PreDemandCardNotPaid'
import CancelledCard from '../ClientDashboardSection/Cards/CancelledCard'
import CompletedCard from '../ClientDashboardSection/Cards/CompletedCard'
import DevisNotPaidCard from './Cards/DevisNotPaidCard'
import DevisPaidCard from './Cards/DevisPaidCard'
import PreDemandePaidCard from './Cards/PreDemandePaidCard'
import ServiceBooked from './Cards/ServiceBooked'

interface SmallRepairsProps {
  reservations: Reservation[]
}

// Variantes d'animation pour chaque carte
const variants = {
  enter: { opacity: 0, x: 30 }, // Animation d'entrée (ex. : décalage à droite)
  center: { opacity: 1, x: 0 }, // État au centre
  exit: { opacity: 0, x: -30 }, // Animation de sortie (ex. : décalage à gauche)
}

const SmallRepairs = ({ reservations }: SmallRepairsProps) => {
  const smallRepairsReservations = reservations.filter(
    (reservation) => reservation.reservationType === 'petits-travaux',
  )

  console.log(
    'Réservations petits-travaux:',
    reservations.filter(
      (reservation) => reservation.reservationType === 'petits-travaux',
    ),
  )

  console.log(
    'smallRepairReservation lenght: ',
    smallRepairsReservations.length,
  )

  // // Affichage en cas de chargement ou de données manquantes
  // if (reservations.length === 0) {
  //   return (
  //     <p className="text-black text-center w-full">
  //       Aucune réservation "petits-travaux" trouvée.
  //     </p>
  //   )
  // }

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
            {(() => {
              // Vérifie si un créneau est défini et qu'il existe des devis
              if (
                reservation.serviceDates?.startDate &&
                reservation.serviceDates?.endDate &&
                reservation.devis &&
                reservation.devis.length > 0 &&
                reservation.bookingStatus != 'terminé'
              ) {
                // Trier les devis par date décroissante (assume qu'une propriété 'createdDate' existe)
                const mostRecentDevis = [...reservation.devis].sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )[0]

                return (
                  <ServiceBooked
                    reservation={reservation}
                    devis={mostRecentDevis}
                  />
                )
              }

              // Autres cas selon le statut
              switch (reservation.bookingStatus) {
                case 'pré-demande':
                  return <PreDemandeCard reservation={reservation} />

                case 'confirmé':
                  if (
                    reservation.paymentStatus ===
                    'en attente de paiement des frais de service'
                  ) {
                    return <PreDemandCardNotPaid reservation={reservation} />
                  } else if (
                    reservation.paymentStatus === 'frais de service payés'
                  ) {
                    if (!reservation.keyReceived) {
                      return (
                        <PreDemandePaidCard
                          reservation={reservation}
                          message="Les frais de service ont été payés. En attente de réception des clés."
                        />
                      )
                    } else if (reservation.keyReceived) {
                      if (reservation.devis && reservation.devis.length > 0) {
                        return reservation.devis.map((devis: Devis) => {
                          if (
                            devis.paymentStatus === 'en attente de paiement'
                          ) {
                            return (
                              <DevisNotPaidCard
                                key={devis.id}
                                reservation={reservation}
                                devis={devis}
                              />
                            )
                          } else if (devis.paymentStatus === 'payé') {
                            return (
                              <DevisPaidCard
                                key={devis.id}
                                reservation={reservation}
                                devis={devis}
                              />
                            )
                          } else {
                            return (
                              <p key={devis.id}>
                                Statut de devis non pris en charge.
                              </p>
                            )
                          }
                        })
                      } else {
                        return (
                          <PreDemandePaidCard
                            reservation={reservation}
                            message="Les frais de service ont été payés. Clés reçues."
                          />
                        )
                      }
                    }
                  } else {
                    return <p>Statut de paiement non pris en charge.</p>
                  }

                case 'annulé':
                  return <CancelledCard reservation={reservation} />

                case 'terminé':
                  const mostRecentCompletedDevis = [...reservation.devis].sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )[0]
                  return (
                    <CompletedCard
                      reservation={reservation}
                      devis={mostRecentCompletedDevis}
                    />
                  )

                default:
                  return <p>Statut de réservation non pris en charge.</p>
              }
            })()}
          </motion.div>
        ))
      )}
    </div>
  )
}

export default SmallRepairs
