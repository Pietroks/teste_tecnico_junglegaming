import { http, HttpResponse } from 'msw'
import type { Item, CreateItemDTO } from '../services/items.service'

let mockItems: Item[] = [
  {
    id: '1',
    title: 'Configurar TanStack Router',
    description: 'Roteamento seguro, performático com suporte a busca e loaders.',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: '2',
    title: 'Integrar TanStack Query & Axios',
    description: 'Gestão de cache assíncrono, mutations e interceptors HTTP.',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: '3',
    title: 'Adicionar componentes shadcn/ui e Tailwind CSS',
    description: 'Design system acessível com suporte a temas e componentes reutilizáveis.',
    status: 'completed',
    createdAt: new Date().toISOString(),
  },
]

export const handlers = [
  // Listar items
  http.get('/api/items', () => {
    return HttpResponse.json(mockItems, { status: 200 })
  }),

  // Obter item específico
  http.get('/api/items/:id', ({ params }) => {
    const { id } = params
    const item = mockItems.find((i) => i.id === id)

    if (!item) {
      return HttpResponse.json({ message: 'Item não encontrado' }, { status: 404 })
    }

    return HttpResponse.json(item, { status: 200 })
  }),

  // Criar item
  http.post('/api/items', async ({ request }) => {
    const body = (await request.json()) as CreateItemDTO

    const newItem: Item = {
      id: String(Date.now()),
      title: body.title,
      description: body.description || '',
      status: body.status || 'pending',
      createdAt: new Date().toISOString(),
    }

    mockItems.unshift(newItem)
    return HttpResponse.json(newItem, { status: 201 })
  }),

  // Deletar item
  http.delete('/api/items/:id', ({ params }) => {
    const { id } = params
    mockItems = mockItems.filter((i) => i.id !== id)
    return HttpResponse.json({ success: true, id }, { status: 200 })
  }),
]
