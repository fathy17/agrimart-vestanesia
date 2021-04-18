const RajaOngkir = require('rajaongkir-nodejs').Starter(
  `${process.env.RAJAONGKIR_API_KEY}`
);

export default function handler(_, res) {
  RajaOngkir.getProvinces()
    .then(function (result) {
      // Aksi ketika data Provinsi berhasil ditampilkan
      res.send({ result });
    })
    .catch(function (error) {
      // Aksi ketika error terjadi
      res.json({ message: error });
    });
}
