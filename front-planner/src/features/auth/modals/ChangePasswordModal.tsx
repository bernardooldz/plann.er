import { useState, useEffect } from 'react'
import { X, LockKeyhole, Eye, EyeOff } from 'lucide-react'
import { Button, Input } from '../../../design-system'
import { useAuth } from '../hooks/useAuth'
import { ConfirmPasswordChangeModal } from './ConfirmPasswordChangeModal'

interface ChangePasswordModalProps {
  closeModal: () => void
}

export function ChangePasswordModal({ closeModal }: ChangePasswordModalProps) {
  const { updateProfile } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    general: ''
  })

  useEffect(() => {
    setHasChanges(currentPassword && newPassword && confirmPassword)
  }, [currentPassword, newPassword, confirmPassword])

  const validateForm = () => {
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      general: ''
    }

    if (!currentPassword) {
      newErrors.currentPassword = 'Senha atual é obrigatória'
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'Nova senha é obrigatória'
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Nova senha deve ter pelo menos 6 caracteres'
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória'
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || !hasChanges) return
    setShowConfirmModal(true)
  }

  const confirmPasswordChange = async () => {
    setLoading(true)
    try {
      await updateProfile({ currentPassword, newPassword })
      setShowConfirmModal(false)
      closeModal()
    } catch (err: any) {
      setErrors({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        general: err.response?.data?.message || 'Erro ao alterar senha'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Alterar senha</h2>
              <button onClick={closeModal}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              Digite sua senha atual e a nova senha
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Senha atual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={errors.currentPassword}
                icon={<LockKeyhole className="size-5" />}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
              >
                {showCurrentPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={errors.newPassword}
                icon={<LockKeyhole className="size-5" />}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
              >
                {showNewPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                icon={<LockKeyhole className="size-5" />}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
              >
                {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>

            {errors.general && (
              <p className="text-red-400 text-sm">{errors.general}</p>
            )}

            <div className="flex items-center justify-end gap-2">
              <Button variant="secondary" onClick={closeModal}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!hasChanges || loading}>
                {loading ? 'Alterando...' : 'Alterar senha'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmPasswordChangeModal
          onConfirm={confirmPasswordChange}
          onCancel={() => setShowConfirmModal(false)}
          loading={loading}
        />
      )}
    </>
  )
}