import { applySpec } from "ramda"
import { getCurrentInstance } from '@vue/composition-api'

import resource from '@/lib/resource'

export default function useContext() {
  // @ts-ignore
  const { context } = getCurrentInstance()?.root.proxy
  const repo = applySpec(resource)(context.app.$storyapi)
  const storyApi = context.app.$storyapi

  return { context, repo, storyApi }
}
