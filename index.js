const CustomerResource = require("./resources/Customers");
const RiskProfileResource = require("./resources/Riskprofile");

class ClearDil {
  #customerResource;
  #riskProfileResource;
  constructor(clientId, clientSecret) {
    if (!clientId || !clientSecret) {
      throw new Error("Client id and secret cannot be null");
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseURL = "https://dev.cleardil.com/v1/";
    this.tokenData = {};
    this.#customerResource = new CustomerResource(this.baseURL);
    this.#riskProfileResource = new RiskProfileResource(this.baseURL);
  }

  async #generateAccessToken() {
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

  async #ensureAccessToken() {
    // Check if access token exists or is it expired.
    if (
      !this.tokenData.access_token ||
      Date.now() >= this.tokenData.tokenExpiresAt
    ) {
      // refresh token logic will come here. This is just for showcasing the logic.
      // refreshAccessToken method will be created later on and called here.
      // await this.refreshAccessToken() will be used instead of this.generateAccessToken();

      await this.#generateAccessToken();
    }
  }

  async withAccessToken(fn, binding, ...args) {
    await this.#ensureAccessToken();
    return fn.apply(binding, [this.tokenData.access_token, ...args]);
  }

  // Customers resource
  customer = {
    createCustomer: (customerData) =>
      this.withAccessToken(
        this.#customerResource.createCustomer,
        this.#customerResource,
        customerData
      ),
    getCustomer: (customerId) =>
      this.withAccessToken(
        this.#customerResource.getCustomer,
        this.#customerResource,
        customerId
      ),
    updateCustomer: (customerId, customerData) =>
      this.withAccessToken(
        this.#customerResource.updateCustomer,
        this.#customerResource,
        customerId,
        customerData
      ),
    partiallyUpdateCustomer: (customerId, customerPatchData) =>
      this.withAccessToken(
        this.#customerResource.partiallyUpdateCustomer,
        this.#customerResource,
        customerId,
        customerPatchData
      ),
    deleteCustomer: (customerId) =>
      this.withAccessToken(
        this.#customerResource.deleteCustomer,
        this.#customerResource,
        customerId
      ),
    getAllCustomers: () =>
      this.withAccessToken(
        this.#customerResource.getAllCustomers,
        this.#customerResource
      ),
  };

  // Risk profile resource
  riskProfile = {
    getRiskProfile: (customerId) =>
      this.withAccessToken(
        this.#riskProfileResource.getRiskProfile,
        this.#riskProfileResource,
        customerId
      ),
  };
  // Other resources.
}

module.exports = ClearDil;
