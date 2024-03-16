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
    // Utilisez la date courante sans conversion UTC pour aligner avec le stockage local des dates
    const today = dayjs().startOf('day')
    const isTodayOrBefore = current.isSameOrBefore(today, 'day')

    // Vérifie si la date est dans les 15 jours à venir pour certaines réservations
    const isWithin15DaysFromToday =
      isBeforeOrAfter === 'before' &&
      current.isBefore(today.add(15, 'day'), 'day')

    // Vérifie si la date a atteint le nombre maximal de réservations
    const isFullyBooked = reservationCounts.some(
      ({ date, count }) => dayjs(date).isSame(current, 'day') && count >= 3,
    )

    return isTodayOrBefore || isWithin15DaysFromToday || isFullyBooked
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    // Vérifiez que dateString est une chaîne, pas un tableau de chaînes
    if (typeof dateString === 'string') {
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
