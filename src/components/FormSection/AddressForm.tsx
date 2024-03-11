import { FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { addressFormSchema } from '../../schemas/addressFormSchema'
import { Button } from '../common/Button'
import { setBookingFormData } from '../../redux/slices/formSlice'
import { useAppSelector } from '../../redux/hooks'

export const AddressForm = () => {
  const dispatch = useDispatch()
  const serviceDate = useAppSelector((state) => state.form.serviceDate)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!serviceDate) {
      alert('Veuillez sélectionner une date avant de soumettre.')
      return
    }

    const target = event.target as typeof event.target & {
      country: { value: string }
      city: { value: string }
      address: { value: string }
      address2: { value: string }
      specialInstructions: { value: string }
      phone: { value: string }
    }

    // Création d'un objet avec les données du formulaire
    const formData = {
      country: target.country.value,
      city: target.city.value,
      address: target.address.value,
      address2: target.address2.value,
      specialInstructions: target.specialInstructions.value,
      phone: target.phone.value,
    }

    // Validation des données du formulaire
    const result = addressFormSchema.safeParse(formData)
    if (!result.success) {
      console.error(result.error)
      // Ici, gérez l'affichage des erreurs de validation
      return
    }
    dispatch(setBookingFormData(formData))
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
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
            Adresse
          </label>
          <input
            className="border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            name="address"
            id="address"
            placeholder="Entrez votre rue et numéro de maison"
          />
        </div>
        <div>
          <label
            htmlFor="address2"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Complément d'adresse (facultatif)
          </label>
          <input
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
            Numéro de téléphone
          </label>
          <input
            className="border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="tel"
            name="phone"
            id="phone"
            placeholder="Numéro de téléphone"
          />
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
