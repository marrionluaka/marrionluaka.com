import { getCurrentInstance } from '@vue/composition-api'

export default function useContext() {
  // @ts-ignore
  const { context } = getCurrentInstance()?.root.proxy
  const storyApi = context.app.$storyapi

  return { context, storyApi }
}
