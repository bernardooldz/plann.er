import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '../../../design-system'
import { useAuth } from '../../../shared/contexts/auth-context'
import { LockKeyhole, LockKeyholeOpen, Mail, User } from 'lucide-react'

export function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await register(name, email, password, confirmPassword)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/src/assets/bg.png')] bg-no-repeat bg-center bg-size-[900px]">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/src/assets/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Crie sua conta e comece a planejar suas viagens
          </p>
        </div>

        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              icon={<User className="size-5" />}
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
            <Input
              icon={<Mail className="size-5" />}
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Input
              icon={<LockKeyhole className="size-5" />}
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Input
              icon={<LockKeyholeOpen className="size-5" />}
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-400 text-sm text-left px-1">{error}</p>
            )}

            <Button type="submit" size="full" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-zinc-400">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-lime-300 hover:text-lime-400 underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>

        <p className="text-sm text-zinc-500">
          Ao criar uma conta você concorda com nossos{' '}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
    </div>
  )
}