// types/index.ts
export interface User {
  id: number
  login: string
  fio: string
  email: string
  telephon?: string
  userrole_id: number
  role_name?: 'admin' | 'organizer' | 'user'
}

export interface Trip {
  id: number
  img: string
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  max_participants: number
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'planned' | 'active' | 'completed' | 'cancelled'
  organizer?: User
  participants?: Participant[]
}

export interface Participant {
  id: number
  user: User
  status: 'pending' | 'confirmed' | 'rejected'
  role: 'organizer' | 'participant' | 'guide'
}