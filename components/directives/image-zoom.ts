import { curry } from 'ramda'

export default {
  inserted(el: any) {
    const _removeImageOverlay = curry((overlay: HTMLElement, layout: HTMLElement, _: any) => {
      layout?.removeChild(overlay)
      document.querySelector('.zoomed')?.classList.remove('zoomed')
    })
  
    const _zoomImage = curry((overlay: HTMLElement, layout: HTMLElement, e: Event) => {
      const target = <HTMLElement> e?.target
  
      if (target.classList.contains('zoomed')) {
        target.classList.remove('zoomed')
        _removeImageOverlay(overlay, layout, e)
      } else {
        target.classList.add('zoomed')
  
        overlay.id = 'overlay'
        overlay.classList.add('overlay')
        layout?.appendChild(overlay)
      }
    }) 

    const _onScroll = (layout: any) => {
      const overlay = document.getElementById('overlay')
      if (overlay) _removeImageOverlay(overlay, layout, null)
    }

    const imgs: any = el?.getElementsByTagName('img')
    const overlay: HTMLElement = document.createElement('div')
    const layout: any = document.getElementById('__layout')

    el.onScroll = _onScroll.bind(null, layout)

    if (!imgs || !layout) return

    document.addEventListener('scroll', el.onScroll)
    overlay.addEventListener('click', _removeImageOverlay(overlay, layout))

    Array.prototype.forEach.call(
      imgs,
      (img: HTMLImageElement) => {
        img.parentElement?.classList.add('flex', 'justify-center')
        img.addEventListener('click', _zoomImage(overlay, layout))
      }
    )
  },

  unbind(el: any) {
    document.removeEventListener('scroll', el.onScroll)
  }
}
