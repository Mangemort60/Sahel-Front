import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../common/Button'
import { addressFormSchema } from '../../../schemas/addressFormSchema'
import { FormData } from './WorksInitialForm'
import { useDispatch } from 'react-redux'
import { setSmallRepairsFormData } from '../../../redux/slices/formSlice'
import { useTranslation } from 'react-i18next'

const addressFormSchemaStep2 = addressFormSchema.pick({
  address: true,
  city: true,
})

type addressFormSchema = z.infer<typeof addressFormSchemaStep2>

type StepProps = {
  setFormData: (data: Partial<addressFormSchema>) => void // Partielle pour l'étape
  nextStep: () => void
  prevStep?: () => void
  formData: FormData
}

export const Step2 = ({ nextStep, formData }: StepProps) => {
  const { t } = useTranslation('form')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addressFormSchema>({
    resolver: zodResolver(addressFormSchemaStep2),
  })

  const dispatch = useDispatch()

  const onSubmit = (data: addressFormSchema) => {
    // Met à jour partiellement formData avec les valeurs de cette étape
    dispatch(setSmallRepairsFormData({ ...formData, ...data }))
    nextStep() // Passe à l'étape suivante
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-black w-full h-full flex flex-col gap-4 justify-between"
    >
      <h2 className="font-bold text-secondaryLightBlue">
        {t('smallRepairs.step2.title')}
      </h2>

      <div className="w-full mx-auto flex flex-col gap-4 h-full justify-center space-y-6">
        <div>
          <label id="address" className="block mb-2 font-medium text-gray-900">
            {t('smallRepairs.step2.address')}
          </label>
          <input
            {...register('address')}
            className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300"
            type="text"
            defaultValue={formData.address}
          />
          {errors.address && (
            <p className="text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label id="city" className="block mb-2 font-medium text-gray-900">
            {t('smallRepairs.step2.city')}
          </label>
          <select
            {...register('city')}
            className="border-b-2 border-b-gray-200 border-0 text-gray-900 text-sm block w-full p-2.5 dark:border-gray-300"
            defaultValue=""
          >
            <option
              value={formData.city || ''}
              disabled
              className="text-gray-200"
            ></option>
            <option value="Saidia et ses alentours">
              {t('booking.cities.saidia')}
            </option>
            <option value="Berkane et ses alentours">
              {t('booking.cities.berkane')}
            </option>
            <option value="Ahfir et ses alentours">
              {t('booking.cities.ahfir')}
            </option>
          </select>

          {errors.city && <p className="text-red-600">{errors.city.message}</p>}
        </div>
      </div>

      <Button
        type="submit"
        label={t('smallRepairs.step2.next')}
        hoverColor="hover:bg-secondaryRegularBlue"
        bgColor="bg-secondaryLightBlue"
        largeButton
      />
    </form>
  )
}
