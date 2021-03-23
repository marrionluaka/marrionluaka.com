export default {
  inserted(el: any, args: any, vnode: any) {
    el.clickOutsideEvent = function (e: Event) {
      if (!(el == e.target || el.contains(e.target))) {
        vnode.context[args.expression](e)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },

  unbind(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
