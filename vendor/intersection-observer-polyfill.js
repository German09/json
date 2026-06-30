;(function (global) {
  function needsLegacyWebKitCompat() {
    try {
      return !(
        global.CSS &&
        global.CSS.supports &&
        global.CSS.supports('selector(:where(*))')
      )
    } catch (error) {
      return true
    }
  }

  if (!needsLegacyWebKitCompat() && typeof global.IntersectionObserver === 'function') {
    return
  }

  function createEntry(target) {
    var rect = { top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 }

    if (target && typeof target.getBoundingClientRect === 'function') {
      rect = target.getBoundingClientRect()
    }

    return {
      target: target,
      isIntersecting: true,
      intersectionRatio: 1,
      boundingClientRect: rect,
      intersectionRect: rect,
      rootBounds: null,
      time: Date.now()
    }
  }

  function IntersectionObserverPolyfill(callback) {
    this._callback = callback
    this._targets = []
  }

  IntersectionObserverPolyfill.prototype.observe = function (target) {
    var self = this

    if (this._targets.indexOf(target) !== -1) {
      return
    }

    this._targets.push(target)

    setTimeout(function () {
      self._callback([createEntry(target)], self)
    }, 0)
  }

  IntersectionObserverPolyfill.prototype.unobserve = function (target) {
    this._targets = this._targets.filter(function (item) {
      return item !== target
    })
  }

  IntersectionObserverPolyfill.prototype.disconnect = function () {
    this._targets = []
  }

  IntersectionObserverPolyfill.prototype.takeRecords = function () {
    return []
  }

  global.IntersectionObserver = IntersectionObserverPolyfill
})(typeof globalThis !== 'undefined' ? globalThis : window)
