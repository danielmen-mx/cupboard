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
      const numericTotal = Number(String(total).replace(/,/g, ''))
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });

      return formatter.format(numericTotal)
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

export const copyData = {
  methods: {
    copyData(data) {
      return Object.assign({}, data);
    }
  },
}

export const validateHTMLTags = {
  methods: {
    validateHTMLTags(str) {
      // export const containsHTML = (str) => /<[a-z][\s\S]*>/i.test(str)
      let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/

      return regexForHTML.test(str)
    }
  }
}

export const removeHTMLTags = {
  methods: {
    removeHTMLTags(str) {
      let regex = /<\/?[^>]+(>|$)/g
      if (!str) return

      return str.replace(regex, "\n")
    }
  }
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

export const indexPair = {
  methods: {
    indexPair(i) {
      if (Number.isInteger(i / 2)) return true
      return false
    },
  }
}

export const findItemById = {
  methods: {
    findItemById(items, target) {
      let match = items.find(item => item.id === target)

      if (!match) return null

      return match
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

export const getCurrentDate = {
  methods: {
    getCurrentDate() {
      let date = new Date();
      let weekdays = new Array(7);
      weekdays[0] = this.translate("week-days.sunday")
      weekdays[1] = this.translate("week-days.monday")
      weekdays[2] = this.translate("week-days.tuesday")
      weekdays[3] = this.translate("week-days.wednesday")
      weekdays[4] = this.translate("week-days.thursday")
      weekdays[5] = this.translate("week-days.friday");
      weekdays[6] = this.translate("week-days.saturday");

      let months = new Array(12)
      months[0] = this.translate("calendar.january")
      months[1] = this.translate("calendar.february")
      months[2] = this.translate("calendar.march")
      months[3] = this.translate("calendar.april")
      months[4] = this.translate("calendar.may")
      months[5] = this.translate("calendar.june")
      months[6] = this.translate("calendar.july")
      months[7] = this.translate("calendar.august")
      months[8] = this.translate("calendar.september")
      months[9] = this.translate("calendar.october")
      months[10] = this.translate("calendar.november")
      months[11] = this.translate("calendar.december")

      let weekday = weekdays[date.getDay()]
      let day = date.getDate()
      let month = months[date.getMonth()]
      let year = date.getFullYear()

      return weekday + " " + month + ' ' + day + ', ' + year
    }
  },
}