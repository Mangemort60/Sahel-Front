import type { DatePickerProps } from 'antd'
import { DatePicker, Space } from 'antd'
import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString)
}

dayjs.extend(isSameOrBefore)
dayjs.extend(utc)

export const CustomDatePicker = () => {
  const [reservedDates, setReservedDates] = useState<Dayjs[]>([])

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const { data } = await axios.get<string[]>(
          'http://localhost:3000/reserved-dates',
        ) // Remplacez par l'URL de votre endpoint
        setReservedDates(data.map((dateStr) => dayjs.utc(dateStr)))
      } catch (error) {
        console.error('Error fetching reserved dates:', error)
      }
    }

    fetchReservedDates()
  }, [])

  const disabledDate = (current: Dayjs) => {
    // Utiliser dayjs pour la comparaison
    return (
      reservedDates.some((date) => date.isSame(current, 'day')) ||
      current.isSameOrBefore(dayjs().add(1, 'day').startOf('day'))
    )
  }
  return (
    <Space direction="vertical">
      <DatePicker onChange={onChange} disabledDate={disabledDate} />
    </Space>
  )
}
