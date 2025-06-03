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
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../firebase-config'
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
  const { t } = useTranslation('form')
  const dispatch = useDispatch()
  const shortId = useAppSelector((state) => state.user.shortId)
  const email = useAppSelector((state) => state.user.email)
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
  const userFirstName = useAppSelector((state) => state.user.firstName)
  const userName = useAppSelector((state) => state.user.name)
  const phone = useAppSelector((state) => state.user.phone)
  const navigate = useNavigate()
  // Récupérer uniquement les données smallRepairs du formData
  const smallRepairsData = useAppSelector(
    (state) => state.form.formData.smallRepairs,
  )

  const onSubmit = async (data: worksTypeFormData) => {
    dispatch(setSmallRepairsFormData({ ...smallRepairsData, ...data }))
    const reservationData = { ...smallRepairsData, ...data }
    if (!isLoggedIn) {
      navigate('/login?redirectTo=/', {
        state: { from: { pathname: '/', scrollToForm: true } },
      })

      return
    }

    try {
      if (isLoggedIn) {
        // 🔍 Compter les réservations existantes
        const q = query(
          collection(db, 'reservations'),
          where('shortId', '==', shortId),
        )
        const snapshot = await getDocs(q)
        const reservationCount = snapshot.size + 1
        const reservationShortId = `${shortId}-${reservationCount}`

        // ✅ Enregistrement direct dans Firestore
        await addDoc(collection(db, 'reservations'), {
          ...reservationData,
          phone: phone,
          bookingStatus: 'pré-demande',
          reservationType: 'petits-travaux', // Statut indiquant que c'est une pré-demande
          createdAt: new Date(), // Date de création de la pré-demande
          emails: {
            confirmationEmailSent: false,
            instructionsKeysEmailSent: false,
            defaultInstructionsEmailSent: false,
            serviceFeeConfirmationEmailSent: false,
            preRequestEmailSent: false,
            serviceFeeEmailSent: false,
          },
          serviceFeeInfo: {
            amount: 100,
            viewedByClient: false,
            status: '',
            paid: false,
          },
          serviceDates: {
            startDate: null,
            endDate: null,
          },
          serviceStartDate: null,
          keyReceived: false,
          shortId: shortId,
          paymentStatus: 'aucun paiement requis pour le moment',
          email: email,
          name: userName,
          firstName: userFirstName,
          chatStatus: false, // Statut du chat (par défaut à false)
          reservationShortId: reservationShortId, // ID personnalisé de la réservation
        })

        toast.success('Pré-demande créée avec succès !', {
          position: 'bottom-right',
        })
      }

      navigate('/confirmation')
    } catch (err) {
      console.error('Erreur lors de la création de la réservation :', err)
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-black w-full h-full flex flex-col gap-4 justify-between"
    >
      <h2 className="font-bold text-secondaryLightBlue">
        {t('smallRepairs.step3.title')}
      </h2>

      <div className="w-full mb-2 flex flex-col justify-center h-full">
        <label id="workCategory" className="block mb-2 font-bold text-gray-900">
          {t('smallRepairs.step3.category')}
        </label>
        <div className="flex flex-col">
          <label>
            <input
              type="checkbox"
              className="mr-2"
              value="éléctricité"
              {...register('workCategory')}
              defaultChecked={
                formData.workCategory &&
                formData.workCategory.includes('éléctricité')
              }
            />
            {t('smallRepairs.step3.electricity')}
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
            {t('smallRepairs.step3.plumbing')}
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
            {t('smallRepairs.step3.masonry')}
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
            {t('smallRepairs.step3.painting')}
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
            {t('smallRepairs.step3.other')}
          </label>
          {errors.workCategory && (
            <p className="text-red-500">{errors.workCategory.message}</p>
          )}
        </div>

        <div className="max-w-sm mt-2 space-y-3">
          <label
            id="workDescription"
            className="block my-2 font-bold text-gray-900"
          >
            {t('smallRepairs.step3.description')}
          </label>
          <textarea
            {...register('workDescription')}
            className="py-3 px-0 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-blue-500 focus:ring-0 dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600"
            rows={6}
            defaultValue={formData.workDescription}
          ></textarea>

          {errors.workDescription && (
            <p className="text-red-500">{errors.workDescription.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label id="urgency" className="block mb-2 font-bold text-gray-900">
            {t('smallRepairs.step3.urgency')}
          </label>

          <select
            {...register('urgency')}
            id="urgency"
            className="border-b-2 border-b-gray-200 border-0 text-gray-500 block w-full p-2.5 dark:border-gray-300"
            defaultValue={formData.urgency || ''}
          >
            <option value="" disabled></option>
            <option value="immediate">
              {t('smallRepairs.step3.urgency_immediate')}
            </option>
            <option value="dans les semaines à venir">
              {t('smallRepairs.step3.urgency_weeks')}
            </option>
            <option value="dans les mois à venir">
              {t('smallRepairs.step3.urgency_months')}
            </option>
          </select>

          {errors.urgency && (
            <p className="text-red-500">{errors.urgency.message}</p>
          )}
        </div>
      </div>
      {!isLoggedIn && (
        <div className="text-gray-500 text-sm">
          <p>
            <Link
              to="/register"
              className="text-blue-700 font-semibold underline"
            >
              Créer un compte
            </Link>{' '}
            pour valider votre demande.
          </p>
          <p>
            Déjà inscrit ?{' '}
            <Link to="/login" className="text-blue-700 font-semibold underline">
              Se connecter
            </Link>
          </p>
        </div>
      )}

      {isLoggedIn && (
        <Button
          label="Valider ma demande"
          type="submit"
          bgColor="bg-secondaryRegularBlue"
          hoverColor="hover:bg-secondaryLightBlue"
          textColor="text-white"
          largeButton={true}
        />
      )}
    </form>
  )
}
