const ethers = require('ethers');
const express = require('express');
const router = express.Router();
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const daiContractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const daiAbi = [
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)"
];

router.get('/totalSupply', async (req, res) => {
  try {
    const contract = new ethers.Contract(daiContractAddress, daiAbi, provider);
    const name = await contract.name();
    const supply = await contract.totalSupply();

    res.json({ token: name, totalSupply: ethers.formatUnits(supply, 18) });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Error fetching data from contract' });
  }
});

module.exports = router;

