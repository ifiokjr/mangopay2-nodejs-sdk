// TypeScript Version: 3.0

/// <reference types="node" />

import {
  ApiMethod,
  CountryISO,
  CurrencyISO,
  MakeKeysNullable,
  MakeKeysOptional,
  MakeKeysRequired,
  Omit,
  DeepPartial,
  OmitType,
  ValueOf
} from "./types";

export = MangoPay;

declare class MangoPay {
  constructor(config: MangoPay.Config);
  config: MangoPay.Config;
  requestOptions: MangoPay.RequestOptions;
  Users: MangoPay.Users;
  BankAccounts: MangoPay.BankAccounts;
  BankingAliases: MangoPay.BankingAliases;
  DisputeDocuments: MangoPay.DisputeDocuments;
  Wallets: MangoPay.Wallets;
  KycDocuments: MangoPay.KycDocuments;
  UboDeclarations: MangoPay.UboDeclarations;
  Cards: MangoPay.Cards;
  CardRegistrations: MangoPay.CardRegistrations;
  CardPreAuthorizations: MangoPay.CardPreAuthorizations;
  PayIns: MangoPay.PayIns;
  Transfers: MangoPay.Transfers;
  PayOuts: MangoPay.PayOuts;
  Refunds: MangoPay.Refunds;
  Clients: MangoPay.Clients;
  models: typeof MangoPay.Models;

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
  type AVSResult =
    | "NO_CHECK"
    | "NO_MATCH"
    | "ADDRESS_MATCH_ONLY"
    | "POSTAL_CODE_MATCH_ONLY"
    | "FULL_MATCH";
  type SecureMode = "DEFAULT" | "FORCE";
  type PreAuthorizationExecutionType = "DIRECT";
  type PaymentStatus = "WAITING" | "CANCELED" | "EXPIRED" | "VALIDATED";
  type PreAuthorizationStatus = "CREATED" | "SUCCEEDED" | "FAILED";
  interface BillingData {
    Address: Address | Address.AddressData | string;
  }

  interface SecurityInfoData {
    AVSResult: AVSResult;
  }

  interface MoneyData {
    /**
     * The currency - should be ISO_4217 format
     */
    Currency: CurrencyISO;

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

  interface TwoArgsMethodOverload<T, U, R> {
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

  interface ThreeArgsMethodOverload<T, U, V, R> {
    (data: T, extra: U, lastArg: V, options: MethodOptionWithResponse): Promise<
      WithResponse<R>
    >;
    (
      data: T,
      extra: U,
      lastArg: V,
      options?: MethodOptionWithoutResponse
    ): Promise<R>;
    (
      data: T,
      extra: U,
      lastArg: V,
      callback: (data: WithResponse<R>) => void,
      options?: MethodOptionWithResponse
    ): void;
    (
      data: T,
      extra: U,
      lastArg: V,
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

  namespace Models {
    interface IPayInExecutionType {
      Direct: "DIRECT";
      Web: "WEB";
    }
    const PayInExecutionType: IPayInExecutionType;

    interface IPayInPaymentType {
      BankWire: "BANK_WIRE";
      Card: "CARD";
      DirectDebit: "DIRECT_DEBIT";
      Preauthorized: "PREAUTHORIZED";
      PayPal: "PAYPAL";
    }
    const PayInPaymentType: IPayInPaymentType;

    interface IMandateStatus {
      Created: "CREATED";
      Submitted: "SUBMITTED";
      Active: "ACTIVE";
      Failed: "FAILED";
    }
    const MandateStatus: IMandateStatus;

    interface ILegalPersonType {
      NotSpecified: "NotSpecified";
      Business: "BUSINESS";
      Organization: "ORGANIZATION";
      Soletrader: "SOLETRADER";
    }
    const LegalPersonType: ILegalPersonType;

    interface IPersonType {
      NotSpecified: "NotSpecified";
      Natural: "NATURAL";
      Legal: "LEGAL";
    }
    const PersonType: IPersonType;

    interface IBankAccountType {
      NotSpecified: "NotSpecified";
      IBAN: "IBAN";
      GB: "GB";
      US: "US";
      CA: "CA";
      OTHER: "OTHER";
    }
    const BankAccountType: IBankAccountType;

    interface IDeclaredUboStatus {
      Created: "CREATED";
      Validated: "VALIDATED";
      Refused: "REFUSED";
    }
    const DeclaredUboStatus: IDeclaredUboStatus;

    interface IKycDocumentStatus {
      Created: "CREATED";
      ValidationAsked: "VALIDATION_ASKED";
      Validated: "VALIDATED";
      Refused: "REFUSED";
    }
    const KycDocumentStatus: IKycDocumentStatus;

    interface IKycDocumentType {
      IdentityProof: "IDENTITY_PROOF";
      RegistrationProof: "REGISTRATION_PROOF";
      ArticlesOfAssociation: "ARTICLES_OF_ASSOCIATION";
      ShareholderDeclaration: "SHAREHOLDER_DECLARATION";
      AddressProof: "ADDRESS_PROOF";
    }
    const KycDocumentType: IKycDocumentType;

    interface IPayOutPaymentType {
      BankWire: "BANK_WIRE";
    }
    const PayOutPaymentType: IPayOutPaymentType;

    interface IPlatformType {
      NotSpecified: "NotSpecified";
      MARKETPLACE: "MARKETPLACE";
      P2P_PAYMENT: "P2P_PAYMENT";
      CROWDFUNDING_DONATION: "CROWDFUNDING_DONATION";
      CROWDFUNDING_REWARD: "CROWDFUNDING_REWARD";
      CROWDFUNDING_EQUITY: "CROWDFUNDING_EQUITY";
      CROWDFUNDING_LOAN: "CROWDFUNDING_LOAN";
      OTHER: "OTHER";
    }
    const PlatformType: IPlatformType;

    interface IUboDeclarationRefusedReasonType {
      /**
       * When at least one natural user is missing on the declaration
       */
      MissingUbo: "MISSING_UBO";
      /**
       * When at least one natural user should not be declared as UBO
       */
      InvalidDeclaredUbo: "INVALID_DECLARED_UBO";
      /**
       * When at least one natural user declared as UBO has been created
       * with wrong details (i.e. date of birth, country of residence)
       */
      InvalidUboDetails: "INVALID_UBO_DETAILS";
    }
    const UboDeclarationRefusedReasonType: IUboDeclarationRefusedReasonType;

    interface IUboDeclarationStatus {
      /**
       * When the UBO declaration was created
       */
      Created: "CREATED";
      /**
       * When validation has been requested for the UBO declaration
       */
      ValidationAsked: "VALIDATION_ASKED";
      /**
       * When the UBO declaration was validated
       */
      Validated: "VALIDATED";
      /**
       * When the UBO declaration was refused
       */
      Refused: "REFUSED";
    }
    const UboDeclarationStatus: IUboDeclarationStatus;

    interface IUboRefusedReasonType {
      /**
       * When user should not be declared as UBO
       */
      InvalidDeclaredUbo: "INVALID_DECLARED_UBO";
      /**
       * When user declared as UBO was created with wrong
       * details (i.e. date of birth, country of residence)
       */
      InvalidUboDetails: "INVALID_UBO_DETAILS";
    }
    const UboRefusedReasonType: IUboRefusedReasonType;

    interface IUserNaturalCapacity {
      /**
       * Real customer
       */
      Normal: "NORMAL";
      /**
       * User used only for declaration purpose
       */
      Declarative: "DECLARATIVE";
    }
    const UserNaturalCapacity: IUserNaturalCapacity;

    class DeclaredUbo extends Models<UboDeclaration.UboDeclarationData> {
      constructor(data: Partial<UboDeclaration.UboDeclarationData>);
    }

    namespace EntityBase {
      interface EntityBaseData {
        Id: string;
        Tag: string;
        CreationDate: number;
      }
    }
    class EntityBase<T extends EntityBase.EntityBaseData> extends Models<T> {
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

    class Money extends EntityBase<MoneyData> {
      constructor(data: MoneyData);
    }

    class Billing extends EntityBase<BillingData> {
      constructor(data: BillingData);
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
      type AddressType = string | AddressData;
    }

    class Address extends EntityBase<Address.AddressData> {
      constructor(data: Partial<Address.AddressData>);
    }
    interface Address extends Address.AddressData {}

    namespace BankingAlias {
      type BankingAliasType = "IBAN";
      interface BankingAliasData extends EntityBase.EntityBaseData {
        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId: string;
        /**
         * The ID of a wallet
         */
        WalletId: string;
        /**
         * The Country of the Address
         */
        Country: CountryISO;
        /**
         * The type of banking alias (note that only IBAN is available at present)
         */
        Type: BankingAliasType;
        /**
         * The owner of the wallet/banking alias
         */
        OwnerName: string;
        /**
         * Whether the banking alias is active or not
         */
        Active: boolean;
      }

      interface IBANBankingAliasData extends BankingAliasData {
        /**
         * The type of banking alias (note that only IBAN is available at present)
         */
        Type: "IBAN";
        /**
         * The IBAN of the banking alias
         */
        IBAN: string;
        /**
         * The BIC of the banking alias
         */
        BIC: string;
      }

      interface CreateIBANBankingAlias
        extends Pick<IBANBankingAliasData, "OwnerName" | "Country">,
          Partial<Pick<IBANBankingAliasData, "Tag" | "CreditedUserId">> {}
    }

    class BankingAlias extends EntityBase<BankingAlias.IBANBankingAliasData> {
      constructor(data: Partial<BankingAlias.BankingAliasData>);
    }

    class BankingAliasIBAN extends BankingAlias {}

    interface BankingAlias extends BankingAlias.IBANBankingAliasData {}

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
        OwnerAddress: Address.AddressType;

        /**
         * @deprecated
         */
        Details?: BankAccountDetails;

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
        OwnerAddress: Address.AddressType;

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
        OwnerAddress: Address.AddressType;

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
        OwnerAddress: Address.AddressType;

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
        OwnerAddress: Address.AddressType;

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

    class BankAccountDetails {
      constructor(data: any);
    }

    class BankAccountDetailsCA extends BankAccountDetails {
      constructor(data: any);
    }
    interface BankAccountDetailsCA extends BankAccount.CADetails {}

    class BankAccountDetailsOther extends BankAccountDetails {
      constructor(data: any);
    }
    interface BankAccountDetailsOther extends BankAccount.OtherDetails {}

    class BankAccountDetailsGB extends BankAccountDetails {
      constructor(data: any);
    }
    interface BankAccountDetailsGB extends BankAccount.GBDetails {}

    class BankAccountDetailsIBAN extends BankAccountDetails {
      constructor(data: any);
    }
    interface BankAccountDetailsIBAN extends BankAccount.IBANDetails {}

    class BankAccountDetailsUS extends BankAccountDetails {
      constructor(data: any);
    }
    interface BankAccountDetailsUS extends BankAccount.USDetails {}

    class BankAccountType {
      constructor(data: any);
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
        DebitedFunds: MoneyData;

        /**
         * Details about the funds that are being credited (DebitedFunds – Fees = CreditedFunds)
         */
        CreditedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

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
        ExecutionDate: Timestamp;

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
      type ClientFundsType = "FEES" | "CREDIT";
      type FundsType = "DEFAULT" | ClientFundsType;

      interface WalletData extends EntityBase.EntityBaseData {
        /**
         * An array of userIDs of who own's the wallet. For now, you only can set up a unique owner.
         */
        Owners: [string];

        /**
         * The current balance of the wallet
         */
        Balance: MoneyData;

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
        Currency: CurrencyISO;
      }

      interface ClientWalletData
        extends Omit<WalletData, "Owners" | "Description"> {
        FundsType: ClientFundsType;
      }

      type CreateWallet = UpdateWallet &
        Pick<WalletData, "Owners" | "Currency" | "Description">;
      type UpdateWallet = Partial<Pick<WalletData, "Tag" | "Description">>;
    }

    class ClientWallet extends EntityBase<Wallet.WalletData> {}

    class Wallet extends EntityBase<Wallet.WalletData> {
      constructor(data: Wallet.CreateWallet | Wallet.UpdateWallet);
    }

    namespace DisputeDocument {
      type DisputeDocumentType =
        | "DELIVERY_PROOF"
        | "INVOICE"
        | "REFUND_PROOF"
        | "USER_CORRESPONDANCE"
        | "USER_ACCEPTANCE_PROOF"
        | "PRODUCT_REPLACEMENT_PROOF"
        | "OTHER";

      type DocumentStatus =
        | "CREATED"
        | "VALIDATION_ASKED"
        | "VALIDATED"
        | "REFUSED";

      type RefusedReasonType =
        | "DOCUMENT_UNREADABLE"
        | "DOCUMENT_NOT_ACCEPTED"
        | "DOCUMENT_HAS_EXPIRED"
        | "DOCUMENT_INCOMPLETE"
        | "DOCUMENT_MISSING"
        | "SPECIFIC_CASE"
        | "DOCUMENT_FALSIFIED"
        | "OTHER";

      interface DisputeDocumentData extends EntityBase.EntityBaseData {
        /**
         * Gives the type of the KYC document
         */
        Type: DisputeDocumentType;

        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * The Id of a Dispute
         */
        DisputeId: string;

        /**
         * The status of this KYC/Dispute document
         */
        Status: DocumentStatus;

        /**
         * The message accompanying a refusal
         */
        RefusedReasonMessage: string;

        /**
         * The type of reason for refusal
         */
        RefusedReasonType: RefusedReasonType;

        /**
         * The date when the document was processed by MANGOPAY
         */
        ProcessedDate: Timestamp;
      }
      interface CreateDisputeDocument {
        /**
         * Gives the type of the KYC document
         */
        Type: DisputeDocumentType;
        Tag?: string;
      }
      interface SubmitDisputeDocument {
        /**
         * The status of this KYC/Dispute document
         */
        Status: "VALIDATION_ASKED";
        Tag?: string;
      }

      /**
       * - Documents have to be in "CREATED" Status
       * - You can create as many pages as needed
       *
       * Remember to change Status to "VALIDATION_ASKED" to submit KYC documents
       * The maximum size per page is about 7Mb (or 10Mb when base64encoded). The following formats are accepted for the documents : .pdf, .jpeg, .jpg, .gif and .png. The minimum size is 1Kb.
       */
      interface CreateDisputePage {
        /**
         * The base64 encoded file which needs to be uploaded
         *
         * You need to fill in only the binary code. Do not send the first part that some converters add into the binary code which is
         * `<img src=" data:image/png;base64..." />`
         *
         * e.g.
         * ```json
         * {
         *   "File": "/9j/4AAQSkZJRgABAQEBLAEsAAD/.../wgARCAAyADIDAREAAhEBAxEB/8QAGwAAAgMBAQEA"
         * }
         * ```
         */
        File: string;
      }
    }

    class Document extends BaseEntity<any> {
      constructor(data: any);
    }

    class DisputeDocument extends Document {}

    interface DisputeDocument extends DisputeDocument.DisputeDocumentData {}

    class DisputeDocumentPage extends BaseEntity<any> {
      constructor(data: CreateDisputePage);
    }
    interface DisputeDocumentPage extends DisputeDocument.CreateDisputePage {}

    namespace KycDocument {
      type KycDocumentType =
        | "IDENTITY_PROOF"
        | "REGISTRATION_PROOF"
        | "ARTICLES_OF_ASSOCIATION"
        | "SHAREHOLDER_DECLARATION"
        | "ADDRESS_PROOF";
      type DocumentStatus =
        | "CREATED"
        | "VALIDATION_ASKED"
        | "VALIDATED"
        | "REFUSED";

      type KYCDocumentRefusedReasonType =
        | "DOCUMENT_UNREADABLE"
        | "DOCUMENT_NOT_ACCEPTED"
        | "DOCUMENT_HAS_EXPIRED"
        | "DOCUMENT_INCOMPLETE"
        | "DOCUMENT_MISSING"
        | "DOCUMENT_DO_NOT_MATCH_USER_DATA"
        | "DOCUMENT_DO_NOT_MATCH_ACCOUNT_DATA"
        | "SPECIFIC_CASE"
        | "DOCUMENT_FALSIFIED"
        | "UNDERAGE_PERSON"
        | "SPECIFIC_CASE";

      interface KycDocumentData extends EntityBase.EntityBaseData {
        /**
         * Gives the type of the KYC document
         */
        Type: KycDocumentType;

        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * The status of this KYC/Dispute document
         */
        Status: DocumentStatus;

        /**
         * The message accompanying a refusal
         */
        RefusedReasonMessage: string;

        /**
         * The type of reason for refusal
         */
        RefusedReasonType: KYCDocumentRefusedReasonType;

        /**
         * The date when the document was processed by MANGOPAY
         */
        ProcessedDate: Timestamp;
      }
      interface CreateKycDocument {
        /**
         * Gives the type of the KYC document
         */
        Type: KycDocumentType;
        Tag?: string;
      }
      interface SubmitKycDocument {
        /**
         * The status of this KYC/Dispute document
         */
        Status: "VALIDATION_ASKED";
        Tag?: string;
      }

      /**
       * - Documents have to be in "CREATED" Status
       * - You can create as many pages as needed
       *
       * Remember to change Status to "VALIDATION_ASKED" to submit KYC documents
       * The maximum size per page is about 7Mb (or 10Mb when base64encoded). The following formats are accepted for the documents : .pdf, .jpeg, .jpg, .gif and .png. The minimum size is 1Kb.
       */
      interface CreateKycPage {
        /**
         * The base64 encoded file which needs to be uploaded
         *
         * You need to fill in only the binary code. Do not send the first part that some converters add into the binary code which is
         * `<img src=" data:image/png;base64..." />`
         *
         * e.g.
         * ```json
         * {
         *   "File": "/9j/4AAQSkZJRgABAQEBLAEsAAD/.../wgARCAAyADIDAREAAhEBAxEB/8QAGwAAAgMBAQEA"
         * }
         * ```
         */
        File: string;
      }
    }

    class KycDocument extends EntityBase<KycDocument.KycDocumentData> {
      constructor(
        data: KycDocument.CreateKycDocument | KycDocument.UpdateKycDocument
      );
    }
    interface KycDocument extends KycDocument.KycDocumentData {}

    class KycDocumentStatus {
      constructor(data: any);
    }

    class KycDocumentType {
      constructor(data: any);
    }

    class KycPage {
      constructor(data: KycDocument.CreateKycPage);
    }

    interface KycPage extends KycDocument.CreateKycPage {}

    namespace EMoney {
      interface EMoneyData {
        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * The amount of money that has been credited to this user
         */
        CreditedEMoney: MoneyData;

        /**
         * The amount of money that has been debited from this user
         */
        DebitedEMoney: MoneyData;
      }
    }

    class EMoney {
      constructor(data: EMoney.EMoneyData);
    }
    interface EMoney extends EMoney.EMoneyData {}

    namespace UboDeclaration {
      interface UboDeclarationData extends EntityBase.EntityBaseData {
        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * Status of a UBO Declaration
         */
        Status: KycDocument.DocumentStatus;

        /**
         * Reason types for a UBO Declaration
         */
        RefusedReasonTypes: string[];

        /**
         * Refused Reason Message for a UBO Declaration
         */
        RefusedReasonMessage: string;

        /**
         * An array of UserIDs declared as Ultimate Beneficial Owners of a BUSINESS Legal User.
         */
        DeclaredUBOs: string[];
      }

      interface CreateUboDeclaration {
        DeclaredUBOs?: string[];
      }

      interface UpdateUboDeclaration {
        Id: string;
        Tag?: string;
        Status?: "VALIDATION_ASKED";

        /**
         * An array of UserIDs declared as Ultimate Beneficial Owners of a BUSINESS Legal User.
         */
        DeclaredUBOs?: string[];
      }
    }

    class UboDeclaration extends EntityBase<UboDeclaration.UboDeclarationData> {
      constructor(
        data:
          | UboDeclaration.CreateUboDeclaration
          | UboDeclaration.UpdateUboDeclaration
      );
    }

    interface UboDeclaration extends UboDeclaration.UboDeclarationData {}

    namespace CardRegistration {
      interface CardRegistrationData extends EntityBase.EntityBaseData {
        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CurrencyISO;

        /**
         * A special key to use when registering a card
         */
        AccessKey: string;

        /**
         * A specific value to pass to the CardRegistrationURL
         */
        PreregistrationData: string;

        /**
         * The URL to submit the card details form to
         */
        CardRegistrationURL: string;

        /**
         * Having registered a card, this confirmation hash needs to be updated to the card item
         */
        RegistrationData: string;

        /**
         * The type of card
         */
        CardType: Card.CardType;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * Status of the card registration
         */
        Status: Card.CardStatus;
      }

      type CreateCardRegistration = Partial<
        Pick<CardRegistrationData, "CardType" | "Tag">
      > &
        Pick<CardRegistrationData, "UserId" | "Currency" | "CardType">;
      type UpdateCardRegistration = Partial<
        Pick<CardRegistrationData, "Tag" | "RegistrationData">
      >;
    }

    class CardRegistration extends EntityBase<
      CardRegistration.CardRegistrationData
    > {
      constructor(
        data:
          | CardRegistration.CreateCardRegistration
          | CardRegistration.UpdateCardRegistration
      );
    }

    interface CardRegistration extends CardRegistration.CardRegistrationData {}

    namespace Card {
      type CardType =
        | "CB_VISA_MASTERCARD"
        | "DINERS"
        | "MASTERPASS"
        | "MAESTRO"
        | "P24"
        | "IDEAL"
        | "BCMC"
        | "PAYLIB";
      type CardStatus = "CREATED" | "VALIDATED" | "ERROR";
      type CardValidity = "UNKNOWN" | "VALID" | "INVALID";

      interface CardData {
        /**
         * The expiry date of the card - must be in format MMYY
         */
        ExpirationDate: string;

        /**
         * A partially obfuscated version of the credit card number
         */
        Alias: string;

        /**
         * The provider of the card
         */
        CardProvider: string;

        /**
         * The type of card
         */
        CardType: CardType;

        /**
         * The Country of the Address
         */
        Country: string;

        /**
         * The card product type - more info
         */
        Product: string;

        /**
         * The bank code
         */
        BankCode: string;

        /**
         * Whether the card is active or not
         */
        Active: boolean;

        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CurrencyIso;

        /**
         * Whether the card is valid or not. Once they process (or attempt to process) a payment with the card we are able to indicate if it is "valid" or "invalid".
         * If they didn’t process a payment yet the "Validity" stay at "unknown".
         */
        Validity: CardValidity;

        /**
         * A unique representation of a 16-digits card number
         */
        Fingerprint: string;
      }

      interface UpdateCard {
        Id: string;
        Active?: false;
      }
    }

    class Card extends EntityBase<Card.CardData> {
      constructor(data: Card.CardData);
    }

    interface Card extends Card.CardData {}

    namespace CardPreAuthorization {
      interface CardPreAuthorizationData extends EntityBase.EntityBaseData {
        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Status of the PreAuthorization
         */
        Status: PreAuthorizationStatus;

        /**
         * The status of the payment after the PreAuthorization. You can pass the PaymentStatus from "WAITING" to "CANCELED" should you need/want to
         */
        PaymentStatus: PaymentStatus;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * How the PreAuthorization has been executed
         */
        ExecutionType: PreAuthorizationExecutionType;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually.
         * The field lets you activate it automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ),
         * "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode: SecureMode;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The value is 'true' if the SecureMode was used
         */
        SecureModeNeeded: boolean;

        /**
         * This is the URL where to redirect users to proceed to 3D secure validation
         */
        SecureModeRedirectUrl: string;

        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * The date when the payment is to be processed by
         */
        ExpirationDate: Timestamp;

        /**
         * The Id of the associated PayIn
         */
        PayInId: string;

        /**
         * Contains every useful informations related to the user billing
         */
        Billing: BillingData;

        /**
         * Contains useful informations related to security and fraud
         */
        SecurityInfo: SecurityInfoData;
      }

      type CreateCardPreAuthorization = Partial<
        Pick<CardPreAuthorizationData, "Tag" | "Billing" | "Secure">
      > &
        Pick<
          CardPreAuthorizationData,
          "AuthorId" | "DebitedFunds" | "CardId" | "SecureModeRedirectUrl"
        >;
      type UpdateCardPreAuthorization = Partial<
        Pick<CardPreAuthorizationData, "Tag">
      > &
        Pick<CardPreAuthorizationData, "PaymentStatus" | "Id">;
    }

    class CardPreAuthorization {
      constructor(
        data:
          | CardPreAuthorization.CardPreAuthorizationData
          | CardPreAuthorization.UpdateCardPreAuthorization
      );
    }

    interface CardPreAuthorization
      extends CardPreAuthorization.CardPreAuthorizationData {}

    class SecurityInfo extends EntityBase<
      SecurityInfo & EntityBase.EntityBaseData
    > {
      constructor(data: SecurityInfo);
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
      type LegalPersonType = "BUSINESS" | "ORGANIZATION" | "SOLETRADER";
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
        LegalPersonType: LegalPersonType;

        /**
         * The address of the company’s headquarters
         */
        HeadquartersAddress: Address.AddressType;

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
        LegalRepresentativeAddress: Address.AddressType;

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

    namespace PayIn {
      type PayInPaymentType = ValueOf<IPayInPaymentType>;
      type PayInExecutionType =
        | ValueOf<IPayInExecutionType>
        | "EXTERNAL_INSTRUCTION";

      interface TemplateURLOptions {
        Payline: string;
      }

      interface BasePayInData extends EntityBase.EntityBaseData {
        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Details about the funds that are being credited (DebitedFunds – Fees = CreditedFunds)
         */
        CreditedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

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
        Nature: Transaction.TransactionNature;

        /**
         * The status of the transaction
         */
        Status: Transaction.TransactionStatus;

        /**
         * When the transaction happened
         */
        ExecutionDate: Timestamp;

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
        Type: Transaction.TransactionType;

        /**
         * The type of payin
         */
        PaymentType: PayInPaymentType;

        /**
         * The type of execution for the payin
         */
        ExecutionType: PayInExecutionType;
      }

      interface CardWebPayInData extends BasePayInData {
        ExecutionType: "WEB";
        PaymentType: "CARD";
        /**
         * The URL to redirect to after payment (whether successful or not)
         */
        ReturnURL: string;

        /**
         * The type of card
         */
        CardType: Card.CardType;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually. The field lets you activate it
         * automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ), "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode: SecureMode;

        /**
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture: CountryISO;

        /**
         * The URL to use for the payment page template
         */
        TemplateURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;
      }

      interface CreateCardWebPayIn {
        ExecutionType: "WEB";
        PaymentType: "CARD";
        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId?: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

        /**
         * The URL to redirect to after payment (whether successful or not)
         */
        ReturnURL: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * The type of card
         */
        CardType: Card.CardType;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually.
         * The field lets you activate it automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects
         * there is a higher risk ), "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode?: SecureMode;

        /**
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture: CountryISO;

        /**
         * A URL to an SSL page to allow you to customise the payment page. Must be in the format: array("PAYLINE"=>"https://...") and meet all the
         * specifications listed here. Note that only a template for Payline is currently available
         */
        TemplateURLOptions?: TemplateURLOptions;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and
         * can only include alphanumeric characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;
      }

      interface CardDirectPayInData extends BasePayInData {
        ExecutionType: "DIRECT";
        PaymentType: "CARD";
        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually. The field lets you activate it
         * automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ), "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode: SecureMode;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * Contains every useful informations related to the user billing
         */
        Billing: BillingData;

        /**
         * Contains useful informations related to security and fraud
         */
        SecurityInfo: SecurityInfoData;

        /**
         * The value is 'true' if the SecureMode was used
         */
        SecureModeNeeded: boolean;

        /**
         * This is the URL where to redirect users to proceed to 3D secure validation
         */
        SecureModeRedirectUrl: string;
      }

      interface CreateCardDirectPayIn {
        ExecutionType: "DIRECT";
        PaymentType: "CARD";

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId?: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually. The field lets you activate it automatically
         *  with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ), "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode?: SecureMode;

        /**
         * Contains every useful informations related to the user billing
         */
        Billing?: BillingData;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;
      }

      interface CardPreAuthorizedPayInData extends BasePayInData {
        PreauthorizationId: string;
        ExecutionType: "DIRECT";
        PaymentType: "PREAUTHORIZED";
      }

      interface CreateCardPreAuthorizedPayIn {
        ExecutionType: "DIRECT";
        PaymentType: "PREAUTHORIZED";
        /**
         * Custom data that you can add to this item
         */
        Tag?: string;
        /**
         * A user's ID
         */
        AuthorId: string;
        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId?: string;
        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;
        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;
        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;
        /**
         * The ID of the Preauthorization object
         */
        PreauthorizationId: string;
      }

      type PayInData =
        | CardDirectPayInData
        | CardPreAuthorizedPayInData
        | CardWebPayInData;
    }

    class PayIn extends EntityBase<PayIn.BasePayInData> {
      constructor(data: any);
    }

    interface PayIn extends PayIn.BasePayInData {}

    class PayInPaymentDetails extends EntityBase<any> {
      constructor(data: any);
    }
    class PayInExecutionDetails extends EntityBase<any> {
      constructor(data: any);
    }
    class PayInExecutionDetailsDirect extends PayInExecutionDetails<any> {
      constructor(data: any);
    }

    class PayInExecutionDetailsWeb extends PayInExecutionDetails<any> {
      constructor(data: any);
    }

    class PayInPaymentDetailsBankWire extends PayInPaymentDetails<any> {
      constructor(data: any);
    }

    class PayInPaymentDetailsBankingAlias extends PayInPaymentDetails<any> {
      constructor(data: any);
    }

    class PayInPaymentDetailsCard extends PayInPaymentDetails<any> {
      constructor(data: any);
    }

    class PayInPaymentDetailsCardDirect extends PayInPaymentDetails<any> {
      constructor(data: any);
    }

    class PayInPaymentDetailsCardWeb extends PayInPaymentDetails<any> {
      constructor(data: any);
    }

    class PayInPaymentDetailsDirectDebitDirect extends PayInPaymentDetails<
      any
    > {
      constructor(data: any);
    }
    class PayInPaymentDetailsDirectDebitWeb extends PayInPaymentDetails<any> {
      constructor(data: any);
    }
    class PayInPaymentDetailsPayPal extends PayInPaymentDetails<any> {
      constructor(data: any);
    }
    class PayInPaymentDetailsPreAuthorized extends PayInPaymentDetails<any> {
      constructor(data: any);
    }

    class PayInTemplateURLOptions extends EntityBase<any> {
      constructor(data: any);
    }

    namespace Refund {
      type RefundReasonType =
        | "INITIALIZED_BY_CLIENT"
        | "BANKACCOUNT_INCORRECT"
        | "OWNER_DO_NOT_MATCH_BANKACCOUNT"
        | "BANKACCOUNT_HAS_BEEN_CLOSED"
        | "WITHDRAWAL_IMPOSSIBLE_ON_SAVINGS_ACCOUNTS"
        | "OTHER";
      interface RefundReason {
        RefundReasonType: RefundReasonType;
      }
      interface RefundData {
        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;
        /**
         * Details about the funds that are being credited (DebitedFunds – Fees = CreditedFunds)
         */
        CreditedFunds: MoneyData;
        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;
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
        Nature: Transacion.TransactionNature;
        /**
         * The status of the transaction
         */
        Status: Transaction.TransactionStatus;
        /**
         * When the transaction happened
         */
        ExecutionDate: Timestamp;
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
        Type: Transaction.TransactionType;
        /**
         * The initial transaction ID
         */
        InitialTransactionId: string;
        /**
         * The initial transaction type
         */
        InitialTransactionType: Transaction.TransactionType;
        /**
         * Contains info about the reason for refund
         */
        RefundReason: RefundReason;
      }
      interface CreatePayInRefund {
        AuthorId: string;
        Tag?: string;
        DebitedFunds?: MoneyData;
        Fees?: MoneyData;
      }
      interface CreateTransferRefund {
        AuthorId: string;
        Tag?: string;
      }
    }

    class Refund extends EntityBase<Refund.RefundData> {
      constructor(data: Refund.CreatePayInRefund | Refund.CreateTransferRefund);
    }

    class RefundReasonDetails extends EntityBase<any> {
      constructor(data: any);
    }

    namespace Client {
      type BusinessType =
        | "MARKETPLACE"
        | "CROWDFUNDING"
        | "FRANCHISE"
        | "OTHER";
      type Sector =
        | "RENTALS"
        | "STORES_FASHION_ACCESSORIES_OBJECTS"
        | "BEAUTY_COSMETICS_HEALTH"
        | "FOOD_WINE_RESTAURANTS"
        | "HOSPITALITY_TRAVEL_CORIDING"
        | "ART_MUSIC_ENTERTAINMENT"
        | "FURNITURE_GARDEN"
        | "SERVICES_JOBBING_EDUCATION"
        | "SPORT_RECREATION_ACTIVITIES"
        | "TICKETING";
      type PlatformType = ValueOf<IPlatformType>;

      interface PlatformCategorization {
        Sector: Sector;
        BusinessType: BusinessType;
      }

      interface ClientData {
        /**
         * The pretty name for the client
         */
        Name: string;
        /**
         * The registered name of your company
         */
        RegisteredName: string;
        /**
         * An ID for the client (i.e. url friendly, lowercase etc - sort of namespace identifier)
         */
        ClientId: string;
        /**
         * The primary branding colour to use for your merchant
         */
        PrimaryThemeColour: string;
        /**
         * The primary branding colour to use for buttons for your merchant
         */
        PrimaryButtonColour: string;
        /**
         * The URL of the logo of your client
         */
        Logo: string;
        /**
         * A list of email addresses to use when contacting you for technical issues/communications
         */
        TechEmails: string[];
        /**
         * A list of email addresses to use when contacting you for admin/commercial issues/communications
         */
        AdminEmails: string[];
        /**
         * A list of email addresses to use when contacting you for fraud/compliance issues/communications
         */
        FraudEmails: string[];
        /**
         * A list of email addresses to use when contacting you for billing issues/communications
         */
        BillingEmails: string[];
        /**
         * The Categorization of your platform, in terms of Business Type and Sector
         */
        PlatformCategorization: PlatformCategorization;
        /**
         * A description of what your platform does
         */
        PlatformDescription: string;
        /**
         * The URL for your website
         */
        PlatformURL: string;
        /**
         * The address of the company’s headquarters
         */
        HeadquartersAddress: Address.AddressType;
        /**
         * The tax (or VAT) number for your company
         */
        TaxNumber: string;
        /**
         * Your unique MANGOPAY reference which you should use when contacting us
         */
        CompanyReference: string;
      }
      interface UpdateClient {
        /**
         * The primary branding colour to use for buttons for your merchant
         */
        PrimaryButtonColour?: string;
        /**
         * The primary branding colour to use for your merchant
         */
        PrimaryThemeColour?: string;
        /**
         * A list of email addresses to use when contacting you for admin/commercial issues/communications
         */
        AdminEmails?: string[];
        /**
         * A list of email addresses to use when contacting you for technical issues/communications
         */
        TechEmails?: string[];
        /**
         * A list of email addresses to use when contacting you for billing issues/communications
         */
        BillingEmails?: string[];
        /**
         * A list of email addresses to use when contacting you for fraud/compliance issues/communications
         */
        FraudEmails?: string[];
        /**
         * The address of the company’s headquarters
         */
        HeadquartersAddress?: Address.AddressType;
        /**
         * The tax (or VAT) number for your company
         */
        TaxNumber?: string;
        /**
         * The type of platform
         */
        PlatformType?: PlatformType;
        /**
         * A description of what your platform does
         */
        PlatformDescription?: string;
        /**
         * The URL for your website
         */
        PlatformURL?: string;
      }

      interface UpdateClientLogo {
        /**
         * The base64 encoded file which needs to be uploaded
         */
        File: string;
      }
    }

    class Client extends BaseEntity<Client.ClientData> {
      constructor(data?: Partial<Client.ClientData>);
    }
    interface Client extends ClientData {}

    class PlatformCategorization extends BaseEntity<
      Client.PlatformCategorization
    > {
      constructor(data: Client.PlatformCategorization);
    }

    namespace Transfer {
      interface TransferData extends EntityBase.EntityBaseData {
        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;
        /**
         * Details about the funds that are being credited (DebitedFunds – Fees = CreditedFunds)
         */
        CreditedFunds: MoneyData;
        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;
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
        Nature: Transaction.TransactionNature;
        /**
         * The status of the transaction
         */
        Status: Transaction.TransactionStatus;
        /**
         * When the transaction happened
         */
        ExecutionDate: Timestamp;
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
        Type: "TRANSFER";
      }

      interface CreateTransfer {
        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId?: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;
        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;
        /**
         * The ID of the wallet that was debited
         */
        DebitedWalletId: string;
        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;
      }
    }

    class Transfer extends BaseEntity<Transfer.TransferData> {
      constructor(data: Partial<Transfer.CreateTransfer>);
    }

    interface Transfer extends Transfer.TransferData {}

    namespace PayOut {
      interface PayOutData extends Transfer.TransferData {
        /**
         * The type of the transaction
         */
        Type: "PAYOUT";

        PaymentType: IPayOutPaymentType["BankWire"];
        /**
         * An ID of a Bank Account
         */
        BankAccountId: string;
        /**
         * A custom reference you wish to appear on the user’s bank statement (your Client Name is already shown). This reference can contain max 12 characters
         */
        BankWireRef: string;
      }

      interface CreatePayOut {
        /**
         * A user's ID
         */
        AuthorId: string;
        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;
        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;
        /**
         * An ID of a Bank Account
         */
        BankAccountId: string;
        /**
         * The ID of the wallet that was debited
         */
        DebitedWalletId: string;
        /**
         * A custom reference you wish to appear on the user’s bank statement (your Client Name is already shown). This reference can contain max 12 characters
         */
        BankWireRef?: string;
        Tag?: string;
      }
    }
    class PayOut extends BaseEntity<PayOut.PayOutData> {
      constructor(data: Partial<PayOut.CreatePayOut>);
    }
    // interface PayOut extends PayOut.PayoutData {}

    class PayOutPaymentDetails extends BaseEntity<any> {
      constructor(data?: any);
    }

    class PayOutPaymentDetailsBankWire extends PayOutPaymentDetails {
      constructor(data?: any);
    }
  }

  class Users {
    /**
     * Create a new user
     * @param user
     */
    create: MethodOverload<
      Models.UserLegal | Models.User.CreateUserLegalData,
      Models.User.UserLegalData
    > &
      MethodOverload<
        Models.UserNatural | Models.User.CreateUserNaturalData,
        Models.User.UserNaturalData
      >;

    /**
     * Update a user
     * @param user
     * @param options
     */
    update: MethodOverload<
      Models.UserLegal | Models.User.UpdateUserLegalData,
      Models.User.UserLegalData
    > &
      MethodOverload<
        Models.UserNatural | Models.User.UpdateUserNaturalData,
        Models.User.UserNaturalData
      >;

    /**
     * Get natural or legal user by ID
     * @param userId
     * @param options
     */
    get: MethodOverload<
      string,
      Models.User.UserLegalData | Models.User.UserNaturalData
    >;

    /**
     * Get natural user by ID
     * @param userId
     * @param options
     */
    getNatural: MethodOverload<string, Models.User.UserNaturalData>;

    /**
     * Get legal user by ID
     * @param userId
     * @param options
     */
    getLegal: MethodOverload<string, Models.User.UserLegalData>;

    /**
     * Get all users
     */
    getAll: NoArgMethodOverload<
      Array<Models.User.UserLegalData | Models.User.UserNaturalData>
    >;

    /**
     * Create bank account for user
     * @param userId
     * @param bankAccount
     * @param options
     */
    createBankAccount: TwoArgsMethodOverload<
      string,
      Models.BankAccount.USDetails,
      Models.BankAccount.USData
    > &
      TwoArgsMethodOverload<
        string,
        Models.BankAccount.OtherDetails,
        Models.BankAccount.OtherData
      > &
      TwoArgsMethodOverload<
        string,
        Models.BankAccount.IBANDetails,
        Models.BankAccount.IBANData
      > &
      TwoArgsMethodOverload<
        string,
        Models.BankAccount.GBDetails,
        Models.BankAccount.GBData
      > &
      TwoArgsMethodOverload<
        string,
        Models.BankAccount.CADetails,
        Models.BankAccount.CAData
      >;

    /**
     * Deactivate a bank account
     *
     * Note that once deactivated, a bank account can't be reactivated afterwards
     * @param userId
     * @param bankAccountId
     * @param options
     */
    deactivateBankAccount: TwoArgsMethodOverload<string, string, void>;

    /**
     * Get all bank accounts for user
     * @param userId
     * @param options
     */
    getBankAccounts: MethodOverload<string, Models.BankAccount.Data[]>;

    /**
     * Get all bank accounts for user
     * @param userId
     * @param bankAccountId
     * @param options
     */
    getBankAccount: TwoArgsMethodOverload<
      string,
      string,
      Models.BankAccount.Data
    >;

    /**
     * Get all wallets accounts for user
     */
    getWallets: MethodOverload<string, Models.Wallet.WalletData[]>;

    /**
     * Get all transactions for user
     * @param userId
     * @param options
     */
    getTransactions: MethodOverload<
      string,
      Models.Transaction.TransactionData[]
    >;

    /**
     * Get all cards for user
     * @param userId
     * @param options
     */
    getCards: MethodOverload<string, Models.Card.CardData[]>;

    /**
     * Create new KYC document
     * @param  userId
     * @param  kycDocument
     * @param  options
     */
    createKycDocument: TwoArgsMethodOverload<
      string,
      Models.KycDocument.CreateKycDocument,
      Models.KycDocument.KycDocumentData
    >;

    /**
     * Get all KYC documents for user
     * @param userId
     * @param options
     */
    getKycDocuments: MethodOverload<
      string,
      Models.KycDocument.KycDocumentData[]
    >;

    /**
     * Get KYC document
     * @param userId
     * @param kycDocumentId
     * @param options
     */
    getKycDocument: TwoArgsMethodOverload<
      string,
      string,
      Models.KycDocument.KycDocumentData
    >;

    /**
     * Update status of KYC Document (Currently only allows for submitting the document)
     * @param userId
     * @param kycDocument
     * @param options
     */
    updateKycDocument: TwoArgsMethodOverload<
      string,
      Models.KycDocument.SubmitKycDocument,
      Models.KycDocument.KycDocumentData
    >;

    /**
     * Create page for KYC document
     * @param userId
     * @param kycDocumentId
     * @param kycPage
     * @param options
     */
    createKycPage: ThreeArgsMethodOverload<
      string,
      string,
      Models.KycDocument.CreateKycPage,
      Models.KycDocument.KycDocumentData
    >;

    /**
     * Create page for KYC document
     * @param userId
     * @param kycDocumentId
     * @param filePath
     * @param options
     */
    createKycPageFromFile: ThreeArgsMethodOverload<
      string,
      string,
      string,
      Models.KycDocument.KycDocumentData
    >;

    /**
     * Get users's EMoney
     * @param userId
     * @param options
     */
    getEMoney: MethodOverload<string, Models.EMoney.EMoneyData>;

    /**
     * Create an UboDeclaration for the user
     * @param userId
     * @param uboDeclaration
     * @param options
     */
    createUboDeclaration: TwoArgsMethodOverload<
      string,
      Models.UboDeclaration.CreateUboDeclaration,
      Models.UboDeclaration.UboDeclarationData
    >;

    /**
     * Get all user preauthorizations
     * @param userId
     * @param options
     */
    getPreAuthorizations: MethodOverload<
      string,
      Models.CardPreAuthorization.CardPreAuthorizationData[]
    >;
  }

  /**
   * You need to create document in order to upload pages on this document.
   *
   * 1. The KYC Document Object is a request to validate a required document. There is one request for one Type of document
   * 2. Upload a file through a Page. A document should get several pages
   * 3. Edit the object Document and set the Status field to "VALIDATION_ASKED" (instead of "CREATED")
   * 4. The demand is received by our team. The object is waiting for a "VALIDATED" status
   *
   * Note that you are not allowed to store KYC documents on your side unless you have permission from the approriate authorities in your country
   */
  class KycDocuments {
    /**
     * Get all KycDocuments
     * @param options
     */
    getAll: NoArgMethodOverload<Models.KycDocument.KycDocumentData[]>;

    /**
     * Get KycDocument
     * @param kycDocumentId
     * @param options
     */
    get: MethodOverload<string, Models.KycDocument.KycDocumentData>;

    /**
     * Creates temporary URLs where each page of a KYC document can be viewed.
     * @param documentId
     */
    createKycDocumentConsult: MethodOverload<
      string,
      any // Unsure of data structure from docs
    >;
  }

  /**
   * An UBO Declaration is an electronic version of the previous KYC document "Shareholder Declaration", in order to declare all the Ultimate Beneficial Owners of a BUSINESS-typed legal User
   * (ie the shareholders with >25% of capital or voting rights).
   *
   * 1. Create each Ultimate Beneficial Owner as a Natural User, who must have a "DECLARATIVE" Capacity.
   * 2. Create a new UBO Declaration for your legal user, and link every Ultimate Beneficial Owners created previously thanks to DeclaredUBOs.
   *  - This list can be empty if your legal user has no Ultimate Beneficial Owner, or no eligible one (ie. no Ultimate Beneficial Owner that owns more than 25% of this company).
   * 3. Edit the UBODeclaration object and set the Status field to "VALIDATION_ASKED" (instead of "CREATED")
   * 4. The demand is received by our team and once processed, it will either get a "VALIDATED" status, or "REFUSED" with more information provided in the RefusedReasonTypes parameter
   *
   * Note that UBO declarations are not yet a requirement for your user to be KYC verified and are optional at this stage
   */
  class UboDeclarations {
    /**
     * Retrieves a UBO declaration object from the API.
     * @param id
     * @param options
     */
    get: MethodOverload<string, Models.UboDeclaration.UboDeclarationData>;

    /**
     * Updates a UBO declaration entity.
     * @param uboDeclaration Updated UBO declaration entity - must have ID
     * @param options
     */
    update: MethodOverload<
      Models.UboDeclaration.UpdateUboDeclaration,
      Models.UboDeclaration.UboDeclarationData
    >;
  }

  class BankAccounts {
    /**
     * Retrieve list of transactions for a bank account
     * @param bankAccountId
     * @param options
     */
    getTransactions: MethodOverload<
      string,
      Models.Transaction.TransactionData[]
    >;
  }

  class Wallets {
    /**
     * Create new wallet
     * @param wallet
     * @param options
     */
    create: MethodOverload<
      Models.Wallet.CreateWallet | Models.Wallet,
      Models.Wallet.WalletData
    >;

    /**
     * Update wallet
     * @param wallet
     * @param options
     */
    update: MethodOverload<
      Models.Wallet.UpdateWallet | Models.Wallet,
      Models.Wallet.WalletData
    >;

    /**
     * Get a specific wallet
     * @param walletId
     */
    get: MethodOverload<string, Models.Wallet.WalletData>;

    /**
     * Get transactions for the wallet
     * @param walletId
     * @param options
     */
    getTransactions: MethodOverload<
      string,
      Models.Transaction.TransactionData[]
    >;
  }

  class Cards {
    /**
     * Get card
     * @param cardId
     * @param ptions
     */
    get: MethodOverload<string, Models.Card.CardData>;

    /**
     * Gets a list of cards having the same fingerprint.
     * The fingerprint is a hash uniquely generated per 16-digit card number.
     *
     * @param fingerprint The fingerprint hash
     */
    getByFingerprint: MethodOverload<string, Models.Card.CardData[]>;

    /**
     * Update card (currently only supports deactivation)
     * @param card
     * @param options
     */
    update: MethodOverload<Models.Card.UpdateCard, Models.Card.CardData>;

    /**
     * Get list of Transactions of a Card
     * @param cardId
     * @param options
     */
    getTransactions: MethodOverload<
      string,
      Models.Transaction.TransactionData[]
    >;

    /**
     * Gets list of PreAuthorizations of a Card.
     * @param cardId
     * @param options
     */
    getPreAuthorizations: MethodOverload<
      string,
      Models.CardPreAuthorization.CardPreAuthorizationData[]
    >;
  }

  /**
   * You need to register a card in order to process a Direct PayIn. Card registration enables you to tokenize a Card. These are the steps to follow:
   *
   * 1. Create a CardRegistration Object
   * 2. Get a PreRegistrationData
   * 3. The user posts PreRegistrationData, AccessKey and card details through a form (PHP & JS samples) to the CardRegistrationURL (5. in the diagram)
   * 4. Get a RegistrationData back
   * 5. Edit the CardRegistration Object (POST method) with the RegistrationData just received
   * 6. Get the CardId ready to use into the Direct PayIn Object
   *
   * - If you don’t want to save the card you must change the field ACTIVE in the card object to false
   */
  class CardRegistrations {
    /**
     * Create new card registration
     * @param cardRegistration
     * @param options
     */
    create: MethodOverload<
      Models.CardRegistration.CreateCardRegistration,
      Models.CardRegistration.CardRegistrationData
    >;

    /**
     * Create new card registration
     * @param cardRegistrationId
     * @param options
     */
    get: MethodOverload<string, Models.CardRegistration.CardRegistrationData>;

    /**
     * Update card registration
     * @param  cardRegistration
     */
    update: MethodOverload<
      Models.CardRegistration.UpdateCardRegistration,
      Models.CardRegistration.CardRegistrationData
    >;
  }

  /**
   * The PreAuthorization Object ensures the solvency of a registered card for 7 days. The overall process is as follows:
   *
   * 1. Register a card (CardRegistration)
   * 2. Create a PreAuthorization with the CardId. This allows you to charge an amount on a card
   * 3. Charge the card through the PreAuthorized PayIn object (Payins/preauthorized/direct)
   *
   * How does PreAuthorization work?
   * - Once the PreAuthorization object is created the Status is "CREATED" until 3D secure validation.
   * - If the authorization is successful the status is "SUCCEEDED" if it failed the status is "FAILED".
   * - Once Status = "SUCCEEDED" and PaymentStatus = "WAITING" you can charge the card.
   * - The Pay-In amount has to be less than or equal to the amount authorized.
   */
  class CardPreAuthorizations {
    /**
     * Create new pre-authorization
     * @param cardPreAuthorization
     * @param options
     */
    create: MethodOverload<
      Models.CardPreAuthorization.CreateCardPreAuthorization,
      Models.CardPreAuthorization.CardPreAuthorizationData
    >;

    /**
     * Get data for Card pre-authorization
     * @param cardPreAuthorizationId
     * @param options
     */
    get: MethodOverload<
      string,
      Models.CardPreAuthorization.CardPreAuthorizationData
    >;

    /**
     * Update pre-authorization object (currently only supports cancellation)
     * @param  cardPreAuthorization
     */
    update: MethodOverload<
      Models.CardPreAuthorization.UpdateCardPreAuthorization,
      Models.CardPreAuthorization.CardPreAuthorizationData
    >;
  }

  class PayIns {
    /**
     * Create new pay-in
     * @param payIn
     * @param options
     */
    create: MethodOverload<
      Models.PayIn.CreateCardDirectPayIn,
      Models.PayIn.CardDirectPayInData
    > &
      MethodOverload<
        Models.PayIn.CreateCardPreAuthorizedPayIn,
        Models.PayIn.CardPreAuthorizedPayInData
      > &
      MethodOverload<
        Models.PayIn.CreateCardWebPayIn,
        Models.PayIn.CardWebPayInData
      >;
    /**
     * Get pay-in
     * @param payInId
     * @param options
     */
    get: MethodOverload<string, Models.PayIn.PayInData>;
    /**
     * Create refund for pay-in object
     * @param payInId
     * @param refundData
     * @param options
     */
    createRefund: TwoArgsMethodOverload<
      string,
      Models.Refund.CreatePayInRefund,
      Models.Refund.RefundData
    >;
    /**
     * Gets list of Refunds for a PayIn
     * @param payInId
     * @param options
     */
    getRefunds: MethodOverload<string, Models.Refund.RefundData[]>;
  }

  class Refunds {
    /**
     * Get events
     * @param refundId
     * @param options
     */
    get: MethodOverload<string, Models.Refund.RefundData>;
  }

  class Clients {
    /**
     * Get the client
     * @return {Object}        Request promise
     */
    get: NoArgMethodOverload<Models.Client.ClientData>;
    /**
     * Update the client
     * @param client
     * @param options
     */
    update: MethodOverload<
      Models.Client.UpdateClient,
      Models.Client.ClientData
    >;
    /**
     * Upload client logo from base64 image string
     * @param base64Logo
     * @param options
     */
    uploadLogo: MethodOverload<string, Models.Client.ClientData>;
    /**
     * Upload client logo from file path
     * @param {string}  filePath                    File path
     * @param {Object} options                  Request options
     */
    uploadLogoFromFile: MethodOverload<string, Models.Client.ClientData>;
    /**
     * Get all client wallets
     * @param {Object} options                  Request options
     */
    getClientWallets: NoArgMethodOverload<Models.Wallet.ClientWalletData[]>;
    /**
     * Get a client wallet
     * @param fundsType    Wallet's funds type
     * @param currency     Currency of the wallet
     * @param options      Request options
     */
    getClientWallet: TwoArgsMethodOverload<
      Models.Wallet.ClientFundsType,
      CurrencyISO,
      Models.Wallet.ClientWalletData
    >;
    /**
     * Get client wallets by the type of funds
     * @param fundsType
     * @param options
     */
    getClientWalletsByFundsType: MethodOverload<
      Models.Wallet.ClientFundsType,
      Models.Wallet.ClientWalletData[]
    >;
    /**
     * Get a client wallet's transactions
     * @param fundsType
     * @param currency
     * @param options
     */
    getClientWalletTransactions: TwoArgsMethodOverload<
      Models.Wallet.ClientFundsType,
      CurrencyISO,
      Models.Transaction.TransactionData[]
    >;
  }

  class PayOuts {
    /**
     * Create new pay-out
     * @param payOut
     * @param options
     */
    create: MethodOverload<
      Models.PayOut.CreatePayOut,
      Models.PayOut.PayOutData
    >;
    /**
     * Get payout
     * @param payOutId
     * @param options
     */
    get: MethodOverload<string, Models.PayOut.PayOutData>;
    /**
     * Gets list of Refunds of a PayOut
     * @param payOutId
     * @param options
     */
    getRefunds: MethodOverload<string, Models.Refund.RefundData[]>;
  }

  class Transfers {
    /**
     * Create new transfer
     * @param transfer
     * @param options
     */
    create: MethodOverload<
      Models.Transfer.CreateTransfer,
      Models.Transfer.TransferData
    >;
    /**
     * Get transfer
     * @param transferId
     * @param options
     */
    get: MethodOverload<string, Models.Transfer.TransferData>;
    /**
     * Create refund for transfer object
     * @param transferId
     * @param refund
     * @param options
     */
    createRefund: TwoArgsMethodOverload<
      string,
      Models.Refund.CreateTransferRefund,
      Models.Refund.RefundData
    >;
    /**
     * Gets list of Refunds of a Transfer
     * @param transferId
     * @param options
     */
    getRefunds: MethodOverload<string, Models.Refund.RefundData[]>;
  }

  class BankingAliases {
    /**
     * Create a banking alias
     * @param bankingAlias
     * @param options
     */
    create: MethodOverload<
      Models.BankingAlias.CreateIBANBankingAlias,
      Models.BankingAlias.IBANBankingAliasData
    >;
    /**
     * Get a banking alias
     * @param bankingAliasId
     * @param options
     */
    get: MethodOverload<string, Models.BankingAlias.IBANBankingAliasData>;
    /**
     * Get all banking aliases
     * @param options
     */
    getAll: NoArgMethodOverload<Models.BankingAlias.IBANBankingAliasData[]>;
    /**
     * Update banking alias
     * @param bankingAliasId
     * @param options
     */
    update: MethodOverload<
      Partial<
        Omit<Models.BankingAlias.CreateIBANBankingAlias, "CreditedUserId">
      >,
      Models.BankingAlias.IBANBankingAliasData
    >;
    /**
     * Deactivate banking alias
     * @param bankingAliasId
     * @param options
     */
    deactivate: MethodOverload<
      string,
      Models.BankingAlias.IBANBankingAliasData
    >;
    /**
     * Activate banking alias
     * @param bankingAliasId
     * @param options
     */
    activate: MethodOverload<string, Models.BankingAlias.IBANBankingAliasData>;
  }

  class DisputeDocuments {
    /**
     * Get all KycDocuments
     * @param options
     */
    getAll: NoArgMethodOverload<Models.DisputeDocument.DisputeDocumentData[]>;

    /**
     * Get KycDocument
     * @param documentId
     * @param options
     */
    get: MethodOverload<string, Models.DisputeDocument.DisputeDocumentData>;

    /**
     * Creates temporary URLs where each page of a KYC document can be viewed.
     * @param documentId
     */
    createDisputeDocumentConsult: MethodOverload<
      string,
      any // Unsure of data structure from docs
    >;
  }
}
