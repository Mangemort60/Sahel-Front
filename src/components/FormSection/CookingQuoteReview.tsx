import { Button } from '../common/Button'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { Spinner } from '../common/Spinner'
import { useDispatch } from 'react-redux'
import { setCurrentStep } from '../../redux/slices/formSlice'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const CookingQuoteReview = () => {
  // Extraction des données nécessaires depuis Redux
  const cooking = useAppSelector((state) => state.form.formData.cooking)

  const period = cooking?.period || 'Non spécifié'
  const numberOfPeople = cooking?.numberOfPeople || 'Non spécifié'
  const totalPrice = useAppSelector((state) => state.form.quote)
  const isLoading = useAppSelector((state) => state.form.isLoading)
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)

  const { t } = useTranslation('form')

  const dispatch = useDispatch()

  const formatPeriod = (period: string) => {
    switch (period) {
      case 'journee':
        return 'Journée'
      case 'soirMidi':
        return 'Soir/Midi'
      default:
        return period
    }
  }

  const formatNumberOfPeople = (numberOfPeople: string | number): string => {
    const numberOfPeopleStr = numberOfPeople.toString() // Assurez-vous qu'il s'agit bien d'une chaîne
    switch (numberOfPeopleStr) {
      case '1_8':
        return '1 à 8 personnes'
      case '9_plus':
        return 'Plus de 8 personnes'
      default:
        if (!isNaN(Number(numberOfPeopleStr))) {
          return `${numberOfPeopleStr} personnes` // Pour les nombres bruts
        }
        return numberOfPeopleStr // Renvoie la valeur brute si non reconnue
    }
  }

  const handleReserveClick = () => {
    dispatch(setCurrentStep('booking'))
  }

  const handleReturnClick = () => {
    dispatch(setCurrentStep('cookingForm'))
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-between h-full">
      <button
        onClick={handleReturnClick}
        className="text-gray-400 mb-4 flex items-center gap-2"
      >
        <FaArrowLeft />
        <p>{t('common.back')}</p>
      </button>
      <div className="text-black text-2xl">{t('quoteReview.title')}</div>
      <div className="text-black mt-6">
        <p className="w-full mt-4">{t('quoteReview.cooking.period')} :</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin text-end">
          {formatPeriod(period)}
        </p>
        <p className="w-full mt-4">{t('quoteReview.cooking.people')} :</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin text-end">
          {formatNumberOfPeople(numberOfPeople)}
        </p>
      </div>
      {isLoggedIn ? (
        <div className="w-full flex flex-col gap-4 items-center justify-between mt-6">
          {isLoading ? (
            <div className="text-black text-2xl flex items-center font-thin w-full">
              {t('quoteReview.total')} : <Spinner /> €
            </div>
          ) : (
            <p className="text-black text-1xl font-thin">
              {t('quoteReview.total')} :{' '}
              <span className="font-bold text-4xl text-secondaryDarkBlue">
                {totalPrice} €
              </span>
            </p>
          )}
          <div className="w-full">
            <Button
              hoverColor="hover:bg-secondaryRegularBlue"
              bgColor="bg-secondaryLightBlue"
              type="button"
              label={t('quoteReview.reserve')}
              onClick={handleReserveClick}
              largeButton={true}
            />
          </div>
        </div>
      ) : (
        <div className="w-full text-gray-500 text-sm flex flex-col gap-1">
          {isLoading ? (
            <div className="text-black text-2xl flex items-center font-thin w-full">
              {t('quoteReview.total')} : <Spinner /> €
            </div>
          ) : (
            <p className="text-black text-1xl font-thin">
              {t('quoteReview.total')} :{' '}
              <span className="font-bold text-4xl text-secondaryDarkBlue">
                {totalPrice} €
              </span>
            </p>
          )}
          <div>
            <p>
              <Link
                to="/register"
                className="text-blue-700 font-semibold underline"
              >
                {t('quoteReview.loginMessage.register')}
              </Link>{' '}
              {t('quoteReview.loginMessage.reservePrompt')}
            </p>
            <p>
              {t('quoteReview.loginMessage.already')}{' '}
              <Link
                to="/login"
                className="text-blue-700 font-semibold underline"
              >
                {t('quoteReview.loginMessage.login')}
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CookingQuoteReview
