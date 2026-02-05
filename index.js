import { Stock } from "./src/Stock.js";
import { Portfolio } from "./src/Portfolio.js";

function runCase(title, stocks, allocations) {
  console.log("\n******************************");
  console.log(`CASE: ${title}`);
  console.log("==============================");

  const portfolio = new Portfolio(stocks, allocations);

  const total = portfolio.getTotalMarketValue();
  console.log("Total Market Value:", total.toFixed(4));

  const orders = portfolio.generateRebalanceOrders();

  if (orders.length === 0) {
    console.log("✅ Portafolio balanceado. No se requieren órdenes.");
    console.log("******************************\n");
  } else {
    console.table(orders);
    console.log("******************************\n");
  }
}

runCase(
  "Portafolio balanceado",
  [new Stock("meta", 100, 40), new Stock("appl", 100, 60)],
  { meta: 0.4, appl: 0.6 },
);

runCase(
  "Portafolio desbalanceado - Requiere compra y venta",
  [new Stock("meta", 150, 40), new Stock("appl", 50, 60)],
  { meta: 0.4, appl: 0.6 },
);

runCase(
  "Portafolio desbalanceado - Requiere solo compra",
  [new Stock("meta", 100, 100)],
  { meta: 0.5, appl: 0.5 },
);
