import { useForm } from 'react-hook-form'
import { Button } from '../../common/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '../../../schemas/contactFormSchema'
import { FormData } from './WorksInitialForm'
import { useDispatch } from 'react-redux'
import { setSmallRepairsFormData } from '../../../redux/slices/formSlice'

export const contactSchemaStep1 = contactSchema.omit({
  details: true,
  email: true, // Exclure "details" pour ce formulaire spécifique
})

type contactFormData = z.infer<typeof contactSchemaStep1>

type StepProps = {
  nextStep: () => void
  formData: FormData
}

export const Step1 = ({ nextStep, formData }: StepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contactFormData>({ resolver: zodResolver(contactSchemaStep1) })
  const dispatch = useDispatch()

  const onSubmit = (data: contactFormData) => {
    // Met à jour partiellement formData avec les valeurs de cette étape
    dispatch(
      setSmallRepairsFormData({
        ...formData, // Conserve les données précédentes
        ...data, // Ajoute les nouvelles données de cette étape
      }),
    )
    nextStep() // Passe à l'étape suivante
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-black w-full h-full flex flex-col gap-4 justify-between "
    >
      <div className="w-full mx-auto flex flex-col h-full gap-4 space-y-6">
        <h2 className="font-bold text-secondaryLightBlue">
          Étape 1 : Informations personnelles
        </h2>

        <div>
          <label id="name" className="block mb-2 font-medium text-gray-900">
            Nom
          </label>
          <input
            {...register('name')}
            className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300"
            type="text"
            defaultValue={formData.name}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label
            id="firstName"
            className="block mb-2 font-medium text-gray-900"
          >
            Prénom
          </label>
          <input
            {...register('firstname')}
            type="text"
            className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300"
            defaultValue={formData.firstname}
          />
          {errors.firstname && (
            <p className="text-red-600">{errors.firstname.message}</p>
          )}
        </div>

        <div>
          <label id="phone" className="block mb-2 font-medium text-gray-900">
            Téléphone
          </label>
          <input
            {...register('phoneNumber')}
            type="tel"
            className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300"
            defaultValue={formData.phoneNumber}
          />
          {errors.phoneNumber && (
            <p className="text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        <Button
          type="submit"
          label="Suivant"
          hoverColor="hover:bg-secondaryRegularBlue"
          bgColor="bg-secondaryLightBlue"
          largeButton
        />
      </div>
    </form>
  )
}
