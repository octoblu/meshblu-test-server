const MeshbluServer = require("./")

const meshbluServer = new MeshbluServer()
const meshbluConfig = meshbluServer.getConfig()
console.log({meshbluConfig})
meshbluServer.start(()=>{
  console.log("Running")
})
