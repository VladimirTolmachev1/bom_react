export class CurrencyService {
  static toCoins(price) {
    // floor fixes math inaccuracy after multiplication
    return Math.floor(price * 100);
  }

  static show(value) {
    return Number.isNaN(+value) ? value : (+value).toFixed(2);
  }
}
