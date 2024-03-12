import { useDispatch } from 'react-redux'
import { addressFormSchema } from '../../schemas/addressFormSchema'
import { Button } from '../common/Button'
import { setBookingFormData } from '../../redux/slices/formSlice'
import { useAppSelector } from '../../redux/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Typage des données du formulaire basé sur le schéma Zod
type FormData = z.infer<typeof addressFormSchema>

export const AddressForm = () => {
  const dispatch = useDispatch()
  const serviceDate = useAppSelector((state) => state.form.serviceDate)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addressFormSchema),
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    console.log('submitted')

    if (!serviceDate) {
      alert('Veuillez sélectionner une date avant de soumettre.')
      return
    }
    console.log(data) // Pour déboguer
    dispatch(setBookingFormData(data))
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 space-y-4  w-full"
      >
        <div>
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Pays
          </label>
          <input
            {...register('country')}
            className="bg-gray-50 border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
            type="text"
            name="country"
            id="country"
            value="Maroc"
            readOnly
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Ville
          </label>
          <input
            {...register('city')}
            className="bg-gray-50 border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
            type="text"
            name="city"
            id="city"
            value="Saïdia"
            readOnly
          />
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
            className="border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            name="specialInstructions"
            id="specialInstructions"
            placeholder="Instructions spéciales pour trouver votre domicile (facultatif)"
            rows={4}
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
            className="border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="tel"
            name="phone"
            id="phone"
            placeholder="Numéro de téléphone"
          />
          {errors.phone && (
            <p className="text-red-600 text-xs ">{errors.phone.message}</p>
          )}
        </div>
        <Button
          bgColor="bg-kaki"
          hoverColor="bg-darkerKaki"
          type="submit"
          label="réserver"
        />
      </form>
    </>
  )
}
