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
import { auth, storage } from '../../../firebase-config' // Importez votre configuration Firebase
import { getDownloadURL, ref } from 'firebase/storage'

const ChatBox = () => {
  const reservationId = useAppSelector((state) => state.ui.reservationId)
  const sender = useAppSelector((state) => state.user.name)
  const [messages, setMessages] = useState<Message[]>([])
  const userRole = useAppSelector((state) => state.user.role)

  interface Message {
    sender: string
    text: string
    role: string
    attachments?: { url: string; type: string }[]
    created: string
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<Message[]>(
          `http://localhost:3001/reservations/${reservationId}/messages`,
        )

        const messagesWithUrls = await Promise.all(
          response.data.map(async (message) => {
            if (message.attachments && message.attachments.length > 0) {
              const attachmentsWithUrls = await Promise.all(
                message.attachments.map(async (attachment) => {
                  const fileRef = ref(storage, attachment.url)
                  const url = await getDownloadURL(fileRef)
                  return { url, type: attachment.type }
                }),
              )
              message.attachments = attachmentsWithUrls
            }
            return message
          }),
        )

        setMessages(messagesWithUrls)
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
            className={`max-w-lg flex flex-col gap-x-2 sm:gap-x-4  ${message.role === 'client' ? 'ml-auto' : 'mr-auto'}`}
          >
            {message.role !== 'client' && (
              <div className="text-xs text-slate-500 mb-1">
                {message.sender}
              </div>
            )}
            <div
              className={`border border-gray-200 rounded-2xl p-4 space-y-3 ${message.role === 'client' ? 'bg-kaki text-white' : 'bg-slate-200'} `}
            >
              <div className="space-y-1.5">
                <p className="text-sm">{message.text}</p>
                {message.attachments &&
                  message.attachments.map((attachment, i) =>
                    attachment.type.startsWith('image/') ? (
                      <img
                        key={i}
                        src={attachment.url}
                        alt={`attachment-${i}`}
                        style={{ maxWidth: '100%' }}
                      />
                    ) : (
                      <a
                        className="text-blue-600 hover:text-blue-500 opacity-90"
                        href={attachment.url}
                        target="_blank"
                      >
                        Télécharger
                      </a>
                    ),
                  )}{' '}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm space-y-3 mt-8 flex gap-2">
          <textarea
            {...register('text')}
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
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
