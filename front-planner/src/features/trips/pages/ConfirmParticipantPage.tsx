import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { participantsService } from '../services/participants.service'
import logoImg from '../../../assets/logo.svg'
import bgImg from '../../../assets/bg.png'

export function ConfirmParticipantPage() {
  const { participantId } = useParams<{ participantId: string }>()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function confirmParticipant() {
      if (!participantId) {
        setStatus('error')
        setMessage('ID do participante não encontrado')
        return
      }

      try {
        // Primeiro busca os dados do participante para obter o tripId
        const participant = await participantsService.getParticipant(participantId)
        
        // Se o participante já está confirmado, redireciona diretamente
        if (participant.is_confirmed) {
          setStatus('success')
          setMessage('Você já confirmou sua presença!')
          setTimeout(() => {
            navigate(`/trips/${participant.trip_id}`)
          }, 2000)
          return
        }

        // Confirma o participante
        const confirmResponse = await participantsService.confirmParticipant(participantId)
        
        setStatus('success')
        setMessage('Presença confirmada com sucesso!')
        
        // Usa o trip_id do participante original
        setTimeout(() => {
          navigate(`/trips/${participant.trip_id}`)
        }, 2000)
        
      } catch (error: any) {
        setStatus('error')
        if (error.response?.status === 404) {
          setMessage('Participante não encontrado')
        } else {
          setMessage('Erro ao confirmar presença. Tente novamente.')
        }
      }
    }

    confirmParticipant()
  }, [participantId, navigate])

  return (
    <div 
      className="h-screen flex items-center justify-center bg-zinc-950 bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src={logoImg} alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Confirmação de Presença
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl shadow-shape space-y-6">
          {status === 'loading' && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-300 mx-auto"></div>
              <p className="text-zinc-100">Confirmando sua presença...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="w-8 h-8 bg-lime-300 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-lime-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lime-300 font-medium">{message}</p>
              <p className="text-zinc-400 text-sm">Redirecionando para a viagem...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-red-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-red-400 font-medium">{message}</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400 transition-colors"
              >
                Voltar ao início
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}