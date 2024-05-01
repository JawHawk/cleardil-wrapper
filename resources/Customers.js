const APIUtil = require("../utils/requests");

// Customer resource class
class CustomerResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }
  async createCustomer(accessToken, customerData) {
    const data = await this.postAPICall("customers", accessToken, customerData);
    return data;
  }

  async getCustomer(accessToken, customerId) {
    const data = await this.getAPICall(`customers/${customerId}`, accessToken);
    return data;
  }

  async updateCustomer(accessToken, customerId, customerData) {
    const data = await this.putAPICall(
      `customers/${customerId}`,
      accessToken,
      customerData
    );
    return data;
  }

  async partiallyUpdateCustomer(accessToken, customerId, customerPatchData) {
    const data = await this.patchAPICall(
      `customers/${customerId}`,
      accessToken,
      customerPatchData
    );
    return data;
  }

  async deleteCustomer(accessToken, customerId) {
    const data = await this.deleteAPICall(
      `customers/${customerId}`,
      accessToken
    );
    return data;
  }

  async getAllCustomers(accessToken) {
    const data = await this.getAPICall("customers", accessToken);
    return data;
  }
}

module.exports = CustomerResource;
