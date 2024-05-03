const APIUtil = require("../utils/requests");

// Customer resource class
class DocumentVerificationResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }

  async getDocumentVerification(accessToken, customerId, verificationId) {
    const data = await this.getAPICall(
      `customers/${customerId}/verifications/${verificationId}`,
      accessToken
    );
    return data;
  }

  async createDocumentVerification(accessToken, customerId, type, documentId) {
    const DATA = {
      document_id: documentId,
      type: type,
    };
    const data = await this.postAPICall(
      `customers/${customerId}/verifications`,
      accessToken,
      DATA
    );
    return data;
  }

  async getAllDocumentVerifications(accessToken, customerId) {
    const data = await this.getAPICall(
      `customers/${customerId}/verifications`,
      accessToken
    );
    return data;
  }

  async searchAllDocumentVerifications(accessToken) {
    const data = await this.getAPICall(`search/verifications`, accessToken);
    return data;
  }
}

module.exports = DocumentVerificationResource;
