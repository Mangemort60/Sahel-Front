import { IoSend } from 'react-icons/io5'
import axios from 'axios'
import { useAppSelector } from '../../redux/hooks'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema } from '../../schemas/messageSchema'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ChatBox = () => {
  const reservationId = useAppSelector((state) => state.ui.reservationId)
  const sender = useAppSelector((state) => state.user.name)
  const [messages, setMessages] = useState<Message[]>([])
  const userRole = useAppSelector((state) => state.user.role)

  interface Message {
    sender: string
    text: string
    role: string
    attachments?: string[]
    created: string
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<Message[]>(
          `http://localhost:3001/reservations/${reservationId}/messages`,
        )
        setMessages(response.data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()
  }, [reservationId])

  useEffect(() => {
    const markMessagesAsReadByClient = async () => {
      try {
        await axios.put(
          `http://localhost:3001/reservations/${reservationId}/messages/read-by-client`,
        )
      } catch (error) {
        console.error('Error marking messages as read by agent:', error)
      }
    }

    markMessagesAsReadByClient()
  }, [reservationId])

  type MessageData = z.infer<typeof messageSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageData>({
    resolver: zodResolver(messageSchema),
  })

  const onSubmit = async (data: MessageData) => {
    const messagePayload: Message = {
      sender,
      text: data.text,
      role: userRole,
      created: new Date().toISOString(), // Ajoute un timestamp
    }

    try {
      await axios.post<Message>(
        `http://localhost:3001/reservations/${reservationId}/messages`,
        messagePayload,
      )
      setMessages((prevMessages) => [...prevMessages, messagePayload])
      reset()
      alert('Message sent successfully')
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    }
  }

  return (
    <div className="mt-8">
      <Link to={'/client-dashboard/reservations'}>
        <button className="text-gray-400 mb-8 flex items-center gap-2">
          <FaArrowLeft />
          <p>Retour aux réservations</p>
        </button>
      </Link>
      <ul className="space-y-5 flex flex-col items-end">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`max-w-lg flex gap-x-2 sm:gap-x-4  ${message.role === 'client' ? 'ml-auto' : 'mr-auto'}`}
          >
            <div
              className={`bg-white border border-gray-200 rounded-2xl p-4 space-y-3 ${message.role === 'client' ? 'bg-blue-800 text-white' : 'bg-slate-300'} dark:bg-neutral-900 dark:border-neutral-700`}
            >
              <div className="space-y-1.5">
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm space-y-3 mt-8 flex gap-2">
          <textarea
            {...register('text')}
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            rows={3}
            placeholder="Ecrivez votre message ici..."
          ></textarea>
          {errors.text && <p>{errors.text.message as string}</p>}
          <div className="flex flex-col justify-between ">
            <button type="submit">
              <IoSend
                fontSize={28}
                color="blue"
                className="hover:cursor-pointer"
              />
            </button>
            {/* <IoIosAttach
              fontSize={28}
              color="grey"
              className="hover:cursor-pointer"
            /> */}
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChatBox
