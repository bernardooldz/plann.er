import { useState } from 'react'
import { participantsService } from '../services/participants.service'

interface EditableParticipantNameProps {
  participantId: string
  currentName: string | null
  index: number
  onNameUpdate: (newName: string) => void
}

export function EditableParticipantName({ 
  participantId, 
  currentName, 
  index, 
  onNameUpdate 
}: EditableParticipantNameProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(currentName || '')
  const [isLoading, setIsLoading] = useState(false)

  const displayName = currentName || `Participante ${index + 1}`

  async function handleSave() {
    if (!name.trim()) return

    setIsLoading(true)
    try {
      await participantsService.updateParticipant(participantId, name.trim())
      onNameUpdate(name.trim())
      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao atualizar nome:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setName(currentName || '')
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded text-sm border border-zinc-600 focus:border-lime-300 focus:outline-none"
        placeholder={`Participante ${index + 1}`}
        autoFocus
      />
    )
  }

  return (
    <span 
      className="block font-medium text-zinc-100 cursor-pointer hover:text-lime-300 transition-colors"
      onDoubleClick={() => {
        setName(currentName || '')
        setIsEditing(true)
      }}
      title="Duplo clique para editar"
    >
      {displayName}
    </span>
  )
}