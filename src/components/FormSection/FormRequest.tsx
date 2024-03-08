import { Button } from '../Buttons/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setFormData as setReduxFormData,
  setQuote as setReduxQuote,
  setIsSubmitted,
} from '../../redux/slices/formSlice'
import axios from 'axios'

export const FormRequest = () => {
  const [formData, setFormData] = useState({
    numberOfFloors: '',
    sizeRange: '',
    fruitBasketSelected: false,
    beforeOrAfter: '',
  })

  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setIsSubmitted(true))
    dispatch(setReduxFormData(formData))
    console.log('form submitted')

    try {
      const response = await axios.post('http://localhost:3000/quote', {
        numberOfFloors: parseInt(formData.numberOfFloors, 10),
        sizeRange: formData.sizeRange,
        fruitBasketSelected: formData.fruitBasketSelected,
      })
      setReduxQuote(response.data.totalPrice)
      console.log(response.data.totalPrice)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-white sm:w-1/3 w-full max-w-[460px] h-2/3 shadow-lg rounded-md">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto h-full flex flex-col justify-evenly"
      >
        <div>
          <label
            id="nbrOfFloors"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nombre d'étages à nettoyer
          </label>
          <select
            id="nbrOfFloors"
            onChange={(e) =>
              setFormData({ ...formData, numberOfFloors: e.target.value })
            }
            className="bg-gray-50 border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Surface à nettoyer en m2
          </label>
          <select
            id="areaSize"
            onChange={(e) =>
              setFormData({ ...formData, sizeRange: e.target.value })
            }
            className="bg-gray-50 border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Souhaitez vous un nettoyage avant ou après votre arrivée
          </label>
          <select
            id="beforeOrAfter"
            onChange={(e) =>
              setFormData({ ...formData, beforeOrAfter: e.target.value })
            }
            className="bg-gray-50 border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected></option>
            <option value="before">avant mon arrivée</option>
            <option value="after">après mon arrivée</option>
          </select>
        </div>
        <div>
          <label
            id="fruitsBasket"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Souhaitez vous une corbeille de fruit ?
          </label>
          <select
            id="fruitsBasket"
            onChange={(e) =>
              setFormData({
                ...formData,
                fruitBasketSelected: e.target.value === '1',
              })
            }
            className="bg-gray-50 border-b-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected></option>
            <option value="1">oui</option>
            <option value="2">non</option>
          </select>
        </div>
        <Button
          type="submit"
          label={'Soumettre'}
          hoverColor={'hover:bg-darkerKaki'}
          bgColor={'bg-kaki'}
        />
      </form>
    </div>
  )
}
