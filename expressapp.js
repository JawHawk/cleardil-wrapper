// app.js
const express = require("express");
const ClearDil = require(".");

const app = express();
const PORT = 3000;
app.use(express.json());

// Enter respective clientId and secret
const clientId = "";
const clientSecret = "";

if (!clientId || !clientSecret) {
  throw new Error("Client id and secret cannot be null");
}

const clearDilClient = new ClearDil(clientId, clientSecret);

app.post("/createcustomer", async (req, res) => {
  try {
    // let customerData = {
    //   type: "INDIVIDUAL",
    //   email: "john.doe@example.com",
    //   title: "MR",
    //   first_name: "John",
    //   middle_name: "A.",
    //   last_name: "Doe",
    //   dob: "1980-01-01",
    //   gender: "MALE",
    //   addresses: [
    //     {
    //       type: "PRIMARY",
    //       property_name: "Custom House",
    //       line: "Main Street",
    //       extra_line: "City Square",
    //       city: "Aldgate",
    //       state_or_province: "London",
    //       postal_code: "E99 0ZZ",
    //       country: "GBR",
    //       from_date: "2010-01-01",
    //     },
    //   ],
    // };

    let customerData = req.body.customerData;
    let newCustomer = await clearDilClient.createCustomer(customerData);
    res.status(200).json(newCustomer);
  } catch (error) {
    console.error("Error generating access token:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/customer/:customerId", async (req, res) => {
  try {
    let customerData = await clearDilClient.getCustomer(req.params.customerId);
    res.status(200).json(customerData);
  } catch (error) {
    console.error("Error generating access token:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
