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
import { useTranslation } from 'react-i18next'

export const StripeCheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [devisAmount, setDevisAmount] = useState<number | null>(null)
  const { t } = useTranslation('payment')
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const location = useLocation()
  const reservationType = useAppSelector((state) => state.form.reservationType)
  const { clientSecret, reservationId, devisId } = location.state || {}
  const cleaning = useAppSelector((state) => state.form.formData.cleaning)
  const cooking = useAppSelector((state) => state.form.formData.cooking)
  const numberOfFloors = cleaning?.numberOfFloors
  const sizeRange = cleaning?.sizeRange
  const fruitBasketSelected = cleaning?.fruitBasketSelected
  const beforeOrAfter = cleaning?.beforeOrAfter
  const address = cooking?.address
  const period = cooking?.period
  const numberOfPeople = cooking?.numberOfPeople
  const quote = useAppSelector((state) => state.form.quote)
  const serviceStartDate = useAppSelector(
    (state) => state.form.serviceStartDate,
  )

  const formatSizeRange = (sizeRange: string | undefined) => {
    switch (sizeRange) {
      case 'lessThan40':
        return t('cleaning.range1')
      case 'from40to80':
        return t('cleaning.range2')
      case 'from80to120':
        return t('cleaning.range3')
      case 'moreThan120':
        return t('cleaning.range4')
      default:
        return sizeRange
    }
  }

  const formatPeriod = (period: string | undefined) => {
    switch (period) {
      case 'journee':
        return t('cooking.period.day')
      case 'soirMidi':
        return t('cooking.period.eveningLunch')
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
        <div className="w-2 h-2"></div>
        <Button
          hoverColor={'hover:bg-secondaryLightBlue'}
          bgColor={'bg-secondaryRegularBlue'}
          type="submit"
          label={t('confirm')}
          isLoading={isLoading}
          textColor="text-white"
        />
      </form>
      <div className="flex flex-col gap-4 sm:w-96">
        <h2 className="font-semibold text-xl border-b-2 py-2">
          {t('summaryTitle')}
        </h2>

        {reservationType === 'ménage' && (
          <>
            <div className="flex justify-between">
              <p>{t('cleaning.floors')}</p>
              <p className="text-gray-500">{numberOfFloors}</p>
            </div>
            <div className="flex justify-between">
              <p>{t('cleaning.area')}</p>
              <p className="text-gray-500">{formatSizeRange(sizeRange)}</p>
            </div>
            <div className="flex justify-between">
              <p>{t('cleaning.fruit')}</p>
              <p className="text-gray-500">
                {fruitBasketSelected ? t('yes') : t('no')}
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                {t('cleaning.timing')}{' '}
                {beforeOrAfter === 'before' ? t('before') : t('after')}{' '}
                {t('cleaning.arrival')}
              </p>
            </div>
            <div className="flex justify-between border-b-2">
              <p>{t('cleaning.date')}</p>
              <p className="text-gray-500 mb-2">
                {dayjs(serviceStartDate).format('DD/MM/YYYY')}
              </p>
            </div>
          </>
        )}

        {reservationType === 'cuisine' && (
          <>
            <div className="flex justify-between">
              <p>{t('cooking.address')}</p>
              <p className="text-gray-500">{address}</p>
            </div>
            <div className="flex justify-between">
              <p>{t('cooking.period.label')}</p>
              <p className="text-gray-500">{formatPeriod(period)}</p>
            </div>
            <div className="flex justify-between">
              <p>{t('cooking.people')}</p>
              <p className="text-gray-500">
                {formatNumberOfPeople(numberOfPeople)}
              </p>
            </div>
            <div className="flex justify-between border-b-2">
              <p>{t('cooking.date')}</p>
              <p className="text-gray-500 mb-2">
                {dayjs(serviceStartDate).format('DD/MM/YYYY')}
              </p>
            </div>
          </>
        )}

        {reservationType === 'petits-travaux' && (
          <>
            <div className="flex justify-between">
              <p>
                {devisAmount
                  ? t('smallRepairs.priceTitleDevis')
                  : t('smallRepairs.priceTitleServiceFee')}
              </p>
            </div>
          </>
        )}

        <div className="flex justify-between py-2">
          <p className="font-semibold">{t('total')}</p>
          {devisId && devisAmount ? (
            <p>{devisAmount} €</p>
          ) : reservationType === 'petits-travaux' ? (
            <p>19,90 €</p>
          ) : (
            <p>{quote} €</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StripeCheckoutForm
