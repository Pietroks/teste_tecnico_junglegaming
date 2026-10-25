import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { itemsService, type CreateItemDTO } from '../services/items.service'

export const ITEMS_QUERY_KEY = ['items']

export function useItems() {
  const queryClient = useQueryClient()

  const itemsQuery = useQuery({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: itemsService.getAll,
  })

  const createItemMutation = useMutation({
    mutationFn: (data: CreateItemDTO) => itemsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
    },
  })

  const deleteItemMutation = useMutation({
    mutationFn: (id: string) => itemsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY })
    },
  })

  return {
    items: itemsQuery.data ?? [],
    isLoading: itemsQuery.isLoading,
    isError: itemsQuery.isError,
    error: itemsQuery.error,
    createItem: createItemMutation.mutateAsync,
    isCreating: createItemMutation.isPending,
    deleteItem: deleteItemMutation.mutateAsync,
    isDeleting: deleteItemMutation.isPending,
  }
}
