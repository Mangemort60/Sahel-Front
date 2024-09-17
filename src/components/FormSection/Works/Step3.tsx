import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../common/Button'
import { worksDescFormSchema } from '../../../schemas/worksDescFormSchema'
import { FormData } from './WorksInitialForm'
import { useDispatch } from 'react-redux'
import { setSmallRepairsFormData } from '../../../redux/slices/formSlice'
import { createPredemand } from '../../../utils/createPredemand'
import { useAppSelector } from '../../../redux/hooks/useAppSelector'
import toast from 'react-hot-toast'

// Définir le type basé sur le schéma Zod
export type worksTypeFormData = z.infer<typeof worksDescFormSchema>

type StepProps = {
  setFormData: (data: Partial<worksTypeFormData>) => void
  nextStep: () => void
  formData: FormData
}

export type WorkCategory =
  | 'éléctricité'
  | 'plomberie'
  | 'maçonnerie'
  | 'peinture'
  | 'autre'

export const Step3 = ({ nextStep, formData }: StepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<worksTypeFormData>({
    resolver: zodResolver(worksDescFormSchema), // Utiliser Zod pour la validation
  })

  const dispatch = useDispatch()
  const shortId = useAppSelector((state) => state.user.shortId)
  const email = useAppSelector((state) => state.user.email)
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)

  // Récupérer uniquement les données smallRepairs du formData
  const smallRepairsData = useAppSelector(
    (state) => state.form.formData.smallRepairs,
  )

  const onSubmit = async (data: worksTypeFormData) => {
    // Ne dispatcher que les données pertinentes pour smallRepairs
    dispatch(setSmallRepairsFormData({ ...smallRepairsData, ...data }))
    console.log({ ...smallRepairsData, ...data })

    const reservationData = { ...smallRepairsData, ...data }

    if (isLoggedIn) {
      // Créer la pré-demande avec les données filtrées
      createPredemand(reservationData, shortId, email)
      toast.success('Pré-demande créée avec succès !', {
        position: 'bottom-right',
      })
    }

    nextStep()
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-black w-full h-full flex flex-col gap-4 justify-between"
    >
      <h2 className="font-bold text-secondaryLightBlue">
        Étape 3 : Description des travaux
      </h2>

      <div className="w-full mb-2 flex flex-col justify-center h-full">
        <label id="workCategory" className="block mb-2 font-bold text-gray-900">
          Catégorie(s) des travaux
        </label>
        <div className="flex flex-col">
          <label>
            <input
              type="checkbox"
              className="mr-2"
              value="éléctricité"
              {...register('workCategory')} // Enregistre chaque checkbox dans react-hook-form
              defaultChecked={
                formData.workCategory &&
                formData.workCategory.includes('éléctricité')
              }
            />
            Électricité
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              value="plomberie"
              {...register('workCategory')}
              defaultChecked={
                formData.workCategory &&
                formData.workCategory.includes('plomberie')
              }
            />
            Plomberie
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              value="maçonnerie"
              {...register('workCategory')}
              defaultChecked={
                formData.workCategory &&
                formData.workCategory.includes('maçonnerie')
              }
            />
            Maçonnerie
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              value="peinture"
              {...register('workCategory')}
              defaultChecked={
                formData.workCategory &&
                formData.workCategory.includes('peinture')
              }
            />
            Peinture
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              value="autre"
              {...register('workCategory')}
              defaultChecked={
                formData.workCategory && formData.workCategory.includes('autre')
              }
            />
            Autre
          </label>
          {errors.workCategory && (
            <p className="text-red-500">{errors.workCategory.message}</p>
          )}
        </div>

        {/* Champ de texte pour la description des travaux */}
        <div className="max-w-sm mt-2 space-y-3">
          <label
            id="workDescription"
            className="block my-2 font-bold text-gray-900"
          >
            Description des travaux
          </label>
          <textarea
            {...register('workDescription')}
            className="py-3 px-0 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-blue-500 focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600"
            rows={6}
            defaultValue={formData.workDescription}
          ></textarea>

          {/* Affichage des erreurs de validation pour workDescription */}
          {errors.workDescription && (
            <p className="text-red-500">{errors.workDescription.message}</p>
          )}
        </div>
        <div className="mt-4">
          <label id="city" className="block mb-2 font-bold text-gray-900">
            Sélectionner l'urgence
          </label>

          <select
            {...register('urgency')}
            id="urgency"
            className="border-b-2 border-b-gray-200 border-0 text-gray-500 block w-full p-2.5 dark:border-gray-300"
            defaultValue={formData.urgency || ''} // Option par défaut vide, mais non sélectionnable
          >
            <option value="" disabled></option>
            <option value="immediate">Immédiate</option>
            <option value="dans les semaines à venir">
              Dans les semaines à venir
            </option>
            <option value="dans les mois à venir">Dans les mois à venir</option>
          </select>

          {/* Affichage des erreurs liées à urgency */}
          {errors.urgency && (
            <p className="text-red-500">{errors.urgency.message}</p>
          )}
        </div>
      </div>

      {/* Bouton de soumission */}
      <Button
        type="submit"
        label="Soumettre"
        hoverColor="hover:bg-secondaryRegularBlue"
        bgColor="bg-secondaryLightBlue"
        largeButton
        textColor="text-white"
      />
    </form>
  )
}
