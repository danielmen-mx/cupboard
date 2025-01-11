<template>
  <div class="payment-gateway">
    <h2 class="title">Complete your payment</h2>

    <form @submit.prevent="processPayment" class="payment-form">
      <div class="form-group">
        <label for="cardholder">Cardholder Name</label>
        <input
          id="cardholder"
          type="text"
          v-model="cardholder"
          placeholder="e.g. John Doe"
          required
        />
      </div>

      <div class="form-group">
        <label for="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          v-model="cardNumber"
          placeholder="1234 5678 9012 3456"
          maxlength="19"
          required
        />
      </div>

      <div class="form-row">
        <div class="form-group half-width">
          <label for="expiryDate">Expiry Date</label>
          <input
            id="expiryDate"
            type="text"
            v-model="expiryDate"
            placeholder="MM/YY"
            maxlength="5"
            required
          />
        </div>
        <div class="form-group half-width">
          <label for="cvv">CVV</label>
          <input
            id="cvv"
            type="password"
            v-model="cvv"
            placeholder="123"
            maxlength="3"
            required
          />
        </div>
      </div>

      <button :disabled="loading" class="submit-btn" type="submit">
        {{ loading ? "Processing..." : "Pay $100.00" }}
      </button>
    </form>

    <div v-if="responseMessage" class="response">
      <h3 :class="responseStatus === 'Success' ? 'success' : 'error'">
        {{ responseStatus }}
      </h3>
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentGateway",
  data() {
    return {
      cardholder: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      loading: false,
      responseMessage: null,
      responseStatus: null,
    };
  },
  methods: {
    async processPayment() {
      this.loading = true;
      this.responseMessage = null;
      this.responseStatus = null;

      try {
        const response = await this.mockPaymentAPI();
        this.responseStatus = "Success";
        this.responseMessage = response.message;
      } catch (error) {
        this.responseStatus = "Error";
        this.responseMessage =
          error.message || "An error occurred during the payment.";
      } finally {
        this.loading = false;
      }
    },
    mockPaymentAPI() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() > 0.2; // 80% chance of success
          if (isSuccess) {
            resolve({ message: "Payment successfully processed. Thank you!" });
          } else {
            reject(new Error("Payment was declined. Please try again."));
          }
        }, 2000);
      });
    },
  },
};
</script>

<style scoped>
.payment-gateway {
  max-width: 420px;
  margin: 2em auto;
  padding: 1.5em;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 1em;
  color: #333;
}

.payment-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1em;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.half-width {
  width: 48%;
}

label {
  font-weight: bold;
  font-size: 0.9em;
  margin-bottom: 0.5em;
  display: block;
}

input {
  width: 100%;
  padding: 0.8em;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-btn {
  padding: 0.8em;
  font-size: 1.1em;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #333;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #ffdd33;
}

.submit-btn:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.response {
  margin-top: 1.5em;
  text-align: center;
}

.success {
  color: #28a745;
}

.error {
  color: #dc3545;
}
</style>
