async function createCustomer(baseURL, accessToken, customerData) {
  const response = await fetch(new URL("customers", baseURL), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create customer: ${response.statusText}`);
  }

  return await response.json();
}

async function getCustomer(baseURL, accessToken, customerId) {
  const response = await fetch(new URL(`customers/${customerId}`, baseURL), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get customer: ${response.statusText}`);
  }

  return await response.json();
}

module.exports = { createCustomer, getCustomer };
