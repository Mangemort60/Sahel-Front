import { Button } from '../common/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setFormData as setReduxFormData,
  setQuote as setReduxQuote,
  setCurrentStep,
  setIsLoading,
} from '../../redux/slices/formSlice'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import getApiUrl from '../../utils/getApiUrl'
import { FaArrowLeft } from 'react-icons/fa'

export const CookingFormRequest = () => {
  const [formData, setFormData] = useState({
    period: '',
    numberOfPeople: '',
  })
  const [exactNumberOfPeople, setExactNumberOfPeople] = useState('') // Champ pour le nombre exact si > 8 personnes
  const [errorForm, setErrorForm] = useState('')

  const dispatch = useDispatch()
  dispatch(setIsLoading(false))
  const apiUrl = getApiUrl()

  const { register } = useForm()

  const handleReturnClick = () => {
    dispatch(setCurrentStep('serviceChoice'))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { period, numberOfPeople } = formData

    // Calcul du nombre final de personnes
    const finalNumberOfPeople =
      numberOfPeople === '9_plus'
        ? parseInt(exactNumberOfPeople, 10)
        : parseInt(numberOfPeople, 10)

    // Validation des champs
    if (!period || !finalNumberOfPeople || isNaN(finalNumberOfPeople)) {
      setErrorForm(
        'Veuillez remplir tous les champs obligatoires et entrer un nombre de personnes valide.',
      )
      return
    }

    // Prépare les données à envoyer à l'API
    const requestData = {
      period,
      numberOfPeople: finalNumberOfPeople,
    }

    console.log('Form data sent to API:', requestData)

    try {
      dispatch(setIsLoading(true))
      dispatch(setCurrentStep('cookingReview'))

      // Envoi des données à l'API
      const response = await axios.post(`${apiUrl}/cooking-quote`, requestData)

      // Mise à jour du prix et des données dans le store Redux
      dispatch(setReduxQuote(response.data.totalPrice))
      dispatch(setReduxFormData(formData))
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
        onSubmit={handleSubmit}
        className="w-full mx-auto flex flex-col h-full gap-4"
      >
        <div className="my-auto space-y-2">
          <p className="text-red-600 ">{errorForm && errorForm}</p>

          {/* Champ Période */}
          <div>
            <label id="period" className="block mb-2 font-medium text-gray-900">
              Période souhaitée
            </label>
            <select
              {...register('period')}
              id="period"
              onChange={(e) =>
                setFormData({ ...formData, period: e.target.value })
              }
              className="border-b-2 border-b-gray-200 border-0 text-gray-500 block w-full p-2.5 dark:border-gray-300"
            >
              <option value="" selected disabled hidden>
                Choisissez une période
              </option>
              <option value="journee">Journée</option>
              <option value="soirMidi">Soir/Midi</option>
            </select>
          </div>

          {/* Champ Nombre de Personnes */}
          <div>
            <label
              id="numberOfPeople"
              className="block mb-2 font-medium text-gray-900"
            >
              Nombre de personnes
            </label>
            <select
              {...register('numberOfPeople')}
              id="numberOfPeople"
              onChange={(e) => {
                setFormData({ ...formData, numberOfPeople: e.target.value })
                if (e.target.value !== '9_plus') {
                  setExactNumberOfPeople('') // Réinitialiser le champ si le nombre est inférieur à 9
                }
              }}
              className="border-b-2 border-b-gray-200 border-0 text-gray-500 block w-full p-2.5 dark:border-gray-300"
            >
              <option value="" selected disabled hidden>
                Choisissez le nombre de personnes
              </option>
              <option value="1_8">1 à 8 personnes</option>
              <option value="9_plus">Plus de 8 personnes</option>
            </select>
          </div>

          {/* Champ Nombre Exact de Personnes */}
          {formData.numberOfPeople === '9_plus' && (
            <div>
              <label
                id="exactNumberOfPeople"
                className="block mb-2 font-medium text-gray-900"
              >
                Nombre exact de personnes
              </label>
              <input
                type="number"
                id="exactNumberOfPeople"
                value={exactNumberOfPeople}
                onChange={(e) => setExactNumberOfPeople(e.target.value)}
                className="border-b-2 border-b-gray-200 border-0 text-gray-500 block w-full p-2.5 dark:border-gray-300"
                min="9"
              />
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
