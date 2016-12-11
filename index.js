/* eslint-env jquery */

/**
 * Displays target on `this` click and hides on another.
 *
 * @param {object} [userOptions]                                           Options overrides
 * @param {number} [userOptions.duration]           = 600,                 Slide speed
 * @param {string} [userOptions.easing]             = ''                   Slide easing animation
 * @param {string} [userOptions.activeClass]        = 'is-active'          Class for active button
 * @param {string} [userOptions.expandingClass]     = 'is-expanding'       Classing for expanding target
 * @param {string} [userOptions.collapsingClass]    = 'is-collapsing'      Class for collapsing target
 * @param {string} [userOptions.expandedClass]      = 'is-expanded'        Class for fully expanded target
 * @param {string} [userOptions.defaultScopeQuery]  = '.js-xpand__scope'   Default query of container defining scope
 * @param {string} [userOptions.defaultTargetQuery] = '.js-xpand__target'  Default query of container to be expanded
 *
 * @return {object} `this`
 */
export default $.fn.xpand = function (userOptions) {
  const options = $.extend({
    duration: 600,
    easing: '',
    activeClass: 'is-active',
    expandingClass: 'is-expanding',
    collapsingClass: 'is-collapsing',
    expandedClass: 'is-expanded',
    defaultScopeQuery: '.js-xpand__scope',
    defaultTargetQuery: '.js-xpand__target'
  }, userOptions)

  const {
    duration,
    easing,
    activeClass,
    expandingClass,
    expandedClass,
    collapsingClass,
    defaultScopeQuery,
    defaultTargetQuery
  } = options

  return this.each((i, element) => {
    const $this = $(element)
    const targetQuery = $this.data('xpand') || defaultTargetQuery
    const expandScope = $this.data('xpand-scope')
    const expandScopeQuery = typeof expandScope === 'string' ? expandScope : defaultScopeQuery

    let $targets
    if (expandScope === 'next') {
      $targets = $this.nextAll(targetQuery)
    } else if (expandScope) {
      $targets = $this.closest(expandScopeQuery).find(targetQuery)
    } else {
      $targets = $(targetQuery)
    }

    const isActive = () => $this.hasClass(activeClass)

    const markActive = () => $this.addClass(activeClass)
    const markInactive = () => $this.removeClass(activeClass)
    const markExpandeding = (target) => target.addClass(expandingClass)
    const markExpanded = (target) => target.removeClass(expandingClass) && target.addClass(expandedClass)
    const markCollapsing = (target) => target.removeClass(expandedClass) && target.addClass(collapsingClass)
    const markCollapsed = (target) => target.removeClass(collapsingClass)

    const setBtnState = (target) => target.hasClass(expandingClass) || target.hasClass(expandedClass) ? markActive() : markInactive()
    const setTargetStating = (target) => target.hasClass(expandedClass) ? markCollapsing(target) : markExpandeding(target)
    const setTargetState = (target) => target.is(':visible') ? markExpanded(target) : markCollapsed(target)

    const toggle = (target) => target.slideToggle({
      duration,
      easing,
      start: () => setTargetStating(target) && setBtnState(target),
      complete: () => setTargetState(target)
    })
    const hide = (target) => target.slideUp({
      duration,
      easing,
      start: () => markCollapsing(target) && markInactive(),
      complete: () => markCollapsed(target)
    })

    if (!isActive()) { $targets.each((i, e) => hide($(e))) }
    if (isActive()) { $targets.each((i, e) => markExpanded($(e))) }

    $this.click((event) => {
      event.preventDefault()
      $targets.each((i, e) => toggle($(e)))
    })
  })
}
