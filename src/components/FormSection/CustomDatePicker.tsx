import { useEffect, useState } from 'react'
import { DatePicker, DatePickerProps, Space } from 'antd'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
import { setServiceDate } from '../../redux/slices/formSlice'

dayjs.extend(isSameOrBefore)
dayjs.extend(utc)

// Définissez le type pour les données de comptage des réservations
interface ReservationCount {
  date: string
  count: number
}

export const CustomDatePicker = () => {
  const [reservationCounts, setReservationCounts] = useState<
    ReservationCount[]
  >([])

  const dispatch = useDispatch()

  useEffect(() => {
    // Remplacez 'http://localhost:3000/reservation-counts' par l'URL de votre endpoint
    const fetchReservationCounts = async () => {
      try {
        const { data } = await axios.get<ReservationCount[]>(
          'http://localhost:3000/reserved-dates',
        )
        setReservationCounts(data)
      } catch (error) {
        console.error('Error fetching reservation counts:', error)
      }
    }

    fetchReservationCounts()
  }, [])

  const disabledDate = (current: Dayjs) => {
    // Assurez-vous que la comparaison avec 'current' se fait en UTC
    return (
      reservationCounts.some(
        ({ date, count }) =>
          dayjs.utc(date).isSame(current, 'day') && count >= 3,
      ) || current.isSameOrBefore(dayjs.utc().startOf('day'), 'day')
    )
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    // dateString peut être une chaîne ou un tableau de chaînes; gérer selon le cas
    if (Array.isArray(dateString)) {
      console.log('RangePicker selected dates:', dateString)
    } else {
      console.log('DatePicker selected date:', dateString)
      dispatch(setServiceDate(dateString))
    }
  }

  return (
    <Space direction="vertical">
      <DatePicker
        size="large"
        onChange={onChange}
        disabledDate={disabledDate}
        placeholder="Choisir une date"
      />
    </Space>
  )
}
