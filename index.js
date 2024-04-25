const {
  createCustomer,
  getCustomer,
  updateCustomer,
  getAllCustomers,
  deleteCustomer,
  partiallyUpdateCustomer,
} = require("./resources/customers");

class ClearDil {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseURL = "https://dev.cleardil.com/v1/";
    this.tokenData = {};
  }

  async generateAccessToken() {
    const response = await fetch(new URL("oauth2/token", this.baseURL).href, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(this.clientId + ":" + this.clientSecret)}`,
      },
      body: "",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to generate access token: ${response.statusText}`
      );
    }

    const data = await response.json();
    this.tokenData = {
      ...data,
      tokenExpiresAt: Date.now() + data.expires_in * 1000,
    };
  }

  async ensureAccessToken() {
    // Check if access token exists or is it expired.
    if (
      !this.tokenData.access_token ||
      Date.now() >= this.tokenData.tokenExpiresAt
    ) {
      // refresh token logic will come here. This is just for showcasing the logic.
      // refreshAccessToken method will be created later on and called here.
      // await this.refreshAccessToken() will be used instead of this.generateAccessToken();

      await this.generateAccessToken();
    }
  }

  async withAccessToken(fn, ...args) {
    await this.ensureAccessToken();
    return fn.apply(this, [this.baseURL, this.tokenData.access_token, ...args]);
  }

  // Customers resource
  async createCustomer(customerData) {
    return this.withAccessToken(createCustomer, customerData);
  }

  async getCustomer(customerId) {
    return this.withAccessToken(getCustomer, customerId);
  }

  async updateCustomer(customerId, customerData) {
    return this.withAccessToken(updateCustomer, customerId, customerData);
  }

  async partiallyUpdateCustomer(customerId, customerPatchData) {
    return this.withAccessToken(
      partiallyUpdateCustomer,
      customerId,
      customerPatchData
    );
  }

  async deleteCustomer(customerId) {
    return this.withAccessToken(deleteCustomer, customerId);
  }

  async getAllCustomers() {
    return this.withAccessToken(getAllCustomers);
  }

  // Other resources.
}

module.exports = ClearDil;
