export const roundAmount = (amount) => {
  return amount >= 1000 ? `${(amount / 1000).toFixed(1)}k` : amount;
};
