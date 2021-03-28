export default {
  inserted(el: any) {
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

    const contentLinks: HTMLCollectionOf<HTMLAnchorElement> = el?.getElementsByTagName('a')

    if (contentLinks)
      Array.prototype.forEach.call(contentLinks, addSmoothScrollToAnchorTags)
  }
}
