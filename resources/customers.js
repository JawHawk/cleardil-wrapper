const {
  postAPICall,
  getAPICall,
  putAPICall,
  deleteAPICall,
  patchAPICall,
} = require("../utils/requests");

// All functions for customers resource

async function createCustomer(baseURL, accessToken, customerData) {
  const data = await postAPICall(
    new URL("customers", baseURL),
    accessToken,
    customerData
  );
  return data;
}

async function getCustomer(baseURL, accessToken, customerId) {
  const data = await getAPICall(
    new URL(`customers/${customerId}`, baseURL),
    accessToken
  );
  return data;
}

async function updateCustomer(baseURL, accessToken, customerId, customerData) {
  const data = await putAPICall(
    new URL(`customers/${customerId}`, baseURL),
    accessToken,
    customerData
  );
  return data;
}

async function partiallyUpdateCustomer(
  baseURL,
  accessToken,
  customerId,
  customerPatchData
) {
  const data = await patchAPICall(
    new URL(`customers/${customerId}`, baseURL),
    accessToken,
    customerPatchData
  );
  return data;
}

async function deleteCustomer(baseURL, accessToken, customerId) {
  const data = await deleteAPICall(
    new URL(`customers/${customerId}`, baseURL),
    accessToken
  );
  return data;
}

async function getAllCustomers(baseURL, accessToken) {
  const data = await getAPICall(new URL("customers", baseURL), accessToken);
  return data;
}

module.exports = {
  createCustomer,
  getCustomer,
  updateCustomer,
  partiallyUpdateCustomer,
  deleteCustomer,
  getAllCustomers,
};
