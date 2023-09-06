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
      weekdays[0] = this.$t("week-days.sunday")
      weekdays[1] = this.$t("week-days.monday")
      weekdays[2] = this.$t("week-days.tuesday")
      weekdays[3] = this.$t("week-days.wednesday")
      weekdays[4] = this.$t("week-days.thursday")
      weekdays[5] = this.$t("week-days.friday");
      weekdays[6] = this.$t("week-days.saturday");

      let months = new Array(12)
      months[0] = this.$t("calendar.january")
      months[1] = this.$t("calendar.february")
      months[2] = this.$t("calendar.march")
      months[3] = this.$t("calendar.april")
      months[4] = this.$t("calendar.may")
      months[5] = this.$t("calendar.june")
      months[6] = this.$t("calendar.july")
      months[7] = this.$t("calendar.august")
      months[8] = this.$t("calendar.september")
      months[9] = this.$t("calendar.october")
      months[10] = this.$t("calendar.november")
      months[11] = this.$t("calendar.december")

      let weekday = weekdays[date.getDay()]
      let day = date.getDate()
      let month = months[date.getMonth()]
      let year = date.getFullYear()

      return weekday + " " + month + ' ' + day + ', ' + year
    }
  },
}