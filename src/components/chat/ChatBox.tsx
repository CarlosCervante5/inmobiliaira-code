'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Send, Loader2, User, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  isRead: boolean
  createdAt: string
  sender: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
  receiver: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

interface ChatBoxProps {
  brokerId: string
  brokerName: string
  propertyTitle?: string
  propertyId?: string
}

interface GuestInfo {
  name: string
  email: string
}

export function ChatBox({ brokerId, brokerName, propertyTitle, propertyId }: ChatBoxProps) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null)
  const [showGuestForm, setShowGuestForm] = useState(false)
  const [guestFormData, setGuestFormData] = useState({ name: '', email: '' })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Cargar datos de invitado desde localStorage
  useEffect(() => {
    const storedGuest = localStorage.getItem('guestChatInfo')
    if (storedGuest) {
      setGuestInfo(JSON.parse(storedGuest))
    } else if (!session) {
      setShowGuestForm(true)
    }
  }, [session])

  const fetchMessages = async () => {
    if (!session) return // No cargar mensajes para invitados
    
    try {
      const response = await fetch(`/api/chat?otherUserId=${brokerId}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error al cargar mensajes:', error)
    }
  }

  useEffect(() => {
    if (session) {
      setIsLoading(true)
      fetchMessages().finally(() => setIsLoading(false))

      // Polling cada 3 segundos para nuevos mensajes
      intervalRef.current = setInterval(() => {
        fetchMessages()
      }, 3000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [brokerId, session])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleGuestFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestFormData.name.trim() || !guestFormData.email.trim()) return

    const guest = {
      name: guestFormData.name.trim(),
      email: guestFormData.email.trim(),
    }
    
    localStorage.setItem('guestChatInfo', JSON.stringify(guest))
    setGuestInfo(guest)
    setShowGuestForm(false)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || isSending) return

    setIsSending(true)

    try {
      // Si es usuario autenticado, usar /api/chat
      if (session) {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            receiverId: brokerId,
            content: newMessage.trim(),
          }),
        })

        if (response.ok) {
          const message = await response.json()
          setMessages([...messages, message])
          setNewMessage('')
        } else {
          const data = await response.json()
          alert(data.error || 'Error al enviar el mensaje')
        }
      } 
      // Si es invitado, usar /api/contact
      else if (guestInfo) {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brokerId,
            propertyId: propertyId || null,
            name: guestInfo.name,
            email: guestInfo.email,
            phone: '',
            message: newMessage.trim(),
            contactMethod: 'chat',
          }),
        })

        if (response.ok) {
          // Para invitados, mostrar el mensaje localmente
          const tempMessage = {
            id: Date.now().toString(),
            senderId: 'guest',
            receiverId: brokerId,
            content: newMessage.trim(),
            isRead: false,
            createdAt: new Date().toISOString(),
            sender: {
              id: 'guest',
              name: guestInfo.name,
              email: guestInfo.email,
              image: null,
            },
            receiver: {
              id: brokerId,
              name: brokerName,
              email: null,
              image: null,
            }
          }
          setMessages([...messages, tempMessage])
          setNewMessage('')
          alert('Mensaje enviado. El bróker recibirá tu consulta por correo.')
        } else {
          const data = await response.json()
          alert(data.error || 'Error al enviar el mensaje')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar el mensaje')
    } finally {
      setIsSending(false)
    }
  }

  const formatTime = (date: string) => {
    const messageDate = new Date(date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const isToday = messageDate.toDateString() === today.toDateString()
    const isYesterday = messageDate.toDateString() === yesterday.toDateString()

    if (isToday) {
      return messageDate.toLocaleTimeString('es-MX', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    } else if (isYesterday) {
      return 'Ayer ' + messageDate.toLocaleTimeString('es-MX', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    } else {
      return messageDate.toLocaleDateString('es-MX', { 
        day: '2-digit', 
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  // Formulario para invitados
  if (showGuestForm && !session) {
    return (
      <div className="flex flex-col h-full p-6 bg-gray-50">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Iniciar conversación
              </h3>
              <p className="text-sm text-gray-600">
                Proporciona tu información para contactar al bróker
              </p>
            </div>

            <form onSubmit={handleGuestFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tu nombre *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={guestFormData.name}
                    onChange={(e) => setGuestFormData({ ...guestFormData, name: e.target.value })}
                    placeholder="Juan Pérez"
                    className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tu correo electrónico *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={guestFormData.email}
                    onChange={(e) => setGuestFormData({ ...guestFormData, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continuar al chat
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Tu información solo será usada para esta conversación
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header del chat */}
      <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
        <h3 className="font-semibold text-gray-900">{brokerName}</h3>
        {propertyTitle && (
          <p className="text-sm text-gray-600 truncate">Consulta sobre: {propertyTitle}</p>
        )}
        {guestInfo && !session && (
          <p className="text-xs text-blue-600 mt-1">
            Conectado como: {guestInfo.name}
          </p>
        )}
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ maxHeight: '400px' }}>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-sm">No hay mensajes aún</p>
              <p className="text-xs mt-1">Envía un mensaje para iniciar la conversación</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isOwn = session 
                ? message.senderId === session?.user?.id
                : message.senderId === 'guest'
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      isOwn
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input de mensaje */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            disabled={isSending}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
