import { watch, Ref } from '@vue/composition-api'

export default function useSmoothScroll(articleContent: Ref<HTMLElement | null>) {
  const smoothScroll = (e: Event) => {
    const target = <HTMLAnchorElement> e.target
    document.getElementById(target?.hash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  const addSmoothScrollToAnchorTags = (a: HTMLAnchorElement) => {
    a.addEventListener('click', (e: Event) => {
      e.preventDefault()
      smoothScroll(e)
    })
  }

  watch(
    () => articleContent.value,
    articleContent => {
      if (articleContent) {
        const contentLinks: HTMLCollectionOf<HTMLAnchorElement> = articleContent?.getElementsByTagName('a')

        if (contentLinks)
          Array.prototype.forEach.call(contentLinks, addSmoothScrollToAnchorTags)
      }
    }
  )

  return { smoothScroll }
}
