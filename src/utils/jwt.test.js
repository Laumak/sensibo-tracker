const expect = require("chai").expect
const jwt = require("jsonwebtoken")

const generateToken  = require("./jwt").generateToken
const verifyValidity = require("./jwt").verifyValidity
const tokenStates    = require("./jwt").tokenStates

const env = require("../../env")

describe("JWT generator tests", () => {
  it("should generate a valid token if a valid user object is given", () => {
    const user = { id: 1, roles: [ "member", "admin" ] }
    const token = generateToken(user)

    const decoded = jwt.verify(token, env.SALT)

    expect(decoded).to.have.all.keys([ "exp", "iat", ...Object.keys(user) ])
  })

  it("should fail if no valid user object given", () => {
    const tokenState = generateToken()

    expect(tokenState).to.equal(tokenStates.NO_USER)
  })
})

describe("JWT vefirier tests", () => {
  it("should report an error if no token is given", () => {
    const status = verifyValidity()

    expect(status).to.equal(tokenStates.NO_TOKEN)
  })

  it("should verify a token if valid token is given", () => {
    const user = { id: 1, roles: [ "member", "admin" ] }

    const token = generateToken(user)
    const status = verifyValidity(token)

    expect(status).to.equal(tokenStates.SUCCESS)
  })
})
