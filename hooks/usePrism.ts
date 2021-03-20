import 'prismjs'
import prism from 'markdown-it-prism'
import "prismjs/components/prism-css"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-javascript"
import '@/assets/css/themes/prism-material-dark.css'

export default function usePrism() {
  const md = require('markdown-it')({ html: true })
    .use(prism)
    .use(require('markdown-it-attrs'))

  return { md }
}
