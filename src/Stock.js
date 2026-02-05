export class Stock {
    constructor(stockName, currentPrice, units){
        this.stockName =  stockName
        this.currentPrice = currentPrice
        this.units = units
    }
    // Recibimos el ultimo precio disponible y lo asignamos como precio actual del stock
    getCurrentPrice(lastAvailablePrice){
        this.currentPrice = lastAvailablePrice
        return this.currentPrice
    }
   //Calculamos el market Value actual del stock 
    getMarketValue(){
        return this.currentPrice * this.units
    }
    
}