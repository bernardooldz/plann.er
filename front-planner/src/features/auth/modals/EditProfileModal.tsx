import { useState, useEffect } from "react";
import { X, User, Mail, KeyRound } from "lucide-react";
import { Button, Input } from "../../../design-system";
import { useAuth } from '../hooks/useAuth';
import { ConfirmDataChangesModal } from "./ConfirmDataChangesModal";
import { ChangePasswordModal } from "./ChangePasswordModal";

interface EditProfileModalProps {
  closeModal: () => void;
}

export function EditProfileModal({ closeModal }: EditProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", general: "" });

  useEffect(() => {
    const nameChanged = name !== (user?.name || "");
    const emailChanged = email !== (user?.email || "");
    setHasChanges(nameChanged || emailChanged);
  }, [name, email, user]);

  const validateForm = () => {
    const newErrors = { name: "", email: "", general: "" };

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !hasChanges) return;
    setShowConfirmModal(true);
  };

  const confirmChanges = async () => {
    setLoading(true);
    try {
      await updateProfile({ name: name.trim(), email });
      setShowConfirmModal(false);
      closeModal();
    } catch (err: any) {
      setErrors({ name: "", email: "", general: err.response?.data?.message || "Erro ao atualizar dados" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-160 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Editar meus dados</h2>
              <button onClick={closeModal}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              Atualize suas informações pessoais
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              icon={<User className="size-5" />}
            />

            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              icon={<Mail className="size-5" />}
            />

            {errors.general && (
              <p className="text-red-400 text-sm">{errors.general}</p>
            )}

            <div className="flex items-center justify-between pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowPasswordModal(true)}
              >
                <KeyRound className="size-4" />
                Alterar senha
              </Button>

              <div className="flex gap-2">
                <Button variant="secondary" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!hasChanges || loading}>
                  {loading ? "Salvando..." : "Salvar alterações"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmDataChangesModal
          onConfirm={confirmChanges}
          onCancel={() => setShowConfirmModal(false)}
          loading={loading}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal closeModal={() => setShowPasswordModal(false)} />
      )}
    </>
  );
}
