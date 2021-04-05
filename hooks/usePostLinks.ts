import { pipe, values, reduce } from 'ramda'
import { ref, Ref } from '@vue/composition-api'

interface IPostLinks {
  prev: ILink
  next: ILink
}

interface ILink {
  name: string
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
  const nextPostTitle: Ref<string> = ref('')
  const prev: Ref<string> = ref('')
  const prevPostTitle: Ref<string> = ref('')

  const setPrevNextLinks = async (uuid: string): Promise<void> => {
    const { data: { links } } = await storyApi.get('cdn/links/', { starts_with: 'article/' })

    const matchedRoute: ILink = links[uuid]
    const pos: number = matchedRoute.position

    const { prev: prevArticle, next: nextArticle } = pipe<{ [key: string]: ILink }, ILink[], IPostLinks>(
      (links: { [key: string]: ILink }): ILink[] => values(links),
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
    nextPostTitle.value = nextArticle?.name
    prev.value = prevArticle?.real_path
    prevPostTitle.value = prevArticle?.name
  }

  return { next, prev, nextPostTitle, prevPostTitle, setPrevNextLinks }
}
