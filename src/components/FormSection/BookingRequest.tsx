import { CustomDatePicker } from './CustomDatePicker'
import { AddressForm } from './AddressForm'
import { useAppDispatch } from '../../redux/hooks'
import { setCurrentStep } from '../../redux/slices/formSlice'
import { FaArrowLeft } from 'react-icons/fa'
import { useAppSelector } from '../../redux/hooks'

export const BookingRequest = () => {
  const dispatch = useAppDispatch()
  const reservationType = useAppSelector((state) => state.form.reservationType)
  const handleReturnClick = () => {
    switch (reservationType) {
      case 'ménage':
        dispatch(setCurrentStep('cleaningReview'))
        break
      case 'cuisine':
        dispatch(setCurrentStep('cookingReview'))
        break
      case 'travaux':
        dispatch(setCurrentStep('diyReview'))
        break

      default:
        break
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-between h-full">
      <button
        onClick={() => handleReturnClick()}
        className="text-gray-400 mb-4 flex items-center gap-2"
      >
        <FaArrowLeft />
        <p>Retour</p>
      </button>
      <div className="">
        <CustomDatePicker />
      </div>
      <AddressForm />
    </div>
  )
}
