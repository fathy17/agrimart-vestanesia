// const RajaOngkir = require('rajaongkir-nodejs').Starter(
//   `${process.env.RAJAONGKIR_API_KEY}`
// );

const request = require('request');
const Promise = require('promise');

export default function handler(req, res) {
  const provinceId = parseInt(req.query.province);
  const uri = `http://api.rajaongkir.com/starter/city?province=${provinceId}`;
  new Promise(function (resolve, reject) {
    request(
      {
        uri: uri,
        method: 'GET',
        headers: {
          key: `${process.env.RAJAONGKIR_API_KEY}`,
        },
      },
      function (error, response, body) {
        const result = JSON.parse(body);
        if (result.rajaongkir.status.code !== 200) reject(result);

        res.send({ result });
      }
    );
  });
  // RajaOngkir.getCity(id)
  //   .then(function (result) {
  //     // Aksi ketika data Provinsi berhasil ditampilkan
  //     res.send({ result });
  //   })
  //   .catch(function (error) {
  //     // Aksi ketika error terjadi
  //     res.json({ message: error });
  //   });
}
