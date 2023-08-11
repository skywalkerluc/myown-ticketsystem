const processPayment = (cardInfo, amount) => {
  // Simula uma taxa de erro de 10%
  if (Math.random() < 0.1) {
    return {
      success: false,
      message: "Erro simulado no processamento do pagamento.",
    };
  }

  if (cardInfo && amount > 0) {
    return {
      success: true,
      message: "Pagamento processado com sucesso!",
      transactionId: `tx_${new Date().getTime()}`,
    };
  } else {
    return {
      success: false,
      message: "Pagamento falhou. Informações inválidas.",
    };
  }
};

module.exports = { processPayment };
