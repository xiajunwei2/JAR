const ctx = require.context('.',false,/.api.js$/)
const APIS = {}
ctx.keys().forEach((item)=>{
  let config = ctx(item)
  let dft = config.default || config
  APIS[dft.NAME] = dft
})
export default APIS