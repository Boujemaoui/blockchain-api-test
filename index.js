const express = require("express");
const { ethers } = require("ethers");

const app = express();
const port = 3000;

// Clave Infura y dirección de contrato
const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/44a5cd3e22404b84a5d68a9bc5b5e226");

// Dirección de contrato público (ej: DAI Stablecoin)
const daiContractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

// ABI mínima para leer balance y nombre del token
const daiAbi = [
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)"
];
app.get('/', (req, res) => {
  res.send('Servidor API corriendo. Usa la ruta /ApiTest para ver el resultado.');
});

// Ruta API
app.get("/ApiTest", async (req, res) => {
  try {
    const contract = new ethers.Contract(daiContractAddress, daiAbi, provider);
    const name = await contract.name();
    const supply = await contract.totalSupply();

    console.log("Token:", name);
    console.log("Total Supply:", ethers.formatUnits(supply, 18));

    res.send({ token: name, totalSupply: ethers.formatUnits(supply, 18) });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al obtener datos del contrato.");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

