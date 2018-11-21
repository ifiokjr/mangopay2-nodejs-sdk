// TypeScript Version: 3.0

/// <reference types="node" />

import {
  ApiMethod,
  CountryISO,
  MakeKeysNullable,
  MakeKeysOptional,
  MakeKeysRequired,
  Omit,
  DeepPartial,
  OmitType
} from "./types";

export = MangoPay;

declare class MangoPay {
  constructor(config: MangoPay.Config);
  config: MangoPay.Config;
  requestOptions: MangoPay.RequestOptions;
  Users: MangoPay.Users;
  BankAccounts: MangoPay.BankAccounts;
  Wallets: MangoPay.Wallets;

  Log(...args: any[]): void;
  authorize(callback: (data: MangoPay.AuthorizationData) => void): void;
  authorize(): Promise<MangoPay.AuthorizationData>;
  buildRequestData(entity: any): any;
  canReadSubRequestData(entity: any, propertyName: any): boolean;
  isExpired(): boolean;
  method(
    method: ApiMethod,
    callback: (...args: any[]) => void,
    options: RequestOptions
  ): any;
}

declare namespace MangoPay {
  interface AuthorizationData {
    access_token: string;
    token_type: string;
    expires_in: number;
  }

  interface Headers {
    "Content-Type": string;
    "User-Agent": string;
    "Idempotency-Key": string;
    Authorization: string;
    [header: string]: string | undefined;
  }
  /** A UTC timestamp in seconds */
  type Timestamp = number;
  type ColumnAndDirection = "ASC" | "DESC";

  interface Money {
    /**
     * The currency - should be ISO_4217 format
     */
    Currency: CountryISO;
    /**
     * An amount of money in the smallest sub-division of the currency, e.g. 12.60 EUR would be represented as 1260 whereas 12 JPY would be represented as just 12)
     */
    Amount: number;
  }

  interface WithResponse<T> {
    statusCode: number;
    body: T;
    headers: Headers;
  }

  interface NoArgMethodOverload<R> {
    (options: MethodOptionWithResponse): Promise<WithResponse<R>>;
    (options?: MethodOptionWithoutResponse): Promise<R>;
    (
      callback: (data: WithResponse<R>) => void,
      options?: MethodOptionWithResponse
    ): void;
    (callback: (data: R) => void, options?: MethodOptionWithoutResponse): void;
  }

  interface MethodOverload<T, R> {
    (data: T, options: MethodOptionWithResponse): Promise<WithResponse<R>>;
    (data: T, options?: MethodOptionWithoutResponse): Promise<R>;
    (
      data: T,
      callback: (data: WithResponse<R>) => void,
      options: MethodOptionWithResponse
    ): void;
    (
      data: T,
      callback: (data: R) => void,
      options?: MethodOptionWithoutResponse
    ): void;
  }

  interface ExtraArgMethodOverload<T, U, R> {
    (data: T, extra: U, options: MethodOptionWithResponse): Promise<
      WithResponse<R>
    >;
    (data: T, extra: U, options?: MethodOptionWithoutResponse): Promise<R>;
    (
      data: T,
      extra: U,
      callback: (data: WithResponse<R>) => void,
      options?: MethodOptionWithResponse
    ): void;
    (
      data: T,
      extra: U,
      callback: (data: R) => void,
      options?: MethodOptionWithoutResponse
    ): void;
  }

  interface Config {
    /**
     * API Client Id
     */
    clientId: string;
    /**
     * API Client Api Key
     */
    clientApiKey: string;
    /**
     * API Base URL.The fault base value points to sandbox.
     * Production is 'https://api.mangopay.com'
     *
     * @default "https://api.sandbox.mangopay.com"
     */
    baseUrl?: string;
    /**
     * Active debugging
     * @default false
     */
    debugMode?: boolean;
    /**
     * Log function to be used for debug
     * @default `console.log`
     */
    logClass?(...args: any[]): void;
    /**
     * Set the connection timeout limit(in milliseconds)
     * @default 30000
     */
    connectionTimeout?: number;
    /**
     * Set the response timeout limit(in milliseconds)
     * @default 80000
     */
    responseTimeout?: number;
    /**
     * API Version
     * @default 'v2.01'
     */
    apiVersion?: string;
    /**
     * Set a custom error handler
     * @default `console.error`
     */
    errorHandler?(options: any, err: any): void;
  }

  interface RequestOptions {
    requestConfig: {
      timeout: number;
    };
    responseConfig: {
      timeout: number;
    };
    /**
     * Path options are replacing the ${placeholders} from apiMethods
     */
    path: {
      clientId: string;
      apiVersion: string;
      readonly id: string;
    };
    headers: Headers;
  }

  type WithToJson<T extends object> = T & { toJSON(): any };

  // Determines the shape of the response
  interface ReadResponseHeaders {
    readResponseHeaders: true;
  }

  interface PaginationOptions {
    /**
     * The page number of results you wish to return
     * @default 1
     */
    Page?: int;
    /**
     * The number of results to return per page: Max 100;
     * @default 10
     */
    Per_Page?: int;
  }

  interface FilterOptions {
    /**
     * The column to sort against and direction - only CreationDate (or Date for the events) is available and ASC or DESC for the direction
     */
    Sort?: ColumnAndDirection;
    /**
     * To return only resources that have CreationDate BEFORE this date
     */
    BeforeDate?: Timestamp;
    /**
     * To return only resources that have CreationDate AFTER this date
     */
    AfterDate?: Timestamp;

    [key: string]: string | number | boolean;
  }

  // type FilterOptions<T extends {}> = BaseFilterOptions &
  //   { [P in T]?: T[P] extends string ? T[P] : never };

  interface MethodOptions extends DeepPartial<RequestOptions> {
    data?: WithToJson<object> | string;
    parameters?: FilterOptions & PaginationOptions;
  }

  interface MethodOptionWithResponse extends MethodOptions {
    readResponseHeaders: true;
  }

  interface MethodOptionWithoutResponse extends MethodOptions {
    readResponseHeaders?: false;
  }

  interface DependsObject {
    dependsPropertyName: string;
    propertyName: string;
    propertyValueMapping: Record<string, Model>;
  }

  interface ModelMethods<T extends {}> {
    new (data: T): this;
    initialize(): void;
    /**
     * Returns object property value
     * @param attribute   - Property value to return
     * @returns {*}
     */
    getData<K extends keyof T>(attribute: K): T[K];

    /**
     * @param attribute   - attribute's value to be set or hash of properties with values
     * @param value       - value to be set
     */
    setData<K extends keyof T>(attribute: K, value: T[K]): this;
    setData(attribute: Partial<T>): this;

    getReadOnlyProperties(): Array<keyof T>;
    getDependsObjects(): DependsObject[];
    parse(): void;
  }

  interface Model<T extends {}> extends ModelMethods<T> {}

  namespace models {
    namespace EntityBase {
      interface EntityBaseData {
        Id: string;
        Tag: string;
        CreationDate: number;
      }
    }
    class EntityBase<T extends EntityBase.EntityBaseData> extends Model<T> {
      initialize(): void;
      /**
       * Returns object property value
       * @param attribute   - Property value to return
       * @returns {*}
       */
      getData<K extends keyof T>(attribute: K): T[K];

      /**
       * @param attribute   - attribute's value to be set or hash of properties with values
       * @param value       - value to be set
       */
      setData<K extends keyof T>(attribute: K, value: T[K]): this;
      setData(attribute: Partial<T>): this;

      getReadOnlyProperties(): Array<keyof T>;
      getDependsObjects(): DependsObject[];
      parse(): void;
      toJSON(): any;
    }
    namespace Address {
      interface AddressData {
        AddressLine1: string;
        AddressLine2: string;
        City: string;
        Region: string;
        PostalCode: string;
        Country: string;
      }
    }

    class Address extends EntityBase<Address.AddressData> {
      constructor(data: Partial<Address.AddressData>);
    }

    namespace BankAccount {
      type BankAccountType = "IBAN" | "GB" | "US" | "CA" | "OTHER";
      type DepositAccountType = "CHECKING" | "SAVINGS";

      interface BaseData extends EntityBase.EntityBaseData {
        /**
         * The object owner's UserId
         */
        UserId: string;
        /**
         * The type of bank account
         */
        Type: BankAccountType;
        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;
        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string | Address.AddressData | Address;
        /**
         * @deprecated
         */
        Details: any;
        /**
         * Whether the bank account is active or not
         */
        Active: boolean;
      }

      interface IBANDetails {
        Type: "IBAN";
        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: Address;
        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;
        /**
         * The IBAN of the bank account
         */
        IBAN: string;
        /**
         * The BIC of the bank account
         */
        BIC?: string;
      }
      interface IBANData extends BaseData, IBANDetails {}

      interface USDetails {
        Type: "US";
        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string | Address.AddressData | Address;
        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;
        /**
         * The account number of the bank account. US account numbers must be digits only.
         */
        AccountNumber: string;
        /**
         * The ABA of the bank account. Must be numbers only, and 9 digits long
         */
        ABA: string;
        /**
         * The type of account
         */
        DepositAccountType?: DepositAccountType;
      }
      interface USData extends BaseData, USDetails {}

      interface CADetails {
        Type: "CA";
        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string | Address.AddressData | Address;
        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;
        /**
         * The branch code of the bank where the bank account. Must be numbers only, and 5 digits long
         */
        BranchCode: string;
        /**
         * The institution number of the bank account. Must be numbers only, and 3 or 4 digits long
         */
        InstitutionNumber: string;
        /**
         * The account number of the bank account. Must be numbers only. Canadian account numbers must be a maximum of 20 digits.
         */
        AccountNumber: string;
        /**
         * The name of the bank where the account is held. Must be letters or numbers only and maximum 50 characters long.
         */
        BankName: string;
      }
      interface CAData extends BaseData, CADetails {}

      interface GBDetails {
        Type: "GB";
        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string | Address.AddressData | Address;
        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;
        /**
         * The sort code of the bank account. Must be numbers only, and 6 digits long
         */
        SortCode: string;
        /**
         * The account number of the bank account. Must be numbers only. GB account numbers must be 8 digits long.
         */
        AccountNumber: string;
      }
      interface GBData extends BaseData, GBDetails {}

      interface OtherDetails {
        Type: "OTHER";
        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string | Address.AddressData | Address;
        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;
        /**
         * The Country of the Address
         */
        Country: string;
        /**
         * The BIC of the bank account
         */
        BIC: string;
        /**
         * The account number of the bank account. Must be numbers only. Canadian account numbers must be a maximum of 20 digits.
         */
        AccountNumber: string;
      }
      interface OtherData extends BaseData, OtherDetails {}

      type Data = OtherData | CAData | GBData | IBANData | USData;
      type CreationDetails =
        | OtherDetails
        | CADetails
        | GBDetails
        | IBANDetails
        | USDetails;
    }

    class BankAccount extends EntityBase<BankAccount.BaseData> {
      constructor(data: BankAccount.CreationDetails);
    }

    interface BankAccount extends BankAccount.Data {}

    namespace Transaction {
      type TransactionNature =
        | "REGULAR"
        | "REPUDIATION"
        | "REFUND"
        | "SETTLEMENT";
      type TransactionType = "PAYIN" | "TRANSFER" | "PAYOUT";
      type TransactionStatus = "CREATED" | "SUCCEEDED" | "FAILED";

      interface TransactionData extends EntityBase.EntityBaseData {
        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: Money;
        /**
         * Details about the funds that are being credited (DebitedFunds – Fees = CreditedFunds)
         */
        CreditedFunds: Money;
        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: Money;
        /**
         * The ID of the wallet that was debited
         */
        DebitedWalletId: string;
        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;
        /**
         * A user's ID
         */
        AuthorId: string;
        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId: string;
        /**
         * The nature of the transaction
         */
        Nature: TransactionNature;
        /**
         * The status of the transaction
         */
        Status: TransactionStatus;
        /**
         * When the transaction happened
         */
        ExecutionDate: timestamp;
        /**
         * The result code
         */
        ResultCode: string;
        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;
        /**
         * The type of the transaction
         */
        Type: TransactionType;
      }
    }

    class Transaction extends EntityBase<Transaction.TransactionData> {
      constructor(data: Transaction.TransactionData);
    }
    interface Transaction extends Transaction.TransactionData {}

    namespace Wallet {
      type FundsType = "DEFAULT" | "FEES" | "CREDIT";

      interface WalletData extends EntityBase.EntityBaseData {
        /**
         * An array of userIDs of who own's the wallet. For now, you only can set up a unique owner.
         */
        Owners: [string];
        /**
         * The current balance of the wallet
         */
        Balance: Money;
        /**
         * The type of funds in the wallet
         */
        FundsType: FundsType;
        /**
         * A desciption of the wallet
         */
        Description: string;
        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CountryISO;
      }

      type CreateWallet = UpdateWallet &
        Pick<WalletData, "Owners" | "Currency" | "Description">;
      type UpdateWallet = Partial<Pick<WalletData, "Tag" | "Description">>;
    }

    class Wallet extends EntityBase<Wallet.WalletData> {
      constructor(data: Wallet.CreateWallet | Wallet.UpdateWallet);
    }

    namespace User {
      /**
       * Should be only one of these values:
       * 1 - for incomes <18K€),
       * 2 - for incomes between 18 and 30K€,
       * 3 - for incomes between 30 and 50K€,
       * 4 - for incomes between 50 and 80K€,
       * 5 - for incomes between 80 and 120K€,
       * 6 - for incomes >120K€
       */
      type IncomeRange = 1 | 2 | 3 | 4 | 5 | 6;
      type PersonType = "NATURAL" | "LEGAL";
      type KYCLevel = "LIGHT" | "REGULAR";
      type StaticKeys =
        | "KYCLevel"
        | "PersonType"
        | "Id"
        | "CreationDate"
        | "ProofOfIdentity"
        | "ProofOfAddress"
        | "ProofOfRegistration"
        | "LegalRepresentativeProofOfIdentity"
        | "ShareholderDeclaration"
        | "Statute";
      interface UserData extends EntityBase.EntityBaseData {
        /**
         * Type of user
         */
        PersonType: PersonType;

        /**
         * The person's email address (not more than 12 consecutive numbers) - must be a valid email
         */
        Email: string;

        /**
         * KYC Level (LIGHT or REGULAR)
         */
        KYCLevel: KYCLevel;
      }

      interface UserLegalData extends UserData {
        PersonType: "LEGAL";
        /**
         * The name of the legal user
         */
        Name: string;
        /**
         * Type for legal user.
         */
        LegalPersonType: "BUSINESS" | "ORGANIZATION" | "SOLETRADER";
        /**
         * The address of the company’s headquarters
         */
        HeadquartersAddress: string | Address | Address.AddressData;
        /**
         * The first name of the company’s Legal representative person
         */
        LegalRepresentativeFirstName: string;
        /**
         * The last name of the company’s Legal representative person
         */
        LegalRepresentativeLastName: string;
        /**
         * The address of the company’s Legal representative person
         */
        LegalRepresentativeAddress: string | Address | Address.AddressData;
        /**
         * The email of the company’s Legal representative person - must be valid
         */
        LegalRepresentativeEmail: string;
        /**
         * The date of birth of the company’s Legal representative person - be careful to set the right timezone (should be UTC) to avoid 00h becoming 23h (and hence interpreted as the day before)
         */
        LegalRepresentativeBirthday: Timestamp;
        /**
         * The nationality of the company’s Legal representative person
         */
        LegalRepresentativeNationality: CountryISO;
        /**
         * The country of residence of the company’s Legal representative person
         */
        LegalRepresentativeCountryOfResidence: CountryISO;
        ProofOfIdentity: string | null;
        /**
         * The business statute of the company
         */
        Statute: string | null;
        /**
         * A MANGOPAY reference to the validated document of the proof of registration of the company
         */
        ProofOfRegistration: string | null;
        /**
         * The shareholder declaration of the company
         */
        ShareholderDeclaration: string | null;
      }

      interface UserNaturalData extends UserData {
        PersonType: "NATURAL";
        /**
         * The name of the user
         */
        FirstName: string;
        /**
         * The last name of the user
         */
        LastName: string;
        /**
         * The user address
         */
        Address: string | Address.AddressData;
        /**
         * The date of birth of the user - be careful to set the right timezone (should be UTC) to avoid 00h becoming 23h (and hence interpreted as the day before)
         */
        Birthday: Timestamp;
        /**
         * The user’s nationality. ISO 3166-1 alpha-2 format is expected
         */
        Nationality: CountryISO;
        /**
         * The user’s country of residence. ISO 3166-1 alpha-2 format is expected
         */
        CountryOfResidence: CountryISO;
        /**
         * User’s occupation, ie. Work
         */
        Occupation: string;
        IncomeRange: IncomeRange;
        /**
         * Maximum length is 255 characters
         */
        ProofOfIdentity: string | null;
        /**
         * Maximum length is 255 characters
         */
        ProofOfAddress: string | null;
        /**
         * The capacity of this user - for use with UBO declarations
         */
        Capacity: "NORMAL" | "DECLARATIVE";
      }

      type RequiredUserLegalData =
        | "LegalPersonType"
        | "Name"
        | "LegalRepresentativeBirthday"
        | "LegalRepresentativeCountryOfResidence"
        | "LegalRepresentativeNationality"
        | "LegalRepresentativeFirstName"
        | "LegalRepresentativeLastName"
        | "Email";

      type RequiredUserNaturalData =
        | "FirstName"
        | "LastName"
        | "Birthday"
        | "Nationality"
        | "CountryOfResidence"
        | "Email";

      interface BaseUserLegalData
        extends Partial<Omit<UserLegalData, StaticKeys>> {
        PersonType: "LEGAL";
      }
      interface UpdateUserLegalData extends BaseUserLegalData {
        Id: string;
      }
      interface CreateUserLegalData
        extends MakeKeysRequired<
          BaseUserLegalData,
          RequiredUserLegalData | "PersonType"
        > {}

      interface BaseUserNaturalData
        extends Partial<Omit<UserNaturalData, StaticKeys>> {
        PersonType: "NATURAL";
      }
      interface UpdateUserNaturalData extends BaseUserNaturalData {
        Id: string;
      }

      interface CreateUserNaturalData
        extends MakeKeysRequired<
          BaseUserNaturalData,
          RequiredUserNaturalData | "PersonType"
        > {}
    }

    class UserLegal extends EntityBase<User.UserLegalData> {
      PersonType: "LEGAL";
      constructor(
        data: MakeKeysRequired<
          Partial<User.UserLegalData>,
          User.RequiredUserLegalData
        >
      );
      /**
       * Sets the person type for the model
       * @param personType
       */
      setPersonType(type: User.PersonType): void;
    }
    interface UserLegal extends User.UserLegalData {}

    class UserNatural extends EntityBase<User.UserNaturalData> {
      PersonType: "NATURAL";
      constructor(
        data: MakeKeysRequired<
          Partial<User.UserNaturalData>,
          User.RequiredUserNaturalData
        >
      );
      /**
       * Sets the person type for the model
       * @param personType
       */
      setPersonType(type: User.PersonType): void;
    }
    interface UserNatural extends User.UserNaturalData {}

    class User extends EntityBase<User.UserData> {
      constructor(data: User.UserData);
      /**
       * Sets the person type for the model
       * @param personType
       */
      setPersonType(type: User.PersonType): void;
    }
    interface User extends User.UserData {}
  }

  class Users {
    /**
     * Create a new user
     * @param user     Can be a UserNatural, UserLegal or a hash of user properties.
     */
    create: MethodOverload<
      models.UserLegal | models.User.CreateUserLegalData,
      models.User.UserLegalData
    > &
      MethodOverload<
        models.UserNatural | models.User.CreateUserNaturalData,
        models.User.UserNaturalData
      >;
    /**
     * Update a user
     * @param user        User object to be saved
     * @param options
     */
    update: MethodOverload<
      models.UserLegal | models.User.UpdateUserLegalData,
      models.User.UserLegalData
    > &
      MethodOverload<
        models.UserNatural | models.User.UpdateUserNaturalData,
        models.User.UserNaturalData
      >;
    /**
     * Get natural or legal user by ID
     * @param userId  User identifier
     * @param options    Request options
     */
    get: MethodOverload<
      string,
      models.User.UserLegalData | models.User.UserNaturalData
    >;
    /**
     * Get natural user by ID
     * @param userId       User identifier
     * @param options     Request options
     */
    getNatural: MethodOverload<string, models.User.UserNaturalData>;
    /**
     * Get legal user by ID
     * @param userId       User identifier
     * @param options     Request options
     */
    getLegal: MethodOverload<string, models.User.UserLegalData>;
    /**
     * Get all users
     */
    getAll: NoArgMethodOverload<
      Array<models.User.UserLegalData | models.User.UserNaturalData>
    >;
    /**
     * Create bank account for user
     * @param userId          User identifier
     * @param bankAccount     Bank account object
     * @param options
     */
    createBankAccount: ExtraArgMethodOverload<
      string,
      models.BankAccount.USDetails,
      models.BankAccount.USData
    > &
      ExtraArgMethodOverload<
        string,
        models.BankAccount.OtherDetails,
        models.BankAccount.OtherData
      > &
      ExtraArgMethodOverload<
        string,
        models.BankAccount.IBANDetails,
        models.BankAccount.IBANData
      > &
      ExtraArgMethodOverload<
        string,
        models.BankAccount.GBDetails,
        models.BankAccount.GBData
      > &
      ExtraArgMethodOverload<
        string,
        models.BankAccount.CADetails,
        models.BankAccount.CAData
      >;
    /**
     * Deactivate a bank account
     *
     * Note that once deactivated, a bank account can't be reactivated afterwards
     * @param userId
     * @param bankAccountId
     * @param options
     */
    deactivateBankAccount: ExtraArgMethodOverload<string, string, void>;
    /**
     * Get all bank accounts for user
     * @param userId      User identifier
     * @param options
     */
    getBankAccounts: MethodOverload<string, models.BankAccount.Data[]>;
    /**
     * Get all bank accounts for user
     * @param userId              User identifier
     * @param bankAccountId       Bank account id
     * @param options
     */
    getBankAccount: ExtraArgMethodOverload<
      string,
      string,
      models.BankAccount.Data
    >;
    /**
     * Get all wallets accounts for user
     */
    getWallets: MethodOverload<string, models.Wallet.WalletData[]>;
    /**
     * Get all transactions for user
     * @param userId      User identifier
     * @param options
     */
    getTransactions: MethodOverload<
      string,
      models.Transaction.TransactionData[]
    >;
  }

  class BankAccounts {
    /**
     * Retrieve list of transactions for a bank account
     * @param bankAccountId   Bank Account Id
     * @param options         Request options
     */
    getTransactions: MethodOverload<
      string,
      models.Transaction.TransactionData[]
    >;
  }

  class Wallets {
    /**
     * Create new wallet
     * @param wallet   Wallet object
     * @param options  Request options
     */
    create: MethodOverload<
      models.Wallet.CreateWallet | models.Wallet,
      models.Wallet.WalletData
    >;

    /**
     * Update wallet
     * @param wallet  Wallet object
     * @param options Request options
     */
    update: MethodOverload<
      models.Wallet.UpdateWallet | models.Wallet,
      models.Wallet.WalletData
    >;
    /**
     * Get a specific wallet
     * @param walletId Wallet identifier
     */
    get: MethodOverload<string, models.Wallet.WalletData>;
    /**
     * Get transactions for the wallet
     * @param walletId Wallet identifier
     * @param options  Request options
     */
    getTransactions: MethodOverload<
      string,
      models.Transaction.TransactionData[]
    >;
  }
}
