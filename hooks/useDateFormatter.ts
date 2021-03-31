import { format } from 'date-fns'
import { ref, Ref } from '@vue/composition-api'

import { DATE_FORMAT } from '@/global-const'

export default function useDateFormatter() {
  const formattedDate: Ref<string> = ref('')

  const formatDate = (dateString: string): void => {
    formattedDate.value = format(new Date(dateString), DATE_FORMAT)
  }

  return { formattedDate, formatDate }
}
