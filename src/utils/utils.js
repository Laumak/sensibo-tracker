const formatUrlWithQueryString = (url, qs) => {
  if(!qs) return url

  return Object.keys(qs)
    .reduce((prevString, currKey) => {
      const separator = url.includes("?") ? "&" : "?"
      return `${prevString}${separator}${currKey}=${qs[currKey]}`
    }, url)
}

module.exports = {
  formatUrlWithQueryString,
}
