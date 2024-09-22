import { IoSend } from 'react-icons/io5'
import axios from 'axios'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema } from '../../schemas/messageSchema'
import getApiUrl from '../../utils/getApiUrl'
import { Message } from '../../pages/ClientDashboard'

interface ChatBoxProps {
  reservationId: string | undefined
  messages: Message[]
}

const ChatBox = ({ reservationId, messages }: ChatBoxProps) => {
  const sender = useAppSelector((state) => state.user.name)
  const clientEmail = useAppSelector((state) => state.user.email)
  const userRole = useAppSelector((state) => state.user.role)
  const apiUrl = getApiUrl()

  // useEffect(() => {
  //   const markMessagesAsReadByClient = async () => {
  //     try {
  //       await axios.put(
  //         `${apiUrl}/reservations/${reservationId}/messages/read-by-client`,
  //       )
  //     } catch (error) {
  //       console.error('Error marking messages as read by agent:', error)
  //     }
  //   }

  //   markMessagesAsReadByClient()
  // }, [reservationId])

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
      clientEmail,
      text: data.text,
      role: userRole,
      created: new Date().toISOString(), // Ajoute un timestamp
    }

    try {
      await axios.post<Message>(
        `${apiUrl}/reservations/${reservationId}/messages`,
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
      <h1>{reservationId}</h1>
      <ul className="space-y-5 flex flex-col items-end">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => (
            <li
              key={index}
              className={`max-w-lg flex flex-col gap-x-2 sm:gap-x-4 ${
                message.role === 'client' ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {message.role !== 'client' && (
                <div className="text-xs text-slate-500 mb-1">
                  {message.sender}
                </div>
              )}
              <div
                className={`border border-gray-200 rounded-2xl p-4 space-y-3 ${
                  message.role === 'client'
                    ? 'bg-kaki text-white'
                    : 'bg-slate-200'
                }`}
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
                          key={i}
                          className="text-blue-600 hover:text-blue-500 opacity-90"
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Télécharger
                        </a>
                      ),
                    )}
                </div>
              </div>
            </li>
          ))
        ) : (
          // Affichage alternatif si le tableau de messages est vide ou non défini
          <p>Aucun message disponible pour cette réservation.</p>
        )}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm space-y-3 mt-8 flex gap-2">
          <textarea
            {...register('text')}
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            rows={3}
            placeholder="Écrivez votre message ici..."
          ></textarea>
          {errors.text && <p>{errors.text.message as string}</p>}
          <div className="flex flex-col justify-between">
            <button type="submit">
              <IoSend
                fontSize={28}
                color="blue"
                className="hover:cursor-pointer"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChatBox
