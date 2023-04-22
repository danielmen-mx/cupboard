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

      return formatter.format(total)
    }
  }
}

export const numberFormat = {
  methods: {
    numberFormat(number, decimal = 0) {
      return new Intl.NumberFormat('en-US', { maximumFractionDigits: decimal, minimumFractionDigits: decimal }).format(number)
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
      return text.charAt(0).toUpperCase() + text.slice(1)
    }
  }
}

// export const prevent = {
//   methods: {
//     prevent(action)
//   },
// }

export const copyData = {
  methods: {
    copyData(data) {
      return Object.assign({}, data);
    }
  },
}

export const slugify = {
  methods: {
    slugify(str) {
       return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
  },
}

export const countArray = {
  methods: {
    countArray(arr) {
      return Object.values(arr).length
    }
  },
}

export const initials = {
  methods: {
    initials(sentence) {
      let i = 1
      let array = sentence.split(" ")
      const initials = array.map(fragment => {
        if (i > 2) return
        i++
        return fragment.charAt(0).toUpperCase()
      })

      return initials.join("")
    }
  },
}