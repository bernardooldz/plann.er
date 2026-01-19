import { X } from 'lucide-react'
import { Button } from '../../../design-system'

interface ConfirmDataChangesModalProps {
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

export function ConfirmDataChangesModal({ onConfirm, onCancel, loading }: ConfirmDataChangesModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-[480px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar alterações</h2>
            <button onClick={onCancel} disabled={loading}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Tem certeza que deseja salvar as alterações nos seus dados?
          </p>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={loading}>
            {loading ? 'Salvando...' : 'Confirmar alterações'}
          </Button>
        </div>
      </div>
    </div>
  )
}