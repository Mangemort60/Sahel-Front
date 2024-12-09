import { Devis, Reservation } from '../../pages/ClientDashboard'
import { motion } from 'framer-motion'

// Composants de card
import PreDemandeCard from '../ClientDashboardSection/Cards/PreDemandeCard'
import ConfirmedNotPaidCard from './Cards/PreDemandCardNotPaid'
import CancelledCard from '../ClientDashboardSection/Cards/CancelledCard'
import CompletedCard from '../ClientDashboardSection/Cards/CompletedCard'
import DevisNotPaidCard from './Cards/DevisNotPaidCard'
import DevisPaidCard from './Cards/DevisPaidCard'
import PreDemandCardNotPaid from './Cards/PreDemandCardNotPaid'
import PreDemandePaidCard from './Cards/PreDemandePaidCard'

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

  return (
    <div className="flex flex-wrap gap-4 m-auto h-auto">
      {/* <PreDemandCardNotPaid reservation="4554788" />
      <PreDemandePaidCard message="Message factice" reservation="1234567" />
      <DevisNotPaidCard reservation="1234567" devis={{ amount: 125 }} />
      <DevisPaidCard devis={{ amount: 150 }} reservation="7654321" />
      <CompletedCard reservation="9876543" devis={{ amount: 125 }} />
      <CancelledCard reservation="5678901" />{' '} */}
      {smallRepairsReservations.length > 0 ? (
        smallRepairsReservations.map((reservation) => {
          return (
            <motion.div
              key={reservation.id}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
              className=""
            >
              {(() => {
                switch (reservation.bookingStatus) {
                  case 'pré-demande':
                    return <PreDemandeCard reservation={reservation} />

                  case 'confirmé':
                    // Frais de service non payés
                    if (
                      reservation.paymentStatus ===
                      'en attente de paiement des frais de service'
                    ) {
                      return <PreDemandCardNotPaid reservation={reservation} />
                    }
                    // Frais de service payés
                    else if (
                      reservation.paymentStatus === 'frais de service payés'
                    ) {
                      // Clés non reçues
                      if (!reservation.keyReceived) {
                        return (
                          <PreDemandePaidCard
                            reservation={reservation}
                            message="Les frais de service ont été payés. En attente de réception des clés."
                          />
                        )
                      }
                      // Clés reçues
                      else if (reservation.keyReceived) {
                        // Afficher les devis s'ils existent
                        if (reservation.devis && reservation.devis.length > 0) {
                          // Boucle pour afficher chaque devis
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
                    return <CompletedCard reservation={reservation} />

                  default:
                    return <p>Statut de réservation non pris en charge.</p>
                }
              })()}
            </motion.div>
          )
        })
      ) : (
        <p className="text-white">
          Aucune réservation "petits-travaux" trouvée.
        </p>
      )}
    </div>
  )
}

export default SmallRepairs
