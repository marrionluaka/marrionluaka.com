import markdownItHighlight from 'markdown-it-highlightjs'
import 'highlight.js/styles/vs2015.css'

export default function useMarkdown() {
  const md = require('markdown-it')({ html: true })
    .use(markdownItHighlight)
    .use(require('markdown-it-attrs'))

  return { md }
}
