import { Button } from '../common/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setCurrentStep,
  setIsLoading,
  setQuote,
  setCookingFormData,
} from '../../redux/slices/formSlice'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import getApiUrl from '../../utils/getApiUrl'
import { FaArrowLeft } from 'react-icons/fa'

export const CookingFormRequest = () => {
  const [errorForm, setErrorForm] = useState('')
  const dispatch = useDispatch()
  const apiUrl = getApiUrl()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      period: '',
      numberOfPeople: '',
      exactNumberOfPeople: '',
    },
  })

  const formData = watch()

  const handleReturnClick = () => {
    dispatch(setCurrentStep('serviceChoice'))
  }

  const onSubmit = async (data: any) => {
    const { period, numberOfPeople, exactNumberOfPeople } = data

    // Calcul du nombre final de personnes
    const finalNumberOfPeople =
      numberOfPeople === '9_plus'
        ? parseInt(exactNumberOfPeople, 10)
        : parseInt(numberOfPeople, 10)

    // Validation des champs
    if (!period || isNaN(finalNumberOfPeople) || finalNumberOfPeople < 1) {
      setErrorForm(
        'Veuillez remplir tous les champs obligatoires et entrer un nombre de personnes valide.',
      )
      return
    }

    // Préparer les données à envoyer
    const requestData = {
      period,
      numberOfPeople:
        numberOfPeople === '9_plus' ? exactNumberOfPeople : numberOfPeople, // Utilisez toujours une chaîne
    }

    console.log('Form data sent to API:', requestData)

    try {
      dispatch(setIsLoading(true))
      const response = await axios.post(`${apiUrl}/cooking-quote`, requestData)

      // Mise à jour du Redux Store
      dispatch(setQuote(response.data.totalPrice))
      dispatch(setCookingFormData(requestData))
      dispatch(setCurrentStep('cookingReview'))
    } catch (err) {
      console.error('Erreur lors de la soumission du formulaire:', err)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-between h-full">
      <div>
        <button
          onClick={handleReturnClick}
          className="text-gray-400 mb-4 flex items-center gap-2"
        >
          <FaArrowLeft />
          <p>Retour</p>
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col h-full gap-4"
      >
        <div className="my-auto space-y-2">
          <p className="text-red-600">{errorForm && errorForm}</p>

          {/* Champ Période */}
          <div>
            <label
              htmlFor="period"
              className="block mb-2 font-medium text-gray-900"
            >
              Période souhaitée
            </label>
            <select
              {...register('period', { required: true })}
              id="period"
              className="border-b-2 border-none text-gray-500 block w-full p-2.5"
            >
              <option value="" disabled hidden>
                Choisissez une période
              </option>
              <option value="journee">Journée</option>
              <option value="soirMidi">Soir/Midi</option>
            </select>
            {errors.period && (
              <p className="text-red-500">Ce champ est obligatoire.</p>
            )}
          </div>

          {/* Champ Nombre de Personnes */}
          <div>
            <label
              htmlFor="numberOfPeople"
              className="block mb-2 font-medium text-gray-900"
            >
              Nombre de personnes
            </label>
            <select
              {...register('numberOfPeople', { required: true })}
              id="numberOfPeople"
              onChange={(e) => {
                setValue('numberOfPeople', e.target.value)
                if (e.target.value !== '9_plus') {
                  setValue('exactNumberOfPeople', '') // Réinitialiser si non "9_plus"
                }
              }}
              className="border-b-2 border-none text-gray-500 block w-full p-2.5"
            >
              <option value="" disabled hidden>
                Choisissez le nombre de personnes
              </option>
              <option value="1_8">1 à 8 personnes</option>
              <option value="9_plus">Plus de 8 personnes</option>
            </select>
            {errors.numberOfPeople && (
              <p className="text-red-500">Ce champ est obligatoire.</p>
            )}
          </div>

          {/* Champ Nombre Exact de Personnes */}
          {formData.numberOfPeople === '9_plus' && (
            <div>
              <label
                htmlFor="exactNumberOfPeople"
                className="block mb-2 font-medium text-gray-900"
              >
                Nombre exact de personnes
              </label>
              <input
                {...register('exactNumberOfPeople', {
                  required: formData.numberOfPeople === '9_plus',
                  validate: (value) =>
                    parseInt(value, 10) >= 9 ||
                    'Le nombre doit être au moins 9.',
                })}
                id="exactNumberOfPeople"
                type="number"
                className="border-b-2 border-none text-gray-500 block w-full p-2.5"
                min="9"
              />
              {errors.exactNumberOfPeople && (
                <p className="text-red-500">
                  {errors.exactNumberOfPeople.message}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="justify-self-end">
          <Button
            type="submit"
            label="Calculer le prix"
            hoverColor="hover:bg-secondaryRegularBlue"
            bgColor="bg-secondaryLightBlue"
            largeButton={true}
          />
        </div>
      </form>
    </div>
  )
}
