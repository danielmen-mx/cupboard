export function debounce(fn, delay) {
  var timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}

export const moneyFormat = {
  methods: {
    moneyFormat(total) {
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });

      return formatter.format(total);
    }
  }
}

export const numberFormat = {
  methods: {
    numberFormat(number, decimal = 0) {
      return new Intl.NumberFormat('en-US', { maximumFractionDigits: decimal, minimumFractionDigits: decimal }).format(number);
    }
  }
}

export const formatDate = {
  methods: {
    formatDate(date, format = 'MM/DD/YYYY') {
      return window.moment(date).format(format)
    }
  }
}

export const ucFirst = {
  methods: {
    ucFirst(text) {
      if (typeof text !== 'string') return ''
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  }
}

// export const prevent = {
//   methods: {
//     prevent(action)
//   },
// }