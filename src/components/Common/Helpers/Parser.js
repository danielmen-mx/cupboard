export function formDataFromObject(data, formData = null, parentKey) {
  if (!formData) {
    formData = new FormData()
  }

  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      formDataFromObject(data[key], formData, parentKey ? `${parentKey}[${key}]` : key)
    });
  } else {
    const value = data == null ? '' : data

    formData.append(parentKey, value)
  }

  return formData
}