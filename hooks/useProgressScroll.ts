import { ref, Ref } from "@vue/composition-api"

export default function useProgressScroll() {
  const progress: Ref<number> = ref(0)

  const setProgress = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (winScroll / height) * 100

    progress.value = scrolled
  }

  return { progress, setProgress }
}
