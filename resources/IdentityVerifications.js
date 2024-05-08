const APIUtil = require("../utils/requests");

// Customer resource class
class IdentityVerificationResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }

  async getIdentityVerification(accessToken, customerId, identificationId) {
    const data = await this.getAPICall(
      `customers/${customerId}/identifications/${identificationId}`,
      accessToken
    );
    return data;
  }

  async createIdentityVerification(
    accessToken,
    customerId,
    documentId,
    selfieImage
  ) {
    const BODY = {
      document_id: documentId,
      selfie_image: selfieImage,
    };
    const data = await this.postAPICall(
      `customers/${customerId}/identifications`,
      accessToken,
      BODY
    );
    return data;
  }

  async listAllIdentityVerifications(accessToken, customerId) {
    const data = await this.getAPICall(
      `customers/${customerId}/identifications`,
      accessToken
    );
    return data;
  }

  async searchAllIdentityVerifications(accessToken) {
    const data = await this.getAPICall(`search/identifications`, accessToken);
    return data;
  }
}

module.exports = IdentityVerificationResource;
