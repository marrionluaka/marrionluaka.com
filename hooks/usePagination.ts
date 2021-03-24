import { ref, Ref, ComputedRef } from '@vue/composition-api'

export default function usePagination() {
  const oldest = ref({})
  const newest = ref({})
  const currentPage: Ref<number> = ref(1)

  const setPagination = (category: string | (string | null)[], page: number, totalPages: ComputedRef<number>) => {
    const newestPage = page - 1 || 1
    const oldestPage = page + 1 > totalPages.value ? totalPages.value : page + 1

    currentPage.value = page
    newest.value = { name: 'articles', query: { category, page: newestPage } }
    oldest.value = { name: 'articles', query: { category, page: oldestPage } }
  }

  return { oldest, newest, currentPage, setPagination }
}
