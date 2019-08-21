const availableEnvVars = Object.keys(process.env)

function checkEnvVars(requiredEnvVars) {
  requiredEnvVars.forEach(envVar => {
    if (availableEnvVars.includes(envVar)) return
    console.error(`No ${envVar} environment variable found. Please checkout our README.md`)
  })
}

module.exports = { checkEnvVars }