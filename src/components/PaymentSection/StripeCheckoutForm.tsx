import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '../common/Button' // Assurez-vous que le chemin d'importation est correct
import { useDispatch } from 'react-redux'
import { setCurrentStep } from '../../redux/slices/formSlice'
import { useAppSelector } from '../../redux/hooks'
import { useState } from 'react'
import getSiteUrl from '../../utils/getSiteUrl'

export const StripeCheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()

  const { numberOfFloors, sizeRange, fruitBasketSelected, beforeOrAfter } =
    useAppSelector((state) => state.form.formData)

  const quote = useAppSelector((state) => state.form.quote)
  const serviceDate = useAppSelector((state) => state.form.serviceDate)

  const formatSizeRange = (sizeRange: string) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true) // Démarre le chargement avant la tentative de soumission
    dispatch(setCurrentStep('form'))
    const siteUrl = getSiteUrl()

    if (!stripe || !elements) {
      console.log("Stripe.js hasn't loaded yet.")
      setIsLoading(false) // Arrête le chargement si Stripe ou elements n'est pas chargé
      return
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${siteUrl}/payment-status`,
        },
      })

      if (result.error) {
        // Gère l'erreur de paiement
        console.error('PAIEMENT ERROR ', result.error.message)
      } else {
        // Paiement traité ou en cours de traitement
        console.log('Payment processed or in process')
      }
    } catch (error) {
      // Gère les erreurs potentielles dans la promesse confirmPayment
      console.error('Error during payment confirmation: ', error)
    } finally {
      // Arrête le chargement une fois la soumission traitée ou en cas d'erreur
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-8 flex justify-evenly gap-8 sm:flex-row flex-col m-2">
      <form id="payment-form" onSubmit={handleSubmit} className="sm:w-1/3 ">
        <PaymentElement />
        <Button
          hoverColor={'hover:bg-secondaryLightBlue'}
          bgColor={'bg-secondaryRegularBlue'}
          type="submit"
          label="Valider et payer"
          isLoading={isLoading}
        />
      </form>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl  border-b-2 py-2">
          Récapitulatif de votre commande
        </h2>
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
          <p className="text-gray-500">{fruitBasketSelected ? 'oui' : 'non'}</p>
        </div>
        <div className="flex justify-between">
          <p>
            Le nettoyage sera fait{' '}
            {beforeOrAfter === 'Before' ? 'avant' : 'après'} votre arrivée
          </p>
        </div>
        <div className="flex justify-between ">
          <p>Date du nettoyage prévu</p>
          <p className="text-gray-500">{serviceDate}</p>
        </div>
        <div className="flex justify-between  border-t-2 py-2">
          <p className="font-semibold">Prix total TTC </p>
          <p>{quote} €</p>
        </div>
      </div>
    </div>
  )
}

export default StripeCheckoutForm
