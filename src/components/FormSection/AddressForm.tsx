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
import { createPaymentIntent } from '../../services/createPaymentIntent'

// Typage des données du formulaire basé sur le schéma Zod
type FormData = z.infer<typeof addressFormSchema>

export const AddressForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const serviceStartDate = useAppSelector(
    (state) => state.form.serviceStartDate,
  )
  const amount = useAppSelector((state) => state.form.quote)
  const email = useAppSelector((state) => state.user.email)
  const shortId = useAppSelector((state) => state.user.shortId)
  const name = useAppSelector((state) => state.user.name)
  const reservationType = useAppSelector((state) => state.form.reservationType)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addressFormSchema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!serviceStartDate) {
      alert('Veuillez sélectionner une date avant de soumettre.')
      return
    }

    // Assurez-vous que amount est non null et est un nombre
    if (typeof amount === 'number') {
      try {
        const { clientSecret } = await createPaymentIntent(
          amount,
          email,
          shortId,
          name,
        )
        console.log('Client Secret reçu:', clientSecret)

        if (reservationType === 'ménage') {
          dispatch(setCleaningFormData(data as Partial<CleaningFormData>))
        }

        if (reservationType === 'cuisine') {
          dispatch(setCookingFormData(data as Partial<CookingFormData>))
        }

        navigate('/stripe-checkout-form', {
          state: { clientSecret },
        })
      } catch (error) {
        console.error('Erreur lors de la création du PaymentIntent:', error)
        // Gérer l'erreur...
      }
    } else {
      console.error('Montant invalide')
      // Gérer le cas où le montant est invalide (afficher un message à l'utilisateur, etc.)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 space-y-4  w-full "
    >
      <div>
        <label
          id="nbrOfFloors"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Ville (Maroc)*
        </label>
        <select
          {...register('city')}
          id="city"
          aria-placeholder="choisir"
          className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300 "
        >
          <option
            value={''}
            disabled
            selected
            className="text-gray-500"
          ></option>
          <option value="Saïdia et ses alentours">
            Saïdia et ses alentours
          </option>
          <option value="Berkane et ses alentours">
            Berkane et ses alentours
          </option>
          <option value="Ahfir et ses alentours">Ahfir et ses alentours</option>{' '}
          <option value="Ras El Ma et ses alentours">
            Ras El Ma et ses alentours
          </option>
        </select>
        {errors.city && (
          <p className="text-red-600 text-xs ">{errors.city.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="address"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Adresse*
        </label>
        <input
          {...register('address')}
          className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300 "
          type="text"
          name="address"
          id="address"
          placeholder="Entrez votre rue et numéro de maison"
        />
        {errors.address && (
          <p className="text-red-600 text-xs ">{errors.address.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="address2"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Complément d'adresse (facultatif)
        </label>
        <input
          {...register('address2')}
          className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300 "
          type="text"
          name="address2"
          id="address2"
          placeholder="Appartement, bâtiment, étage"
        />
      </div>
      <div>
        <label
          htmlFor="specialInstructions"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Instructions spéciales
        </label>
        <textarea
          {...register('specialInstructions')}
          className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300 "
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
          Numéro de téléphone*
        </label>
        <input
          {...register('phone')}
          className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300 "
          type="tel"
          name="phone"
          id="phone"
        />
        {errors.phone && (
          <p className="text-red-600 text-xs ">{errors.phone.message}</p>
        )}
      </div>
      <div className="w-full">
        <Button
          hoverColor={'hover:bg-secondaryRegularBlue'}
          bgColor={'bg-secondaryLightBlue'}
          type="submit"
          label="Reserver"
          largeButton={true}
        />
      </div>
    </form>
  )
}
