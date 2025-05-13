import { Button } from '../common/Button'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { Spinner } from '../common/Spinner'
import { useDispatch } from 'react-redux'
import { setCurrentStep } from '../../redux/slices/formSlice'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const CleaningQuoteReview = () => {
  const cleaningData = useAppSelector((state) => state.form.formData.cleaning)
  const { t } = useTranslation('form')
  // Vérifiez si 'cleaning' existe avant d'accéder à ses propriétés
  const { numberOfFloors, sizeRange, fruitBasketSelected, beforeOrAfter } =
    cleaningData || {} // Default to an empty object if undefined
  const totalPrice = useAppSelector((state) => state.form.quote)
  console.log(totalPrice)

  const isLoading = useAppSelector((state) => state.form.isLoading)

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)

  const dispatch = useDispatch()

  const formatSizeRange = (sizeRange: string | undefined) => {
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
    dispatch(setCurrentStep('cleaningForm'))
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-between h-full">
      <button
        onClick={() => handleReturnClick()}
        className="text-gray-400 mb-4 flex items-center gap-2"
      >
        <FaArrowLeft />
        <p>{t('common.back')}</p>
      </button>
      <div className="text-black text-2xl">{t('quoteReview.title')}</div>
      <div className="text-black mt-6 ">
        <p className="w-full mt-4">{t('quoteReview.cleaning.floors')} :</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin text-end">
          {numberOfFloors}
        </p>
        <p className="w-full mt-4">{t('quoteReview.cleaning.area')} :</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin text-end">
          {formatSizeRange(sizeRange)}
        </p>
        <p className="w-full mt-4 ">{t('quoteReview.cleaning.timing')} :</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin text-end">
          {beforeOrAfter === 'before'
            ? t('formCleaning.before')
            : t('formCleaning.after')}
        </p>
        <p className="w-full mt-4 ">{t('quoteReview.cleaning.fruit')}</p>
        <p className="border-b-gray-100 border-b-2 mt-6 text-gray-500 font-thin text-end">
          {fruitBasketSelected ? t('formCleaning.yes') : t('formCleaning.no')}
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
              hoverColor={'hover:bg-secondaryRegularBlue'}
              bgColor={'bg-secondaryLightBlue'}
              type="submit"
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
