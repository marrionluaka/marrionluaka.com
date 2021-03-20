import { curry } from 'ramda'
import { Ref, watch } from '@vue/composition-api'

export default function useImageZoom(articleBody: Ref<HTMLElement | null>) {
  const removeImageOverlay = curry((overlay: HTMLElement, layout: HTMLElement, _: any) => {
    layout?.removeChild(overlay)
    document.querySelector('.zoomed')?.classList.remove('zoomed')
  })

  const zoomImage = curry((overlay: HTMLElement, layout: HTMLElement, e: Event) => {
    const target = <HTMLElement> e?.target

    if (target.classList.contains('zoomed')) {
      target.classList.remove('zoomed')
      removeImageOverlay(overlay, layout, e)
    } else {
      target.classList.add('zoomed')

      overlay.id = 'overlay'
      overlay.classList.add('overlay')
      layout?.appendChild(overlay)
    }
  })

  const _onScroll = (layout: any) => {
    const overlay = document.getElementById('overlay')
    if (overlay) removeImageOverlay(overlay, layout, null)
  }

  watch(
    () => articleBody.value,
    articleBody => {
      // @ts-ignore
      const imgs: any = articleBody?.getElementsByTagName('img')
      const overlay: HTMLElement = document.createElement('div')
      const layout: any = document.getElementById('__layout')

      if (!imgs || !layout) return

      document.addEventListener('scroll', _onScroll.bind(null, layout))
      overlay.addEventListener('click', removeImageOverlay(overlay, layout))

      Array.prototype.forEach.call(
        imgs,
        (img: HTMLImageElement) => {
          img.parentElement?.classList.add('flex', 'justify-center')
          img.addEventListener('click', zoomImage(overlay, layout))
        }
      )
    }
  )

  return { articleBody }
}
