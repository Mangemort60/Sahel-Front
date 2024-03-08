import { Button } from '../Buttons/Button'
import { useAppSelector } from '../../redux/hooks'

export const QuoteReview = () => {
  const { numberOfFloors, sizeRange, fruitBasketSelected, beforeOrAfter } =
    useAppSelector((state) => state.form.formData)

  const totalPrice = useAppSelector((state) => state.form.quote)

  console.log(totalPrice)

  const formatSizeRange = (sizeRange: string) => {
    switch (sizeRange) {
      case 'LessThan40':
        return 'Moins de 40m²'
      case 'from40to80':
        return 'Entre 40m² et 80m²'
      case 'from80to120':
        return 'Entre 80m² et 120m²'
      case 'MoreThan120':
        return 'Plus de 120m²'
      default:
        return sizeRange
    }
  }

  return (
    <div className="flex flex-col justify-start items-start p-6 bg-white sm:w-1/3 w-full mt-4 max-w-[460px] h-2/3 shadow-lg rounded-md">
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
          {beforeOrAfter === 'Before' ? 'Avant' : 'Après'}
        </p>
        <p className="w-full mt-4 ">Vous souhaitez une corbeill :e de fruit</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin  ">
          {fruitBasketSelected ? 'oui' : 'non'}
        </p>
      </div>
      <div className="w-full flex justify-between items-center mt-16">
        <Button
          bgColor="bg-kaki"
          label="reserver"
          hoverColor="bg-darkerKaki"
          type="submit"
        />
        <p className="w-full h-full text-black">{totalPrice}</p>
      </div>
    </div>
  )
}
