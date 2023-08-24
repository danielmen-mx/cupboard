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
      weekdays[0] = "Domingo";
      weekdays[1] = "Lunes";
      weekdays[2] = "Martes";
      weekdays[3] = "Miercoles";
      weekdays[4] = "Jueves";
      weekdays[5] = "Viernes";
      weekdays[6] = "Sabado";

      let months = new Array(12)
      months[0] = "Enero"
      months[1] = "Febrero"
      months[2] = "Marzo"
      months[3] = "Abril"
      months[4] = "Mayo"
      months[5] = "Junio"
      months[6] = "Julio"
      months[7] = "Agosto"
      months[8] = "Septiembre"
      months[9] = "Octubre"
      months[10] = "Noviembre"
      months[11] = "Diciembre"

      let weekday = weekdays[date.getDay()]
      let day = date.getDate()
      let month = months[date.getMonth()]
      let year = date.getFullYear()

      return weekday + ' ' + day + ' de ' + month + ' del ' + year
    }
  },
}