import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '../common/Button' // Assurez-vous que le chemin d'importation est correct
import { useDispatch } from 'react-redux'
import { setCurrentStep } from '../../redux/slices/formSlice'

export const StripeCheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(setCurrentStep('form'))

    if (!stripe || !elements) {
      console.log("Stripe.js hasn't loaded yet.")
      return
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/payment-status',
      },
    })

    if (result.error) {
      console.error('PAIEMENT ERROR ', result.error.message)
    } else {
      console.log('Payment processed or in process')
    }
  }

  return (
    <div className="w-1/2 m-auto">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement />
        <Button
          bgColor="bg-blue-900"
          hoverColor="bg-blue-500"
          type="submit"
          label="Payer"
        />
      </form>
    </div>
  )
}

export default StripeCheckoutForm
