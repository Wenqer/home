import netatmo from 'netatmo'
import config from '../config'


let api = new netatmo(config.netatmo)
let min = time => time * 60 * 1000
let report = res => console.log(JSON.stringify(res))


function index(req, res) {
  /*api.getUser(function(err, user) {
    console.log(user);
  })*/
  api.getDevicelist(function(err, devices, modules) {
    res.json(devices)
    // res.json(modules)
  })

  // res.end()
}

function measure(req, res) {
  let type = ['Temperature', 'CO2', 'Humidity', 'Pressure', 'Noise']
  let options = {
    device_id: '70:ee:50:03:5f:b0',
    // scale: 'max',
    scale: '30min',
    // optimize: false,
    date_begin: Date.now() - min(10),
    // real_time: true,
    type
  }

  return new Promise((resolve, reject) =>
    api.getMeasure(options, (err, [data]) => {
      if (err) return reject(err)
      if (!data || !data.value) return reject('no data')
      let res = type.reduce((total, key, i) => Object.assign(total, {[key]: data.value[0][i]}), {})
      resolve(res)
    })
  )
}

measure().then(report)
setInterval(() => measure().then(report).catch(report), min(5))

function CO2(req, res) {
  measure()
    .then(({CO2}) => res.status(200).send(CO2.toString()))
    .catch(err => res.status(204).send(err)) 
}


export default app => {
  app.get('/atmo', index)
  app.get('/atmo/co2', CO2)
}