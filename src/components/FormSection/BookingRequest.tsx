import { CustomDatePicker } from './CustomDatePicker'
import { AddressForm } from './AddressForm'
import { useAppDispatch } from '../../redux/hooks'
import { setCurrentStep } from '../../redux/slices/formSlice'
import { FaArrowLeft } from 'react-icons/fa'

export const BookingRequest = () => {
  const dispatch = useAppDispatch()

  const handleReturnClick = () => {
    dispatch(setCurrentStep('review'))
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
      <div className="">
        <CustomDatePicker />
      </div>
      <AddressForm />
    </div>
  )
}
