import MangoPay from "mangopay2-nodejs-sdk";

// $ExpectError
const invalidConfig: MangoPay.Config = {};

const validConfig: MangoPay.Config = {
  clientId: "your_client_id",
  clientApiKey: "your_client_api_key",
  baseUrl: "https://api.mangopay.com"
};

// $ExpectType MangoPay
const api = new MangoPay(validConfig);

const legalUser = new MangoPay.models.UserLegal({
  Name: "MangoPay",
  Email: "info@mangopay.com",
  LegalPersonType: "BUSINESS",
  LegalRepresentativeFirstName: "Mango",
  LegalRepresentativeLastName: "Pay",
  LegalRepresentativeEmail: "mango@mangopay.com",
  HeadquartersAddress: new MangoPay.models.Address({
    AddressLine1: "4101 Reservoir Rd NW",
    AddressLine2: "",
    City: "Washington",
    Region: "District of Columbia",
    PostalCode: "20007",
    Country: "US"
  }),
  LegalRepresentativeBirthday: 1300186358,
  LegalRepresentativeNationality: "FR",
  LegalRepresentativeCountryOfResidence: "FR",
  Tag: "custom tag"
});

api.Users.create(legalUser).then(data => {
  const d = data; // $ExpectType UserLegalData
  const value = data.PersonType; // $ExpectType "LEGAL"

  console.log(`${legalUser.Name} user created at ${legalUser.CreationDate}`);
});

api.Users.create(legalUser, { readResponseHeaders: true }).then(data => {
  const d = data; // $ExpectType WithResponse<UserLegalData>
  const value = data.body; // $ExpectType UserLegalData
});

api.Users.create(legalUser, { headers: {} }).then(data => {
  const d = data; // $ExpectType UserLegalData
});

const naturalUser = new MangoPay.models.UserNatural({
  Email: "info@mangopay.com",
  Birthday: 1300186358,
  FirstName: "Sara",
  LastName: "McNick",
  CountryOfResidence: "GB",
  Nationality: "US"
});

api.Users.create(naturalUser, {}).then(data => {
  const d = data; // $ExpectType UserNaturalData
  const value = data.PersonType; // $ExpectType "NATURAL"
  return;
});

api.Users.create(
  {
    PersonType: "NATURAL",
    Email: "info@mangopay.com",
    Birthday: 1300186358,
    FirstName: "Sara",
    LastName: "McNick",
    CountryOfResidence: "GB",
    Nationality: "US"
  },
  data => {
    const d = data; // $ExpectType UserNaturalData
    console.log("create", data);
  }
);

api.Users.get("1234").then(data => {
  const d = data; // $ExpectType UserLegalData | UserNaturalData
  if (data.PersonType === "LEGAL") {
    const legalData = data; // $ExpectType UserLegalData
  } else {
    const naturalData = data; // $ExpectType UserNaturalData
  }
});

api.Users.getAll().then(users => {
  users.forEach(user => {
    const d = user; // $ExpectType UserLegalData | UserNaturalData
    if (user.PersonType === "LEGAL") {
      const legalData = user; // $ExpectType UserLegalData
    } else {
      const naturalData = user; // $ExpectType UserNaturalData
    }
  });
});

api.Users.update({
  Id: "1234",
  PersonType: "NATURAL",
  Email: "info@mangopay.com",
  Birthday: 1300186358,
  FirstName: "Sara",
  LastName: "McNick",
  CountryOfResidence: "GB",
  Nationality: "US"
}).then(data => {
  const d = data; // $ExpectType UserNaturalData
});

api.Users.createBankAccount("user-id", {
  Type: "GB",
  AccountNumber: "12345678",
  SortCode: "123456",
  OwnerAddress: "",
  OwnerName: ""
}).then(data => {
  const d = data; // $ExpectType GBData
});

api.Users.getBankAccount("userId", "bankAccountId").then(data => {
  const d = data; // $ExpectType Data
});

api.Users.getBankAccounts("userId").then(data => {
  const d = data; // $ExpectType Data[]
});

api.Users.deactivateBankAccount("userId", "bankAccountId").then(data => {
  const d = data; // $ExpectType void
});

api.Users.getTransactions("userId").then(data => {
  const d = data; // $ExpectType TransactionData[]
});

api.Users.getWallets("userId").then(data => {
  const d = data; // $ExpectType WalletData[]
});

api.BankAccounts.getTransactions("accountId").then(data => {
  const d = data; // $ExpectType TransactionData[]
});

api.Wallets.create({
  Currency: "GB",
  Description: "A description",
  Owners: ["userId"]
}).then(data => {
  const d = data; // $ExpectType WalletData
});

const wallet = new MangoPay.models.Wallet({
  Currency: "GB",
  Description: "A description",
  Owners: ["userId"]
});

api.Wallets.create(wallet).then(data => {
  const d = data; // $ExpectType WalletData
});

api.Wallets.update({
  Description: "A description"
}).then(data => {
  const d = data; // $ExpectType WalletData
});

api.Wallets.get("walletId").then(data => {
  const d = data; // $ExpectType WalletData
});

api.Wallets.getTransactions("walletId").then(data => {
  const d = data; // $ExpectType TransactionData[]
});
