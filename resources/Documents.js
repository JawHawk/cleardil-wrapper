const APIUtil = require("../utils/requests");

// Customer resource class
class DocumentResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }

  async getDocument(accessToken, customerId, documentId) {
    const data = await this.getAPICall(
      `customers/${customerId}/documents/${documentId}`,
      accessToken
    );
    return data;
  }

  async createDocument(accessToken, customerId, documentDataObject) {
    const formData = new FormData();
    Object.keys(documentDataObject).forEach((key) =>
      formData.append(key, documentDataObject[key])
    );

    const data = await this.postAPICall(
      `customers/${customerId}/documents`,
      accessToken,
      formData
    );
    return data;
  }

  async downloadDocument(accessToken, customerId, documentId, side) {
    let sideStr = "";
    if (side) {
      sideStr = `?side=${side}`;
    }
    const data = await this.getAPICall(
      `customers/${customerId}/documents/${documentId}/download` + sideStr,
      accessToken
    );
    return data;
  }

  async updateDocument(
    accessToken,
    customerId,
    documentId,
    documentDataObject
  ) {
    const formData = new FormData();
    Object.keys(documentDataObject).forEach((key) =>
      formData.append(key, documentDataObject[key])
    );

    const data = await this.putAPICall(
      `customers/${customerId}/documents/${documentId}`,
      accessToken,
      formData
    );
    return data;
  }

  async partiallyUpdateDocument(
    accessToken,
    customerId,
    documentId,
    patchDocumentData
  ) {
    const data = await this.patchAPICall(
      `customers/${customerId}/documents/${documentId}`,
      accessToken,
      patchDocumentData
    );
    return data;
  }

  async listAllDocuments(accessToken, customerId) {
    const data = await this.getAPICall(
      `customers/${customerId}/documents`,
      accessToken
    );
    return data;
  }
}

module.exports = DocumentResource;
