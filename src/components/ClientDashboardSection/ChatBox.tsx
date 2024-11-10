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
import { auth } from '../../../firebase-config'
import { Button } from '../common/Button'
import toast from 'react-hot-toast'

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
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({}) // Pour stocker les URLs d'images
  const sender = useAppSelector((state) => state.user.name)
  const clientEmail = useAppSelector((state) => state.user.email)
  const userRole = useAppSelector((state) => state.user.role)
  const apiUrl = getApiUrl()

  // Fonction pour récupérer les URL sécurisées des images
  const fetchImageUrl = async (path: string, messageIndex: number) => {
    const storage = getStorage()
    const imageRef = ref(storage, path)

    try {
      const url = await getDownloadURL(imageRef)
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [messageIndex]: url,
      }))
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'URL sécurisée :",
        error,
      )
    }
  }

  useEffect(() => {
    // Récupérer les URL des images pour chaque message qui a un attachement
    messages.forEach((message, index) => {
      if (message.attachments && message.attachments.length > 0) {
        message.attachments.forEach((attachment) => {
          if (attachment.type.startsWith('image/')) {
            fetchImageUrl(attachment.url, index) // Récupérer l'URL sécurisée
          }
        })
      }
    })
  }, [messages])

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
      // Remplacer l'alerte par un toast
      toast.success(
        'Message envoyé avec succès. Notre équipe vous répondra sous 48h.',
        {
          position: 'bottom-center', // Affiche ce toast au centre du haut de l'écran
          duration: 5000, // Ce toast reste visible pendant 5 secondes
          style: {
            marginBottom: '200px',
            fontSize: '16px',
          },
        },
      )
    } catch (error) {
      console.error('Error sending message:', error)
      // Toast en cas d'erreur
      toast.success("Échec de l'envoi du message. Veuillez réessayer.", {
        position: 'bottom-center', // Affiche ce toast au centre du haut de l'écran
        duration: 5000, // Ce toast reste visible pendant 5 secondes
        style: {
          marginBottom: '200px',
          fontSize: '16px',
        },
      })
    }
  }

  return (
    <>
      <ul className="space-y-5 flex flex-col h-full overflow-auto overscroll-contain  m-2">
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

                  {/* Affichage des images ou des liens de téléchargement */}
                  {message.attachments &&
                    message.attachments.length > 0 &&
                    message.attachments.map((attachment, i) =>
                      attachment.url ? (
                        attachment.type.startsWith('image/') ? (
                          <img
                            key={i}
                            src={imageUrls[index]} // Utiliser l'URL sécurisée récupérée
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
                        )
                      ) : null,
                    )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <h2 className="text-2xl text-center my-auto text-gray-600">
            Bonjour {reservation?.firstName} ! en quoi pouvons nous vous aider
            aujourd'hui ?
          </h2>
        )}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="space-y-3 m-2 flex gap-2 shadow-md rounded-lg">
          <div className="flex w-full p-2">
            <textarea
              {...register('text')}
              className="resize-none rounded-md border-none w-full focus:ring-0"
              rows={3}
              placeholder="Écrivez votre message ici..."
            ></textarea>
            <div className="flex flex-col justify-between mt-auto">
              <Button
                label="Envoyer"
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
