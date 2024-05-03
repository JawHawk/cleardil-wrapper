const AssociationResource = require("./resources/Associations");
const CustomerResource = require("./resources/Customers");
const DocumentVerificationResource = require("./resources/DocumentVerifications");
const MatchResource = require("./resources/Matches");
const RiskProfileResource = require("./resources/Riskprofile");
const ScreeningResource = require("./resources/Screenings");

class ClearDil {
  #customerResource;
  #riskProfileResource;
  #screeningResource;
  #matchResource;
  #associationResource;
  #documentVerificationResource;
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
    this.#screeningResource = new ScreeningResource(this.baseURL);
    this.#matchResource = new MatchResource(this.baseURL);
    this.#associationResource = new AssociationResource(this.baseURL);
    this.#documentVerificationResource = new DocumentVerificationResource(
      this.baseURL
    );
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

  // Screenings resource
  screenings = {
    getScreening: (customerId, screeningId) =>
      this.withAccessToken(
        this.#screeningResource.getScreening,
        this.#screeningResource,
        customerId,
        screeningId
      ),
    createScreening: (customerId, scope) =>
      this.withAccessToken(
        this.#screeningResource.createScreening,
        this.#screeningResource,
        customerId,
        scope
      ),
    getAllScreenings: (customerId) =>
      this.withAccessToken(
        this.#screeningResource.getAllScreenings,
        this.#screeningResource,
        customerId
      ),
    searchAllScreeningsL: () =>
      this.withAccessToken(
        this.#screeningResource.searchAllScreenings,
        this.#screeningResource
      ),
  };

  // Matches resource
  matches = {
    getMatch: (customerId, screeningId, matchId) =>
      this.withAccessToken(
        this.#matchResource.getMatch,
        this.#matchResource,
        customerId,
        screeningId,
        matchId
      ),
    getAllMatches: (customerId, screeningId) =>
      this.withAccessToken(
        this.#matchResource.getAllMatches,
        this.#matchResource,
        customerId,
        screeningId
      ),
    confirmMatch: (customerId, screeningId, matchId) =>
      this.withAccessToken(
        this.#matchResource.confirmMatch,
        this.#matchResource,
        customerId,
        screeningId,
        matchId
      ),
    dismissMatch: (customerId, screeningId, matchId) =>
      this.withAccessToken(
        this.#matchResource.dismissMatch,
        this.#matchResource,
        customerId,
        screeningId,
        matchId
      ),
    confirmMultipleMatches: (customerId, screeningId, matchIds) =>
      this.withAccessToken(
        this.#matchResource.confirmMultipleMatches,
        this.#matchResource,
        customerId,
        screeningId,
        matchIds
      ),
    dismissMultipleMatches: (customerId, screeningId, matchIds) =>
      this.withAccessToken(
        this.#matchResource.dismissMultipleMatches,
        this.#matchResource,
        customerId,
        screeningId,
        matchIds
      ),
  };

  // Associations resource
  associations = {
    getAssociation: (customerId, screeningId, matchId, associationId) =>
      this.withAccessToken(
        this.#associationResource.getAssociation,
        this.#associationResource,
        customerId,
        screeningId,
        matchId,
        associationId
      ),
    getAllAssociations: (customerId, screeningId, matchId) =>
      this.withAccessToken(
        this.#associationResource.getAllAssociations,
        this.#associationResource,
        customerId,
        screeningId,
        matchId
      ),
  };

  // Document Verifications resource
  documentVerifications = {
    getDocumentVerification: (customerId, verificationId) =>
      this.withAccessToken(
        this.#documentVerificationResource.getDocumentVerification,
        this.#documentVerificationResource,
        customerId,
        verificationId
      ),
    createDocumentVerification: (customerId, type, documentId) =>
      this.withAccessToken(
        this.#documentVerificationResource.createDocumentVerification,
        this.#documentVerificationResource,
        customerId,
        type,
        documentId
      ),
    getAllDocumentVerifications: (customerId) =>
      this.withAccessToken(
        this.#documentVerificationResource.getAllDocumentVerifications,
        this.#documentVerificationResource,
        customerId
      ),
    searchAllDocumentVerifications: () =>
      this.withAccessToken(
        this.#documentVerificationResource.searchAllDocumentVerifications,
        this.#documentVerificationResource
      ),
  };
  // Other resources.
}

module.exports = ClearDil;
