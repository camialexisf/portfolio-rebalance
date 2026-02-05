export class Portfolio {
  constructor(stocks = [], allocations = {}) {
    this.stocks = stocks;
    this.allocations = allocations;
  }

  //Identificamos cada stock por su nombre
  findStockByName(stockName) {
    return this.stocks.find((stock) => stock.stockName === stockName);
  }

  //Calculamos el valor total del portafolio
  getTotalMarketValue() {
    return this.stocks.reduce(
      (total, stock) => total + stock.getMarketValue(),
      0,
    );
  }

  // En base al valor total del portafolio, calculamos el porcentaje actual de cada stock
  getStockCurrentPercentage() {
    const totalMarketValue = this.getTotalMarketValue();
    if (totalMarketValue === 0) return [];

    return this.stocks.map((stock) => {
      const marketValue = stock.getMarketValue();
      return {
        stockName: stock.stockName,
        marketValue,
        currentPercentage: marketValue / totalMarketValue,
      };
    });
  }
  // Comparamos el porcentaje actual con el porcentaje objetivo
  compareAllocations() {
    const totalMarketValue = this.getTotalMarketValue();
    if (totalMarketValue === 0) return [];

    const allStockNames = new Set([
      ...Object.keys(this.allocations),
      ...this.stocks.map((s) => s.stockName),
    ]);

    return [...allStockNames].map((stockName) => {
      const stock = this.findStockByName(stockName);
      const marketValue = stock ? stock.getMarketValue() : 0;

      const currentPercentage = marketValue / totalMarketValue;
      const targetPercentage = this.allocations[stockName] ?? 0;

      return {
        stockName,
        marketValue,
        currentPercentage,
        targetPercentage,
        //En base a esta diferencia haremos la compra o venta de unidades
        difference: currentPercentage - targetPercentage,
      };
    });
  }

  //Finalmente generamos las ordenes de compra o venta
  generateRebalanceOrders() {
    const totalMarketValue = this.getTotalMarketValue();
    const comparisons = this.compareAllocations();

    return comparisons
      .filter((item) => item.difference !== 0)
      .map((item) => {
        const transactionType = item.difference < 0 ? "BUY" : "SELL";
        const difference = Math.abs(item.difference);

        return {
          stockName: item.stockName,
          transactionType,
          amount: Number((difference * totalMarketValue).toFixed(4)),
        };
      });
  }
}
