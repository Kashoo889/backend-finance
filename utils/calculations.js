/**
 * Calculation utilities for balance computations
 * All calculations are performed server-side
 */

/**
 * Calculate Riyal Amount: PKR Amount ÷ Riyal Rate
 */
export const calculateRiyalAmount = (pkrAmount, riyalRate) => {
  if (!riyalRate || riyalRate === 0) {
    throw new Error('Riyal rate cannot be zero');
  }
  return pkrAmount / riyalRate;
};

/**
 * Calculate Saudi balance: Riyal Amount - Submitted SAR
 */
export const calculateSaudiBalance = (riyalAmount, submittedSar) => {
  return riyalAmount - submittedSar;
};

/**
 * Calculate Special balance: Name Rupees - Submitted Rupees
 */
export const calculateSpecialBalance = (nameRupees, submittedRupees) => {
  return nameRupees - submittedRupees;
};

/**
 * Calculate remaining amount: Amount Added - Amount Withdrawn
 */
export const calculateRemainingAmount = (amountAdded, amountWithdrawn) => {
  return amountAdded - amountWithdrawn;
};

/**
 * Calculate running balance for bank ledger entries
 * Returns array of entries with running balance
 */
export const calculateRunningBalance = (entries) => {
  let runningBalance = 0;
  return entries.map((entry) => {
    runningBalance += entry.amountAdded - entry.amountWithdrawn;
    return {
      ...entry.toObject ? entry.toObject() : entry,
      runningBalance,
    };
  });
};

/**
 * Calculate total balance for a bank
 */
export const calculateBankTotalBalance = (entries) => {
  return entries.reduce((total, entry) => {
    return total + (entry.amountAdded - entry.amountWithdrawn);
  }, 0);
};

/**
 * Calculate total balance for a trader (sum of all banks)
 */
export const calculateTraderTotalBalance = (banks) => {
  return banks.reduce((total, bank) => {
    const bankBalance = calculateBankTotalBalance(bank.entries || []);
    return total + bankBalance;
  }, 0);
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount, currency = 'PKR') => {
  return new Intl.NumberFormat('en-PK', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount) + ` ${currency}`;
};

/**
 * Format number with 2 decimal places
 */
export const formatNumber = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

