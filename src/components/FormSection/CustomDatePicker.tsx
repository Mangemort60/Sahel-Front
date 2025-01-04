import { useEffect, useState } from 'react'
import { DatePicker, DatePickerProps, Space } from 'antd'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
import { setServiceStartDate } from '../../redux/slices/formSlice'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import getApiUrl from '../../utils/getApiUrl'

dayjs.extend(isSameOrBefore)
dayjs.extend(utc)

// Définissez le type pour les données de comptage des réservations
interface ReservationCount {
  date: string
  count: number
}

export const CustomDatePicker = () => {
  const apiUrl = getApiUrl()

  // Utiliser deux états séparés pour les réservations de ménage et de cuisine
  const [cleaningReservationCounts, setCleaningReservationCounts] = useState<
    ReservationCount[]
  >([])
  const [cookingReservationCounts, setCookingReservationCounts] = useState<
    ReservationCount[]
  >([])

  const dispatch = useDispatch()

  // Sélectionner le type de réservation (ménage ou cuisine) depuis le Redux store
  const reservationType = useAppSelector((state) => state.form.reservationType)
  const isBeforeOrAfter = useAppSelector(
    (state) => state.form.formData.cleaning?.beforeOrAfter,
  )

  useEffect(() => {
    const fetchReservationCounts = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/reserved-dates`)

        // Séparer les données récupérées pour ménage et cuisine
        setCleaningReservationCounts(data.cleaning)
        setCookingReservationCounts(data.cooking)
      } catch (error) {
        console.error('Error fetching reservation counts:', error)
      }
    }

    fetchReservationCounts()
  }, [apiUrl])

  const disabledDate = (current: Dayjs) => {
    const today = dayjs().startOf('day')
    const isTodayOrBefore = current.isSameOrBefore(today, 'day')

    // Vérifie si la date est dans les 15 jours à venir pour certaines réservations
    const isWithin15DaysFromToday =
      isBeforeOrAfter === 'before' &&
      current.isBefore(today.add(15, 'day'), 'day')

    // Sélectionner les réservations en fonction du type de réservation
    const reservationCounts =
      reservationType === 'ménage'
        ? cleaningReservationCounts
        : cookingReservationCounts

    // ✅ Correction : Comparer directement des dates ISO 8601
    const isFullyBooked = reservationCounts.some(({ date, count }) => {
      const parsedDate = dayjs(date) // Convertir date en objet Dayjs
      return parsedDate.isSame(current, 'day') && count >= 3
    })

    return isTodayOrBefore || isWithin15DaysFromToday || isFullyBooked
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      const isoDate = date.toISOString() // Stocker la date au format ISO 8601
      dispatch(setServiceStartDate(isoDate))
      console.log('DatePicker selected date (ISO):', isoDate)
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
