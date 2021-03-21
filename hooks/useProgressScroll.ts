import { ref, Ref } from "@vue/composition-api"

export default function useProgressScroll() {
  const progress: Ref<number> = ref(0)

  const setProgress = (): void => {
    const winScroll: number = document.body.scrollTop || document.documentElement.scrollTop
    const height: number = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled: number = (winScroll / height) * 100

    progress.value = scrolled
  }

  return { progress, setProgress }
}
