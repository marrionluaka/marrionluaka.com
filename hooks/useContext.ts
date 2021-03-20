import { applySpec, curry } from "ramda"
import { getCurrentInstance } from '@vue/composition-api'

import resource from '@/lib/resource'

export default function useContext() {
  // @ts-ignore
  const context = getCurrentInstance()?.root.proxy.context
  const repo = applySpec(resource)(context.app.$storyapi)

  return { context, repo }
}
