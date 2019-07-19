const expect = require("chai").expect

const utils = require("./utils")

describe("/src/utils/utils", () => {
  describe("formatUrlWithQueryString", () => {
    it("should generate a qs with string values", () => {
      const url = "https://google.com"
      const qsObject = { fields: "one" }
      const generated = utils.formatUrlWithQueryString(url, qsObject)

      expect(generated).to.equal(`${url}?fields=one`)
    })

    it("should generate a proper qs with string values with previous qs included", () => {
      const url = "https://google.com?apikey=key"
      const qsObject = { fields: "one" }
      const generated = utils.formatUrlWithQueryString(url, qsObject)

      expect(generated).to.equal(`${url}&fields=one`)
    })

    it("should generate a qs with array values", () => {
      const url = "https://google.com"
      const qsObject = { fields: ["one", "two"] }
      const generated = utils.formatUrlWithQueryString(url, qsObject)

      expect(generated).to.equal(`${url}?fields=one,two`)
    })

    it("should generate a proper qs with array values with previous qs included", () => {
      const url = "https://google.com?apikey=key"
      const qsObject = { fields: ["one", "two"] }
      const generated = utils.formatUrlWithQueryString(url, qsObject)

      expect(generated).to.equal(`${url}&fields=one,two`)
    })

    it("should only return the original URL if no qs provided", () => {
      const url = "https://google.com"
      const generated = utils.formatUrlWithQueryString(url)

      expect(generated).to.equal(url)
    })
  })
})
