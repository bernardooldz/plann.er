interface ParticipantNameProps {
  currentName: string | null
  index: number
}

export function ParticipantName({ currentName, index }: ParticipantNameProps) {
  const displayName = currentName || `Participante ${index + 1}`

  return (
    <span className="block font-medium text-zinc-100">
      {displayName}
    </span>
  )
}