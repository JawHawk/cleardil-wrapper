// app.js
const express = require("express");
const ClearDil = require(".");

const app = express();
const PORT = 3000;
app.use(express.json());

// Enter respective clientId and secret
const clientId = "";
const clientSecret = "";

const clearDilClient = new ClearDil(clientId, clientSecret);

app.post("/createcustomer", async (req, res) => {
  try {
    //   {
    //     "customerData" :{
    //       "type": "INDIVIDUAL",
    //       "email": "john.doe@example.com",
    //       "title": "MR",
    //       "first_name": "John",
    //       "middle_name": "A.",
    //       "last_name": "Doe",
    //       "dob": "1980-01-01",
    //       "gender": "MALE",
    //       "addresses": [
    //         {
    //           "type": "PRIMARY",
    //           "property_name": "Custom House",
    //           "line": "Main Street",
    //           "extra_line": "City Square",
    //           "city": "Aldgate",
    //           "state_or_province": "London",
    //           "postal_code": "E99 0ZZ",
    //           "country": "GBR",
    //           "from_date": "2010-01-01"
    //         }
    //       ]
    //     }
    // }

    let customerData = req.body.customerData;
    let newCustomer = await clearDilClient.customer.createCustomer(
      customerData
    );
    res.status(200).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/customers/:customerId", async (req, res) => {
  try {
    let customerData = await clearDilClient.customer.getCustomer(
      req.params.customerId
    );
    res.status(200).json(customerData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/customers", async (req, res) => {
  try {
    let customers = await clearDilClient.customer.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/customers/:customerId", async (req, res) => {
  try {
    let data = await clearDilClient.customer.deleteCustomer(
      req.params.customerId
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/customers/:customerId", async (req, res) => {
  try {
    let customerData = req.body.customerData;
    let data = await clearDilClient.customer.updateCustomer(
      req.params.customerId,
      customerData
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/customers/:customerId", async (req, res) => {
  try {
    //   let customerPatchData = [
    //     {
    //         "op": "replace",
    //         "path": "/first_name",
    //         "value": "Eric"
    //     },
    // ]
    let customerPatchData = req.body.customerPatchData;
    let data = await clearDilClient.customer.partiallyUpdateCustomer(
      req.params.customerId,
      customerPatchData
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
