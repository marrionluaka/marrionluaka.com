import { pipe, values, reduce } from 'ramda'
import { ref, Ref } from '@vue/composition-api'

interface IPostLinks {
  prev: ILink
  next: ILink
}

interface ILink {
  position: number
  real_path: string
}

interface IData {
  data: {
    links: { [key: string]: ILink }
  }
}

export default function usePostLinks(storyApi: { get: (str: string, opts: any) => Promise<IData> }) {
  const next: Ref<string> = ref('')
  const prev: Ref<string> = ref('')

  const setPrevNextLinks = async (uuid: string): Promise<void> => {
    const { data: { links } } = await storyApi.get('cdn/links/', { starts_with: 'article/' })

    const matchedRoute: ILink = links[uuid]
    const pos: number = matchedRoute.position

    const { prev: prevArticle, next: nextArticle } = pipe(
      (links: { [key: string]: ILink }) => values(links),
      reduce(
        (acc: IPostLinks, val: ILink) => {
          if (val.position === pos + 10) {
            acc.prev = val
          }

          if (val.position === pos - 10) {
            acc.next = val
          }

          return acc
        },
        {} as IPostLinks
      )
    )(links)

    next.value = nextArticle?.real_path
    prev.value = prevArticle?.real_path
  }

  return { next, prev, setPrevNextLinks }
}
