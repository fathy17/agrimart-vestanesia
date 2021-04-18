const RajaOngkir = require('rajaongkir-nodejs').Starter(
  `${process.env.RAJAONGKIR_API_KEY}`
);

export default function handler(req, res) {
  const params = {
    origin: parseInt(req.query.origin), // ID Kota atau Kabupaten Asal
    destination: parseInt(req.query.destination), // ID Kota atau Kabupaten Tujuan
    weight: 1000, // Berat Barang dalam gram (gr)
  };
  RajaOngkir.getJNECost(params)
    .then(function (result) {
      // Aksi ketika data Provinsi berhasil ditampilkan
      res.send({ result });
    })
    .catch(function (error) {
      // Aksi ketika error terjadi
      res.json({ message: error });
    });
}
