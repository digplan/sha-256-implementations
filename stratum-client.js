
const server = 'daggerhashimoto.usa-west.nicehash.com', port = 3353
const client = new require('net').Socket()
let id = 1, extranonce, difficulty = 1;

client.on('data', (data) => {
  
  var s = data.toString()
  console.log(s)

    s.split('\n').forEach((json) => {

        var [id, error, result, params] = JSON.parse(json)

        if(method == 'mining.set_difficulty')
          return console.log(difficulty = msg.params[0])

        if(id == 1){
          console.log(extranonce = result[1])
          client.write('{"id":2,"method":"mining.extranonce.subscribe","params":[]}\n{"id":3,"method":"mining.authorize","params":["3HCgdGTzrP1o4Ppq2k2wsGzzD5iVfLDNa4","x"]}\n')
        }
    })

})

client.connect({ host: server, port: port }, () => {
    console.log('Connected')
    client.write('{"id":1,"method":"mining.subscribe","params":["PhoenixMiner/5.5c","EthereumStratum/1.0.0"]}\n')
})

client.on('end', () => { console.log('Disconnected') })
