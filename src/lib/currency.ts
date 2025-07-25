// Currency conversion utilities
export const CURRENCY_SYMBOLS = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
} as const;

export type CurrencyCode = keyof typeof CURRENCY_SYMBOLS;

// Exchange rates (you can integrate with a real API later)
// These are approximate rates for demonstration
const EXCHANGE_RATES = {
  USD_TO_INR: 83.5,
  EUR_TO_INR: 91.2,
  GBP_TO_INR: 106.8,
  INR_TO_USD: 0.012,
  INR_TO_EUR: 0.011,
  INR_TO_GBP: 0.0094,
};

export const convertCurrency = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to INR first, then to target currency
  let inrAmount = amount;
  
  if (fromCurrency !== 'INR') {
    const rateKey = `${fromCurrency}_TO_INR` as keyof typeof EXCHANGE_RATES;
    inrAmount = amount * (EXCHANGE_RATES[rateKey] || 1);
  }
  
  if (toCurrency === 'INR') return inrAmount;
  
  const rateKey = `INR_TO_${toCurrency}` as keyof typeof EXCHANGE_RATES;
  return inrAmount * (EXCHANGE_RATES[rateKey] || 1);
};

export const formatCurrency = (
  amount: number,
  currency: CurrencyCode = 'INR'
): string => {
  const symbol = CURRENCY_SYMBOLS[currency];
  const formatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return `${symbol}${formatter.format(amount)}`;
};

// Get currency symbol
export const getCurrencySymbol = (currency: CurrencyCode): string => {
  return CURRENCY_SYMBOLS[currency] || '₹';
};
