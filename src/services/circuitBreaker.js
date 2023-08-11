let failureCount = 0;
const FAILURE_THRESHOLD = 3;
const TIMEOUT = 30000;
let nextAttemptTime = Date.now();

function callWithCircuitBreaker(fn, ...args) {
  if (failureCount >= FAILURE_THRESHOLD) {
    if (Date.now() < nextAttemptTime) {
      logger.info(`Service out: ${Date.now()}`);
      return {
        success: false,
        message: "Serviço indisponível - circuit breaker ativado",
      };
    }
    failureCount = 0;
  }

  const result = fn(...args);

  if (!result.success) {
    failureCount += 1;
    if (failureCount >= FAILURE_THRESHOLD) {
      nextAttemptTime = Date.now() + TIMEOUT;
    }
  } else {
    failureCount = 0;
  }

  return result;
}

module.exports = { callWithCircuitBreaker };
