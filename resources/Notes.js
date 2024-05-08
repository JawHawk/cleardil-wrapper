const APIUtil = require("../utils/requests");

// Customer resource class
class NoteResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }
  async getNote(accessToken, customerId, noteId) {
    const data = await this.getAPICall(
      `customers/${customerId}/notes/${noteId}`,
      accessToken
    );
    return data;
  }

  async createNote(accessToken, customerId, text) {
    const BODY = {
      text: text,
    };
    const data = await this.postAPICall(
      `customers/${customerId}/notes`,
      accessToken,
      BODY
    );
    return data;
  }

  async updateNote(accessToken, customerId, noteId, text) {
    const BODY = {
      text: text,
    };
    const data = await this.putAPICall(
      `customers/${customerId}/notes/${noteId}`,
      accessToken,
      BODY
    );
    return data;
  }

  async deleteNote(accessToken, customerId, noteId) {
    const data = await this.deleteAPICall(
      `customers/${customerId}/notes/${noteId}`,
      accessToken
    );
    return data;
  }

  async listAllNotes(accessToken, customerId) {
    const data = await this.getAPICall(
      `/customers/${customerId}/notes`,
      accessToken
    );
    return data;
  }
}

module.exports = NoteResource;
