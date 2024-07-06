import { Button } from '../common/Button'
import { useAppSelector } from '../../redux/hooks'
import { Spinner } from '../common/Spinner'
import { useDispatch } from 'react-redux'
import { setCurrentStep } from '../../redux/slices/formSlice'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import getApiUrl from '../../utils/getApiUrl'

export const QuoteReview = () => {
  const { numberOfFloors, sizeRange, fruitBasketSelected, beforeOrAfter } =
    useAppSelector((state) => state.form.formData)
  console.log('API URL', getApiUrl())

  const totalPrice = useAppSelector((state) => state.form.quote)
  console.log(totalPrice)

  const isLoading = useAppSelector((state) => state.form.isLoading)

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)

  const dispatch = useDispatch()

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
    dispatch(setCurrentStep('booking'))
  }

  const handleReturnClick = () => {
    dispatch(setCurrentStep('form'))
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-evenly">
      <button
        onClick={() => handleReturnClick()}
        className="text-gray-400 mb-4 flex items-center gap-2"
      >
        <FaArrowLeft />
        <p>Retour</p>
      </button>
      <div className="text-black text-2xl">Récapitulatif du devis</div>
      <div className="text-black mt-6 ">
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
      {isLoggedIn ? (
        <div className="w-full flex flex-col gap-4 items-center justify-between mt-6">
          {/* ici proposer de créer un compte ou de se connecter à la place du boutton
        reservation si le user est pas connecté */}
          {isLoading ? (
            <Spinner />
          ) : (
            <p className="  text-black text-1xl font-thin">
              Total TTC :{' '}
              <span className="font-bold text-4xl text-secondaryDarkBlue ">
                {totalPrice} €
              </span>
            </p>
          )}
          <Button
            label="Reserver"
            hoverColor={'hover:bg-secondaryRegularBlue'}
            bgColor={'bg-secondaryLightBlue'}
            type="button"
            onClick={handleReserveClick}
            largeButton={true}
          />
        </div>
      ) : (
        <div className="text-gray-500 text-sm flex flex-col gap-1 ">
          <p className="my-8  text-black text-1xl font-thin">
            Total TTC :{' '}
            <span className="font-bold text-4xl text-secondaryDarkBlue">
              {totalPrice} €
            </span>
          </p>
          <p>
            <Link
              to="/register"
              className="text-blue-700 font-semibold underline"
            >
              Créez un compte
            </Link>{' '}
            pour réserver
          </p>
          <p>
            Déjà un compte ?{' '}
            <Link to="/login" className="text-blue-700 font-semibold underline">
              Connectez vous
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
