import { IoSend } from 'react-icons/io5'
import axios from 'axios'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema } from '../../schemas/messageSchema'
import getApiUrl from '../../utils/getApiUrl'
import { Message, Reservation } from '../../pages/ClientDashboard'
import { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { Button } from '../common/Button'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

interface ChatBoxProps {
  reservationId: string
  messages: Message[]
  updateMessages: (reservationId: string, newMessage: Message) => void
  reservation?: Reservation
}

const ChatBox = ({
  reservationId,
  messages,
  updateMessages,
  reservation,
}: ChatBoxProps) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const sender = useAppSelector((state) => state.user.name)
  const clientEmail = useAppSelector((state) => state.user.email)
  const userRole = useAppSelector((state) => state.user.role)
  const apiUrl = getApiUrl()
  const { t } = useTranslation('clientDashboard')

  useEffect(() => {
    const fileMessages: Message[] = []

    console.log('DEBUG devis.url in ChatBox:', reservation?.devis?.url)

    // ✅ ne push que si l'URL existe vraiment
    if (reservation?.devis) {
      fileMessages.push({
        sender: 'Sahel',
        clientEmail,
        text: `${t('chat.devisAvailable')} 👉`,
        role: 'system',
        created: new Date().toISOString(),
        attachments: [
          {
            url: reservation.devis.url,
            type: 'application/pdf',
          },
        ],
      })
    }

    if (reservation?.finalReportUrl) {
      fileMessages.push({
        sender: 'Sahel',
        clientEmail,
        text: `${t('chat.finalReportAvailable')} 📎`,
        role: 'system',
        created: new Date().toISOString(),
        attachments: [
          {
            url: reservation.finalReportUrl,
            type: 'application/pdf',
          },
        ],
      })
    }

    setChatMessages([...fileMessages, ...messages])
  }, [messages, reservation?.devis?.url, reservation?.finalReportUrl])

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
      created: new Date().toISOString(),
    }

    try {
      await axios.post<Message>(
        `${apiUrl}/reservations/${reservationId}/messages`,
        messagePayload,
      )
      setChatMessages((prevMessages) => [...prevMessages, messagePayload])
      updateMessages(reservationId, messagePayload)
      reset()
      toast.success(t('chat.success'), {
        position: 'bottom-center',
        duration: 5000,
        style: {
          marginBottom: '200px',
          fontSize: '16px',
        },
      })
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error(t('chat.error'), {
        position: 'bottom-center',
        duration: 5000,
        style: {
          marginBottom: '200px',
          fontSize: '16px',
        },
      })
    }
  }

  return (
    <>
      <ul className="space-y-5 flex flex-col h-full overflow-auto overscroll-contain m-2">
        {chatMessages.length > 0 ? (
          chatMessages.map((message, index) => (
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
                className={`border border-gray-200 rounded-sm p-4 space-y-3 ${
                  message.role === 'client'
                    ? 'bg-kaki text-white'
                    : 'bg-slate-200'
                }`}
              >
                <div className="space-y-1.5">
                  <p className="text-sm">{message.text}</p>

                  {message.attachments &&
                    message.attachments.map((attachment, i) => (
                      <a
                        key={i}
                        className="text-blue-600 hover:text-blue-500 opacity-90 block"
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Télécharger
                      </a>
                    ))}
                </div>
              </div>
            </li>
          ))
        ) : (
          <h2 className="text-2xl text-center my-auto text-gray-600">
            {t('chat.welcome', { name: reservation?.firstName })}
          </h2>
        )}
      </ul>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed bottom-0 left-0 right-0  p-2 bg-slate-100 shadow-lg sm:m-auto sm:mb-6 mb-6 mx-4 z-10 sm:w-2/3"
      >
        <div className="space-y-3 flex gap-2  rounded-lg">
          <div className="flex w-full bg-slate-100 p-2">
            <textarea
              {...register('text')}
              className="resize-none bg-slate-100 rounded-md border-none w-full focus:ring-0"
              rows={3}
              placeholder={t('chat.placeholder')}
            ></textarea>
            <div className="flex flex-col justify-between mt-auto">
              <Button
                label={t('chat.send')}
                bgColor="bg-secondaryBlue"
                textColor="text-white"
                hoverColor={'hover:bg-secondaryRegularBlue'}
              />
            </div>
          </div>
          {errors.text && <p>{errors.text.message as string}</p>}
        </div>
      </form>
    </>
  )
}

export default ChatBox
