import { Button } from '../common/Button'
import { useAppSelector } from '../../redux/hooks'
import { Spinner } from '../common/Spinner'
import { useDispatch } from 'react-redux'
import { setCurrentStep } from '../../redux/slices/formSlice'

export const QuoteReview = () => {
  const { numberOfFloors, sizeRange, fruitBasketSelected, beforeOrAfter } =
    useAppSelector((state) => state.form.formData)

  const totalPrice = useAppSelector((state) => state.form.quote)
  const isLoading = useAppSelector((state) => state.form.isLoading)

  const dispatch = useDispatch()

  console.log(totalPrice)

  const formatSizeRange = (sizeRange: string) => {
    switch (sizeRange) {
      case 'lessThan40':
        return 'Moins de 40m²'
      case 'from40to80':
        return 'Entre 40m² et 80m²'
      case 'from80to120':
        return 'Entre 80m² et 120m²'
      case 'moreThan120':
        return 'Plus de 120m²'
      default:
        return sizeRange
    }
  }

  const handleReserveClick = () => {
    console.log('reserve click submitted')
    dispatch(setCurrentStep('booking'))
  }

  return (
    <div className="flex flex-col justify-start items-start p-6 bg-white sm:w-1/3 w-full  mt-4 max-w-[460px] h-auto shadow-lg rounded-md">
      <div className="text-black text-2xl">Récapitulatif de votre demande</div>
      <div className="text-black mt-14 ">
        <p className="w-full mt-4">Nombre d'étages a nettoyer :</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin  ">
          {numberOfFloors}
        </p>
        <p className="w-full mt-4">Surface a nettoyer :</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin  ">
          {formatSizeRange(sizeRange)}
        </p>
        <p className="w-full mt-4 ">Le nettoyage sera fait :</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin  ">
          {beforeOrAfter === 'Before'
            ? 'Avant mon arrivée'
            : 'Après mon arrivée'}
        </p>
        <p className="w-full mt-4 ">Vous souhaitez une corbeille de fruits</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin  ">
          {fruitBasketSelected ? 'oui' : 'non'}
        </p>
      </div>
      <div className="w-full flex justify-between items-end mt-16">
        {/* ici proposer de créer un compte ou de se connecter à la place du boutton
        reservation si le user est pas connecté */}
        <Button
          bgColor="bg-kaki"
          label="reserver"
          hoverColor="bg-darkerKaki"
          type="button"
          onClick={handleReserveClick}
        />
        {isLoading ? (
          <Spinner /> // Remplacez cela par votre composant Spinner
        ) : (
          <p className="mr-12  text-black text-2xl font-thin">
            Total TTC : <span className="font-bold">{totalPrice} €</span>
          </p>
        )}
      </div>
    </div>
  )
}
