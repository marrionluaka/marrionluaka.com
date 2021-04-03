export default {
  inserted(el: any) {
    const toggleToTop = (toTop: HTMLElement) => {
      if (window.scrollY > 5) {
        toTop.classList.add('show')
      } else {
        toTop.classList.remove('show')
      }
    }

    el.toggleToTop = toggleToTop.bind(null, el)
    document.addEventListener('scroll', el.toggleToTop)
    el.addEventListener('click', () => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }))
  },

  unbind(el: any) {
    document.removeEventListener('scroll', el.toggleToTop)
  }
}
