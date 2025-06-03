import { useDispatch } from 'react-redux'
import { addressFormSchema } from '../../schemas/addressFormSchema'
import { Button } from '../common/Button'
import {
  CleaningFormData,
  CookingFormData,
  setCleaningFormData,
  setCookingFormData,
} from '../../redux/slices/formSlice'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { db } from '../../../firebase-config'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useReservationData } from '../../redux/hooks/useReservationData'
import { useState } from 'react'
// Typage des données du formulaire basé sur le schéma Zod
type FormData = z.infer<typeof addressFormSchema>

export const AddressForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const reservationType = useAppSelector((state) => state.form.reservationType)

  const { t } = useTranslation('form')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addressFormSchema),
  })
  const reservationBase = useReservationData()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isSubmitting) return
    if (!reservationBase.serviceStartDate) {
      alert('Veuillez sélectionner une date avant de soumettre.')
      return
    }

    if (typeof reservationBase.quote === 'number') {
      try {
        // Compter les réservations existantes pour ce shortId
        const q = query(
          collection(db, 'reservations'),
          where('shortId', '==', reservationBase.shortId),
        )
        const snapshot = await getDocs(q)
        const reservationCount = snapshot.size + 1
        const reservationShortId = `${reservationBase.shortId}-${reservationCount}`

        // Création de la réservation dans Firestore
        await addDoc(collection(db, 'reservations'), {
          ...reservationBase,
          ...data, // city, address, instructions...
          reservationType,
          reservationShortId,
          createdAt: new Date(),
          bookingStatus: 'en attente',
          paymentStatus: 'en attente de paiement',
          emails: {
            confirmationEmailSent: false,
            instructionsKeysEmailSent: false,
            defaultInstructionsEmailSent: false,
            serviceFeeConfirmationEmailSent: false,
            preRequestEmailSent: false,
          },
          chatStatus: false,
        })

        navigate('/confirmation')
      } catch (error) {
        console.error('Erreur lors de la création de la réservation :', error)
        alert('Une erreur est survenue. Veuillez réessayer.')
      }
    } else {
      alert('Montant invalide ou manquant.')
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 space-y-4 w-full"
    >
      <div>
        <label
          id="nbrOfFloors"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t('booking.address.city')}
        </label>
        <select
          {...register('city')}
          id="city"
          aria-placeholder="choisir"
          className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300"
        >
          <option value="Saïdia et ses alentours">
            {t('booking.cities.saidia')}
          </option>
          <option value="Berkane et ses alentours">
            {t('booking.cities.berkane')}
          </option>
          <option value="Ahfir et ses alentours">
            {t('booking.cities.ahfir')}
          </option>
          <option value="Ras El Ma et ses alentours">
            {t('booking.cities.rasElMa')}
          </option>
        </select>
        {errors.city && (
          <p className="text-red-600 text-xs">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t('booking.address.address')}
        </label>
        <input
          {...register('address')}
          className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300"
          type="text"
          name="address"
          id="address"
          placeholder={t('booking.address.addressPlaceholder')}
        />
        {errors.address && (
          <p className="text-red-600 text-xs">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address2"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t('booking.address.address2')}
        </label>
        <input
          {...register('address2')}
          className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300"
          type="text"
          name="address2"
          id="address2"
          placeholder={t('booking.address.address2Placeholder')}
        />
      </div>

      <div>
        <label
          htmlFor="specialInstructions"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t('booking.address.specialInstructions')}
        </label>
        <textarea
          {...register('specialInstructions')}
          className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300"
          name="specialInstructions"
          id="specialInstructions"
          rows={2}
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t('booking.address.phone')}
        </label>
        <input
          {...register('phone')}
          className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300"
          type="tel"
          name="phone"
          id="phone"
        />
        {errors.phone && (
          <p className="text-red-600 text-xs">{errors.phone.message}</p>
        )}
      </div>

      <div className="w-full">
        <Button
          hoverColor="hover:bg-secondaryRegularBlue"
          bgColor="bg-secondaryLightBlue"
          type="submit"
          label={t(isSubmitting ? 'booking.submitting' : 'booking.submit')}
          isLoading={isSubmitting}
          largeButton={true}
          textColor="text-white"
        />
      </div>
    </form>
  )
}
