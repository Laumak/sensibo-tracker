const formatUrlWithQueryString = (url, qs) => {
  if(!qs) return url

  return Object.keys(qs)
    .reduce((prevString, currKey) => {
      const separator = url.includes("?") ? "&" : "?"
      return `${prevString}${separator}${currKey}=${qs[currKey]}`
    }, url)
}

const arrayMove = (arr, fromIndex, toIndex) => {
  const element = arr.result[fromIndex];
  arr.result.splice(fromIndex, 1);
  arr.result.splice(toIndex, 0, element);

  return arr;
}

module.exports = {
  formatUrlWithQueryString,
  arrayMove,
}
