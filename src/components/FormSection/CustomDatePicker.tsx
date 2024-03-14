import { useEffect, useState } from 'react'
import { DatePicker, DatePickerProps, Space } from 'antd'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
import { setServiceDate } from '../../redux/slices/formSlice'
import { useAppSelector } from '../../redux/hooks'

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

  const isBeforeOrAfter = useAppSelector(
    (state) => state.form.formData.beforeOrAfter,
  )

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
    // La condition vérifie si la date courante est avant "aujourd'hui + 15 jours". Cela désactive toutes les dates jusqu'à 15 jours à partir d'aujourd'hui inclus.
    const isWithin15DaysFromToday =
      isBeforeOrAfter === 'before' &&
      current.isBefore(dayjs().add(15, 'day').startOf('day'))

    return (
      reservationCounts.some(
        ({ date, count }) =>
          dayjs.utc(date).isSame(current, 'day') && count >= 3,
      ) ||
      (isBeforeOrAfter === 'before' && isWithin15DaysFromToday) ||
      current.isSameOrBefore(dayjs().startOf('day'), 'day')
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
