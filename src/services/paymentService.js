const processPayment = (cardInfo, amount) => {
  // Simula uma taxa de erro de 10%
  if (Math.random() < 0.1) {
    return {
      success: false,
      message: "Fake error when processing payment",
    };
  }

  if (cardInfo && amount > 0) {
    return {
      success: true,
      message: "Payment processed successfully",
      transactionId: `tx_${new Date().getTime()}`,
    };
  } else {
    return {
      success: false,
      message: "Payment failed. Invalid input",
    };
  }
};

module.exports = { processPayment };
