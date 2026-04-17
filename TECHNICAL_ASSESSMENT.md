# Blockchain API Integration - Technical Assessment

## 📌 Overview
This document outlines the technical approach and decisions made during the development of the Blockchain API integration assessment. The primary goal was to seamlessly extend the existing Node.js/Express backend architecture to interact with a deployed smart contract, retrieving on-chain data without relying on any frontend or database implementation.

## 🏗️ Architecture & Implementation Strategy
To adhere to the existing project structure, the solution was implemented in a strictly modular manner:
- **New API Route:** Created a new module at `server/routes/api/VanstApiTest.js` following the exact conventions of the other existing REST endpoints.
- **Server Injection:** The new endpoint was exposed in the root `server.js` file using `app.use('/api/VanstApiTest', ...)` avoiding any disruption to existing logic.

## ⛓️ Blockchain Integration
- **SDK & Version:** Integrated **`ethers.js` (v6)** to provide a lightweight, industry-standard wrapper over standard JSON-RPC calls.
- **Target Network:** The application connects to **Ethereum Mainnet**.
- **RPC Provider:** Used `https://eth.llamarpc.com` as a highly available, public fallback provider to guarantee a stable connection during the review process without requiring `.env` API Keys (e.g., Alchemy or Infura).

## 📄 Smart Contract Interaction
The API reads live data from the **Tether USD (USDT)** smart contract (`0xdAC17F958D2ee523a2206206994597C13D831ec7`), demonstrating the correct usage of ABIs and contract initialization.

The fetched data includes standard contract state variables:
- `name()`
- `symbol()`
- `decimals()`
- `totalSupply()`

To improve code readability and value interpretation, `ethers.formatUnits()` was utilized to dynamically format the raw BigInt total supply into a human-readable USDT balance based on the fetched `decimals`.

## 📦 Fulfillment of Deliverables
1. **Meaningful On-Chain Data:** Data is dynamically pulled directly from the Mainnet and delivered as a structured JSON object.
2. **Console Output:** The requested backend terminal logging was implemented to output clear, formatted data whenever the endpoint is accessed.
3. **Error Handling:** Standardized error handling mechanism (`try...catch`) is implemented to wrap async operations, ensuring the server responds with an appropriate `500 Server Error` instead of crashing down.

## 🚀 How to Test
1. Run `npm install` inside the backend directory to ensure `ethers` is installed.
2. Start the server using `npm run server` or `npm run dev`.
3. Perform a GET request to `http://localhost:5025/api/VanstApiTest` either via a browser, cURL, or Postman.
4. Verify both the HTTP response and the Server Terminal to see the properly formatted blockchain logs.
