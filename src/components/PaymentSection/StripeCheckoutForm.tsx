import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '../common/Button'
import { useDispatch } from 'react-redux'
import { setCurrentStep } from '../../redux/slices/formSlice'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { useEffect, useState } from 'react'
import getSiteUrl from '../../utils/getSiteUrl'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export const StripeCheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [devisAmount, setDevisAmount] = useState<number | null>(null)
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const location = useLocation()
  const reservationType = useAppSelector((state) => state.form.reservationType)
  const { clientSecret, reservationId, devisId } = location.state || {}
  // Récupérer les données du formulaire et vérifier s'ils existent
  const cleaning = useAppSelector((state) => state.form.formData.cleaning)
  const cooking = useAppSelector((state) => state.form.formData.cooking)
  const numberOfFloors = cleaning?.numberOfFloors
  const sizeRange = cleaning?.sizeRange
  const fruitBasketSelected = cleaning?.fruitBasketSelected
  const beforeOrAfter = cleaning?.beforeOrAfter
  const address = cleaning?.address

  const period = cooking?.period
  const numberOfPeople = cooking?.numberOfPeople
  const quote = useAppSelector((state) => state.form.quote)
  const serviceStartDate = useAppSelector(
    (state) => state.form.serviceStartDate,
  )

  const formatSizeRange = (sizeRange: string | undefined) => {
    switch (sizeRange) {
      case 'lessThan40':
        return 'Moins de 40m²'
      case 'from40to80':
        return 'Entre 40m² et 80m²'
      case 'from80to120':
        return 'Entre 80m² et 120m²'
      case 'moreThan120':
        return 'Plus de 120m²'
      default:
        return sizeRange
    }
  }

  const formatPeriod = (period: string | undefined) => {
    switch (period) {
      case 'journee':
        return 'Journée'
      case 'soirMidi':
        return 'Soir/Midi'
      default:
        return period
    }
  }

  const formatNumberOfPeople = (numberOfPeople: string | undefined) => {
    switch (numberOfPeople) {
      case '1_8':
        return '1 à 8 personnes'
      case '9_plus':
        return 'Plus de 8 personnes'
      default:
        return numberOfPeople
    }
  }
  useEffect(() => {
    const fetchDevisAmount = async () => {
      if (devisId) {
        const db = getFirestore()
        const devisRef = doc(
          db,
          `reservations/${reservationId}/devis/${devisId}`,
        )
        const devisSnap = await getDoc(devisRef)
        if (devisSnap.exists()) {
          setDevisAmount(devisSnap.data().amount)
        }
      }
    }
    fetchDevisAmount()
  }, [reservationId, devisId])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    dispatch(setCurrentStep('form'))
    const siteUrl = getSiteUrl()

    if (!stripe || !elements) {
      console.log("Stripe.js hasn't loaded yet.")
      setIsLoading(false)
      return
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${siteUrl}/payment-status?reservationId=${encodeURIComponent(reservationId)}&reservationType=${encodeURIComponent(reservationType)}&devisId=${encodeURIComponent(devisId)}`,
        },
      })

      if (result.error) {
        console.error('PAIEMENT ERROR ', result.error.message)
      } else {
        console.log('Payment processed or in process')
      }
    } catch (error) {
      console.error('Error during payment confirmation: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-8 flex justify-center gap-8 sm:flex-row flex-col m-2">
      <form id="payment-form" onSubmit={handleSubmit} className="sm:w-1/3 ">
        <PaymentElement />
        <Button
          hoverColor={'hover:bg-secondaryLightBlue'}
          bgColor={'bg-secondaryRegularBlue'}
          type="submit"
          label="Valider et payer"
          isLoading={isLoading}
          textColor="text-white"
        />
      </form>
      <div className="flex flex-col gap-4 sm:w-96">
        <h2 className="font-semibold text-xl  border-b-2 py-2">
          Récapitulatif de votre commande
        </h2>

        {reservationType === 'ménage' && (
          <>
            <div className="flex justify-between">
              <p>Nombre d'étages</p>
              <p className="text-gray-500">{numberOfFloors}</p>
            </div>
            <div className="flex justify-between">
              <p>Surface</p>
              <p className="text-gray-500">{formatSizeRange(sizeRange)}</p>
            </div>
            <div className="flex justify-between">
              <p>Panier de fruits</p>
              <p className="text-gray-500">
                {fruitBasketSelected ? 'oui' : 'non'}
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                Le nettoyage sera fait{' '}
                {beforeOrAfter === 'before' ? 'avant' : 'après'} votre arrivée
              </p>
            </div>
            <div className="flex justify-between border-b-2">
              <p>Date du nettoyage prévu</p>
              <p className="text-gray-500 mb-2">
                {dayjs(serviceStartDate).format('DD/MM/YYYY')}
              </p>
            </div>
          </>
        )}

        {reservationType === 'cuisine' && (
          <>
            <div className="flex justify-between">
              <p>Adresse</p>
              <p className="text-gray-500">{address}</p>
            </div>
            <div className="flex justify-between">
              <p>Période souhaitée</p>
              <p className="text-gray-500">{formatPeriod(period)}</p>
            </div>
            <div className="flex justify-between">
              <p>Nombre de personnes</p>
              <p className="text-gray-500">
                {formatNumberOfPeople(numberOfPeople)}
              </p>
            </div>
            <div className="flex justify-between border-b-2">
              <p>Date de la prestation prévue</p>
              <p className="text-gray-500 mb-2">
                {dayjs(serviceStartDate).format('DD/MM/YYYY')}
              </p>
            </div>
          </>
        )}

        {reservationType === 'petits-travaux' && (
          <>
            <div className="flex justify-between">
              {devisAmount ? <p>Devis</p> : <p>Frais de service</p>}
            </div>
          </>
        )}

        <div className="flex justify-between py-2">
          <p className="font-semibold">Prix total TTC</p>
          {devisId && devisAmount ? (
            <p>{devisAmount} €</p>
          ) : reservationType === 'petits-travaux' ? (
            <p>Frais de service : 19,90 €</p>
          ) : (
            <p>{quote} €</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StripeCheckoutForm
