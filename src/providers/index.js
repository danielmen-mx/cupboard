const providers = {
  strLimit: (value, size) => {

    if (!value) return '';
    value = value.toString();

    if (value.length <= size) {
      return value;
    }
    return value.substr(0, size) + '...';
  },
  removeHtmlTags: (text) => {
    return text.replace(/(<([^>]+)>)/ig, '')
  },
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

export default providers;