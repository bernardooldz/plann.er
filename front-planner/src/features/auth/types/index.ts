export interface User {
  id: string
  name: string
  email: string
  created_at?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface UpdateProfileData {
  name?: string
  email?: string
  currentPassword?: string
  newPassword?: string
}