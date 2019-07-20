const fs = require("fs")

// destination.txt will be created or overwritten by default.
fs.copyFile("env.example.js", "env.js", (err) => {
  if (err) throw err
  console.log("env.example.js was copied to env.js")
})
