import { useAppSelector } from '../hooks/useAppSelector'

export const useReservationData = () => {
  const formData = useAppSelector((state) => state.form.formData)
  const reservationType = useAppSelector((state) => state.form.reservationType) // Récupérer le type de réservation
  const quote = useAppSelector((state) => state.form.quote)
  const serviceDate = useAppSelector((state) => state.form.serviceDate)
  const name = useAppSelector((state) => state.user.name)
  const firstName = useAppSelector((state) => state.user.firstName)
  const shortId = useAppSelector((state) => state.user.shortId)
  const email = useAppSelector((state) => state.user.email)

  // Créer un objet de données de réservation en fonction du type de réservation
  let reservationData: any = {
    quote,
    serviceDate,
    name,
    firstName,
    shortId,
    email,
    agent: '',
  }

  // Ajouter les données spécifiques au type de service choisi
  if (reservationType === 'ménage') {
    reservationData = {
      ...reservationData,
      ...formData.cleaning, // Ajout des données de nettoyage
    }
  } else if (reservationType === 'cuisine') {
    reservationData = {
      ...reservationData,
      ...formData.cooking, // Ajout des données de cuisine
    }
  } else if (reservationType === 'petits-travaux') {
    reservationData = {
      ...reservationData,
      ...formData.smallRepairs, // Ajout des données des petits travaux
    }
  }

  return reservationData // Retourner les données spécifiques au service
}
