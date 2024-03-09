import { CustomDatePicker } from './CustomDatePicker'

export const BookingRequest = () => {
  return (
    <div className="flex flex-col justify-start items-start p-6 bg-white sm:w-1/3 w-full  mt-4 max-w-[460px] h-auto shadow-lg rounded-md">
      <div className="text-black text-2xl">Reservez une date</div>
      <div className="text-black mt-14 ">
        <CustomDatePicker />
      </div>
    </div>
  )
}
