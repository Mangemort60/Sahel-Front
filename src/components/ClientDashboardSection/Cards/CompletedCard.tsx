import { Reservation } from '../../../pages/ClientDashboard'

interface CompletedCardProps {
  reservation: Reservation
}

const CompletedCard = ({ reservation }: CompletedCardProps) => {
  return (
    <div className="flex rounded-lg h-52 max-w-sm p-8 flex-col bg-green-500 hover:bg-green-400 dark:bg-gray-800">
      <h2 className="text-white dark:text-white font-bold text-xl">
        Demande n° {reservation.reservationShortId}
      </h2>
      <hr />
      <h2 className="text-white dark:text-white font-bold text-xl mt-2">
        Status : terminé
      </h2>
      <p className="text-white dark:text-gray-300">
        Le travail a été complété avec succès.
      </p>
      <p className="text-white dark:text-gray-300 my-2">
        Merci d'avoir utilisé notre service. Si vous avez des questions,
        n'hésitez pas à nous contacter.
      </p>
    </div>
  )
}

export default CompletedCard
