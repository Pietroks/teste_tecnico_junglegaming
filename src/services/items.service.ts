import { api } from './api'

export interface Item {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  createdAt: string
}

export interface CreateItemDTO {
  title: string
  description: string
  status?: Item['status']
}

export const itemsService = {
  async getAll(): Promise<Item[]> {
    const { data } = await api.get<Item[]>('/items')
    return data
  },

  async getById(id: string): Promise<Item> {
    const { data } = await api.get<Item>(`/items/${id}`)
    return data
  },

  async create(payload: CreateItemDTO): Promise<Item> {
    const { data } = await api.post<Item>('/items', payload)
    return data
  },

  async update(id: string, payload: Partial<CreateItemDTO>): Promise<Item> {
    const { data } = await api.patch<Item>(`/items/${id}`, payload)
    return data
  },

  async delete(id: string): Promise<{ success: boolean; id: string }> {
    const { data } = await api.delete<{ success: boolean; id: string }>(`/items/${id}`)
    return data
  },
}
