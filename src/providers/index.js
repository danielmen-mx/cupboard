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
  }
}

export default providers;