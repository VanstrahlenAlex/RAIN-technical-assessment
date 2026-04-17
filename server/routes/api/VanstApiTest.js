const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

// USDT Contract Address on Ethereum Mainnet
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

// Minimal ERC-20 ABI
const MINIMAL_ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)"
];

// @route   GET api/VanstApiTest
// @desc    Retrieve public data from a smart contract (USDT)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Utilizando un nodo público 100% gratuito y altamente disponible
    const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
    const contract = new ethers.Contract(USDT_ADDRESS, MINIMAL_ERC20_ABI, provider);

    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const totalSupply = await contract.totalSupply();
    const totalSupplyFormatted = ethers.formatUnits(totalSupply, decimals);

    const result = {
      message: "Successfully retrieved data from smart contract",
      network: "Ethereum Mainnet",
      contractAddress: USDT_ADDRESS,
      data: {
        name,
        symbol,
        decimals: Number(decimals),
        totalSupply: totalSupply.toString(),
        totalSupplyFormatted
      }
    };

    console.log("========================================");
    console.log("🔗 Smart Contract Data Retrieved (VanstApiTest)");
    console.log("========================================");
    console.log("Contract Name: ", result.data.name);
    console.log("Symbol:        ", result.data.symbol);
    console.log("Decimals:      ", result.data.decimals);
    console.log("Total Supply:  ", result.data.totalSupply);
    console.log("Formatted Total:", result.data.totalSupplyFormatted, result.data.symbol);
    console.log("========================================");

    res.json(result);
  } catch (err) {
    console.error("Error interacting with blockchain:", err.message);
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

module.exports = router;
