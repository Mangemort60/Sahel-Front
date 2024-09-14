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
import { useAppSelector } from '../../redux/hooks'
import getApiUrl from '../../utils/getApiUrl'
import { FaArrowLeft } from 'react-icons/fa'

export const CleaningFormRequest = () => {
  const isLoading = useAppSelector((state) => state.form.isLoading)
  const [formData, setFormData] = useState({
    numberOfFloors: '',
    sizeRange: '',
    fruitBasketSelected: false,
    beforeOrAfter: '',
  })
  const [errorForm, setErrorForm] = useState('')

  const handleReturnClick = () => {
    dispatch(setCurrentStep('serviceChoice'))
  }

  const dispatch = useDispatch()
  const apiUrl = getApiUrl()

  const { register } = useForm()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { numberOfFloors, sizeRange, beforeOrAfter, fruitBasketSelected } =
      formData
    console.log('Form dataa:', formData) // Ajout d'un log pour vérifier les données du formulaire
    console.log(apiUrl)

    try {
      if (
        !numberOfFloors ||
        !sizeRange ||
        !beforeOrAfter ||
        typeof fruitBasketSelected !== 'boolean' // Check for boolean type
      ) {
        setErrorForm('Veuillez remplir tous les champs')
        console.log('error form : ', errorForm)

        return
      }
      dispatch(setCurrentStep('cleaningReview'))
      dispatch(setIsLoading(true))

      const response = await axios.post(`${apiUrl}/cleaning-quote`, {
        numberOfFloors: parseInt(formData.numberOfFloors, 10),
        sizeRange: formData.sizeRange,
        fruitBasketSelected: formData.fruitBasketSelected,
      })
      dispatch(setReduxQuote(response.data.totalPrice))
      dispatch(setReduxFormData(formData))
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(setIsLoading(false)) // Après la requête
    }

    console.log('form request is loading : ', isLoading)
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-between h-full">
      <div>
        <button
          onClick={() => handleReturnClick()}
          className="text-gray-400 mb-4 flex items-center gap-2"
        >
          <FaArrowLeft />
          <p>Retour</p>
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto  flex flex-col h-full gap-4"
      >
        <div className="my-auto space-y-2">
          <p className="text-red-600 ">{errorForm && errorForm}</p>
          <div>
            <label
              id="nbrOfFloors"
              className="block mb-2 font-medium text-gray-900"
            >
              Nombre d'étages à nettoyer
            </label>
            <select
              {...register('nbrOfFloors')}
              id="nbrOfFloors"
              onChange={(e) =>
                setFormData({ ...formData, numberOfFloors: e.target.value })
              }
              className="border-b-2 border-b-gray-200 border-0 text-gray-500 block w-full p-2.5 dark:border-gray-300 "
            >
              <option selected className="text-white"></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label
              id="sizeRange"
              className="block mb-2 font-medium text-gray-900"
            >
              Surface à nettoyer en m2 (par niveau)
            </label>
            <select
              {...register('areaSize')}
              id="areaSize"
              onChange={(e) =>
                setFormData({ ...formData, sizeRange: e.target.value })
              }
              className="border-b-2 border-b-gray-200 border-0 text-gray-500 block w-full p-2.5 dark:border-gray-300"
            >
              <option selected></option>
              <option value="lessThan40">moins de 40m²</option>
              <option value="from40to80">entre 40m² et 80m²</option>
              <option value="from80to120">entre 80m² et 120m²</option>
              <option value="moreThan120">plus de 120m²</option>
            </select>
          </div>
          <div>
            <label
              id="beforeOrAfter"
              className="block mb-2 font-medium text-gray-900"
            >
              Souhaitez vous un nettoyage avant ou après votre arrivée
            </label>
            <select
              {...register('beforeOrAfter')}
              id="beforeOrAfter"
              onChange={(e) =>
                setFormData({ ...formData, beforeOrAfter: e.target.value })
              }
              className="border-b-2 border-b-gray-200 border-0 text-gray-500 block w-full p-2.5 dark:border-gray-300"
            >
              <option selected></option>
              <option value="before">avant mon arrivée</option>
              <option value="after">après mon arrivée</option>
            </select>
          </div>
          <div>
            <label
              id="fruitsBasket"
              className="block mb-2 font-medium text-gray-900"
            >
              Souhaitez vous une corbeille de fruit ?
            </label>
            <select
              {...register('fruitsBasket')}
              id="fruitsBasket"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fruitBasketSelected: e.target.value === '1',
                })
              }
              className="border-b-2 border-b-gray-200 border-0 text-gray-500 block w-full p-2.5 dark:border-gray-300"
            >
              <option selected></option>
              <option value="1">oui</option>
              <option value="2">non</option>
            </select>
          </div>
        </div>
        <div className="justify-self-end">
          <Button
            type="submit"
            label={'Calculer le prix'}
            hoverColor={'hover:bg-secondaryRegularBlue'}
            bgColor={'bg-secondaryLightBlue'}
            onClick={() => {}}
            largeButton={true}
          />
        </div>
      </form>
    </div>
  )
}
