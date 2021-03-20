import { Ref, watch } from '@vue/composition-api'

export default function useAnchorTitle(articleBody: Ref<HTMLElement | null>) {
  const svg = `
    <div class="transform scale-75">
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1">
        </path>
      </svg>
    </div>
  `

  watch(
    () => articleBody.value,
    articleBody => {
      const bodyHeaders = articleBody?.querySelectorAll('.article-body h2')

      if (!bodyHeaders) return

      bodyHeaders.forEach((h2: Element) => {
        const a: HTMLAnchorElement = document.createElement('a')

        a.href = '#' + h2.id
        a.insertAdjacentHTML('beforeend', svg)
        h2.insertBefore(a, h2.firstChild)
      })
    }
  )
}
