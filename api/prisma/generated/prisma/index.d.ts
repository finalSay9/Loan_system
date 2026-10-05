
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model LoanProduct
 * 
 */
export type LoanProduct = $Result.DefaultSelection<Prisma.$LoanProductPayload>
/**
 * Model Loan
 * 
 */
export type Loan = $Result.DefaultSelection<Prisma.$LoanPayload>
/**
 * Model RepaymentSchedule
 * 
 */
export type RepaymentSchedule = $Result.DefaultSelection<Prisma.$RepaymentSchedulePayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model PaymentAllocation
 * 
 */
export type PaymentAllocation = $Result.DefaultSelection<Prisma.$PaymentAllocationPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  BORROWER: 'BORROWER',
  LOAN_OFFICER: 'LOAN_OFFICER',
  ACCOUNTANT: 'ACCOUNTANT',
  COMPLIANCE_OFFICER: 'COMPLIANCE_OFFICER',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const KycStatus: {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

export type KycStatus = (typeof KycStatus)[keyof typeof KycStatus]


export const LoanStatus: {
  PENDING: 'PENDING',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  DISBURSED: 'DISBURSED',
  CLOSED: 'CLOSED',
  DEFAULTED: 'DEFAULTED',
  CANCELLED: 'CANCELLED'
};

export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus]


export const RepaymentFrequency: {
  WEEKLY: 'WEEKLY',
  BIWEEKLY: 'BIWEEKLY',
  MONTHLY: 'MONTHLY'
};

export type RepaymentFrequency = (typeof RepaymentFrequency)[keyof typeof RepaymentFrequency]


export const InterestType: {
  FLAT: 'FLAT',
  REDUCING_BALANCE: 'REDUCING_BALANCE'
};

export type InterestType = (typeof InterestType)[keyof typeof InterestType]


export const InstallmentStatus: {
  PENDING: 'PENDING',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
  WAIVED: 'WAIVED'
};

export type InstallmentStatus = (typeof InstallmentStatus)[keyof typeof InstallmentStatus]


export const TransactionType: {
  DISBURSEMENT: 'DISBURSEMENT',
  REPAYMENT: 'REPAYMENT',
  PENALTY: 'PENALTY',
  FEE: 'FEE',
  REFUND: 'REFUND',
  ADJUSTMENT: 'ADJUSTMENT'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const FeeType: {
  FIXED: 'FIXED',
  PERCENTAGE: 'PERCENTAGE'
};

export type FeeType = (typeof FeeType)[keyof typeof FeeType]


export const LateFeeType: {
  FIXED: 'FIXED',
  PERCENTAGE: 'PERCENTAGE'
};

export type LateFeeType = (typeof LateFeeType)[keyof typeof LateFeeType]


export const TermUnit: {
  WEEKS: 'WEEKS',
  MONTHS: 'MONTHS'
};

export type TermUnit = (typeof TermUnit)[keyof typeof TermUnit]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type KycStatus = $Enums.KycStatus

export const KycStatus: typeof $Enums.KycStatus

export type LoanStatus = $Enums.LoanStatus

export const LoanStatus: typeof $Enums.LoanStatus

export type RepaymentFrequency = $Enums.RepaymentFrequency

export const RepaymentFrequency: typeof $Enums.RepaymentFrequency

export type InterestType = $Enums.InterestType

export const InterestType: typeof $Enums.InterestType

export type InstallmentStatus = $Enums.InstallmentStatus

export const InstallmentStatus: typeof $Enums.InstallmentStatus

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type FeeType = $Enums.FeeType

export const FeeType: typeof $Enums.FeeType

export type LateFeeType = $Enums.LateFeeType

export const LateFeeType: typeof $Enums.LateFeeType

export type TermUnit = $Enums.TermUnit

export const TermUnit: typeof $Enums.TermUnit

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loanProduct`: Exposes CRUD operations for the **LoanProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoanProducts
    * const loanProducts = await prisma.loanProduct.findMany()
    * ```
    */
  get loanProduct(): Prisma.LoanProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loan`: Exposes CRUD operations for the **Loan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Loans
    * const loans = await prisma.loan.findMany()
    * ```
    */
  get loan(): Prisma.LoanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.repaymentSchedule`: Exposes CRUD operations for the **RepaymentSchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RepaymentSchedules
    * const repaymentSchedules = await prisma.repaymentSchedule.findMany()
    * ```
    */
  get repaymentSchedule(): Prisma.RepaymentScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentAllocation`: Exposes CRUD operations for the **PaymentAllocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentAllocations
    * const paymentAllocations = await prisma.paymentAllocation.findMany()
    * ```
    */
  get paymentAllocation(): Prisma.PaymentAllocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    LoanProduct: 'LoanProduct',
    Loan: 'Loan',
    RepaymentSchedule: 'RepaymentSchedule',
    Transaction: 'Transaction',
    PaymentAllocation: 'PaymentAllocation',
    AuditLog: 'AuditLog',
    Feedback: 'Feedback'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "loanProduct" | "loan" | "repaymentSchedule" | "transaction" | "paymentAllocation" | "auditLog" | "feedback"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      LoanProduct: {
        payload: Prisma.$LoanProductPayload<ExtArgs>
        fields: Prisma.LoanProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload>
          }
          findFirst: {
            args: Prisma.LoanProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload>
          }
          findMany: {
            args: Prisma.LoanProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload>[]
          }
          create: {
            args: Prisma.LoanProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload>
          }
          createMany: {
            args: Prisma.LoanProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoanProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload>[]
          }
          delete: {
            args: Prisma.LoanProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload>
          }
          update: {
            args: Prisma.LoanProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload>
          }
          deleteMany: {
            args: Prisma.LoanProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoanProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload>[]
          }
          upsert: {
            args: Prisma.LoanProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanProductPayload>
          }
          aggregate: {
            args: Prisma.LoanProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoanProduct>
          }
          groupBy: {
            args: Prisma.LoanProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanProductCountArgs<ExtArgs>
            result: $Utils.Optional<LoanProductCountAggregateOutputType> | number
          }
        }
      }
      Loan: {
        payload: Prisma.$LoanPayload<ExtArgs>
        fields: Prisma.LoanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          findFirst: {
            args: Prisma.LoanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          findMany: {
            args: Prisma.LoanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          create: {
            args: Prisma.LoanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          createMany: {
            args: Prisma.LoanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          delete: {
            args: Prisma.LoanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          update: {
            args: Prisma.LoanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          deleteMany: {
            args: Prisma.LoanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          upsert: {
            args: Prisma.LoanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          aggregate: {
            args: Prisma.LoanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoan>
          }
          groupBy: {
            args: Prisma.LoanGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanCountArgs<ExtArgs>
            result: $Utils.Optional<LoanCountAggregateOutputType> | number
          }
        }
      }
      RepaymentSchedule: {
        payload: Prisma.$RepaymentSchedulePayload<ExtArgs>
        fields: Prisma.RepaymentScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepaymentScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepaymentScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload>
          }
          findFirst: {
            args: Prisma.RepaymentScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepaymentScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload>
          }
          findMany: {
            args: Prisma.RepaymentScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload>[]
          }
          create: {
            args: Prisma.RepaymentScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload>
          }
          createMany: {
            args: Prisma.RepaymentScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepaymentScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload>[]
          }
          delete: {
            args: Prisma.RepaymentScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload>
          }
          update: {
            args: Prisma.RepaymentScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload>
          }
          deleteMany: {
            args: Prisma.RepaymentScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepaymentScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepaymentScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload>[]
          }
          upsert: {
            args: Prisma.RepaymentScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepaymentSchedulePayload>
          }
          aggregate: {
            args: Prisma.RepaymentScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepaymentSchedule>
          }
          groupBy: {
            args: Prisma.RepaymentScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepaymentScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepaymentScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<RepaymentScheduleCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      PaymentAllocation: {
        payload: Prisma.$PaymentAllocationPayload<ExtArgs>
        fields: Prisma.PaymentAllocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentAllocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentAllocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload>
          }
          findFirst: {
            args: Prisma.PaymentAllocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentAllocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload>
          }
          findMany: {
            args: Prisma.PaymentAllocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload>[]
          }
          create: {
            args: Prisma.PaymentAllocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload>
          }
          createMany: {
            args: Prisma.PaymentAllocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentAllocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload>[]
          }
          delete: {
            args: Prisma.PaymentAllocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload>
          }
          update: {
            args: Prisma.PaymentAllocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload>
          }
          deleteMany: {
            args: Prisma.PaymentAllocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentAllocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentAllocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload>[]
          }
          upsert: {
            args: Prisma.PaymentAllocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentAllocationPayload>
          }
          aggregate: {
            args: Prisma.PaymentAllocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentAllocation>
          }
          groupBy: {
            args: Prisma.PaymentAllocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentAllocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentAllocationCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentAllocationCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    loanProduct?: LoanProductOmit
    loan?: LoanOmit
    repaymentSchedule?: RepaymentScheduleOmit
    transaction?: TransactionOmit
    paymentAllocation?: PaymentAllocationOmit
    auditLog?: AuditLogOmit
    feedback?: FeedbackOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    loans: number
    auditLogs: number
    feedback: number
    approvedLoans: number
    disbursedLoans: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | UserCountOutputTypeCountLoansArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    feedback?: boolean | UserCountOutputTypeCountFeedbackArgs
    approvedLoans?: boolean | UserCountOutputTypeCountApprovedLoansArgs
    disbursedLoans?: boolean | UserCountOutputTypeCountDisbursedLoansArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApprovedLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDisbursedLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }


  /**
   * Count Type LoanProductCountOutputType
   */

  export type LoanProductCountOutputType = {
    loans: number
  }

  export type LoanProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | LoanProductCountOutputTypeCountLoansArgs
  }

  // Custom InputTypes
  /**
   * LoanProductCountOutputType without action
   */
  export type LoanProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProductCountOutputType
     */
    select?: LoanProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoanProductCountOutputType without action
   */
  export type LoanProductCountOutputTypeCountLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }


  /**
   * Count Type LoanCountOutputType
   */

  export type LoanCountOutputType = {
    repayments: number
    transactions: number
    feedback: number
  }

  export type LoanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repayments?: boolean | LoanCountOutputTypeCountRepaymentsArgs
    transactions?: boolean | LoanCountOutputTypeCountTransactionsArgs
    feedback?: boolean | LoanCountOutputTypeCountFeedbackArgs
  }

  // Custom InputTypes
  /**
   * LoanCountOutputType without action
   */
  export type LoanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanCountOutputType
     */
    select?: LoanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoanCountOutputType without action
   */
  export type LoanCountOutputTypeCountRepaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepaymentScheduleWhereInput
  }

  /**
   * LoanCountOutputType without action
   */
  export type LoanCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * LoanCountOutputType without action
   */
  export type LoanCountOutputTypeCountFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }


  /**
   * Count Type RepaymentScheduleCountOutputType
   */

  export type RepaymentScheduleCountOutputType = {
    allocations: number
  }

  export type RepaymentScheduleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    allocations?: boolean | RepaymentScheduleCountOutputTypeCountAllocationsArgs
  }

  // Custom InputTypes
  /**
   * RepaymentScheduleCountOutputType without action
   */
  export type RepaymentScheduleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentScheduleCountOutputType
     */
    select?: RepaymentScheduleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RepaymentScheduleCountOutputType without action
   */
  export type RepaymentScheduleCountOutputTypeCountAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentAllocationWhereInput
  }


  /**
   * Count Type TransactionCountOutputType
   */

  export type TransactionCountOutputType = {
    allocations: number
  }

  export type TransactionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    allocations?: boolean | TransactionCountOutputTypeCountAllocationsArgs
  }

  // Custom InputTypes
  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionCountOutputType
     */
    select?: TransactionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeCountAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentAllocationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    occupation: string | null
    phone: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    kycStatus: $Enums.KycStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    avatarUrl: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    occupation: string | null
    phone: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    kycStatus: $Enums.KycStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    avatarUrl: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    address: number
    occupation: number
    phone: number
    email: number
    passwordHash: number
    role: number
    kycStatus: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    avatarUrl: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    occupation?: true
    phone?: true
    email?: true
    passwordHash?: true
    role?: true
    kycStatus?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    avatarUrl?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    occupation?: true
    phone?: true
    email?: true
    passwordHash?: true
    role?: true
    kycStatus?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    avatarUrl?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    occupation?: true
    phone?: true
    email?: true
    passwordHash?: true
    role?: true
    kycStatus?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    avatarUrl?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    address: string
    occupation: string
    phone: string
    email: string | null
    passwordHash: string
    role: $Enums.Role
    kycStatus: $Enums.KycStatus
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    avatarUrl: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    occupation?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    kycStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    avatarUrl?: boolean
    loans?: boolean | User$loansArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    feedback?: boolean | User$feedbackArgs<ExtArgs>
    approvedLoans?: boolean | User$approvedLoansArgs<ExtArgs>
    disbursedLoans?: boolean | User$disbursedLoansArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    occupation?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    kycStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    avatarUrl?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    occupation?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    kycStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    avatarUrl?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    occupation?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    kycStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    avatarUrl?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "occupation" | "phone" | "email" | "passwordHash" | "role" | "kycStatus" | "createdAt" | "updatedAt" | "deletedAt" | "avatarUrl", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | User$loansArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    feedback?: boolean | User$feedbackArgs<ExtArgs>
    approvedLoans?: boolean | User$approvedLoansArgs<ExtArgs>
    disbursedLoans?: boolean | User$disbursedLoansArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      loans: Prisma.$LoanPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      feedback: Prisma.$FeedbackPayload<ExtArgs>[]
      approvedLoans: Prisma.$LoanPayload<ExtArgs>[]
      disbursedLoans: Prisma.$LoanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string
      occupation: string
      phone: string
      email: string | null
      passwordHash: string
      role: $Enums.Role
      kycStatus: $Enums.KycStatus
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      avatarUrl: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loans<T extends User$loansArgs<ExtArgs> = {}>(args?: Subset<T, User$loansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedback<T extends User$feedbackArgs<ExtArgs> = {}>(args?: Subset<T, User$feedbackArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    approvedLoans<T extends User$approvedLoansArgs<ExtArgs> = {}>(args?: Subset<T, User$approvedLoansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    disbursedLoans<T extends User$disbursedLoansArgs<ExtArgs> = {}>(args?: Subset<T, User$disbursedLoansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly occupation: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly kycStatus: FieldRef<"User", 'KycStatus'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly avatarUrl: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.loans
   */
  export type User$loansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User.feedback
   */
  export type User$feedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * User.approvedLoans
   */
  export type User$approvedLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * User.disbursedLoans
   */
  export type User$disbursedLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model LoanProduct
   */

  export type AggregateLoanProduct = {
    _count: LoanProductCountAggregateOutputType | null
    _avg: LoanProductAvgAggregateOutputType | null
    _sum: LoanProductSumAggregateOutputType | null
    _min: LoanProductMinAggregateOutputType | null
    _max: LoanProductMaxAggregateOutputType | null
  }

  export type LoanProductAvgAggregateOutputType = {
    minAmount: Decimal | null
    maxAmount: Decimal | null
    interestRate: Decimal | null
    minTermValue: number | null
    maxTermValue: number | null
    processingFeeAmount: Decimal | null
    processingFeeRate: Decimal | null
    lateFeeAmount: Decimal | null
    lateFeeRate: Decimal | null
    gracePeriodDays: number | null
  }

  export type LoanProductSumAggregateOutputType = {
    minAmount: Decimal | null
    maxAmount: Decimal | null
    interestRate: Decimal | null
    minTermValue: number | null
    maxTermValue: number | null
    processingFeeAmount: Decimal | null
    processingFeeRate: Decimal | null
    lateFeeAmount: Decimal | null
    lateFeeRate: Decimal | null
    gracePeriodDays: number | null
  }

  export type LoanProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    minAmount: Decimal | null
    maxAmount: Decimal | null
    interestRate: Decimal | null
    interestType: $Enums.InterestType | null
    minTermValue: number | null
    maxTermValue: number | null
    termUnit: $Enums.TermUnit | null
    repaymentFrequency: $Enums.RepaymentFrequency | null
    processingFeeType: $Enums.FeeType | null
    processingFeeAmount: Decimal | null
    processingFeeRate: Decimal | null
    lateFeeType: $Enums.LateFeeType | null
    lateFeeAmount: Decimal | null
    lateFeeRate: Decimal | null
    gracePeriodDays: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoanProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    minAmount: Decimal | null
    maxAmount: Decimal | null
    interestRate: Decimal | null
    interestType: $Enums.InterestType | null
    minTermValue: number | null
    maxTermValue: number | null
    termUnit: $Enums.TermUnit | null
    repaymentFrequency: $Enums.RepaymentFrequency | null
    processingFeeType: $Enums.FeeType | null
    processingFeeAmount: Decimal | null
    processingFeeRate: Decimal | null
    lateFeeType: $Enums.LateFeeType | null
    lateFeeAmount: Decimal | null
    lateFeeRate: Decimal | null
    gracePeriodDays: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoanProductCountAggregateOutputType = {
    id: number
    name: number
    description: number
    minAmount: number
    maxAmount: number
    interestRate: number
    interestType: number
    minTermValue: number
    maxTermValue: number
    termUnit: number
    repaymentFrequency: number
    processingFeeType: number
    processingFeeAmount: number
    processingFeeRate: number
    lateFeeType: number
    lateFeeAmount: number
    lateFeeRate: number
    gracePeriodDays: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoanProductAvgAggregateInputType = {
    minAmount?: true
    maxAmount?: true
    interestRate?: true
    minTermValue?: true
    maxTermValue?: true
    processingFeeAmount?: true
    processingFeeRate?: true
    lateFeeAmount?: true
    lateFeeRate?: true
    gracePeriodDays?: true
  }

  export type LoanProductSumAggregateInputType = {
    minAmount?: true
    maxAmount?: true
    interestRate?: true
    minTermValue?: true
    maxTermValue?: true
    processingFeeAmount?: true
    processingFeeRate?: true
    lateFeeAmount?: true
    lateFeeRate?: true
    gracePeriodDays?: true
  }

  export type LoanProductMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    minAmount?: true
    maxAmount?: true
    interestRate?: true
    interestType?: true
    minTermValue?: true
    maxTermValue?: true
    termUnit?: true
    repaymentFrequency?: true
    processingFeeType?: true
    processingFeeAmount?: true
    processingFeeRate?: true
    lateFeeType?: true
    lateFeeAmount?: true
    lateFeeRate?: true
    gracePeriodDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoanProductMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    minAmount?: true
    maxAmount?: true
    interestRate?: true
    interestType?: true
    minTermValue?: true
    maxTermValue?: true
    termUnit?: true
    repaymentFrequency?: true
    processingFeeType?: true
    processingFeeAmount?: true
    processingFeeRate?: true
    lateFeeType?: true
    lateFeeAmount?: true
    lateFeeRate?: true
    gracePeriodDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoanProductCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    minAmount?: true
    maxAmount?: true
    interestRate?: true
    interestType?: true
    minTermValue?: true
    maxTermValue?: true
    termUnit?: true
    repaymentFrequency?: true
    processingFeeType?: true
    processingFeeAmount?: true
    processingFeeRate?: true
    lateFeeType?: true
    lateFeeAmount?: true
    lateFeeRate?: true
    gracePeriodDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoanProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanProduct to aggregate.
     */
    where?: LoanProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanProducts to fetch.
     */
    orderBy?: LoanProductOrderByWithRelationInput | LoanProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoanProducts
    **/
    _count?: true | LoanProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoanProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoanProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanProductMaxAggregateInputType
  }

  export type GetLoanProductAggregateType<T extends LoanProductAggregateArgs> = {
        [P in keyof T & keyof AggregateLoanProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoanProduct[P]>
      : GetScalarType<T[P], AggregateLoanProduct[P]>
  }




  export type LoanProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanProductWhereInput
    orderBy?: LoanProductOrderByWithAggregationInput | LoanProductOrderByWithAggregationInput[]
    by: LoanProductScalarFieldEnum[] | LoanProductScalarFieldEnum
    having?: LoanProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanProductCountAggregateInputType | true
    _avg?: LoanProductAvgAggregateInputType
    _sum?: LoanProductSumAggregateInputType
    _min?: LoanProductMinAggregateInputType
    _max?: LoanProductMaxAggregateInputType
  }

  export type LoanProductGroupByOutputType = {
    id: string
    name: string
    description: string | null
    minAmount: Decimal
    maxAmount: Decimal
    interestRate: Decimal
    interestType: $Enums.InterestType
    minTermValue: number
    maxTermValue: number
    termUnit: $Enums.TermUnit
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount: Decimal
    processingFeeRate: Decimal
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount: Decimal
    lateFeeRate: Decimal
    gracePeriodDays: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: LoanProductCountAggregateOutputType | null
    _avg: LoanProductAvgAggregateOutputType | null
    _sum: LoanProductSumAggregateOutputType | null
    _min: LoanProductMinAggregateOutputType | null
    _max: LoanProductMaxAggregateOutputType | null
  }

  type GetLoanProductGroupByPayload<T extends LoanProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanProductGroupByOutputType[P]>
            : GetScalarType<T[P], LoanProductGroupByOutputType[P]>
        }
      >
    >


  export type LoanProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    minAmount?: boolean
    maxAmount?: boolean
    interestRate?: boolean
    interestType?: boolean
    minTermValue?: boolean
    maxTermValue?: boolean
    termUnit?: boolean
    repaymentFrequency?: boolean
    processingFeeType?: boolean
    processingFeeAmount?: boolean
    processingFeeRate?: boolean
    lateFeeType?: boolean
    lateFeeAmount?: boolean
    lateFeeRate?: boolean
    gracePeriodDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loans?: boolean | LoanProduct$loansArgs<ExtArgs>
    _count?: boolean | LoanProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loanProduct"]>

  export type LoanProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    minAmount?: boolean
    maxAmount?: boolean
    interestRate?: boolean
    interestType?: boolean
    minTermValue?: boolean
    maxTermValue?: boolean
    termUnit?: boolean
    repaymentFrequency?: boolean
    processingFeeType?: boolean
    processingFeeAmount?: boolean
    processingFeeRate?: boolean
    lateFeeType?: boolean
    lateFeeAmount?: boolean
    lateFeeRate?: boolean
    gracePeriodDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["loanProduct"]>

  export type LoanProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    minAmount?: boolean
    maxAmount?: boolean
    interestRate?: boolean
    interestType?: boolean
    minTermValue?: boolean
    maxTermValue?: boolean
    termUnit?: boolean
    repaymentFrequency?: boolean
    processingFeeType?: boolean
    processingFeeAmount?: boolean
    processingFeeRate?: boolean
    lateFeeType?: boolean
    lateFeeAmount?: boolean
    lateFeeRate?: boolean
    gracePeriodDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["loanProduct"]>

  export type LoanProductSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    minAmount?: boolean
    maxAmount?: boolean
    interestRate?: boolean
    interestType?: boolean
    minTermValue?: boolean
    maxTermValue?: boolean
    termUnit?: boolean
    repaymentFrequency?: boolean
    processingFeeType?: boolean
    processingFeeAmount?: boolean
    processingFeeRate?: boolean
    lateFeeType?: boolean
    lateFeeAmount?: boolean
    lateFeeRate?: boolean
    gracePeriodDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoanProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "minAmount" | "maxAmount" | "interestRate" | "interestType" | "minTermValue" | "maxTermValue" | "termUnit" | "repaymentFrequency" | "processingFeeType" | "processingFeeAmount" | "processingFeeRate" | "lateFeeType" | "lateFeeAmount" | "lateFeeRate" | "gracePeriodDays" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["loanProduct"]>
  export type LoanProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | LoanProduct$loansArgs<ExtArgs>
    _count?: boolean | LoanProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoanProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LoanProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LoanProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoanProduct"
    objects: {
      loans: Prisma.$LoanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      minAmount: Prisma.Decimal
      maxAmount: Prisma.Decimal
      interestRate: Prisma.Decimal
      interestType: $Enums.InterestType
      minTermValue: number
      maxTermValue: number
      termUnit: $Enums.TermUnit
      repaymentFrequency: $Enums.RepaymentFrequency
      processingFeeType: $Enums.FeeType
      processingFeeAmount: Prisma.Decimal
      processingFeeRate: Prisma.Decimal
      lateFeeType: $Enums.LateFeeType
      lateFeeAmount: Prisma.Decimal
      lateFeeRate: Prisma.Decimal
      gracePeriodDays: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["loanProduct"]>
    composites: {}
  }

  type LoanProductGetPayload<S extends boolean | null | undefined | LoanProductDefaultArgs> = $Result.GetResult<Prisma.$LoanProductPayload, S>

  type LoanProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoanProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoanProductCountAggregateInputType | true
    }

  export interface LoanProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoanProduct'], meta: { name: 'LoanProduct' } }
    /**
     * Find zero or one LoanProduct that matches the filter.
     * @param {LoanProductFindUniqueArgs} args - Arguments to find a LoanProduct
     * @example
     * // Get one LoanProduct
     * const loanProduct = await prisma.loanProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanProductFindUniqueArgs>(args: SelectSubset<T, LoanProductFindUniqueArgs<ExtArgs>>): Prisma__LoanProductClient<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoanProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanProductFindUniqueOrThrowArgs} args - Arguments to find a LoanProduct
     * @example
     * // Get one LoanProduct
     * const loanProduct = await prisma.loanProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanProductFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanProductClient<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoanProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanProductFindFirstArgs} args - Arguments to find a LoanProduct
     * @example
     * // Get one LoanProduct
     * const loanProduct = await prisma.loanProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanProductFindFirstArgs>(args?: SelectSubset<T, LoanProductFindFirstArgs<ExtArgs>>): Prisma__LoanProductClient<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoanProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanProductFindFirstOrThrowArgs} args - Arguments to find a LoanProduct
     * @example
     * // Get one LoanProduct
     * const loanProduct = await prisma.loanProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanProductFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanProductClient<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoanProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoanProducts
     * const loanProducts = await prisma.loanProduct.findMany()
     * 
     * // Get first 10 LoanProducts
     * const loanProducts = await prisma.loanProduct.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanProductWithIdOnly = await prisma.loanProduct.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanProductFindManyArgs>(args?: SelectSubset<T, LoanProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoanProduct.
     * @param {LoanProductCreateArgs} args - Arguments to create a LoanProduct.
     * @example
     * // Create one LoanProduct
     * const LoanProduct = await prisma.loanProduct.create({
     *   data: {
     *     // ... data to create a LoanProduct
     *   }
     * })
     * 
     */
    create<T extends LoanProductCreateArgs>(args: SelectSubset<T, LoanProductCreateArgs<ExtArgs>>): Prisma__LoanProductClient<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoanProducts.
     * @param {LoanProductCreateManyArgs} args - Arguments to create many LoanProducts.
     * @example
     * // Create many LoanProducts
     * const loanProduct = await prisma.loanProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanProductCreateManyArgs>(args?: SelectSubset<T, LoanProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoanProducts and returns the data saved in the database.
     * @param {LoanProductCreateManyAndReturnArgs} args - Arguments to create many LoanProducts.
     * @example
     * // Create many LoanProducts
     * const loanProduct = await prisma.loanProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoanProducts and only return the `id`
     * const loanProductWithIdOnly = await prisma.loanProduct.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoanProductCreateManyAndReturnArgs>(args?: SelectSubset<T, LoanProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoanProduct.
     * @param {LoanProductDeleteArgs} args - Arguments to delete one LoanProduct.
     * @example
     * // Delete one LoanProduct
     * const LoanProduct = await prisma.loanProduct.delete({
     *   where: {
     *     // ... filter to delete one LoanProduct
     *   }
     * })
     * 
     */
    delete<T extends LoanProductDeleteArgs>(args: SelectSubset<T, LoanProductDeleteArgs<ExtArgs>>): Prisma__LoanProductClient<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoanProduct.
     * @param {LoanProductUpdateArgs} args - Arguments to update one LoanProduct.
     * @example
     * // Update one LoanProduct
     * const loanProduct = await prisma.loanProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanProductUpdateArgs>(args: SelectSubset<T, LoanProductUpdateArgs<ExtArgs>>): Prisma__LoanProductClient<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoanProducts.
     * @param {LoanProductDeleteManyArgs} args - Arguments to filter LoanProducts to delete.
     * @example
     * // Delete a few LoanProducts
     * const { count } = await prisma.loanProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanProductDeleteManyArgs>(args?: SelectSubset<T, LoanProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoanProducts
     * const loanProduct = await prisma.loanProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanProductUpdateManyArgs>(args: SelectSubset<T, LoanProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanProducts and returns the data updated in the database.
     * @param {LoanProductUpdateManyAndReturnArgs} args - Arguments to update many LoanProducts.
     * @example
     * // Update many LoanProducts
     * const loanProduct = await prisma.loanProduct.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoanProducts and only return the `id`
     * const loanProductWithIdOnly = await prisma.loanProduct.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoanProductUpdateManyAndReturnArgs>(args: SelectSubset<T, LoanProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoanProduct.
     * @param {LoanProductUpsertArgs} args - Arguments to update or create a LoanProduct.
     * @example
     * // Update or create a LoanProduct
     * const loanProduct = await prisma.loanProduct.upsert({
     *   create: {
     *     // ... data to create a LoanProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoanProduct we want to update
     *   }
     * })
     */
    upsert<T extends LoanProductUpsertArgs>(args: SelectSubset<T, LoanProductUpsertArgs<ExtArgs>>): Prisma__LoanProductClient<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoanProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanProductCountArgs} args - Arguments to filter LoanProducts to count.
     * @example
     * // Count the number of LoanProducts
     * const count = await prisma.loanProduct.count({
     *   where: {
     *     // ... the filter for the LoanProducts we want to count
     *   }
     * })
    **/
    count<T extends LoanProductCountArgs>(
      args?: Subset<T, LoanProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoanProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanProductAggregateArgs>(args: Subset<T, LoanProductAggregateArgs>): Prisma.PrismaPromise<GetLoanProductAggregateType<T>>

    /**
     * Group by LoanProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoanProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanProductGroupByArgs['orderBy'] }
        : { orderBy?: LoanProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoanProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoanProduct model
   */
  readonly fields: LoanProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoanProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loans<T extends LoanProduct$loansArgs<ExtArgs> = {}>(args?: Subset<T, LoanProduct$loansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoanProduct model
   */
  interface LoanProductFieldRefs {
    readonly id: FieldRef<"LoanProduct", 'String'>
    readonly name: FieldRef<"LoanProduct", 'String'>
    readonly description: FieldRef<"LoanProduct", 'String'>
    readonly minAmount: FieldRef<"LoanProduct", 'Decimal'>
    readonly maxAmount: FieldRef<"LoanProduct", 'Decimal'>
    readonly interestRate: FieldRef<"LoanProduct", 'Decimal'>
    readonly interestType: FieldRef<"LoanProduct", 'InterestType'>
    readonly minTermValue: FieldRef<"LoanProduct", 'Int'>
    readonly maxTermValue: FieldRef<"LoanProduct", 'Int'>
    readonly termUnit: FieldRef<"LoanProduct", 'TermUnit'>
    readonly repaymentFrequency: FieldRef<"LoanProduct", 'RepaymentFrequency'>
    readonly processingFeeType: FieldRef<"LoanProduct", 'FeeType'>
    readonly processingFeeAmount: FieldRef<"LoanProduct", 'Decimal'>
    readonly processingFeeRate: FieldRef<"LoanProduct", 'Decimal'>
    readonly lateFeeType: FieldRef<"LoanProduct", 'LateFeeType'>
    readonly lateFeeAmount: FieldRef<"LoanProduct", 'Decimal'>
    readonly lateFeeRate: FieldRef<"LoanProduct", 'Decimal'>
    readonly gracePeriodDays: FieldRef<"LoanProduct", 'Int'>
    readonly isActive: FieldRef<"LoanProduct", 'Boolean'>
    readonly createdAt: FieldRef<"LoanProduct", 'DateTime'>
    readonly updatedAt: FieldRef<"LoanProduct", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoanProduct findUnique
   */
  export type LoanProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanProductInclude<ExtArgs> | null
    /**
     * Filter, which LoanProduct to fetch.
     */
    where: LoanProductWhereUniqueInput
  }

  /**
   * LoanProduct findUniqueOrThrow
   */
  export type LoanProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanProductInclude<ExtArgs> | null
    /**
     * Filter, which LoanProduct to fetch.
     */
    where: LoanProductWhereUniqueInput
  }

  /**
   * LoanProduct findFirst
   */
  export type LoanProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanProductInclude<ExtArgs> | null
    /**
     * Filter, which LoanProduct to fetch.
     */
    where?: LoanProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanProducts to fetch.
     */
    orderBy?: LoanProductOrderByWithRelationInput | LoanProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanProducts.
     */
    cursor?: LoanProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanProducts.
     */
    distinct?: LoanProductScalarFieldEnum | LoanProductScalarFieldEnum[]
  }

  /**
   * LoanProduct findFirstOrThrow
   */
  export type LoanProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanProductInclude<ExtArgs> | null
    /**
     * Filter, which LoanProduct to fetch.
     */
    where?: LoanProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanProducts to fetch.
     */
    orderBy?: LoanProductOrderByWithRelationInput | LoanProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanProducts.
     */
    cursor?: LoanProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanProducts.
     */
    distinct?: LoanProductScalarFieldEnum | LoanProductScalarFieldEnum[]
  }

  /**
   * LoanProduct findMany
   */
  export type LoanProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanProductInclude<ExtArgs> | null
    /**
     * Filter, which LoanProducts to fetch.
     */
    where?: LoanProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanProducts to fetch.
     */
    orderBy?: LoanProductOrderByWithRelationInput | LoanProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoanProducts.
     */
    cursor?: LoanProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanProducts.
     */
    distinct?: LoanProductScalarFieldEnum | LoanProductScalarFieldEnum[]
  }

  /**
   * LoanProduct create
   */
  export type LoanProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanProductInclude<ExtArgs> | null
    /**
     * The data needed to create a LoanProduct.
     */
    data: XOR<LoanProductCreateInput, LoanProductUncheckedCreateInput>
  }

  /**
   * LoanProduct createMany
   */
  export type LoanProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoanProducts.
     */
    data: LoanProductCreateManyInput | LoanProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoanProduct createManyAndReturn
   */
  export type LoanProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * The data used to create many LoanProducts.
     */
    data: LoanProductCreateManyInput | LoanProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoanProduct update
   */
  export type LoanProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanProductInclude<ExtArgs> | null
    /**
     * The data needed to update a LoanProduct.
     */
    data: XOR<LoanProductUpdateInput, LoanProductUncheckedUpdateInput>
    /**
     * Choose, which LoanProduct to update.
     */
    where: LoanProductWhereUniqueInput
  }

  /**
   * LoanProduct updateMany
   */
  export type LoanProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoanProducts.
     */
    data: XOR<LoanProductUpdateManyMutationInput, LoanProductUncheckedUpdateManyInput>
    /**
     * Filter which LoanProducts to update
     */
    where?: LoanProductWhereInput
    /**
     * Limit how many LoanProducts to update.
     */
    limit?: number
  }

  /**
   * LoanProduct updateManyAndReturn
   */
  export type LoanProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * The data used to update LoanProducts.
     */
    data: XOR<LoanProductUpdateManyMutationInput, LoanProductUncheckedUpdateManyInput>
    /**
     * Filter which LoanProducts to update
     */
    where?: LoanProductWhereInput
    /**
     * Limit how many LoanProducts to update.
     */
    limit?: number
  }

  /**
   * LoanProduct upsert
   */
  export type LoanProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanProductInclude<ExtArgs> | null
    /**
     * The filter to search for the LoanProduct to update in case it exists.
     */
    where: LoanProductWhereUniqueInput
    /**
     * In case the LoanProduct found by the `where` argument doesn't exist, create a new LoanProduct with this data.
     */
    create: XOR<LoanProductCreateInput, LoanProductUncheckedCreateInput>
    /**
     * In case the LoanProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanProductUpdateInput, LoanProductUncheckedUpdateInput>
  }

  /**
   * LoanProduct delete
   */
  export type LoanProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanProductInclude<ExtArgs> | null
    /**
     * Filter which LoanProduct to delete.
     */
    where: LoanProductWhereUniqueInput
  }

  /**
   * LoanProduct deleteMany
   */
  export type LoanProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanProducts to delete
     */
    where?: LoanProductWhereInput
    /**
     * Limit how many LoanProducts to delete.
     */
    limit?: number
  }

  /**
   * LoanProduct.loans
   */
  export type LoanProduct$loansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * LoanProduct without action
   */
  export type LoanProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanProduct
     */
    select?: LoanProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanProduct
     */
    omit?: LoanProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanProductInclude<ExtArgs> | null
  }


  /**
   * Model Loan
   */

  export type AggregateLoan = {
    _count: LoanCountAggregateOutputType | null
    _avg: LoanAvgAggregateOutputType | null
    _sum: LoanSumAggregateOutputType | null
    _min: LoanMinAggregateOutputType | null
    _max: LoanMaxAggregateOutputType | null
  }

  export type LoanAvgAggregateOutputType = {
    amount: Decimal | null
    interestRate: Decimal | null
    termValue: number | null
    numberOfInstallments: number | null
    processingFeeAmount: Decimal | null
    processingFeeRate: Decimal | null
    lateFeeAmount: Decimal | null
    lateFeeRate: Decimal | null
    gracePeriodDays: number | null
    totalInterest: Decimal | null
    totalFees: Decimal | null
    totalPayable: Decimal | null
    version: number | null
  }

  export type LoanSumAggregateOutputType = {
    amount: Decimal | null
    interestRate: Decimal | null
    termValue: number | null
    numberOfInstallments: number | null
    processingFeeAmount: Decimal | null
    processingFeeRate: Decimal | null
    lateFeeAmount: Decimal | null
    lateFeeRate: Decimal | null
    gracePeriodDays: number | null
    totalInterest: Decimal | null
    totalFees: Decimal | null
    totalPayable: Decimal | null
    version: number | null
  }

  export type LoanMinAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    amount: Decimal | null
    purpose: string | null
    notes: string | null
    status: $Enums.LoanStatus | null
    interestRate: Decimal | null
    interestType: $Enums.InterestType | null
    termValue: number | null
    termUnit: $Enums.TermUnit | null
    numberOfInstallments: number | null
    repaymentFrequency: $Enums.RepaymentFrequency | null
    processingFeeType: $Enums.FeeType | null
    processingFeeAmount: Decimal | null
    processingFeeRate: Decimal | null
    lateFeeType: $Enums.LateFeeType | null
    lateFeeAmount: Decimal | null
    lateFeeRate: Decimal | null
    gracePeriodDays: number | null
    totalInterest: Decimal | null
    totalFees: Decimal | null
    totalPayable: Decimal | null
    rejectionReason: string | null
    approvedAt: Date | null
    approvedById: string | null
    disbursedAt: Date | null
    disbursedById: string | null
    firstPaymentDueAt: Date | null
    maturityDate: Date | null
    closedAt: Date | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type LoanMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    amount: Decimal | null
    purpose: string | null
    notes: string | null
    status: $Enums.LoanStatus | null
    interestRate: Decimal | null
    interestType: $Enums.InterestType | null
    termValue: number | null
    termUnit: $Enums.TermUnit | null
    numberOfInstallments: number | null
    repaymentFrequency: $Enums.RepaymentFrequency | null
    processingFeeType: $Enums.FeeType | null
    processingFeeAmount: Decimal | null
    processingFeeRate: Decimal | null
    lateFeeType: $Enums.LateFeeType | null
    lateFeeAmount: Decimal | null
    lateFeeRate: Decimal | null
    gracePeriodDays: number | null
    totalInterest: Decimal | null
    totalFees: Decimal | null
    totalPayable: Decimal | null
    rejectionReason: string | null
    approvedAt: Date | null
    approvedById: string | null
    disbursedAt: Date | null
    disbursedById: string | null
    firstPaymentDueAt: Date | null
    maturityDate: Date | null
    closedAt: Date | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type LoanCountAggregateOutputType = {
    id: number
    userId: number
    productId: number
    amount: number
    purpose: number
    notes: number
    status: number
    interestRate: number
    interestType: number
    termValue: number
    termUnit: number
    numberOfInstallments: number
    repaymentFrequency: number
    processingFeeType: number
    processingFeeAmount: number
    processingFeeRate: number
    lateFeeType: number
    lateFeeAmount: number
    lateFeeRate: number
    gracePeriodDays: number
    totalInterest: number
    totalFees: number
    totalPayable: number
    rejectionReason: number
    approvedAt: number
    approvedById: number
    disbursedAt: number
    disbursedById: number
    firstPaymentDueAt: number
    maturityDate: number
    closedAt: number
    version: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type LoanAvgAggregateInputType = {
    amount?: true
    interestRate?: true
    termValue?: true
    numberOfInstallments?: true
    processingFeeAmount?: true
    processingFeeRate?: true
    lateFeeAmount?: true
    lateFeeRate?: true
    gracePeriodDays?: true
    totalInterest?: true
    totalFees?: true
    totalPayable?: true
    version?: true
  }

  export type LoanSumAggregateInputType = {
    amount?: true
    interestRate?: true
    termValue?: true
    numberOfInstallments?: true
    processingFeeAmount?: true
    processingFeeRate?: true
    lateFeeAmount?: true
    lateFeeRate?: true
    gracePeriodDays?: true
    totalInterest?: true
    totalFees?: true
    totalPayable?: true
    version?: true
  }

  export type LoanMinAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    amount?: true
    purpose?: true
    notes?: true
    status?: true
    interestRate?: true
    interestType?: true
    termValue?: true
    termUnit?: true
    numberOfInstallments?: true
    repaymentFrequency?: true
    processingFeeType?: true
    processingFeeAmount?: true
    processingFeeRate?: true
    lateFeeType?: true
    lateFeeAmount?: true
    lateFeeRate?: true
    gracePeriodDays?: true
    totalInterest?: true
    totalFees?: true
    totalPayable?: true
    rejectionReason?: true
    approvedAt?: true
    approvedById?: true
    disbursedAt?: true
    disbursedById?: true
    firstPaymentDueAt?: true
    maturityDate?: true
    closedAt?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type LoanMaxAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    amount?: true
    purpose?: true
    notes?: true
    status?: true
    interestRate?: true
    interestType?: true
    termValue?: true
    termUnit?: true
    numberOfInstallments?: true
    repaymentFrequency?: true
    processingFeeType?: true
    processingFeeAmount?: true
    processingFeeRate?: true
    lateFeeType?: true
    lateFeeAmount?: true
    lateFeeRate?: true
    gracePeriodDays?: true
    totalInterest?: true
    totalFees?: true
    totalPayable?: true
    rejectionReason?: true
    approvedAt?: true
    approvedById?: true
    disbursedAt?: true
    disbursedById?: true
    firstPaymentDueAt?: true
    maturityDate?: true
    closedAt?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type LoanCountAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    amount?: true
    purpose?: true
    notes?: true
    status?: true
    interestRate?: true
    interestType?: true
    termValue?: true
    termUnit?: true
    numberOfInstallments?: true
    repaymentFrequency?: true
    processingFeeType?: true
    processingFeeAmount?: true
    processingFeeRate?: true
    lateFeeType?: true
    lateFeeAmount?: true
    lateFeeRate?: true
    gracePeriodDays?: true
    totalInterest?: true
    totalFees?: true
    totalPayable?: true
    rejectionReason?: true
    approvedAt?: true
    approvedById?: true
    disbursedAt?: true
    disbursedById?: true
    firstPaymentDueAt?: true
    maturityDate?: true
    closedAt?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type LoanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Loan to aggregate.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Loans
    **/
    _count?: true | LoanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanMaxAggregateInputType
  }

  export type GetLoanAggregateType<T extends LoanAggregateArgs> = {
        [P in keyof T & keyof AggregateLoan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoan[P]>
      : GetScalarType<T[P], AggregateLoan[P]>
  }




  export type LoanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithAggregationInput | LoanOrderByWithAggregationInput[]
    by: LoanScalarFieldEnum[] | LoanScalarFieldEnum
    having?: LoanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanCountAggregateInputType | true
    _avg?: LoanAvgAggregateInputType
    _sum?: LoanSumAggregateInputType
    _min?: LoanMinAggregateInputType
    _max?: LoanMaxAggregateInputType
  }

  export type LoanGroupByOutputType = {
    id: string
    userId: string
    productId: string
    amount: Decimal
    purpose: string
    notes: string | null
    status: $Enums.LoanStatus
    interestRate: Decimal
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount: Decimal
    processingFeeRate: Decimal
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount: Decimal
    lateFeeRate: Decimal
    gracePeriodDays: number
    totalInterest: Decimal
    totalFees: Decimal
    totalPayable: Decimal
    rejectionReason: string | null
    approvedAt: Date | null
    approvedById: string | null
    disbursedAt: Date | null
    disbursedById: string | null
    firstPaymentDueAt: Date | null
    maturityDate: Date | null
    closedAt: Date | null
    version: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: LoanCountAggregateOutputType | null
    _avg: LoanAvgAggregateOutputType | null
    _sum: LoanSumAggregateOutputType | null
    _min: LoanMinAggregateOutputType | null
    _max: LoanMaxAggregateOutputType | null
  }

  type GetLoanGroupByPayload<T extends LoanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanGroupByOutputType[P]>
            : GetScalarType<T[P], LoanGroupByOutputType[P]>
        }
      >
    >


  export type LoanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    amount?: boolean
    purpose?: boolean
    notes?: boolean
    status?: boolean
    interestRate?: boolean
    interestType?: boolean
    termValue?: boolean
    termUnit?: boolean
    numberOfInstallments?: boolean
    repaymentFrequency?: boolean
    processingFeeType?: boolean
    processingFeeAmount?: boolean
    processingFeeRate?: boolean
    lateFeeType?: boolean
    lateFeeAmount?: boolean
    lateFeeRate?: boolean
    gracePeriodDays?: boolean
    totalInterest?: boolean
    totalFees?: boolean
    totalPayable?: boolean
    rejectionReason?: boolean
    approvedAt?: boolean
    approvedById?: boolean
    disbursedAt?: boolean
    disbursedById?: boolean
    firstPaymentDueAt?: boolean
    maturityDate?: boolean
    closedAt?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | LoanProductDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
    disbursedBy?: boolean | Loan$disbursedByArgs<ExtArgs>
    repayments?: boolean | Loan$repaymentsArgs<ExtArgs>
    transactions?: boolean | Loan$transactionsArgs<ExtArgs>
    feedback?: boolean | Loan$feedbackArgs<ExtArgs>
    _count?: boolean | LoanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    amount?: boolean
    purpose?: boolean
    notes?: boolean
    status?: boolean
    interestRate?: boolean
    interestType?: boolean
    termValue?: boolean
    termUnit?: boolean
    numberOfInstallments?: boolean
    repaymentFrequency?: boolean
    processingFeeType?: boolean
    processingFeeAmount?: boolean
    processingFeeRate?: boolean
    lateFeeType?: boolean
    lateFeeAmount?: boolean
    lateFeeRate?: boolean
    gracePeriodDays?: boolean
    totalInterest?: boolean
    totalFees?: boolean
    totalPayable?: boolean
    rejectionReason?: boolean
    approvedAt?: boolean
    approvedById?: boolean
    disbursedAt?: boolean
    disbursedById?: boolean
    firstPaymentDueAt?: boolean
    maturityDate?: boolean
    closedAt?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | LoanProductDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
    disbursedBy?: boolean | Loan$disbursedByArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    amount?: boolean
    purpose?: boolean
    notes?: boolean
    status?: boolean
    interestRate?: boolean
    interestType?: boolean
    termValue?: boolean
    termUnit?: boolean
    numberOfInstallments?: boolean
    repaymentFrequency?: boolean
    processingFeeType?: boolean
    processingFeeAmount?: boolean
    processingFeeRate?: boolean
    lateFeeType?: boolean
    lateFeeAmount?: boolean
    lateFeeRate?: boolean
    gracePeriodDays?: boolean
    totalInterest?: boolean
    totalFees?: boolean
    totalPayable?: boolean
    rejectionReason?: boolean
    approvedAt?: boolean
    approvedById?: boolean
    disbursedAt?: boolean
    disbursedById?: boolean
    firstPaymentDueAt?: boolean
    maturityDate?: boolean
    closedAt?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | LoanProductDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
    disbursedBy?: boolean | Loan$disbursedByArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectScalar = {
    id?: boolean
    userId?: boolean
    productId?: boolean
    amount?: boolean
    purpose?: boolean
    notes?: boolean
    status?: boolean
    interestRate?: boolean
    interestType?: boolean
    termValue?: boolean
    termUnit?: boolean
    numberOfInstallments?: boolean
    repaymentFrequency?: boolean
    processingFeeType?: boolean
    processingFeeAmount?: boolean
    processingFeeRate?: boolean
    lateFeeType?: boolean
    lateFeeAmount?: boolean
    lateFeeRate?: boolean
    gracePeriodDays?: boolean
    totalInterest?: boolean
    totalFees?: boolean
    totalPayable?: boolean
    rejectionReason?: boolean
    approvedAt?: boolean
    approvedById?: boolean
    disbursedAt?: boolean
    disbursedById?: boolean
    firstPaymentDueAt?: boolean
    maturityDate?: boolean
    closedAt?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type LoanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "productId" | "amount" | "purpose" | "notes" | "status" | "interestRate" | "interestType" | "termValue" | "termUnit" | "numberOfInstallments" | "repaymentFrequency" | "processingFeeType" | "processingFeeAmount" | "processingFeeRate" | "lateFeeType" | "lateFeeAmount" | "lateFeeRate" | "gracePeriodDays" | "totalInterest" | "totalFees" | "totalPayable" | "rejectionReason" | "approvedAt" | "approvedById" | "disbursedAt" | "disbursedById" | "firstPaymentDueAt" | "maturityDate" | "closedAt" | "version" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["loan"]>
  export type LoanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | LoanProductDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
    disbursedBy?: boolean | Loan$disbursedByArgs<ExtArgs>
    repayments?: boolean | Loan$repaymentsArgs<ExtArgs>
    transactions?: boolean | Loan$transactionsArgs<ExtArgs>
    feedback?: boolean | Loan$feedbackArgs<ExtArgs>
    _count?: boolean | LoanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | LoanProductDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
    disbursedBy?: boolean | Loan$disbursedByArgs<ExtArgs>
  }
  export type LoanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | LoanProductDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
    disbursedBy?: boolean | Loan$disbursedByArgs<ExtArgs>
  }

  export type $LoanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Loan"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      product: Prisma.$LoanProductPayload<ExtArgs>
      approvedBy: Prisma.$UserPayload<ExtArgs> | null
      disbursedBy: Prisma.$UserPayload<ExtArgs> | null
      repayments: Prisma.$RepaymentSchedulePayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      feedback: Prisma.$FeedbackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      productId: string
      amount: Prisma.Decimal
      purpose: string
      notes: string | null
      status: $Enums.LoanStatus
      interestRate: Prisma.Decimal
      interestType: $Enums.InterestType
      termValue: number
      termUnit: $Enums.TermUnit
      numberOfInstallments: number
      repaymentFrequency: $Enums.RepaymentFrequency
      processingFeeType: $Enums.FeeType
      processingFeeAmount: Prisma.Decimal
      processingFeeRate: Prisma.Decimal
      lateFeeType: $Enums.LateFeeType
      lateFeeAmount: Prisma.Decimal
      lateFeeRate: Prisma.Decimal
      gracePeriodDays: number
      totalInterest: Prisma.Decimal
      totalFees: Prisma.Decimal
      totalPayable: Prisma.Decimal
      rejectionReason: string | null
      approvedAt: Date | null
      approvedById: string | null
      disbursedAt: Date | null
      disbursedById: string | null
      firstPaymentDueAt: Date | null
      maturityDate: Date | null
      closedAt: Date | null
      version: number
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["loan"]>
    composites: {}
  }

  type LoanGetPayload<S extends boolean | null | undefined | LoanDefaultArgs> = $Result.GetResult<Prisma.$LoanPayload, S>

  type LoanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoanCountAggregateInputType | true
    }

  export interface LoanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Loan'], meta: { name: 'Loan' } }
    /**
     * Find zero or one Loan that matches the filter.
     * @param {LoanFindUniqueArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanFindUniqueArgs>(args: SelectSubset<T, LoanFindUniqueArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Loan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanFindUniqueOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Loan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanFindFirstArgs>(args?: SelectSubset<T, LoanFindFirstArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Loan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Loans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Loans
     * const loans = await prisma.loan.findMany()
     * 
     * // Get first 10 Loans
     * const loans = await prisma.loan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanWithIdOnly = await prisma.loan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanFindManyArgs>(args?: SelectSubset<T, LoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Loan.
     * @param {LoanCreateArgs} args - Arguments to create a Loan.
     * @example
     * // Create one Loan
     * const Loan = await prisma.loan.create({
     *   data: {
     *     // ... data to create a Loan
     *   }
     * })
     * 
     */
    create<T extends LoanCreateArgs>(args: SelectSubset<T, LoanCreateArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Loans.
     * @param {LoanCreateManyArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanCreateManyArgs>(args?: SelectSubset<T, LoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Loans and returns the data saved in the database.
     * @param {LoanCreateManyAndReturnArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoanCreateManyAndReturnArgs>(args?: SelectSubset<T, LoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Loan.
     * @param {LoanDeleteArgs} args - Arguments to delete one Loan.
     * @example
     * // Delete one Loan
     * const Loan = await prisma.loan.delete({
     *   where: {
     *     // ... filter to delete one Loan
     *   }
     * })
     * 
     */
    delete<T extends LoanDeleteArgs>(args: SelectSubset<T, LoanDeleteArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Loan.
     * @param {LoanUpdateArgs} args - Arguments to update one Loan.
     * @example
     * // Update one Loan
     * const loan = await prisma.loan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanUpdateArgs>(args: SelectSubset<T, LoanUpdateArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Loans.
     * @param {LoanDeleteManyArgs} args - Arguments to filter Loans to delete.
     * @example
     * // Delete a few Loans
     * const { count } = await prisma.loan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanDeleteManyArgs>(args?: SelectSubset<T, LoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanUpdateManyArgs>(args: SelectSubset<T, LoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loans and returns the data updated in the database.
     * @param {LoanUpdateManyAndReturnArgs} args - Arguments to update many Loans.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoanUpdateManyAndReturnArgs>(args: SelectSubset<T, LoanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Loan.
     * @param {LoanUpsertArgs} args - Arguments to update or create a Loan.
     * @example
     * // Update or create a Loan
     * const loan = await prisma.loan.upsert({
     *   create: {
     *     // ... data to create a Loan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Loan we want to update
     *   }
     * })
     */
    upsert<T extends LoanUpsertArgs>(args: SelectSubset<T, LoanUpsertArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanCountArgs} args - Arguments to filter Loans to count.
     * @example
     * // Count the number of Loans
     * const count = await prisma.loan.count({
     *   where: {
     *     // ... the filter for the Loans we want to count
     *   }
     * })
    **/
    count<T extends LoanCountArgs>(
      args?: Subset<T, LoanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanAggregateArgs>(args: Subset<T, LoanAggregateArgs>): Prisma.PrismaPromise<GetLoanAggregateType<T>>

    /**
     * Group by Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanGroupByArgs['orderBy'] }
        : { orderBy?: LoanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Loan model
   */
  readonly fields: LoanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Loan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends LoanProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanProductDefaultArgs<ExtArgs>>): Prisma__LoanProductClient<$Result.GetResult<Prisma.$LoanProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approvedBy<T extends Loan$approvedByArgs<ExtArgs> = {}>(args?: Subset<T, Loan$approvedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    disbursedBy<T extends Loan$disbursedByArgs<ExtArgs> = {}>(args?: Subset<T, Loan$disbursedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    repayments<T extends Loan$repaymentsArgs<ExtArgs> = {}>(args?: Subset<T, Loan$repaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends Loan$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Loan$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedback<T extends Loan$feedbackArgs<ExtArgs> = {}>(args?: Subset<T, Loan$feedbackArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Loan model
   */
  interface LoanFieldRefs {
    readonly id: FieldRef<"Loan", 'String'>
    readonly userId: FieldRef<"Loan", 'String'>
    readonly productId: FieldRef<"Loan", 'String'>
    readonly amount: FieldRef<"Loan", 'Decimal'>
    readonly purpose: FieldRef<"Loan", 'String'>
    readonly notes: FieldRef<"Loan", 'String'>
    readonly status: FieldRef<"Loan", 'LoanStatus'>
    readonly interestRate: FieldRef<"Loan", 'Decimal'>
    readonly interestType: FieldRef<"Loan", 'InterestType'>
    readonly termValue: FieldRef<"Loan", 'Int'>
    readonly termUnit: FieldRef<"Loan", 'TermUnit'>
    readonly numberOfInstallments: FieldRef<"Loan", 'Int'>
    readonly repaymentFrequency: FieldRef<"Loan", 'RepaymentFrequency'>
    readonly processingFeeType: FieldRef<"Loan", 'FeeType'>
    readonly processingFeeAmount: FieldRef<"Loan", 'Decimal'>
    readonly processingFeeRate: FieldRef<"Loan", 'Decimal'>
    readonly lateFeeType: FieldRef<"Loan", 'LateFeeType'>
    readonly lateFeeAmount: FieldRef<"Loan", 'Decimal'>
    readonly lateFeeRate: FieldRef<"Loan", 'Decimal'>
    readonly gracePeriodDays: FieldRef<"Loan", 'Int'>
    readonly totalInterest: FieldRef<"Loan", 'Decimal'>
    readonly totalFees: FieldRef<"Loan", 'Decimal'>
    readonly totalPayable: FieldRef<"Loan", 'Decimal'>
    readonly rejectionReason: FieldRef<"Loan", 'String'>
    readonly approvedAt: FieldRef<"Loan", 'DateTime'>
    readonly approvedById: FieldRef<"Loan", 'String'>
    readonly disbursedAt: FieldRef<"Loan", 'DateTime'>
    readonly disbursedById: FieldRef<"Loan", 'String'>
    readonly firstPaymentDueAt: FieldRef<"Loan", 'DateTime'>
    readonly maturityDate: FieldRef<"Loan", 'DateTime'>
    readonly closedAt: FieldRef<"Loan", 'DateTime'>
    readonly version: FieldRef<"Loan", 'Int'>
    readonly createdAt: FieldRef<"Loan", 'DateTime'>
    readonly updatedAt: FieldRef<"Loan", 'DateTime'>
    readonly deletedAt: FieldRef<"Loan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Loan findUnique
   */
  export type LoanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan findUniqueOrThrow
   */
  export type LoanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan findFirst
   */
  export type LoanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan findFirstOrThrow
   */
  export type LoanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan findMany
   */
  export type LoanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loans to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan create
   */
  export type LoanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The data needed to create a Loan.
     */
    data: XOR<LoanCreateInput, LoanUncheckedCreateInput>
  }

  /**
   * Loan createMany
   */
  export type LoanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Loans.
     */
    data: LoanCreateManyInput | LoanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Loan createManyAndReturn
   */
  export type LoanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * The data used to create many Loans.
     */
    data: LoanCreateManyInput | LoanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Loan update
   */
  export type LoanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The data needed to update a Loan.
     */
    data: XOR<LoanUpdateInput, LoanUncheckedUpdateInput>
    /**
     * Choose, which Loan to update.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan updateMany
   */
  export type LoanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Loans.
     */
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyInput>
    /**
     * Filter which Loans to update
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to update.
     */
    limit?: number
  }

  /**
   * Loan updateManyAndReturn
   */
  export type LoanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * The data used to update Loans.
     */
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyInput>
    /**
     * Filter which Loans to update
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Loan upsert
   */
  export type LoanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The filter to search for the Loan to update in case it exists.
     */
    where: LoanWhereUniqueInput
    /**
     * In case the Loan found by the `where` argument doesn't exist, create a new Loan with this data.
     */
    create: XOR<LoanCreateInput, LoanUncheckedCreateInput>
    /**
     * In case the Loan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanUpdateInput, LoanUncheckedUpdateInput>
  }

  /**
   * Loan delete
   */
  export type LoanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter which Loan to delete.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan deleteMany
   */
  export type LoanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Loans to delete
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to delete.
     */
    limit?: number
  }

  /**
   * Loan.approvedBy
   */
  export type Loan$approvedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Loan.disbursedBy
   */
  export type Loan$disbursedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Loan.repayments
   */
  export type Loan$repaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
    where?: RepaymentScheduleWhereInput
    orderBy?: RepaymentScheduleOrderByWithRelationInput | RepaymentScheduleOrderByWithRelationInput[]
    cursor?: RepaymentScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepaymentScheduleScalarFieldEnum | RepaymentScheduleScalarFieldEnum[]
  }

  /**
   * Loan.transactions
   */
  export type Loan$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Loan.feedback
   */
  export type Loan$feedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Loan without action
   */
  export type LoanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
  }


  /**
   * Model RepaymentSchedule
   */

  export type AggregateRepaymentSchedule = {
    _count: RepaymentScheduleCountAggregateOutputType | null
    _avg: RepaymentScheduleAvgAggregateOutputType | null
    _sum: RepaymentScheduleSumAggregateOutputType | null
    _min: RepaymentScheduleMinAggregateOutputType | null
    _max: RepaymentScheduleMaxAggregateOutputType | null
  }

  export type RepaymentScheduleAvgAggregateOutputType = {
    installmentNumber: number | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
    baseAmountDue: Decimal | null
    amountDue: Decimal | null
    amountPaid: Decimal | null
    principalPaid: Decimal | null
    interestPaid: Decimal | null
    feePaid: Decimal | null
    penaltyPaid: Decimal | null
    remainingBalance: Decimal | null
  }

  export type RepaymentScheduleSumAggregateOutputType = {
    installmentNumber: number | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
    baseAmountDue: Decimal | null
    amountDue: Decimal | null
    amountPaid: Decimal | null
    principalPaid: Decimal | null
    interestPaid: Decimal | null
    feePaid: Decimal | null
    penaltyPaid: Decimal | null
    remainingBalance: Decimal | null
  }

  export type RepaymentScheduleMinAggregateOutputType = {
    id: string | null
    loanId: string | null
    installmentNumber: number | null
    dueDate: Date | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
    baseAmountDue: Decimal | null
    amountDue: Decimal | null
    amountPaid: Decimal | null
    principalPaid: Decimal | null
    interestPaid: Decimal | null
    feePaid: Decimal | null
    penaltyPaid: Decimal | null
    remainingBalance: Decimal | null
    status: $Enums.InstallmentStatus | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RepaymentScheduleMaxAggregateOutputType = {
    id: string | null
    loanId: string | null
    installmentNumber: number | null
    dueDate: Date | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
    baseAmountDue: Decimal | null
    amountDue: Decimal | null
    amountPaid: Decimal | null
    principalPaid: Decimal | null
    interestPaid: Decimal | null
    feePaid: Decimal | null
    penaltyPaid: Decimal | null
    remainingBalance: Decimal | null
    status: $Enums.InstallmentStatus | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RepaymentScheduleCountAggregateOutputType = {
    id: number
    loanId: number
    installmentNumber: number
    dueDate: number
    principalAmount: number
    interestAmount: number
    feeAmount: number
    penaltyAmount: number
    baseAmountDue: number
    amountDue: number
    amountPaid: number
    principalPaid: number
    interestPaid: number
    feePaid: number
    penaltyPaid: number
    remainingBalance: number
    status: number
    paidAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RepaymentScheduleAvgAggregateInputType = {
    installmentNumber?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    baseAmountDue?: true
    amountDue?: true
    amountPaid?: true
    principalPaid?: true
    interestPaid?: true
    feePaid?: true
    penaltyPaid?: true
    remainingBalance?: true
  }

  export type RepaymentScheduleSumAggregateInputType = {
    installmentNumber?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    baseAmountDue?: true
    amountDue?: true
    amountPaid?: true
    principalPaid?: true
    interestPaid?: true
    feePaid?: true
    penaltyPaid?: true
    remainingBalance?: true
  }

  export type RepaymentScheduleMinAggregateInputType = {
    id?: true
    loanId?: true
    installmentNumber?: true
    dueDate?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    baseAmountDue?: true
    amountDue?: true
    amountPaid?: true
    principalPaid?: true
    interestPaid?: true
    feePaid?: true
    penaltyPaid?: true
    remainingBalance?: true
    status?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RepaymentScheduleMaxAggregateInputType = {
    id?: true
    loanId?: true
    installmentNumber?: true
    dueDate?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    baseAmountDue?: true
    amountDue?: true
    amountPaid?: true
    principalPaid?: true
    interestPaid?: true
    feePaid?: true
    penaltyPaid?: true
    remainingBalance?: true
    status?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RepaymentScheduleCountAggregateInputType = {
    id?: true
    loanId?: true
    installmentNumber?: true
    dueDate?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    baseAmountDue?: true
    amountDue?: true
    amountPaid?: true
    principalPaid?: true
    interestPaid?: true
    feePaid?: true
    penaltyPaid?: true
    remainingBalance?: true
    status?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RepaymentScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepaymentSchedule to aggregate.
     */
    where?: RepaymentScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepaymentSchedules to fetch.
     */
    orderBy?: RepaymentScheduleOrderByWithRelationInput | RepaymentScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepaymentScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepaymentSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepaymentSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RepaymentSchedules
    **/
    _count?: true | RepaymentScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepaymentScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepaymentScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepaymentScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepaymentScheduleMaxAggregateInputType
  }

  export type GetRepaymentScheduleAggregateType<T extends RepaymentScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateRepaymentSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepaymentSchedule[P]>
      : GetScalarType<T[P], AggregateRepaymentSchedule[P]>
  }




  export type RepaymentScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepaymentScheduleWhereInput
    orderBy?: RepaymentScheduleOrderByWithAggregationInput | RepaymentScheduleOrderByWithAggregationInput[]
    by: RepaymentScheduleScalarFieldEnum[] | RepaymentScheduleScalarFieldEnum
    having?: RepaymentScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepaymentScheduleCountAggregateInputType | true
    _avg?: RepaymentScheduleAvgAggregateInputType
    _sum?: RepaymentScheduleSumAggregateInputType
    _min?: RepaymentScheduleMinAggregateInputType
    _max?: RepaymentScheduleMaxAggregateInputType
  }

  export type RepaymentScheduleGroupByOutputType = {
    id: string
    loanId: string
    installmentNumber: number
    dueDate: Date
    principalAmount: Decimal
    interestAmount: Decimal
    feeAmount: Decimal
    penaltyAmount: Decimal
    baseAmountDue: Decimal
    amountDue: Decimal
    amountPaid: Decimal
    principalPaid: Decimal
    interestPaid: Decimal
    feePaid: Decimal
    penaltyPaid: Decimal
    remainingBalance: Decimal
    status: $Enums.InstallmentStatus
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: RepaymentScheduleCountAggregateOutputType | null
    _avg: RepaymentScheduleAvgAggregateOutputType | null
    _sum: RepaymentScheduleSumAggregateOutputType | null
    _min: RepaymentScheduleMinAggregateOutputType | null
    _max: RepaymentScheduleMaxAggregateOutputType | null
  }

  type GetRepaymentScheduleGroupByPayload<T extends RepaymentScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepaymentScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepaymentScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepaymentScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], RepaymentScheduleGroupByOutputType[P]>
        }
      >
    >


  export type RepaymentScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    installmentNumber?: boolean
    dueDate?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    baseAmountDue?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    principalPaid?: boolean
    interestPaid?: boolean
    feePaid?: boolean
    penaltyPaid?: boolean
    remainingBalance?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    allocations?: boolean | RepaymentSchedule$allocationsArgs<ExtArgs>
    _count?: boolean | RepaymentScheduleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repaymentSchedule"]>

  export type RepaymentScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    installmentNumber?: boolean
    dueDate?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    baseAmountDue?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    principalPaid?: boolean
    interestPaid?: boolean
    feePaid?: boolean
    penaltyPaid?: boolean
    remainingBalance?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repaymentSchedule"]>

  export type RepaymentScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    installmentNumber?: boolean
    dueDate?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    baseAmountDue?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    principalPaid?: boolean
    interestPaid?: boolean
    feePaid?: boolean
    penaltyPaid?: boolean
    remainingBalance?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repaymentSchedule"]>

  export type RepaymentScheduleSelectScalar = {
    id?: boolean
    loanId?: boolean
    installmentNumber?: boolean
    dueDate?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    baseAmountDue?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    principalPaid?: boolean
    interestPaid?: boolean
    feePaid?: boolean
    penaltyPaid?: boolean
    remainingBalance?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RepaymentScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loanId" | "installmentNumber" | "dueDate" | "principalAmount" | "interestAmount" | "feeAmount" | "penaltyAmount" | "baseAmountDue" | "amountDue" | "amountPaid" | "principalPaid" | "interestPaid" | "feePaid" | "penaltyPaid" | "remainingBalance" | "status" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["repaymentSchedule"]>
  export type RepaymentScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    allocations?: boolean | RepaymentSchedule$allocationsArgs<ExtArgs>
    _count?: boolean | RepaymentScheduleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RepaymentScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }
  export type RepaymentScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }

  export type $RepaymentSchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RepaymentSchedule"
    objects: {
      loan: Prisma.$LoanPayload<ExtArgs>
      allocations: Prisma.$PaymentAllocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanId: string
      installmentNumber: number
      dueDate: Date
      principalAmount: Prisma.Decimal
      interestAmount: Prisma.Decimal
      feeAmount: Prisma.Decimal
      penaltyAmount: Prisma.Decimal
      baseAmountDue: Prisma.Decimal
      amountDue: Prisma.Decimal
      amountPaid: Prisma.Decimal
      principalPaid: Prisma.Decimal
      interestPaid: Prisma.Decimal
      feePaid: Prisma.Decimal
      penaltyPaid: Prisma.Decimal
      remainingBalance: Prisma.Decimal
      status: $Enums.InstallmentStatus
      paidAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["repaymentSchedule"]>
    composites: {}
  }

  type RepaymentScheduleGetPayload<S extends boolean | null | undefined | RepaymentScheduleDefaultArgs> = $Result.GetResult<Prisma.$RepaymentSchedulePayload, S>

  type RepaymentScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepaymentScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepaymentScheduleCountAggregateInputType | true
    }

  export interface RepaymentScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RepaymentSchedule'], meta: { name: 'RepaymentSchedule' } }
    /**
     * Find zero or one RepaymentSchedule that matches the filter.
     * @param {RepaymentScheduleFindUniqueArgs} args - Arguments to find a RepaymentSchedule
     * @example
     * // Get one RepaymentSchedule
     * const repaymentSchedule = await prisma.repaymentSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepaymentScheduleFindUniqueArgs>(args: SelectSubset<T, RepaymentScheduleFindUniqueArgs<ExtArgs>>): Prisma__RepaymentScheduleClient<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RepaymentSchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepaymentScheduleFindUniqueOrThrowArgs} args - Arguments to find a RepaymentSchedule
     * @example
     * // Get one RepaymentSchedule
     * const repaymentSchedule = await prisma.repaymentSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepaymentScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, RepaymentScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepaymentScheduleClient<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepaymentSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepaymentScheduleFindFirstArgs} args - Arguments to find a RepaymentSchedule
     * @example
     * // Get one RepaymentSchedule
     * const repaymentSchedule = await prisma.repaymentSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepaymentScheduleFindFirstArgs>(args?: SelectSubset<T, RepaymentScheduleFindFirstArgs<ExtArgs>>): Prisma__RepaymentScheduleClient<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepaymentSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepaymentScheduleFindFirstOrThrowArgs} args - Arguments to find a RepaymentSchedule
     * @example
     * // Get one RepaymentSchedule
     * const repaymentSchedule = await prisma.repaymentSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepaymentScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, RepaymentScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepaymentScheduleClient<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RepaymentSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepaymentScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepaymentSchedules
     * const repaymentSchedules = await prisma.repaymentSchedule.findMany()
     * 
     * // Get first 10 RepaymentSchedules
     * const repaymentSchedules = await prisma.repaymentSchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repaymentScheduleWithIdOnly = await prisma.repaymentSchedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepaymentScheduleFindManyArgs>(args?: SelectSubset<T, RepaymentScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RepaymentSchedule.
     * @param {RepaymentScheduleCreateArgs} args - Arguments to create a RepaymentSchedule.
     * @example
     * // Create one RepaymentSchedule
     * const RepaymentSchedule = await prisma.repaymentSchedule.create({
     *   data: {
     *     // ... data to create a RepaymentSchedule
     *   }
     * })
     * 
     */
    create<T extends RepaymentScheduleCreateArgs>(args: SelectSubset<T, RepaymentScheduleCreateArgs<ExtArgs>>): Prisma__RepaymentScheduleClient<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RepaymentSchedules.
     * @param {RepaymentScheduleCreateManyArgs} args - Arguments to create many RepaymentSchedules.
     * @example
     * // Create many RepaymentSchedules
     * const repaymentSchedule = await prisma.repaymentSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepaymentScheduleCreateManyArgs>(args?: SelectSubset<T, RepaymentScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RepaymentSchedules and returns the data saved in the database.
     * @param {RepaymentScheduleCreateManyAndReturnArgs} args - Arguments to create many RepaymentSchedules.
     * @example
     * // Create many RepaymentSchedules
     * const repaymentSchedule = await prisma.repaymentSchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RepaymentSchedules and only return the `id`
     * const repaymentScheduleWithIdOnly = await prisma.repaymentSchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepaymentScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, RepaymentScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RepaymentSchedule.
     * @param {RepaymentScheduleDeleteArgs} args - Arguments to delete one RepaymentSchedule.
     * @example
     * // Delete one RepaymentSchedule
     * const RepaymentSchedule = await prisma.repaymentSchedule.delete({
     *   where: {
     *     // ... filter to delete one RepaymentSchedule
     *   }
     * })
     * 
     */
    delete<T extends RepaymentScheduleDeleteArgs>(args: SelectSubset<T, RepaymentScheduleDeleteArgs<ExtArgs>>): Prisma__RepaymentScheduleClient<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RepaymentSchedule.
     * @param {RepaymentScheduleUpdateArgs} args - Arguments to update one RepaymentSchedule.
     * @example
     * // Update one RepaymentSchedule
     * const repaymentSchedule = await prisma.repaymentSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepaymentScheduleUpdateArgs>(args: SelectSubset<T, RepaymentScheduleUpdateArgs<ExtArgs>>): Prisma__RepaymentScheduleClient<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RepaymentSchedules.
     * @param {RepaymentScheduleDeleteManyArgs} args - Arguments to filter RepaymentSchedules to delete.
     * @example
     * // Delete a few RepaymentSchedules
     * const { count } = await prisma.repaymentSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepaymentScheduleDeleteManyArgs>(args?: SelectSubset<T, RepaymentScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepaymentSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepaymentScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepaymentSchedules
     * const repaymentSchedule = await prisma.repaymentSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepaymentScheduleUpdateManyArgs>(args: SelectSubset<T, RepaymentScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepaymentSchedules and returns the data updated in the database.
     * @param {RepaymentScheduleUpdateManyAndReturnArgs} args - Arguments to update many RepaymentSchedules.
     * @example
     * // Update many RepaymentSchedules
     * const repaymentSchedule = await prisma.repaymentSchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RepaymentSchedules and only return the `id`
     * const repaymentScheduleWithIdOnly = await prisma.repaymentSchedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RepaymentScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, RepaymentScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RepaymentSchedule.
     * @param {RepaymentScheduleUpsertArgs} args - Arguments to update or create a RepaymentSchedule.
     * @example
     * // Update or create a RepaymentSchedule
     * const repaymentSchedule = await prisma.repaymentSchedule.upsert({
     *   create: {
     *     // ... data to create a RepaymentSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepaymentSchedule we want to update
     *   }
     * })
     */
    upsert<T extends RepaymentScheduleUpsertArgs>(args: SelectSubset<T, RepaymentScheduleUpsertArgs<ExtArgs>>): Prisma__RepaymentScheduleClient<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RepaymentSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepaymentScheduleCountArgs} args - Arguments to filter RepaymentSchedules to count.
     * @example
     * // Count the number of RepaymentSchedules
     * const count = await prisma.repaymentSchedule.count({
     *   where: {
     *     // ... the filter for the RepaymentSchedules we want to count
     *   }
     * })
    **/
    count<T extends RepaymentScheduleCountArgs>(
      args?: Subset<T, RepaymentScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepaymentScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RepaymentSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepaymentScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepaymentScheduleAggregateArgs>(args: Subset<T, RepaymentScheduleAggregateArgs>): Prisma.PrismaPromise<GetRepaymentScheduleAggregateType<T>>

    /**
     * Group by RepaymentSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepaymentScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepaymentScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepaymentScheduleGroupByArgs['orderBy'] }
        : { orderBy?: RepaymentScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepaymentScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepaymentScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RepaymentSchedule model
   */
  readonly fields: RepaymentScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RepaymentSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepaymentScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loan<T extends LoanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanDefaultArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    allocations<T extends RepaymentSchedule$allocationsArgs<ExtArgs> = {}>(args?: Subset<T, RepaymentSchedule$allocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RepaymentSchedule model
   */
  interface RepaymentScheduleFieldRefs {
    readonly id: FieldRef<"RepaymentSchedule", 'String'>
    readonly loanId: FieldRef<"RepaymentSchedule", 'String'>
    readonly installmentNumber: FieldRef<"RepaymentSchedule", 'Int'>
    readonly dueDate: FieldRef<"RepaymentSchedule", 'DateTime'>
    readonly principalAmount: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly interestAmount: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly feeAmount: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly penaltyAmount: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly baseAmountDue: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly amountDue: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly amountPaid: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly principalPaid: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly interestPaid: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly feePaid: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly penaltyPaid: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly remainingBalance: FieldRef<"RepaymentSchedule", 'Decimal'>
    readonly status: FieldRef<"RepaymentSchedule", 'InstallmentStatus'>
    readonly paidAt: FieldRef<"RepaymentSchedule", 'DateTime'>
    readonly createdAt: FieldRef<"RepaymentSchedule", 'DateTime'>
    readonly updatedAt: FieldRef<"RepaymentSchedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RepaymentSchedule findUnique
   */
  export type RepaymentScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
    /**
     * Filter, which RepaymentSchedule to fetch.
     */
    where: RepaymentScheduleWhereUniqueInput
  }

  /**
   * RepaymentSchedule findUniqueOrThrow
   */
  export type RepaymentScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
    /**
     * Filter, which RepaymentSchedule to fetch.
     */
    where: RepaymentScheduleWhereUniqueInput
  }

  /**
   * RepaymentSchedule findFirst
   */
  export type RepaymentScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
    /**
     * Filter, which RepaymentSchedule to fetch.
     */
    where?: RepaymentScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepaymentSchedules to fetch.
     */
    orderBy?: RepaymentScheduleOrderByWithRelationInput | RepaymentScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepaymentSchedules.
     */
    cursor?: RepaymentScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepaymentSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepaymentSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepaymentSchedules.
     */
    distinct?: RepaymentScheduleScalarFieldEnum | RepaymentScheduleScalarFieldEnum[]
  }

  /**
   * RepaymentSchedule findFirstOrThrow
   */
  export type RepaymentScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
    /**
     * Filter, which RepaymentSchedule to fetch.
     */
    where?: RepaymentScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepaymentSchedules to fetch.
     */
    orderBy?: RepaymentScheduleOrderByWithRelationInput | RepaymentScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepaymentSchedules.
     */
    cursor?: RepaymentScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepaymentSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepaymentSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepaymentSchedules.
     */
    distinct?: RepaymentScheduleScalarFieldEnum | RepaymentScheduleScalarFieldEnum[]
  }

  /**
   * RepaymentSchedule findMany
   */
  export type RepaymentScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
    /**
     * Filter, which RepaymentSchedules to fetch.
     */
    where?: RepaymentScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepaymentSchedules to fetch.
     */
    orderBy?: RepaymentScheduleOrderByWithRelationInput | RepaymentScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RepaymentSchedules.
     */
    cursor?: RepaymentScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepaymentSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepaymentSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepaymentSchedules.
     */
    distinct?: RepaymentScheduleScalarFieldEnum | RepaymentScheduleScalarFieldEnum[]
  }

  /**
   * RepaymentSchedule create
   */
  export type RepaymentScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a RepaymentSchedule.
     */
    data: XOR<RepaymentScheduleCreateInput, RepaymentScheduleUncheckedCreateInput>
  }

  /**
   * RepaymentSchedule createMany
   */
  export type RepaymentScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RepaymentSchedules.
     */
    data: RepaymentScheduleCreateManyInput | RepaymentScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RepaymentSchedule createManyAndReturn
   */
  export type RepaymentScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many RepaymentSchedules.
     */
    data: RepaymentScheduleCreateManyInput | RepaymentScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepaymentSchedule update
   */
  export type RepaymentScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a RepaymentSchedule.
     */
    data: XOR<RepaymentScheduleUpdateInput, RepaymentScheduleUncheckedUpdateInput>
    /**
     * Choose, which RepaymentSchedule to update.
     */
    where: RepaymentScheduleWhereUniqueInput
  }

  /**
   * RepaymentSchedule updateMany
   */
  export type RepaymentScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RepaymentSchedules.
     */
    data: XOR<RepaymentScheduleUpdateManyMutationInput, RepaymentScheduleUncheckedUpdateManyInput>
    /**
     * Filter which RepaymentSchedules to update
     */
    where?: RepaymentScheduleWhereInput
    /**
     * Limit how many RepaymentSchedules to update.
     */
    limit?: number
  }

  /**
   * RepaymentSchedule updateManyAndReturn
   */
  export type RepaymentScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * The data used to update RepaymentSchedules.
     */
    data: XOR<RepaymentScheduleUpdateManyMutationInput, RepaymentScheduleUncheckedUpdateManyInput>
    /**
     * Filter which RepaymentSchedules to update
     */
    where?: RepaymentScheduleWhereInput
    /**
     * Limit how many RepaymentSchedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepaymentSchedule upsert
   */
  export type RepaymentScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the RepaymentSchedule to update in case it exists.
     */
    where: RepaymentScheduleWhereUniqueInput
    /**
     * In case the RepaymentSchedule found by the `where` argument doesn't exist, create a new RepaymentSchedule with this data.
     */
    create: XOR<RepaymentScheduleCreateInput, RepaymentScheduleUncheckedCreateInput>
    /**
     * In case the RepaymentSchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepaymentScheduleUpdateInput, RepaymentScheduleUncheckedUpdateInput>
  }

  /**
   * RepaymentSchedule delete
   */
  export type RepaymentScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
    /**
     * Filter which RepaymentSchedule to delete.
     */
    where: RepaymentScheduleWhereUniqueInput
  }

  /**
   * RepaymentSchedule deleteMany
   */
  export type RepaymentScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepaymentSchedules to delete
     */
    where?: RepaymentScheduleWhereInput
    /**
     * Limit how many RepaymentSchedules to delete.
     */
    limit?: number
  }

  /**
   * RepaymentSchedule.allocations
   */
  export type RepaymentSchedule$allocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    where?: PaymentAllocationWhereInput
    orderBy?: PaymentAllocationOrderByWithRelationInput | PaymentAllocationOrderByWithRelationInput[]
    cursor?: PaymentAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentAllocationScalarFieldEnum | PaymentAllocationScalarFieldEnum[]
  }

  /**
   * RepaymentSchedule without action
   */
  export type RepaymentScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepaymentSchedule
     */
    select?: RepaymentScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepaymentSchedule
     */
    omit?: RepaymentScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepaymentScheduleInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    loanId: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    reference: string | null
    providerRef: string | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
    idempotencyKey: string | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    loanId: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    reference: string | null
    providerRef: string | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
    idempotencyKey: string | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    loanId: number
    type: number
    amount: number
    reference: number
    providerRef: number
    principalAmount: number
    interestAmount: number
    feeAmount: number
    penaltyAmount: number
    idempotencyKey: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    loanId?: true
    type?: true
    amount?: true
    reference?: true
    providerRef?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    idempotencyKey?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    loanId?: true
    type?: true
    amount?: true
    reference?: true
    providerRef?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    idempotencyKey?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    loanId?: true
    type?: true
    amount?: true
    reference?: true
    providerRef?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    idempotencyKey?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    loanId: string
    type: $Enums.TransactionType
    amount: Decimal
    reference: string
    providerRef: string | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
    idempotencyKey: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    type?: boolean
    amount?: boolean
    reference?: boolean
    providerRef?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    allocations?: boolean | Transaction$allocationsArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    type?: boolean
    amount?: boolean
    reference?: boolean
    providerRef?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    type?: boolean
    amount?: boolean
    reference?: boolean
    providerRef?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    loanId?: boolean
    type?: boolean
    amount?: boolean
    reference?: boolean
    providerRef?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loanId" | "type" | "amount" | "reference" | "providerRef" | "principalAmount" | "interestAmount" | "feeAmount" | "penaltyAmount" | "idempotencyKey" | "metadata" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    allocations?: boolean | Transaction$allocationsArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      loan: Prisma.$LoanPayload<ExtArgs>
      allocations: Prisma.$PaymentAllocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanId: string
      type: $Enums.TransactionType
      amount: Prisma.Decimal
      reference: string
      providerRef: string | null
      principalAmount: Prisma.Decimal | null
      interestAmount: Prisma.Decimal | null
      feeAmount: Prisma.Decimal | null
      penaltyAmount: Prisma.Decimal | null
      idempotencyKey: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loan<T extends LoanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanDefaultArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    allocations<T extends Transaction$allocationsArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$allocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly loanId: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly amount: FieldRef<"Transaction", 'Decimal'>
    readonly reference: FieldRef<"Transaction", 'String'>
    readonly providerRef: FieldRef<"Transaction", 'String'>
    readonly principalAmount: FieldRef<"Transaction", 'Decimal'>
    readonly interestAmount: FieldRef<"Transaction", 'Decimal'>
    readonly feeAmount: FieldRef<"Transaction", 'Decimal'>
    readonly penaltyAmount: FieldRef<"Transaction", 'Decimal'>
    readonly idempotencyKey: FieldRef<"Transaction", 'String'>
    readonly metadata: FieldRef<"Transaction", 'Json'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.allocations
   */
  export type Transaction$allocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    where?: PaymentAllocationWhereInput
    orderBy?: PaymentAllocationOrderByWithRelationInput | PaymentAllocationOrderByWithRelationInput[]
    cursor?: PaymentAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentAllocationScalarFieldEnum | PaymentAllocationScalarFieldEnum[]
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model PaymentAllocation
   */

  export type AggregatePaymentAllocation = {
    _count: PaymentAllocationCountAggregateOutputType | null
    _avg: PaymentAllocationAvgAggregateOutputType | null
    _sum: PaymentAllocationSumAggregateOutputType | null
    _min: PaymentAllocationMinAggregateOutputType | null
    _max: PaymentAllocationMaxAggregateOutputType | null
  }

  export type PaymentAllocationAvgAggregateOutputType = {
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
  }

  export type PaymentAllocationSumAggregateOutputType = {
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
  }

  export type PaymentAllocationMinAggregateOutputType = {
    id: string | null
    transactionId: string | null
    scheduleId: string | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
    createdAt: Date | null
  }

  export type PaymentAllocationMaxAggregateOutputType = {
    id: string | null
    transactionId: string | null
    scheduleId: string | null
    principalAmount: Decimal | null
    interestAmount: Decimal | null
    feeAmount: Decimal | null
    penaltyAmount: Decimal | null
    createdAt: Date | null
  }

  export type PaymentAllocationCountAggregateOutputType = {
    id: number
    transactionId: number
    scheduleId: number
    principalAmount: number
    interestAmount: number
    feeAmount: number
    penaltyAmount: number
    createdAt: number
    _all: number
  }


  export type PaymentAllocationAvgAggregateInputType = {
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
  }

  export type PaymentAllocationSumAggregateInputType = {
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
  }

  export type PaymentAllocationMinAggregateInputType = {
    id?: true
    transactionId?: true
    scheduleId?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    createdAt?: true
  }

  export type PaymentAllocationMaxAggregateInputType = {
    id?: true
    transactionId?: true
    scheduleId?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    createdAt?: true
  }

  export type PaymentAllocationCountAggregateInputType = {
    id?: true
    transactionId?: true
    scheduleId?: true
    principalAmount?: true
    interestAmount?: true
    feeAmount?: true
    penaltyAmount?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentAllocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentAllocation to aggregate.
     */
    where?: PaymentAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentAllocations to fetch.
     */
    orderBy?: PaymentAllocationOrderByWithRelationInput | PaymentAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentAllocations
    **/
    _count?: true | PaymentAllocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAllocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentAllocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentAllocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentAllocationMaxAggregateInputType
  }

  export type GetPaymentAllocationAggregateType<T extends PaymentAllocationAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentAllocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentAllocation[P]>
      : GetScalarType<T[P], AggregatePaymentAllocation[P]>
  }




  export type PaymentAllocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentAllocationWhereInput
    orderBy?: PaymentAllocationOrderByWithAggregationInput | PaymentAllocationOrderByWithAggregationInput[]
    by: PaymentAllocationScalarFieldEnum[] | PaymentAllocationScalarFieldEnum
    having?: PaymentAllocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentAllocationCountAggregateInputType | true
    _avg?: PaymentAllocationAvgAggregateInputType
    _sum?: PaymentAllocationSumAggregateInputType
    _min?: PaymentAllocationMinAggregateInputType
    _max?: PaymentAllocationMaxAggregateInputType
  }

  export type PaymentAllocationGroupByOutputType = {
    id: string
    transactionId: string
    scheduleId: string
    principalAmount: Decimal
    interestAmount: Decimal
    feeAmount: Decimal
    penaltyAmount: Decimal
    createdAt: Date
    _count: PaymentAllocationCountAggregateOutputType | null
    _avg: PaymentAllocationAvgAggregateOutputType | null
    _sum: PaymentAllocationSumAggregateOutputType | null
    _min: PaymentAllocationMinAggregateOutputType | null
    _max: PaymentAllocationMaxAggregateOutputType | null
  }

  type GetPaymentAllocationGroupByPayload<T extends PaymentAllocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentAllocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentAllocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentAllocationGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentAllocationGroupByOutputType[P]>
        }
      >
    >


  export type PaymentAllocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    scheduleId?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    createdAt?: boolean
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    schedule?: boolean | RepaymentScheduleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentAllocation"]>

  export type PaymentAllocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    scheduleId?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    createdAt?: boolean
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    schedule?: boolean | RepaymentScheduleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentAllocation"]>

  export type PaymentAllocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    scheduleId?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    createdAt?: boolean
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    schedule?: boolean | RepaymentScheduleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentAllocation"]>

  export type PaymentAllocationSelectScalar = {
    id?: boolean
    transactionId?: boolean
    scheduleId?: boolean
    principalAmount?: boolean
    interestAmount?: boolean
    feeAmount?: boolean
    penaltyAmount?: boolean
    createdAt?: boolean
  }

  export type PaymentAllocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "transactionId" | "scheduleId" | "principalAmount" | "interestAmount" | "feeAmount" | "penaltyAmount" | "createdAt", ExtArgs["result"]["paymentAllocation"]>
  export type PaymentAllocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    schedule?: boolean | RepaymentScheduleDefaultArgs<ExtArgs>
  }
  export type PaymentAllocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    schedule?: boolean | RepaymentScheduleDefaultArgs<ExtArgs>
  }
  export type PaymentAllocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
    schedule?: boolean | RepaymentScheduleDefaultArgs<ExtArgs>
  }

  export type $PaymentAllocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentAllocation"
    objects: {
      transaction: Prisma.$TransactionPayload<ExtArgs>
      schedule: Prisma.$RepaymentSchedulePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transactionId: string
      scheduleId: string
      principalAmount: Prisma.Decimal
      interestAmount: Prisma.Decimal
      feeAmount: Prisma.Decimal
      penaltyAmount: Prisma.Decimal
      createdAt: Date
    }, ExtArgs["result"]["paymentAllocation"]>
    composites: {}
  }

  type PaymentAllocationGetPayload<S extends boolean | null | undefined | PaymentAllocationDefaultArgs> = $Result.GetResult<Prisma.$PaymentAllocationPayload, S>

  type PaymentAllocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentAllocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentAllocationCountAggregateInputType | true
    }

  export interface PaymentAllocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentAllocation'], meta: { name: 'PaymentAllocation' } }
    /**
     * Find zero or one PaymentAllocation that matches the filter.
     * @param {PaymentAllocationFindUniqueArgs} args - Arguments to find a PaymentAllocation
     * @example
     * // Get one PaymentAllocation
     * const paymentAllocation = await prisma.paymentAllocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentAllocationFindUniqueArgs>(args: SelectSubset<T, PaymentAllocationFindUniqueArgs<ExtArgs>>): Prisma__PaymentAllocationClient<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentAllocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentAllocationFindUniqueOrThrowArgs} args - Arguments to find a PaymentAllocation
     * @example
     * // Get one PaymentAllocation
     * const paymentAllocation = await prisma.paymentAllocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentAllocationFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentAllocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentAllocationClient<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentAllocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAllocationFindFirstArgs} args - Arguments to find a PaymentAllocation
     * @example
     * // Get one PaymentAllocation
     * const paymentAllocation = await prisma.paymentAllocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentAllocationFindFirstArgs>(args?: SelectSubset<T, PaymentAllocationFindFirstArgs<ExtArgs>>): Prisma__PaymentAllocationClient<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentAllocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAllocationFindFirstOrThrowArgs} args - Arguments to find a PaymentAllocation
     * @example
     * // Get one PaymentAllocation
     * const paymentAllocation = await prisma.paymentAllocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentAllocationFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentAllocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentAllocationClient<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentAllocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAllocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentAllocations
     * const paymentAllocations = await prisma.paymentAllocation.findMany()
     * 
     * // Get first 10 PaymentAllocations
     * const paymentAllocations = await prisma.paymentAllocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentAllocationWithIdOnly = await prisma.paymentAllocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentAllocationFindManyArgs>(args?: SelectSubset<T, PaymentAllocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentAllocation.
     * @param {PaymentAllocationCreateArgs} args - Arguments to create a PaymentAllocation.
     * @example
     * // Create one PaymentAllocation
     * const PaymentAllocation = await prisma.paymentAllocation.create({
     *   data: {
     *     // ... data to create a PaymentAllocation
     *   }
     * })
     * 
     */
    create<T extends PaymentAllocationCreateArgs>(args: SelectSubset<T, PaymentAllocationCreateArgs<ExtArgs>>): Prisma__PaymentAllocationClient<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentAllocations.
     * @param {PaymentAllocationCreateManyArgs} args - Arguments to create many PaymentAllocations.
     * @example
     * // Create many PaymentAllocations
     * const paymentAllocation = await prisma.paymentAllocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentAllocationCreateManyArgs>(args?: SelectSubset<T, PaymentAllocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentAllocations and returns the data saved in the database.
     * @param {PaymentAllocationCreateManyAndReturnArgs} args - Arguments to create many PaymentAllocations.
     * @example
     * // Create many PaymentAllocations
     * const paymentAllocation = await prisma.paymentAllocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentAllocations and only return the `id`
     * const paymentAllocationWithIdOnly = await prisma.paymentAllocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentAllocationCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentAllocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentAllocation.
     * @param {PaymentAllocationDeleteArgs} args - Arguments to delete one PaymentAllocation.
     * @example
     * // Delete one PaymentAllocation
     * const PaymentAllocation = await prisma.paymentAllocation.delete({
     *   where: {
     *     // ... filter to delete one PaymentAllocation
     *   }
     * })
     * 
     */
    delete<T extends PaymentAllocationDeleteArgs>(args: SelectSubset<T, PaymentAllocationDeleteArgs<ExtArgs>>): Prisma__PaymentAllocationClient<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentAllocation.
     * @param {PaymentAllocationUpdateArgs} args - Arguments to update one PaymentAllocation.
     * @example
     * // Update one PaymentAllocation
     * const paymentAllocation = await prisma.paymentAllocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentAllocationUpdateArgs>(args: SelectSubset<T, PaymentAllocationUpdateArgs<ExtArgs>>): Prisma__PaymentAllocationClient<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentAllocations.
     * @param {PaymentAllocationDeleteManyArgs} args - Arguments to filter PaymentAllocations to delete.
     * @example
     * // Delete a few PaymentAllocations
     * const { count } = await prisma.paymentAllocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentAllocationDeleteManyArgs>(args?: SelectSubset<T, PaymentAllocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAllocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentAllocations
     * const paymentAllocation = await prisma.paymentAllocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentAllocationUpdateManyArgs>(args: SelectSubset<T, PaymentAllocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentAllocations and returns the data updated in the database.
     * @param {PaymentAllocationUpdateManyAndReturnArgs} args - Arguments to update many PaymentAllocations.
     * @example
     * // Update many PaymentAllocations
     * const paymentAllocation = await prisma.paymentAllocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentAllocations and only return the `id`
     * const paymentAllocationWithIdOnly = await prisma.paymentAllocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentAllocationUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentAllocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentAllocation.
     * @param {PaymentAllocationUpsertArgs} args - Arguments to update or create a PaymentAllocation.
     * @example
     * // Update or create a PaymentAllocation
     * const paymentAllocation = await prisma.paymentAllocation.upsert({
     *   create: {
     *     // ... data to create a PaymentAllocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentAllocation we want to update
     *   }
     * })
     */
    upsert<T extends PaymentAllocationUpsertArgs>(args: SelectSubset<T, PaymentAllocationUpsertArgs<ExtArgs>>): Prisma__PaymentAllocationClient<$Result.GetResult<Prisma.$PaymentAllocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAllocationCountArgs} args - Arguments to filter PaymentAllocations to count.
     * @example
     * // Count the number of PaymentAllocations
     * const count = await prisma.paymentAllocation.count({
     *   where: {
     *     // ... the filter for the PaymentAllocations we want to count
     *   }
     * })
    **/
    count<T extends PaymentAllocationCountArgs>(
      args?: Subset<T, PaymentAllocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentAllocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAllocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAllocationAggregateArgs>(args: Subset<T, PaymentAllocationAggregateArgs>): Prisma.PrismaPromise<GetPaymentAllocationAggregateType<T>>

    /**
     * Group by PaymentAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAllocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentAllocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentAllocationGroupByArgs['orderBy'] }
        : { orderBy?: PaymentAllocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentAllocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentAllocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentAllocation model
   */
  readonly fields: PaymentAllocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentAllocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentAllocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaction<T extends TransactionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TransactionDefaultArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    schedule<T extends RepaymentScheduleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepaymentScheduleDefaultArgs<ExtArgs>>): Prisma__RepaymentScheduleClient<$Result.GetResult<Prisma.$RepaymentSchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentAllocation model
   */
  interface PaymentAllocationFieldRefs {
    readonly id: FieldRef<"PaymentAllocation", 'String'>
    readonly transactionId: FieldRef<"PaymentAllocation", 'String'>
    readonly scheduleId: FieldRef<"PaymentAllocation", 'String'>
    readonly principalAmount: FieldRef<"PaymentAllocation", 'Decimal'>
    readonly interestAmount: FieldRef<"PaymentAllocation", 'Decimal'>
    readonly feeAmount: FieldRef<"PaymentAllocation", 'Decimal'>
    readonly penaltyAmount: FieldRef<"PaymentAllocation", 'Decimal'>
    readonly createdAt: FieldRef<"PaymentAllocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentAllocation findUnique
   */
  export type PaymentAllocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    /**
     * Filter, which PaymentAllocation to fetch.
     */
    where: PaymentAllocationWhereUniqueInput
  }

  /**
   * PaymentAllocation findUniqueOrThrow
   */
  export type PaymentAllocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    /**
     * Filter, which PaymentAllocation to fetch.
     */
    where: PaymentAllocationWhereUniqueInput
  }

  /**
   * PaymentAllocation findFirst
   */
  export type PaymentAllocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    /**
     * Filter, which PaymentAllocation to fetch.
     */
    where?: PaymentAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentAllocations to fetch.
     */
    orderBy?: PaymentAllocationOrderByWithRelationInput | PaymentAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentAllocations.
     */
    cursor?: PaymentAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentAllocations.
     */
    distinct?: PaymentAllocationScalarFieldEnum | PaymentAllocationScalarFieldEnum[]
  }

  /**
   * PaymentAllocation findFirstOrThrow
   */
  export type PaymentAllocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    /**
     * Filter, which PaymentAllocation to fetch.
     */
    where?: PaymentAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentAllocations to fetch.
     */
    orderBy?: PaymentAllocationOrderByWithRelationInput | PaymentAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentAllocations.
     */
    cursor?: PaymentAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentAllocations.
     */
    distinct?: PaymentAllocationScalarFieldEnum | PaymentAllocationScalarFieldEnum[]
  }

  /**
   * PaymentAllocation findMany
   */
  export type PaymentAllocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    /**
     * Filter, which PaymentAllocations to fetch.
     */
    where?: PaymentAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentAllocations to fetch.
     */
    orderBy?: PaymentAllocationOrderByWithRelationInput | PaymentAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentAllocations.
     */
    cursor?: PaymentAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentAllocations.
     */
    distinct?: PaymentAllocationScalarFieldEnum | PaymentAllocationScalarFieldEnum[]
  }

  /**
   * PaymentAllocation create
   */
  export type PaymentAllocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentAllocation.
     */
    data: XOR<PaymentAllocationCreateInput, PaymentAllocationUncheckedCreateInput>
  }

  /**
   * PaymentAllocation createMany
   */
  export type PaymentAllocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentAllocations.
     */
    data: PaymentAllocationCreateManyInput | PaymentAllocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentAllocation createManyAndReturn
   */
  export type PaymentAllocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentAllocations.
     */
    data: PaymentAllocationCreateManyInput | PaymentAllocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentAllocation update
   */
  export type PaymentAllocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentAllocation.
     */
    data: XOR<PaymentAllocationUpdateInput, PaymentAllocationUncheckedUpdateInput>
    /**
     * Choose, which PaymentAllocation to update.
     */
    where: PaymentAllocationWhereUniqueInput
  }

  /**
   * PaymentAllocation updateMany
   */
  export type PaymentAllocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentAllocations.
     */
    data: XOR<PaymentAllocationUpdateManyMutationInput, PaymentAllocationUncheckedUpdateManyInput>
    /**
     * Filter which PaymentAllocations to update
     */
    where?: PaymentAllocationWhereInput
    /**
     * Limit how many PaymentAllocations to update.
     */
    limit?: number
  }

  /**
   * PaymentAllocation updateManyAndReturn
   */
  export type PaymentAllocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * The data used to update PaymentAllocations.
     */
    data: XOR<PaymentAllocationUpdateManyMutationInput, PaymentAllocationUncheckedUpdateManyInput>
    /**
     * Filter which PaymentAllocations to update
     */
    where?: PaymentAllocationWhereInput
    /**
     * Limit how many PaymentAllocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentAllocation upsert
   */
  export type PaymentAllocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentAllocation to update in case it exists.
     */
    where: PaymentAllocationWhereUniqueInput
    /**
     * In case the PaymentAllocation found by the `where` argument doesn't exist, create a new PaymentAllocation with this data.
     */
    create: XOR<PaymentAllocationCreateInput, PaymentAllocationUncheckedCreateInput>
    /**
     * In case the PaymentAllocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentAllocationUpdateInput, PaymentAllocationUncheckedUpdateInput>
  }

  /**
   * PaymentAllocation delete
   */
  export type PaymentAllocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
    /**
     * Filter which PaymentAllocation to delete.
     */
    where: PaymentAllocationWhereUniqueInput
  }

  /**
   * PaymentAllocation deleteMany
   */
  export type PaymentAllocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentAllocations to delete
     */
    where?: PaymentAllocationWhereInput
    /**
     * Limit how many PaymentAllocations to delete.
     */
    limit?: number
  }

  /**
   * PaymentAllocation without action
   */
  export type PaymentAllocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentAllocation
     */
    select?: PaymentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentAllocation
     */
    omit?: PaymentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentAllocationInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    actorId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    ipAddress: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    actorId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    ipAddress: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    actorId: number
    action: number
    entityType: number
    entityId: number
    beforeState: number
    afterState: number
    ipAddress: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    actorId?: true
    action?: true
    entityType?: true
    entityId?: true
    ipAddress?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    actorId?: true
    action?: true
    entityType?: true
    entityId?: true
    ipAddress?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    actorId?: true
    action?: true
    entityType?: true
    entityId?: true
    beforeState?: true
    afterState?: true
    ipAddress?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    actorId: string
    action: string
    entityType: string
    entityId: string
    beforeState: JsonValue | null
    afterState: JsonValue | null
    ipAddress: string | null
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    beforeState?: boolean
    afterState?: boolean
    ipAddress?: boolean
    timestamp?: boolean
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    beforeState?: boolean
    afterState?: boolean
    ipAddress?: boolean
    timestamp?: boolean
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    beforeState?: boolean
    afterState?: boolean
    ipAddress?: boolean
    timestamp?: boolean
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    actorId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    beforeState?: boolean
    afterState?: boolean
    ipAddress?: boolean
    timestamp?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "actorId" | "action" | "entityType" | "entityId" | "beforeState" | "afterState" | "ipAddress" | "timestamp", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      actor: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      actorId: string
      action: string
      entityType: string
      entityId: string
      beforeState: Prisma.JsonValue | null
      afterState: Prisma.JsonValue | null
      ipAddress: string | null
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    actor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly actorId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly beforeState: FieldRef<"AuditLog", 'Json'>
    readonly afterState: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackAvgAggregateOutputType = {
    rating: number | null
  }

  export type FeedbackSumAggregateOutputType = {
    rating: number | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: string | null
    userId: string | null
    loanId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    loanId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    userId: number
    loanId: number
    rating: number
    comment: number
    createdAt: number
    _all: number
  }


  export type FeedbackAvgAggregateInputType = {
    rating?: true
  }

  export type FeedbackSumAggregateInputType = {
    rating?: true
  }

  export type FeedbackMinAggregateInputType = {
    id?: true
    userId?: true
    loanId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    userId?: true
    loanId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    userId?: true
    loanId?: true
    rating?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _avg?: FeedbackAvgAggregateInputType
    _sum?: FeedbackSumAggregateInputType
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: string
    userId: string
    loanId: string | null
    rating: number
    comment: string | null
    createdAt: Date
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    loanId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    loan?: boolean | Feedback$loanArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    loanId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    loan?: boolean | Feedback$loanArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    loanId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    loan?: boolean | Feedback$loanArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    userId?: boolean
    loanId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type FeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "loanId" | "rating" | "comment" | "createdAt", ExtArgs["result"]["feedback"]>
  export type FeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    loan?: boolean | Feedback$loanArgs<ExtArgs>
  }
  export type FeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    loan?: boolean | Feedback$loanArgs<ExtArgs>
  }
  export type FeedbackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    loan?: boolean | Feedback$loanArgs<ExtArgs>
  }

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      loan: Prisma.$LoanPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      loanId: string | null
      rating: number
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks and returns the data updated in the database.
     * @param {FeedbackUpdateManyAndReturnArgs} args - Arguments to update many Feedbacks.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    loan<T extends Feedback$loanArgs<ExtArgs> = {}>(args?: Subset<T, Feedback$loanArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feedback model
   */
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'String'>
    readonly userId: FieldRef<"Feedback", 'String'>
    readonly loanId: FieldRef<"Feedback", 'String'>
    readonly rating: FieldRef<"Feedback", 'Int'>
    readonly comment: FieldRef<"Feedback", 'String'>
    readonly createdAt: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback updateManyAndReturn
   */
  export type FeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to delete.
     */
    limit?: number
  }

  /**
   * Feedback.loan
   */
  export type Feedback$loanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    occupation: 'occupation',
    phone: 'phone',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    kycStatus: 'kycStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    avatarUrl: 'avatarUrl'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LoanProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    minAmount: 'minAmount',
    maxAmount: 'maxAmount',
    interestRate: 'interestRate',
    interestType: 'interestType',
    minTermValue: 'minTermValue',
    maxTermValue: 'maxTermValue',
    termUnit: 'termUnit',
    repaymentFrequency: 'repaymentFrequency',
    processingFeeType: 'processingFeeType',
    processingFeeAmount: 'processingFeeAmount',
    processingFeeRate: 'processingFeeRate',
    lateFeeType: 'lateFeeType',
    lateFeeAmount: 'lateFeeAmount',
    lateFeeRate: 'lateFeeRate',
    gracePeriodDays: 'gracePeriodDays',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoanProductScalarFieldEnum = (typeof LoanProductScalarFieldEnum)[keyof typeof LoanProductScalarFieldEnum]


  export const LoanScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    amount: 'amount',
    purpose: 'purpose',
    notes: 'notes',
    status: 'status',
    interestRate: 'interestRate',
    interestType: 'interestType',
    termValue: 'termValue',
    termUnit: 'termUnit',
    numberOfInstallments: 'numberOfInstallments',
    repaymentFrequency: 'repaymentFrequency',
    processingFeeType: 'processingFeeType',
    processingFeeAmount: 'processingFeeAmount',
    processingFeeRate: 'processingFeeRate',
    lateFeeType: 'lateFeeType',
    lateFeeAmount: 'lateFeeAmount',
    lateFeeRate: 'lateFeeRate',
    gracePeriodDays: 'gracePeriodDays',
    totalInterest: 'totalInterest',
    totalFees: 'totalFees',
    totalPayable: 'totalPayable',
    rejectionReason: 'rejectionReason',
    approvedAt: 'approvedAt',
    approvedById: 'approvedById',
    disbursedAt: 'disbursedAt',
    disbursedById: 'disbursedById',
    firstPaymentDueAt: 'firstPaymentDueAt',
    maturityDate: 'maturityDate',
    closedAt: 'closedAt',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type LoanScalarFieldEnum = (typeof LoanScalarFieldEnum)[keyof typeof LoanScalarFieldEnum]


  export const RepaymentScheduleScalarFieldEnum: {
    id: 'id',
    loanId: 'loanId',
    installmentNumber: 'installmentNumber',
    dueDate: 'dueDate',
    principalAmount: 'principalAmount',
    interestAmount: 'interestAmount',
    feeAmount: 'feeAmount',
    penaltyAmount: 'penaltyAmount',
    baseAmountDue: 'baseAmountDue',
    amountDue: 'amountDue',
    amountPaid: 'amountPaid',
    principalPaid: 'principalPaid',
    interestPaid: 'interestPaid',
    feePaid: 'feePaid',
    penaltyPaid: 'penaltyPaid',
    remainingBalance: 'remainingBalance',
    status: 'status',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RepaymentScheduleScalarFieldEnum = (typeof RepaymentScheduleScalarFieldEnum)[keyof typeof RepaymentScheduleScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    loanId: 'loanId',
    type: 'type',
    amount: 'amount',
    reference: 'reference',
    providerRef: 'providerRef',
    principalAmount: 'principalAmount',
    interestAmount: 'interestAmount',
    feeAmount: 'feeAmount',
    penaltyAmount: 'penaltyAmount',
    idempotencyKey: 'idempotencyKey',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const PaymentAllocationScalarFieldEnum: {
    id: 'id',
    transactionId: 'transactionId',
    scheduleId: 'scheduleId',
    principalAmount: 'principalAmount',
    interestAmount: 'interestAmount',
    feeAmount: 'feeAmount',
    penaltyAmount: 'penaltyAmount',
    createdAt: 'createdAt'
  };

  export type PaymentAllocationScalarFieldEnum = (typeof PaymentAllocationScalarFieldEnum)[keyof typeof PaymentAllocationScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    actorId: 'actorId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    beforeState: 'beforeState',
    afterState: 'afterState',
    ipAddress: 'ipAddress',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    loanId: 'loanId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'KycStatus'
   */
  export type EnumKycStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KycStatus'>
    


  /**
   * Reference to a field of type 'KycStatus[]'
   */
  export type ListEnumKycStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KycStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'InterestType'
   */
  export type EnumInterestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InterestType'>
    


  /**
   * Reference to a field of type 'InterestType[]'
   */
  export type ListEnumInterestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InterestType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TermUnit'
   */
  export type EnumTermUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TermUnit'>
    


  /**
   * Reference to a field of type 'TermUnit[]'
   */
  export type ListEnumTermUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TermUnit[]'>
    


  /**
   * Reference to a field of type 'RepaymentFrequency'
   */
  export type EnumRepaymentFrequencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepaymentFrequency'>
    


  /**
   * Reference to a field of type 'RepaymentFrequency[]'
   */
  export type ListEnumRepaymentFrequencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepaymentFrequency[]'>
    


  /**
   * Reference to a field of type 'FeeType'
   */
  export type EnumFeeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeeType'>
    


  /**
   * Reference to a field of type 'FeeType[]'
   */
  export type ListEnumFeeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeeType[]'>
    


  /**
   * Reference to a field of type 'LateFeeType'
   */
  export type EnumLateFeeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LateFeeType'>
    


  /**
   * Reference to a field of type 'LateFeeType[]'
   */
  export type ListEnumLateFeeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LateFeeType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'LoanStatus'
   */
  export type EnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus'>
    


  /**
   * Reference to a field of type 'LoanStatus[]'
   */
  export type ListEnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus[]'>
    


  /**
   * Reference to a field of type 'InstallmentStatus'
   */
  export type EnumInstallmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InstallmentStatus'>
    


  /**
   * Reference to a field of type 'InstallmentStatus[]'
   */
  export type ListEnumInstallmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InstallmentStatus[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    address?: StringFilter<"User"> | string
    occupation?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    kycStatus?: EnumKycStatusFilter<"User"> | $Enums.KycStatus
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    loans?: LoanListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    feedback?: FeedbackListRelationFilter
    approvedLoans?: LoanListRelationFilter
    disbursedLoans?: LoanListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    occupation?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    kycStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    loans?: LoanOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    feedback?: FeedbackOrderByRelationAggregateInput
    approvedLoans?: LoanOrderByRelationAggregateInput
    disbursedLoans?: LoanOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    address?: StringFilter<"User"> | string
    occupation?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    kycStatus?: EnumKycStatusFilter<"User"> | $Enums.KycStatus
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    loans?: LoanListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    feedback?: FeedbackListRelationFilter
    approvedLoans?: LoanListRelationFilter
    disbursedLoans?: LoanListRelationFilter
  }, "id" | "phone" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    occupation?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    kycStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    address?: StringWithAggregatesFilter<"User"> | string
    occupation?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    kycStatus?: EnumKycStatusWithAggregatesFilter<"User"> | $Enums.KycStatus
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type LoanProductWhereInput = {
    AND?: LoanProductWhereInput | LoanProductWhereInput[]
    OR?: LoanProductWhereInput[]
    NOT?: LoanProductWhereInput | LoanProductWhereInput[]
    id?: StringFilter<"LoanProduct"> | string
    name?: StringFilter<"LoanProduct"> | string
    description?: StringNullableFilter<"LoanProduct"> | string | null
    minAmount?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    maxAmount?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFilter<"LoanProduct"> | $Enums.InterestType
    minTermValue?: IntFilter<"LoanProduct"> | number
    maxTermValue?: IntFilter<"LoanProduct"> | number
    termUnit?: EnumTermUnitFilter<"LoanProduct"> | $Enums.TermUnit
    repaymentFrequency?: EnumRepaymentFrequencyFilter<"LoanProduct"> | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFilter<"LoanProduct"> | $Enums.FeeType
    processingFeeAmount?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFilter<"LoanProduct"> | $Enums.LateFeeType
    lateFeeAmount?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFilter<"LoanProduct"> | number
    isActive?: BoolFilter<"LoanProduct"> | boolean
    createdAt?: DateTimeFilter<"LoanProduct"> | Date | string
    updatedAt?: DateTimeFilter<"LoanProduct"> | Date | string
    loans?: LoanListRelationFilter
  }

  export type LoanProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    interestRate?: SortOrder
    interestType?: SortOrder
    minTermValue?: SortOrder
    maxTermValue?: SortOrder
    termUnit?: SortOrder
    repaymentFrequency?: SortOrder
    processingFeeType?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeType?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loans?: LoanOrderByRelationAggregateInput
  }

  export type LoanProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoanProductWhereInput | LoanProductWhereInput[]
    OR?: LoanProductWhereInput[]
    NOT?: LoanProductWhereInput | LoanProductWhereInput[]
    name?: StringFilter<"LoanProduct"> | string
    description?: StringNullableFilter<"LoanProduct"> | string | null
    minAmount?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    maxAmount?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFilter<"LoanProduct"> | $Enums.InterestType
    minTermValue?: IntFilter<"LoanProduct"> | number
    maxTermValue?: IntFilter<"LoanProduct"> | number
    termUnit?: EnumTermUnitFilter<"LoanProduct"> | $Enums.TermUnit
    repaymentFrequency?: EnumRepaymentFrequencyFilter<"LoanProduct"> | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFilter<"LoanProduct"> | $Enums.FeeType
    processingFeeAmount?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFilter<"LoanProduct"> | $Enums.LateFeeType
    lateFeeAmount?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFilter<"LoanProduct"> | number
    isActive?: BoolFilter<"LoanProduct"> | boolean
    createdAt?: DateTimeFilter<"LoanProduct"> | Date | string
    updatedAt?: DateTimeFilter<"LoanProduct"> | Date | string
    loans?: LoanListRelationFilter
  }, "id">

  export type LoanProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    interestRate?: SortOrder
    interestType?: SortOrder
    minTermValue?: SortOrder
    maxTermValue?: SortOrder
    termUnit?: SortOrder
    repaymentFrequency?: SortOrder
    processingFeeType?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeType?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoanProductCountOrderByAggregateInput
    _avg?: LoanProductAvgOrderByAggregateInput
    _max?: LoanProductMaxOrderByAggregateInput
    _min?: LoanProductMinOrderByAggregateInput
    _sum?: LoanProductSumOrderByAggregateInput
  }

  export type LoanProductScalarWhereWithAggregatesInput = {
    AND?: LoanProductScalarWhereWithAggregatesInput | LoanProductScalarWhereWithAggregatesInput[]
    OR?: LoanProductScalarWhereWithAggregatesInput[]
    NOT?: LoanProductScalarWhereWithAggregatesInput | LoanProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoanProduct"> | string
    name?: StringWithAggregatesFilter<"LoanProduct"> | string
    description?: StringNullableWithAggregatesFilter<"LoanProduct"> | string | null
    minAmount?: DecimalWithAggregatesFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    maxAmount?: DecimalWithAggregatesFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalWithAggregatesFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeWithAggregatesFilter<"LoanProduct"> | $Enums.InterestType
    minTermValue?: IntWithAggregatesFilter<"LoanProduct"> | number
    maxTermValue?: IntWithAggregatesFilter<"LoanProduct"> | number
    termUnit?: EnumTermUnitWithAggregatesFilter<"LoanProduct"> | $Enums.TermUnit
    repaymentFrequency?: EnumRepaymentFrequencyWithAggregatesFilter<"LoanProduct"> | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeWithAggregatesFilter<"LoanProduct"> | $Enums.FeeType
    processingFeeAmount?: DecimalWithAggregatesFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalWithAggregatesFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeWithAggregatesFilter<"LoanProduct"> | $Enums.LateFeeType
    lateFeeAmount?: DecimalWithAggregatesFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalWithAggregatesFilter<"LoanProduct"> | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntWithAggregatesFilter<"LoanProduct"> | number
    isActive?: BoolWithAggregatesFilter<"LoanProduct"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"LoanProduct"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LoanProduct"> | Date | string
  }

  export type LoanWhereInput = {
    AND?: LoanWhereInput | LoanWhereInput[]
    OR?: LoanWhereInput[]
    NOT?: LoanWhereInput | LoanWhereInput[]
    id?: StringFilter<"Loan"> | string
    userId?: StringFilter<"Loan"> | string
    productId?: StringFilter<"Loan"> | string
    amount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    purpose?: StringFilter<"Loan"> | string
    notes?: StringNullableFilter<"Loan"> | string | null
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    interestRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFilter<"Loan"> | $Enums.InterestType
    termValue?: IntFilter<"Loan"> | number
    termUnit?: EnumTermUnitFilter<"Loan"> | $Enums.TermUnit
    numberOfInstallments?: IntFilter<"Loan"> | number
    repaymentFrequency?: EnumRepaymentFrequencyFilter<"Loan"> | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFilter<"Loan"> | $Enums.FeeType
    processingFeeAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFilter<"Loan"> | $Enums.LateFeeType
    lateFeeAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFilter<"Loan"> | number
    totalInterest?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    rejectionReason?: StringNullableFilter<"Loan"> | string | null
    approvedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    approvedById?: StringNullableFilter<"Loan"> | string | null
    disbursedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    disbursedById?: StringNullableFilter<"Loan"> | string | null
    firstPaymentDueAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    maturityDate?: DateTimeNullableFilter<"Loan"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    version?: IntFilter<"Loan"> | number
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    updatedAt?: DateTimeFilter<"Loan"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<LoanProductScalarRelationFilter, LoanProductWhereInput>
    approvedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    disbursedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    repayments?: RepaymentScheduleListRelationFilter
    transactions?: TransactionListRelationFilter
    feedback?: FeedbackListRelationFilter
  }

  export type LoanOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    amount?: SortOrder
    purpose?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    interestRate?: SortOrder
    interestType?: SortOrder
    termValue?: SortOrder
    termUnit?: SortOrder
    numberOfInstallments?: SortOrder
    repaymentFrequency?: SortOrder
    processingFeeType?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeType?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    totalInterest?: SortOrder
    totalFees?: SortOrder
    totalPayable?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedById?: SortOrderInput | SortOrder
    disbursedAt?: SortOrderInput | SortOrder
    disbursedById?: SortOrderInput | SortOrder
    firstPaymentDueAt?: SortOrderInput | SortOrder
    maturityDate?: SortOrderInput | SortOrder
    closedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    product?: LoanProductOrderByWithRelationInput
    approvedBy?: UserOrderByWithRelationInput
    disbursedBy?: UserOrderByWithRelationInput
    repayments?: RepaymentScheduleOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    feedback?: FeedbackOrderByRelationAggregateInput
  }

  export type LoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoanWhereInput | LoanWhereInput[]
    OR?: LoanWhereInput[]
    NOT?: LoanWhereInput | LoanWhereInput[]
    userId?: StringFilter<"Loan"> | string
    productId?: StringFilter<"Loan"> | string
    amount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    purpose?: StringFilter<"Loan"> | string
    notes?: StringNullableFilter<"Loan"> | string | null
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    interestRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFilter<"Loan"> | $Enums.InterestType
    termValue?: IntFilter<"Loan"> | number
    termUnit?: EnumTermUnitFilter<"Loan"> | $Enums.TermUnit
    numberOfInstallments?: IntFilter<"Loan"> | number
    repaymentFrequency?: EnumRepaymentFrequencyFilter<"Loan"> | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFilter<"Loan"> | $Enums.FeeType
    processingFeeAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFilter<"Loan"> | $Enums.LateFeeType
    lateFeeAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFilter<"Loan"> | number
    totalInterest?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    rejectionReason?: StringNullableFilter<"Loan"> | string | null
    approvedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    approvedById?: StringNullableFilter<"Loan"> | string | null
    disbursedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    disbursedById?: StringNullableFilter<"Loan"> | string | null
    firstPaymentDueAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    maturityDate?: DateTimeNullableFilter<"Loan"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    version?: IntFilter<"Loan"> | number
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    updatedAt?: DateTimeFilter<"Loan"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<LoanProductScalarRelationFilter, LoanProductWhereInput>
    approvedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    disbursedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    repayments?: RepaymentScheduleListRelationFilter
    transactions?: TransactionListRelationFilter
    feedback?: FeedbackListRelationFilter
  }, "id">

  export type LoanOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    amount?: SortOrder
    purpose?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    interestRate?: SortOrder
    interestType?: SortOrder
    termValue?: SortOrder
    termUnit?: SortOrder
    numberOfInstallments?: SortOrder
    repaymentFrequency?: SortOrder
    processingFeeType?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeType?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    totalInterest?: SortOrder
    totalFees?: SortOrder
    totalPayable?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedById?: SortOrderInput | SortOrder
    disbursedAt?: SortOrderInput | SortOrder
    disbursedById?: SortOrderInput | SortOrder
    firstPaymentDueAt?: SortOrderInput | SortOrder
    maturityDate?: SortOrderInput | SortOrder
    closedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: LoanCountOrderByAggregateInput
    _avg?: LoanAvgOrderByAggregateInput
    _max?: LoanMaxOrderByAggregateInput
    _min?: LoanMinOrderByAggregateInput
    _sum?: LoanSumOrderByAggregateInput
  }

  export type LoanScalarWhereWithAggregatesInput = {
    AND?: LoanScalarWhereWithAggregatesInput | LoanScalarWhereWithAggregatesInput[]
    OR?: LoanScalarWhereWithAggregatesInput[]
    NOT?: LoanScalarWhereWithAggregatesInput | LoanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Loan"> | string
    userId?: StringWithAggregatesFilter<"Loan"> | string
    productId?: StringWithAggregatesFilter<"Loan"> | string
    amount?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    purpose?: StringWithAggregatesFilter<"Loan"> | string
    notes?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    status?: EnumLoanStatusWithAggregatesFilter<"Loan"> | $Enums.LoanStatus
    interestRate?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeWithAggregatesFilter<"Loan"> | $Enums.InterestType
    termValue?: IntWithAggregatesFilter<"Loan"> | number
    termUnit?: EnumTermUnitWithAggregatesFilter<"Loan"> | $Enums.TermUnit
    numberOfInstallments?: IntWithAggregatesFilter<"Loan"> | number
    repaymentFrequency?: EnumRepaymentFrequencyWithAggregatesFilter<"Loan"> | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeWithAggregatesFilter<"Loan"> | $Enums.FeeType
    processingFeeAmount?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeWithAggregatesFilter<"Loan"> | $Enums.LateFeeType
    lateFeeAmount?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntWithAggregatesFilter<"Loan"> | number
    totalInterest?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalWithAggregatesFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    rejectionReason?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null
    approvedById?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    disbursedAt?: DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null
    disbursedById?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    firstPaymentDueAt?: DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null
    maturityDate?: DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null
    closedAt?: DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null
    version?: IntWithAggregatesFilter<"Loan"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null
  }

  export type RepaymentScheduleWhereInput = {
    AND?: RepaymentScheduleWhereInput | RepaymentScheduleWhereInput[]
    OR?: RepaymentScheduleWhereInput[]
    NOT?: RepaymentScheduleWhereInput | RepaymentScheduleWhereInput[]
    id?: StringFilter<"RepaymentSchedule"> | string
    loanId?: StringFilter<"RepaymentSchedule"> | string
    installmentNumber?: IntFilter<"RepaymentSchedule"> | number
    dueDate?: DateTimeFilter<"RepaymentSchedule"> | Date | string
    principalAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFilter<"RepaymentSchedule"> | $Enums.InstallmentStatus
    paidAt?: DateTimeNullableFilter<"RepaymentSchedule"> | Date | string | null
    createdAt?: DateTimeFilter<"RepaymentSchedule"> | Date | string
    updatedAt?: DateTimeFilter<"RepaymentSchedule"> | Date | string
    loan?: XOR<LoanScalarRelationFilter, LoanWhereInput>
    allocations?: PaymentAllocationListRelationFilter
  }

  export type RepaymentScheduleOrderByWithRelationInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNumber?: SortOrder
    dueDate?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    baseAmountDue?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    principalPaid?: SortOrder
    interestPaid?: SortOrder
    feePaid?: SortOrder
    penaltyPaid?: SortOrder
    remainingBalance?: SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loan?: LoanOrderByWithRelationInput
    allocations?: PaymentAllocationOrderByRelationAggregateInput
  }

  export type RepaymentScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    loanId_installmentNumber?: RepaymentScheduleLoanIdInstallmentNumberCompoundUniqueInput
    AND?: RepaymentScheduleWhereInput | RepaymentScheduleWhereInput[]
    OR?: RepaymentScheduleWhereInput[]
    NOT?: RepaymentScheduleWhereInput | RepaymentScheduleWhereInput[]
    loanId?: StringFilter<"RepaymentSchedule"> | string
    installmentNumber?: IntFilter<"RepaymentSchedule"> | number
    dueDate?: DateTimeFilter<"RepaymentSchedule"> | Date | string
    principalAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFilter<"RepaymentSchedule"> | $Enums.InstallmentStatus
    paidAt?: DateTimeNullableFilter<"RepaymentSchedule"> | Date | string | null
    createdAt?: DateTimeFilter<"RepaymentSchedule"> | Date | string
    updatedAt?: DateTimeFilter<"RepaymentSchedule"> | Date | string
    loan?: XOR<LoanScalarRelationFilter, LoanWhereInput>
    allocations?: PaymentAllocationListRelationFilter
  }, "id" | "loanId_installmentNumber">

  export type RepaymentScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNumber?: SortOrder
    dueDate?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    baseAmountDue?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    principalPaid?: SortOrder
    interestPaid?: SortOrder
    feePaid?: SortOrder
    penaltyPaid?: SortOrder
    remainingBalance?: SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RepaymentScheduleCountOrderByAggregateInput
    _avg?: RepaymentScheduleAvgOrderByAggregateInput
    _max?: RepaymentScheduleMaxOrderByAggregateInput
    _min?: RepaymentScheduleMinOrderByAggregateInput
    _sum?: RepaymentScheduleSumOrderByAggregateInput
  }

  export type RepaymentScheduleScalarWhereWithAggregatesInput = {
    AND?: RepaymentScheduleScalarWhereWithAggregatesInput | RepaymentScheduleScalarWhereWithAggregatesInput[]
    OR?: RepaymentScheduleScalarWhereWithAggregatesInput[]
    NOT?: RepaymentScheduleScalarWhereWithAggregatesInput | RepaymentScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RepaymentSchedule"> | string
    loanId?: StringWithAggregatesFilter<"RepaymentSchedule"> | string
    installmentNumber?: IntWithAggregatesFilter<"RepaymentSchedule"> | number
    dueDate?: DateTimeWithAggregatesFilter<"RepaymentSchedule"> | Date | string
    principalAmount?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalWithAggregatesFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusWithAggregatesFilter<"RepaymentSchedule"> | $Enums.InstallmentStatus
    paidAt?: DateTimeNullableWithAggregatesFilter<"RepaymentSchedule"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RepaymentSchedule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RepaymentSchedule"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    loanId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    reference?: StringFilter<"Transaction"> | string
    providerRef?: StringNullableFilter<"Transaction"> | string | null
    principalAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    interestAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    feeAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    loan?: XOR<LoanScalarRelationFilter, LoanWhereInput>
    allocations?: PaymentAllocationListRelationFilter
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    loanId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    reference?: SortOrder
    providerRef?: SortOrderInput | SortOrder
    principalAmount?: SortOrderInput | SortOrder
    interestAmount?: SortOrderInput | SortOrder
    feeAmount?: SortOrderInput | SortOrder
    penaltyAmount?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    loan?: LoanOrderByWithRelationInput
    allocations?: PaymentAllocationOrderByRelationAggregateInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reference?: string
    idempotencyKey?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    loanId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    providerRef?: StringNullableFilter<"Transaction"> | string | null
    principalAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    interestAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    feeAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    loan?: XOR<LoanScalarRelationFilter, LoanWhereInput>
    allocations?: PaymentAllocationListRelationFilter
  }, "id" | "reference" | "idempotencyKey">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    loanId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    reference?: SortOrder
    providerRef?: SortOrderInput | SortOrder
    principalAmount?: SortOrderInput | SortOrder
    interestAmount?: SortOrderInput | SortOrder
    feeAmount?: SortOrderInput | SortOrder
    penaltyAmount?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    loanId?: StringWithAggregatesFilter<"Transaction"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    reference?: StringWithAggregatesFilter<"Transaction"> | string
    providerRef?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    principalAmount?: DecimalNullableWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    interestAmount?: DecimalNullableWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    feeAmount?: DecimalNullableWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: DecimalNullableWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Transaction">
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type PaymentAllocationWhereInput = {
    AND?: PaymentAllocationWhereInput | PaymentAllocationWhereInput[]
    OR?: PaymentAllocationWhereInput[]
    NOT?: PaymentAllocationWhereInput | PaymentAllocationWhereInput[]
    id?: StringFilter<"PaymentAllocation"> | string
    transactionId?: StringFilter<"PaymentAllocation"> | string
    scheduleId?: StringFilter<"PaymentAllocation"> | string
    principalAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"PaymentAllocation"> | Date | string
    transaction?: XOR<TransactionScalarRelationFilter, TransactionWhereInput>
    schedule?: XOR<RepaymentScheduleScalarRelationFilter, RepaymentScheduleWhereInput>
  }

  export type PaymentAllocationOrderByWithRelationInput = {
    id?: SortOrder
    transactionId?: SortOrder
    scheduleId?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    createdAt?: SortOrder
    transaction?: TransactionOrderByWithRelationInput
    schedule?: RepaymentScheduleOrderByWithRelationInput
  }

  export type PaymentAllocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionId_scheduleId?: PaymentAllocationTransactionIdScheduleIdCompoundUniqueInput
    AND?: PaymentAllocationWhereInput | PaymentAllocationWhereInput[]
    OR?: PaymentAllocationWhereInput[]
    NOT?: PaymentAllocationWhereInput | PaymentAllocationWhereInput[]
    transactionId?: StringFilter<"PaymentAllocation"> | string
    scheduleId?: StringFilter<"PaymentAllocation"> | string
    principalAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"PaymentAllocation"> | Date | string
    transaction?: XOR<TransactionScalarRelationFilter, TransactionWhereInput>
    schedule?: XOR<RepaymentScheduleScalarRelationFilter, RepaymentScheduleWhereInput>
  }, "id" | "transactionId_scheduleId">

  export type PaymentAllocationOrderByWithAggregationInput = {
    id?: SortOrder
    transactionId?: SortOrder
    scheduleId?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    createdAt?: SortOrder
    _count?: PaymentAllocationCountOrderByAggregateInput
    _avg?: PaymentAllocationAvgOrderByAggregateInput
    _max?: PaymentAllocationMaxOrderByAggregateInput
    _min?: PaymentAllocationMinOrderByAggregateInput
    _sum?: PaymentAllocationSumOrderByAggregateInput
  }

  export type PaymentAllocationScalarWhereWithAggregatesInput = {
    AND?: PaymentAllocationScalarWhereWithAggregatesInput | PaymentAllocationScalarWhereWithAggregatesInput[]
    OR?: PaymentAllocationScalarWhereWithAggregatesInput[]
    NOT?: PaymentAllocationScalarWhereWithAggregatesInput | PaymentAllocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentAllocation"> | string
    transactionId?: StringWithAggregatesFilter<"PaymentAllocation"> | string
    scheduleId?: StringWithAggregatesFilter<"PaymentAllocation"> | string
    principalAmount?: DecimalWithAggregatesFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalWithAggregatesFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalWithAggregatesFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalWithAggregatesFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"PaymentAllocation"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    actorId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    beforeState?: JsonNullableFilter<"AuditLog">
    afterState?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    actor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    beforeState?: SortOrderInput | SortOrder
    afterState?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    actor?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    actorId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    beforeState?: JsonNullableFilter<"AuditLog">
    afterState?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    actor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    beforeState?: SortOrderInput | SortOrder
    afterState?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    actorId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    beforeState?: JsonNullableWithAggregatesFilter<"AuditLog">
    afterState?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: StringFilter<"Feedback"> | string
    userId?: StringFilter<"Feedback"> | string
    loanId?: StringNullableFilter<"Feedback"> | string | null
    rating?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    loan?: XOR<LoanNullableScalarRelationFilter, LoanWhereInput> | null
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    loanId?: SortOrderInput | SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    loan?: LoanOrderByWithRelationInput
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    userId?: StringFilter<"Feedback"> | string
    loanId?: StringNullableFilter<"Feedback"> | string | null
    rating?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    loan?: XOR<LoanNullableScalarRelationFilter, LoanWhereInput> | null
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    loanId?: SortOrderInput | SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _avg?: FeedbackAvgOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
    _sum?: FeedbackSumOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Feedback"> | string
    userId?: StringWithAggregatesFilter<"Feedback"> | string
    loanId?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    rating?: IntWithAggregatesFilter<"Feedback"> | number
    comment?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    loans?: LoanCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    feedback?: FeedbackCreateNestedManyWithoutUserInput
    approvedLoans?: LoanCreateNestedManyWithoutApprovedByInput
    disbursedLoans?: LoanCreateNestedManyWithoutDisbursedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    loans?: LoanUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    approvedLoans?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    disbursedLoans?: LoanUncheckedCreateNestedManyWithoutDisbursedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    loans?: LoanUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    feedback?: FeedbackUpdateManyWithoutUserNestedInput
    approvedLoans?: LoanUpdateManyWithoutApprovedByNestedInput
    disbursedLoans?: LoanUpdateManyWithoutDisbursedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    loans?: LoanUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    approvedLoans?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    disbursedLoans?: LoanUncheckedUpdateManyWithoutDisbursedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LoanProductCreateInput = {
    id?: string
    name: string
    description?: string | null
    minAmount: Decimal | DecimalJsLike | number | string
    maxAmount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    minTermValue: number
    maxTermValue: number
    termUnit: $Enums.TermUnit
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType?: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType?: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanCreateNestedManyWithoutProductInput
  }

  export type LoanProductUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    minAmount: Decimal | DecimalJsLike | number | string
    maxAmount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    minTermValue: number
    maxTermValue: number
    termUnit: $Enums.TermUnit
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType?: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType?: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutProductInput
  }

  export type LoanProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    minAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    minTermValue?: IntFieldUpdateOperationsInput | number
    maxTermValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUpdateManyWithoutProductNestedInput
  }

  export type LoanProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    minAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    minTermValue?: IntFieldUpdateOperationsInput | number
    maxTermValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutProductNestedInput
  }

  export type LoanProductCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    minAmount: Decimal | DecimalJsLike | number | string
    maxAmount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    minTermValue: number
    maxTermValue: number
    termUnit: $Enums.TermUnit
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType?: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType?: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    minAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    minTermValue?: IntFieldUpdateOperationsInput | number
    maxTermValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    minAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    minTermValue?: IntFieldUpdateOperationsInput | number
    maxTermValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    disbursedAt?: Date | string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutLoansInput
    product: LoanProductCreateNestedOneWithoutLoansInput
    approvedBy?: UserCreateNestedOneWithoutApprovedLoansInput
    disbursedBy?: UserCreateNestedOneWithoutDisbursedLoansInput
    repayments?: RepaymentScheduleCreateNestedManyWithoutLoanInput
    transactions?: TransactionCreateNestedManyWithoutLoanInput
    feedback?: FeedbackCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateInput = {
    id?: string
    userId: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    repayments?: RepaymentScheduleUncheckedCreateNestedManyWithoutLoanInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoanInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutLoansNestedInput
    product?: LoanProductUpdateOneRequiredWithoutLoansNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedLoansNestedInput
    disbursedBy?: UserUpdateOneWithoutDisbursedLoansNestedInput
    repayments?: RepaymentScheduleUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repayments?: RepaymentScheduleUncheckedUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanCreateManyInput = {
    id?: string
    userId: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type LoanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LoanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RepaymentScheduleCreateInput = {
    id?: string
    installmentNumber: number
    dueDate: Date | string
    principalAmount: Decimal | DecimalJsLike | number | string
    interestAmount: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    baseAmountDue: Decimal | DecimalJsLike | number | string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    principalPaid?: Decimal | DecimalJsLike | number | string
    interestPaid?: Decimal | DecimalJsLike | number | string
    feePaid?: Decimal | DecimalJsLike | number | string
    penaltyPaid?: Decimal | DecimalJsLike | number | string
    remainingBalance: Decimal | DecimalJsLike | number | string
    status?: $Enums.InstallmentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loan: LoanCreateNestedOneWithoutRepaymentsInput
    allocations?: PaymentAllocationCreateNestedManyWithoutScheduleInput
  }

  export type RepaymentScheduleUncheckedCreateInput = {
    id?: string
    loanId: string
    installmentNumber: number
    dueDate: Date | string
    principalAmount: Decimal | DecimalJsLike | number | string
    interestAmount: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    baseAmountDue: Decimal | DecimalJsLike | number | string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    principalPaid?: Decimal | DecimalJsLike | number | string
    interestPaid?: Decimal | DecimalJsLike | number | string
    feePaid?: Decimal | DecimalJsLike | number | string
    penaltyPaid?: Decimal | DecimalJsLike | number | string
    remainingBalance: Decimal | DecimalJsLike | number | string
    status?: $Enums.InstallmentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    allocations?: PaymentAllocationUncheckedCreateNestedManyWithoutScheduleInput
  }

  export type RepaymentScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loan?: LoanUpdateOneRequiredWithoutRepaymentsNestedInput
    allocations?: PaymentAllocationUpdateManyWithoutScheduleNestedInput
  }

  export type RepaymentScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allocations?: PaymentAllocationUncheckedUpdateManyWithoutScheduleNestedInput
  }

  export type RepaymentScheduleCreateManyInput = {
    id?: string
    loanId: string
    installmentNumber: number
    dueDate: Date | string
    principalAmount: Decimal | DecimalJsLike | number | string
    interestAmount: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    baseAmountDue: Decimal | DecimalJsLike | number | string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    principalPaid?: Decimal | DecimalJsLike | number | string
    interestPaid?: Decimal | DecimalJsLike | number | string
    feePaid?: Decimal | DecimalJsLike | number | string
    penaltyPaid?: Decimal | DecimalJsLike | number | string
    remainingBalance: Decimal | DecimalJsLike | number | string
    status?: $Enums.InstallmentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RepaymentScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepaymentScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    reference: string
    providerRef?: string | null
    principalAmount?: Decimal | DecimalJsLike | number | string | null
    interestAmount?: Decimal | DecimalJsLike | number | string | null
    feeAmount?: Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    loan: LoanCreateNestedOneWithoutTransactionsInput
    allocations?: PaymentAllocationCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    loanId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    reference: string
    providerRef?: string | null
    principalAmount?: Decimal | DecimalJsLike | number | string | null
    interestAmount?: Decimal | DecimalJsLike | number | string | null
    feeAmount?: Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    allocations?: PaymentAllocationUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: StringFieldUpdateOperationsInput | string
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null
    principalAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    feeAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loan?: LoanUpdateOneRequiredWithoutTransactionsNestedInput
    allocations?: PaymentAllocationUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: StringFieldUpdateOperationsInput | string
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null
    principalAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    feeAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allocations?: PaymentAllocationUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionCreateManyInput = {
    id?: string
    loanId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    reference: string
    providerRef?: string | null
    principalAmount?: Decimal | DecimalJsLike | number | string | null
    interestAmount?: Decimal | DecimalJsLike | number | string | null
    feeAmount?: Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: StringFieldUpdateOperationsInput | string
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null
    principalAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    feeAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: StringFieldUpdateOperationsInput | string
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null
    principalAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    feeAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentAllocationCreateInput = {
    id?: string
    principalAmount?: Decimal | DecimalJsLike | number | string
    interestAmount?: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    transaction: TransactionCreateNestedOneWithoutAllocationsInput
    schedule: RepaymentScheduleCreateNestedOneWithoutAllocationsInput
  }

  export type PaymentAllocationUncheckedCreateInput = {
    id?: string
    transactionId: string
    scheduleId: string
    principalAmount?: Decimal | DecimalJsLike | number | string
    interestAmount?: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PaymentAllocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUpdateOneRequiredWithoutAllocationsNestedInput
    schedule?: RepaymentScheduleUpdateOneRequiredWithoutAllocationsNestedInput
  }

  export type PaymentAllocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    scheduleId?: StringFieldUpdateOperationsInput | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentAllocationCreateManyInput = {
    id?: string
    transactionId: string
    scheduleId: string
    principalAmount?: Decimal | DecimalJsLike | number | string
    interestAmount?: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PaymentAllocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentAllocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    scheduleId?: StringFieldUpdateOperationsInput | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    timestamp?: Date | string
    actor: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    actorId: string
    action: string
    entityType: string
    entityId: string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    actorId: string
    action: string
    entityType: string
    entityId: string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedbackInput
    loan?: LoanCreateNestedOneWithoutFeedbackInput
  }

  export type FeedbackUncheckedCreateInput = {
    id?: string
    userId: string
    loanId?: string | null
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type FeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedbackNestedInput
    loan?: LoanUpdateOneWithoutFeedbackNestedInput
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyInput = {
    id?: string
    userId: string
    loanId?: string | null
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type FeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EnumKycStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKycStatusFilter<$PrismaModel> | $Enums.KycStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type LoanListRelationFilter = {
    every?: LoanWhereInput
    some?: LoanWhereInput
    none?: LoanWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type FeedbackListRelationFilter = {
    every?: FeedbackWhereInput
    some?: FeedbackWhereInput
    none?: FeedbackWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LoanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    occupation?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    kycStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    avatarUrl?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    occupation?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    kycStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    avatarUrl?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    occupation?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    kycStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    avatarUrl?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumKycStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKycStatusWithAggregatesFilter<$PrismaModel> | $Enums.KycStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumKycStatusFilter<$PrismaModel>
    _max?: NestedEnumKycStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumInterestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InterestType | EnumInterestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InterestType[] | ListEnumInterestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterestType[] | ListEnumInterestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInterestTypeFilter<$PrismaModel> | $Enums.InterestType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumTermUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.TermUnit | EnumTermUnitFieldRefInput<$PrismaModel>
    in?: $Enums.TermUnit[] | ListEnumTermUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.TermUnit[] | ListEnumTermUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumTermUnitFilter<$PrismaModel> | $Enums.TermUnit
  }

  export type EnumRepaymentFrequencyFilter<$PrismaModel = never> = {
    equals?: $Enums.RepaymentFrequency | EnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.RepaymentFrequency[] | ListEnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepaymentFrequency[] | ListEnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumRepaymentFrequencyFilter<$PrismaModel> | $Enums.RepaymentFrequency
  }

  export type EnumFeeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FeeType | EnumFeeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeeType[] | ListEnumFeeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeeType[] | ListEnumFeeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeeTypeFilter<$PrismaModel> | $Enums.FeeType
  }

  export type EnumLateFeeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LateFeeType | EnumLateFeeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LateFeeType[] | ListEnumLateFeeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LateFeeType[] | ListEnumLateFeeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLateFeeTypeFilter<$PrismaModel> | $Enums.LateFeeType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type LoanProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    interestRate?: SortOrder
    interestType?: SortOrder
    minTermValue?: SortOrder
    maxTermValue?: SortOrder
    termUnit?: SortOrder
    repaymentFrequency?: SortOrder
    processingFeeType?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeType?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanProductAvgOrderByAggregateInput = {
    minAmount?: SortOrder
    maxAmount?: SortOrder
    interestRate?: SortOrder
    minTermValue?: SortOrder
    maxTermValue?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
  }

  export type LoanProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    interestRate?: SortOrder
    interestType?: SortOrder
    minTermValue?: SortOrder
    maxTermValue?: SortOrder
    termUnit?: SortOrder
    repaymentFrequency?: SortOrder
    processingFeeType?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeType?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    interestRate?: SortOrder
    interestType?: SortOrder
    minTermValue?: SortOrder
    maxTermValue?: SortOrder
    termUnit?: SortOrder
    repaymentFrequency?: SortOrder
    processingFeeType?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeType?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanProductSumOrderByAggregateInput = {
    minAmount?: SortOrder
    maxAmount?: SortOrder
    interestRate?: SortOrder
    minTermValue?: SortOrder
    maxTermValue?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumInterestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InterestType | EnumInterestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InterestType[] | ListEnumInterestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterestType[] | ListEnumInterestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInterestTypeWithAggregatesFilter<$PrismaModel> | $Enums.InterestType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInterestTypeFilter<$PrismaModel>
    _max?: NestedEnumInterestTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTermUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TermUnit | EnumTermUnitFieldRefInput<$PrismaModel>
    in?: $Enums.TermUnit[] | ListEnumTermUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.TermUnit[] | ListEnumTermUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumTermUnitWithAggregatesFilter<$PrismaModel> | $Enums.TermUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTermUnitFilter<$PrismaModel>
    _max?: NestedEnumTermUnitFilter<$PrismaModel>
  }

  export type EnumRepaymentFrequencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RepaymentFrequency | EnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.RepaymentFrequency[] | ListEnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepaymentFrequency[] | ListEnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumRepaymentFrequencyWithAggregatesFilter<$PrismaModel> | $Enums.RepaymentFrequency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRepaymentFrequencyFilter<$PrismaModel>
    _max?: NestedEnumRepaymentFrequencyFilter<$PrismaModel>
  }

  export type EnumFeeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeeType | EnumFeeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeeType[] | ListEnumFeeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeeType[] | ListEnumFeeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeeTypeWithAggregatesFilter<$PrismaModel> | $Enums.FeeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeeTypeFilter<$PrismaModel>
    _max?: NestedEnumFeeTypeFilter<$PrismaModel>
  }

  export type EnumLateFeeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LateFeeType | EnumLateFeeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LateFeeType[] | ListEnumLateFeeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LateFeeType[] | ListEnumLateFeeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLateFeeTypeWithAggregatesFilter<$PrismaModel> | $Enums.LateFeeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLateFeeTypeFilter<$PrismaModel>
    _max?: NestedEnumLateFeeTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type LoanProductScalarRelationFilter = {
    is?: LoanProductWhereInput
    isNot?: LoanProductWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type RepaymentScheduleListRelationFilter = {
    every?: RepaymentScheduleWhereInput
    some?: RepaymentScheduleWhereInput
    none?: RepaymentScheduleWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type RepaymentScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoanCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    amount?: SortOrder
    purpose?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    interestRate?: SortOrder
    interestType?: SortOrder
    termValue?: SortOrder
    termUnit?: SortOrder
    numberOfInstallments?: SortOrder
    repaymentFrequency?: SortOrder
    processingFeeType?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeType?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    totalInterest?: SortOrder
    totalFees?: SortOrder
    totalPayable?: SortOrder
    rejectionReason?: SortOrder
    approvedAt?: SortOrder
    approvedById?: SortOrder
    disbursedAt?: SortOrder
    disbursedById?: SortOrder
    firstPaymentDueAt?: SortOrder
    maturityDate?: SortOrder
    closedAt?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type LoanAvgOrderByAggregateInput = {
    amount?: SortOrder
    interestRate?: SortOrder
    termValue?: SortOrder
    numberOfInstallments?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    totalInterest?: SortOrder
    totalFees?: SortOrder
    totalPayable?: SortOrder
    version?: SortOrder
  }

  export type LoanMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    amount?: SortOrder
    purpose?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    interestRate?: SortOrder
    interestType?: SortOrder
    termValue?: SortOrder
    termUnit?: SortOrder
    numberOfInstallments?: SortOrder
    repaymentFrequency?: SortOrder
    processingFeeType?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeType?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    totalInterest?: SortOrder
    totalFees?: SortOrder
    totalPayable?: SortOrder
    rejectionReason?: SortOrder
    approvedAt?: SortOrder
    approvedById?: SortOrder
    disbursedAt?: SortOrder
    disbursedById?: SortOrder
    firstPaymentDueAt?: SortOrder
    maturityDate?: SortOrder
    closedAt?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type LoanMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    amount?: SortOrder
    purpose?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    interestRate?: SortOrder
    interestType?: SortOrder
    termValue?: SortOrder
    termUnit?: SortOrder
    numberOfInstallments?: SortOrder
    repaymentFrequency?: SortOrder
    processingFeeType?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeType?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    totalInterest?: SortOrder
    totalFees?: SortOrder
    totalPayable?: SortOrder
    rejectionReason?: SortOrder
    approvedAt?: SortOrder
    approvedById?: SortOrder
    disbursedAt?: SortOrder
    disbursedById?: SortOrder
    firstPaymentDueAt?: SortOrder
    maturityDate?: SortOrder
    closedAt?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type LoanSumOrderByAggregateInput = {
    amount?: SortOrder
    interestRate?: SortOrder
    termValue?: SortOrder
    numberOfInstallments?: SortOrder
    processingFeeAmount?: SortOrder
    processingFeeRate?: SortOrder
    lateFeeAmount?: SortOrder
    lateFeeRate?: SortOrder
    gracePeriodDays?: SortOrder
    totalInterest?: SortOrder
    totalFees?: SortOrder
    totalPayable?: SortOrder
    version?: SortOrder
  }

  export type EnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type EnumInstallmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusFilter<$PrismaModel> | $Enums.InstallmentStatus
  }

  export type LoanScalarRelationFilter = {
    is?: LoanWhereInput
    isNot?: LoanWhereInput
  }

  export type PaymentAllocationListRelationFilter = {
    every?: PaymentAllocationWhereInput
    some?: PaymentAllocationWhereInput
    none?: PaymentAllocationWhereInput
  }

  export type PaymentAllocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RepaymentScheduleLoanIdInstallmentNumberCompoundUniqueInput = {
    loanId: string
    installmentNumber: number
  }

  export type RepaymentScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNumber?: SortOrder
    dueDate?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    baseAmountDue?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    principalPaid?: SortOrder
    interestPaid?: SortOrder
    feePaid?: SortOrder
    penaltyPaid?: SortOrder
    remainingBalance?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepaymentScheduleAvgOrderByAggregateInput = {
    installmentNumber?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    baseAmountDue?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    principalPaid?: SortOrder
    interestPaid?: SortOrder
    feePaid?: SortOrder
    penaltyPaid?: SortOrder
    remainingBalance?: SortOrder
  }

  export type RepaymentScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNumber?: SortOrder
    dueDate?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    baseAmountDue?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    principalPaid?: SortOrder
    interestPaid?: SortOrder
    feePaid?: SortOrder
    penaltyPaid?: SortOrder
    remainingBalance?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepaymentScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNumber?: SortOrder
    dueDate?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    baseAmountDue?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    principalPaid?: SortOrder
    interestPaid?: SortOrder
    feePaid?: SortOrder
    penaltyPaid?: SortOrder
    remainingBalance?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepaymentScheduleSumOrderByAggregateInput = {
    installmentNumber?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    baseAmountDue?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    principalPaid?: SortOrder
    interestPaid?: SortOrder
    feePaid?: SortOrder
    penaltyPaid?: SortOrder
    remainingBalance?: SortOrder
  }

  export type EnumInstallmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.InstallmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstallmentStatusFilter<$PrismaModel>
    _max?: NestedEnumInstallmentStatusFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    reference?: SortOrder
    providerRef?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    idempotencyKey?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    reference?: SortOrder
    providerRef?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    reference?: SortOrder
    providerRef?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type TransactionScalarRelationFilter = {
    is?: TransactionWhereInput
    isNot?: TransactionWhereInput
  }

  export type RepaymentScheduleScalarRelationFilter = {
    is?: RepaymentScheduleWhereInput
    isNot?: RepaymentScheduleWhereInput
  }

  export type PaymentAllocationTransactionIdScheduleIdCompoundUniqueInput = {
    transactionId: string
    scheduleId: string
  }

  export type PaymentAllocationCountOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    scheduleId?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentAllocationAvgOrderByAggregateInput = {
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
  }

  export type PaymentAllocationMaxOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    scheduleId?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentAllocationMinOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    scheduleId?: SortOrder
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentAllocationSumOrderByAggregateInput = {
    principalAmount?: SortOrder
    interestAmount?: SortOrder
    feeAmount?: SortOrder
    penaltyAmount?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    beforeState?: SortOrder
    afterState?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
  }

  export type LoanNullableScalarRelationFilter = {
    is?: LoanWhereInput | null
    isNot?: LoanWhereInput | null
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    loanId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    loanId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    loanId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type LoanCreateNestedManyWithoutUserInput = {
    create?: XOR<LoanCreateWithoutUserInput, LoanUncheckedCreateWithoutUserInput> | LoanCreateWithoutUserInput[] | LoanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutUserInput | LoanCreateOrConnectWithoutUserInput[]
    createMany?: LoanCreateManyUserInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutActorInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type LoanCreateNestedManyWithoutApprovedByInput = {
    create?: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput> | LoanCreateWithoutApprovedByInput[] | LoanUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutApprovedByInput | LoanCreateOrConnectWithoutApprovedByInput[]
    createMany?: LoanCreateManyApprovedByInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type LoanCreateNestedManyWithoutDisbursedByInput = {
    create?: XOR<LoanCreateWithoutDisbursedByInput, LoanUncheckedCreateWithoutDisbursedByInput> | LoanCreateWithoutDisbursedByInput[] | LoanUncheckedCreateWithoutDisbursedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutDisbursedByInput | LoanCreateOrConnectWithoutDisbursedByInput[]
    createMany?: LoanCreateManyDisbursedByInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LoanCreateWithoutUserInput, LoanUncheckedCreateWithoutUserInput> | LoanCreateWithoutUserInput[] | LoanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutUserInput | LoanCreateOrConnectWithoutUserInput[]
    createMany?: LoanCreateManyUserInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutActorInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutApprovedByInput = {
    create?: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput> | LoanCreateWithoutApprovedByInput[] | LoanUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutApprovedByInput | LoanCreateOrConnectWithoutApprovedByInput[]
    createMany?: LoanCreateManyApprovedByInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutDisbursedByInput = {
    create?: XOR<LoanCreateWithoutDisbursedByInput, LoanUncheckedCreateWithoutDisbursedByInput> | LoanCreateWithoutDisbursedByInput[] | LoanUncheckedCreateWithoutDisbursedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutDisbursedByInput | LoanCreateOrConnectWithoutDisbursedByInput[]
    createMany?: LoanCreateManyDisbursedByInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type EnumKycStatusFieldUpdateOperationsInput = {
    set?: $Enums.KycStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type LoanUpdateManyWithoutUserNestedInput = {
    create?: XOR<LoanCreateWithoutUserInput, LoanUncheckedCreateWithoutUserInput> | LoanCreateWithoutUserInput[] | LoanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutUserInput | LoanCreateOrConnectWithoutUserInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutUserInput | LoanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LoanCreateManyUserInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutUserInput | LoanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutUserInput | LoanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutActorNestedInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutActorInput | AuditLogUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutActorInput | AuditLogUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutActorInput | AuditLogUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutUserInput | FeedbackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutUserInput | FeedbackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutUserInput | FeedbackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type LoanUpdateManyWithoutApprovedByNestedInput = {
    create?: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput> | LoanCreateWithoutApprovedByInput[] | LoanUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutApprovedByInput | LoanCreateOrConnectWithoutApprovedByInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutApprovedByInput | LoanUpsertWithWhereUniqueWithoutApprovedByInput[]
    createMany?: LoanCreateManyApprovedByInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutApprovedByInput | LoanUpdateWithWhereUniqueWithoutApprovedByInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutApprovedByInput | LoanUpdateManyWithWhereWithoutApprovedByInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type LoanUpdateManyWithoutDisbursedByNestedInput = {
    create?: XOR<LoanCreateWithoutDisbursedByInput, LoanUncheckedCreateWithoutDisbursedByInput> | LoanCreateWithoutDisbursedByInput[] | LoanUncheckedCreateWithoutDisbursedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutDisbursedByInput | LoanCreateOrConnectWithoutDisbursedByInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutDisbursedByInput | LoanUpsertWithWhereUniqueWithoutDisbursedByInput[]
    createMany?: LoanCreateManyDisbursedByInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutDisbursedByInput | LoanUpdateWithWhereUniqueWithoutDisbursedByInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutDisbursedByInput | LoanUpdateManyWithWhereWithoutDisbursedByInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LoanCreateWithoutUserInput, LoanUncheckedCreateWithoutUserInput> | LoanCreateWithoutUserInput[] | LoanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutUserInput | LoanCreateOrConnectWithoutUserInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutUserInput | LoanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LoanCreateManyUserInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutUserInput | LoanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutUserInput | LoanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutActorNestedInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutActorInput | AuditLogUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutActorInput | AuditLogUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutActorInput | AuditLogUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutUserInput | FeedbackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutUserInput | FeedbackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutUserInput | FeedbackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutApprovedByNestedInput = {
    create?: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput> | LoanCreateWithoutApprovedByInput[] | LoanUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutApprovedByInput | LoanCreateOrConnectWithoutApprovedByInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutApprovedByInput | LoanUpsertWithWhereUniqueWithoutApprovedByInput[]
    createMany?: LoanCreateManyApprovedByInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutApprovedByInput | LoanUpdateWithWhereUniqueWithoutApprovedByInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutApprovedByInput | LoanUpdateManyWithWhereWithoutApprovedByInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutDisbursedByNestedInput = {
    create?: XOR<LoanCreateWithoutDisbursedByInput, LoanUncheckedCreateWithoutDisbursedByInput> | LoanCreateWithoutDisbursedByInput[] | LoanUncheckedCreateWithoutDisbursedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutDisbursedByInput | LoanCreateOrConnectWithoutDisbursedByInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutDisbursedByInput | LoanUpsertWithWhereUniqueWithoutDisbursedByInput[]
    createMany?: LoanCreateManyDisbursedByInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutDisbursedByInput | LoanUpdateWithWhereUniqueWithoutDisbursedByInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutDisbursedByInput | LoanUpdateManyWithWhereWithoutDisbursedByInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type LoanCreateNestedManyWithoutProductInput = {
    create?: XOR<LoanCreateWithoutProductInput, LoanUncheckedCreateWithoutProductInput> | LoanCreateWithoutProductInput[] | LoanUncheckedCreateWithoutProductInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutProductInput | LoanCreateOrConnectWithoutProductInput[]
    createMany?: LoanCreateManyProductInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<LoanCreateWithoutProductInput, LoanUncheckedCreateWithoutProductInput> | LoanCreateWithoutProductInput[] | LoanUncheckedCreateWithoutProductInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutProductInput | LoanCreateOrConnectWithoutProductInput[]
    createMany?: LoanCreateManyProductInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumInterestTypeFieldUpdateOperationsInput = {
    set?: $Enums.InterestType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumTermUnitFieldUpdateOperationsInput = {
    set?: $Enums.TermUnit
  }

  export type EnumRepaymentFrequencyFieldUpdateOperationsInput = {
    set?: $Enums.RepaymentFrequency
  }

  export type EnumFeeTypeFieldUpdateOperationsInput = {
    set?: $Enums.FeeType
  }

  export type EnumLateFeeTypeFieldUpdateOperationsInput = {
    set?: $Enums.LateFeeType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type LoanUpdateManyWithoutProductNestedInput = {
    create?: XOR<LoanCreateWithoutProductInput, LoanUncheckedCreateWithoutProductInput> | LoanCreateWithoutProductInput[] | LoanUncheckedCreateWithoutProductInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutProductInput | LoanCreateOrConnectWithoutProductInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutProductInput | LoanUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: LoanCreateManyProductInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutProductInput | LoanUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutProductInput | LoanUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<LoanCreateWithoutProductInput, LoanUncheckedCreateWithoutProductInput> | LoanCreateWithoutProductInput[] | LoanUncheckedCreateWithoutProductInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutProductInput | LoanCreateOrConnectWithoutProductInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutProductInput | LoanUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: LoanCreateManyProductInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutProductInput | LoanUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutProductInput | LoanUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutLoansInput = {
    create?: XOR<UserCreateWithoutLoansInput, UserUncheckedCreateWithoutLoansInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoansInput
    connect?: UserWhereUniqueInput
  }

  export type LoanProductCreateNestedOneWithoutLoansInput = {
    create?: XOR<LoanProductCreateWithoutLoansInput, LoanProductUncheckedCreateWithoutLoansInput>
    connectOrCreate?: LoanProductCreateOrConnectWithoutLoansInput
    connect?: LoanProductWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutApprovedLoansInput = {
    create?: XOR<UserCreateWithoutApprovedLoansInput, UserUncheckedCreateWithoutApprovedLoansInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedLoansInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDisbursedLoansInput = {
    create?: XOR<UserCreateWithoutDisbursedLoansInput, UserUncheckedCreateWithoutDisbursedLoansInput>
    connectOrCreate?: UserCreateOrConnectWithoutDisbursedLoansInput
    connect?: UserWhereUniqueInput
  }

  export type RepaymentScheduleCreateNestedManyWithoutLoanInput = {
    create?: XOR<RepaymentScheduleCreateWithoutLoanInput, RepaymentScheduleUncheckedCreateWithoutLoanInput> | RepaymentScheduleCreateWithoutLoanInput[] | RepaymentScheduleUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: RepaymentScheduleCreateOrConnectWithoutLoanInput | RepaymentScheduleCreateOrConnectWithoutLoanInput[]
    createMany?: RepaymentScheduleCreateManyLoanInputEnvelope
    connect?: RepaymentScheduleWhereUniqueInput | RepaymentScheduleWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutLoanInput = {
    create?: XOR<TransactionCreateWithoutLoanInput, TransactionUncheckedCreateWithoutLoanInput> | TransactionCreateWithoutLoanInput[] | TransactionUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLoanInput | TransactionCreateOrConnectWithoutLoanInput[]
    createMany?: TransactionCreateManyLoanInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutLoanInput = {
    create?: XOR<FeedbackCreateWithoutLoanInput, FeedbackUncheckedCreateWithoutLoanInput> | FeedbackCreateWithoutLoanInput[] | FeedbackUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutLoanInput | FeedbackCreateOrConnectWithoutLoanInput[]
    createMany?: FeedbackCreateManyLoanInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type RepaymentScheduleUncheckedCreateNestedManyWithoutLoanInput = {
    create?: XOR<RepaymentScheduleCreateWithoutLoanInput, RepaymentScheduleUncheckedCreateWithoutLoanInput> | RepaymentScheduleCreateWithoutLoanInput[] | RepaymentScheduleUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: RepaymentScheduleCreateOrConnectWithoutLoanInput | RepaymentScheduleCreateOrConnectWithoutLoanInput[]
    createMany?: RepaymentScheduleCreateManyLoanInputEnvelope
    connect?: RepaymentScheduleWhereUniqueInput | RepaymentScheduleWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutLoanInput = {
    create?: XOR<TransactionCreateWithoutLoanInput, TransactionUncheckedCreateWithoutLoanInput> | TransactionCreateWithoutLoanInput[] | TransactionUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLoanInput | TransactionCreateOrConnectWithoutLoanInput[]
    createMany?: TransactionCreateManyLoanInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutLoanInput = {
    create?: XOR<FeedbackCreateWithoutLoanInput, FeedbackUncheckedCreateWithoutLoanInput> | FeedbackCreateWithoutLoanInput[] | FeedbackUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutLoanInput | FeedbackCreateOrConnectWithoutLoanInput[]
    createMany?: FeedbackCreateManyLoanInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type EnumLoanStatusFieldUpdateOperationsInput = {
    set?: $Enums.LoanStatus
  }

  export type UserUpdateOneRequiredWithoutLoansNestedInput = {
    create?: XOR<UserCreateWithoutLoansInput, UserUncheckedCreateWithoutLoansInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoansInput
    upsert?: UserUpsertWithoutLoansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLoansInput, UserUpdateWithoutLoansInput>, UserUncheckedUpdateWithoutLoansInput>
  }

  export type LoanProductUpdateOneRequiredWithoutLoansNestedInput = {
    create?: XOR<LoanProductCreateWithoutLoansInput, LoanProductUncheckedCreateWithoutLoansInput>
    connectOrCreate?: LoanProductCreateOrConnectWithoutLoansInput
    upsert?: LoanProductUpsertWithoutLoansInput
    connect?: LoanProductWhereUniqueInput
    update?: XOR<XOR<LoanProductUpdateToOneWithWhereWithoutLoansInput, LoanProductUpdateWithoutLoansInput>, LoanProductUncheckedUpdateWithoutLoansInput>
  }

  export type UserUpdateOneWithoutApprovedLoansNestedInput = {
    create?: XOR<UserCreateWithoutApprovedLoansInput, UserUncheckedCreateWithoutApprovedLoansInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedLoansInput
    upsert?: UserUpsertWithoutApprovedLoansInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApprovedLoansInput, UserUpdateWithoutApprovedLoansInput>, UserUncheckedUpdateWithoutApprovedLoansInput>
  }

  export type UserUpdateOneWithoutDisbursedLoansNestedInput = {
    create?: XOR<UserCreateWithoutDisbursedLoansInput, UserUncheckedCreateWithoutDisbursedLoansInput>
    connectOrCreate?: UserCreateOrConnectWithoutDisbursedLoansInput
    upsert?: UserUpsertWithoutDisbursedLoansInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDisbursedLoansInput, UserUpdateWithoutDisbursedLoansInput>, UserUncheckedUpdateWithoutDisbursedLoansInput>
  }

  export type RepaymentScheduleUpdateManyWithoutLoanNestedInput = {
    create?: XOR<RepaymentScheduleCreateWithoutLoanInput, RepaymentScheduleUncheckedCreateWithoutLoanInput> | RepaymentScheduleCreateWithoutLoanInput[] | RepaymentScheduleUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: RepaymentScheduleCreateOrConnectWithoutLoanInput | RepaymentScheduleCreateOrConnectWithoutLoanInput[]
    upsert?: RepaymentScheduleUpsertWithWhereUniqueWithoutLoanInput | RepaymentScheduleUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: RepaymentScheduleCreateManyLoanInputEnvelope
    set?: RepaymentScheduleWhereUniqueInput | RepaymentScheduleWhereUniqueInput[]
    disconnect?: RepaymentScheduleWhereUniqueInput | RepaymentScheduleWhereUniqueInput[]
    delete?: RepaymentScheduleWhereUniqueInput | RepaymentScheduleWhereUniqueInput[]
    connect?: RepaymentScheduleWhereUniqueInput | RepaymentScheduleWhereUniqueInput[]
    update?: RepaymentScheduleUpdateWithWhereUniqueWithoutLoanInput | RepaymentScheduleUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: RepaymentScheduleUpdateManyWithWhereWithoutLoanInput | RepaymentScheduleUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: RepaymentScheduleScalarWhereInput | RepaymentScheduleScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutLoanNestedInput = {
    create?: XOR<TransactionCreateWithoutLoanInput, TransactionUncheckedCreateWithoutLoanInput> | TransactionCreateWithoutLoanInput[] | TransactionUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLoanInput | TransactionCreateOrConnectWithoutLoanInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutLoanInput | TransactionUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: TransactionCreateManyLoanInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutLoanInput | TransactionUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutLoanInput | TransactionUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutLoanNestedInput = {
    create?: XOR<FeedbackCreateWithoutLoanInput, FeedbackUncheckedCreateWithoutLoanInput> | FeedbackCreateWithoutLoanInput[] | FeedbackUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutLoanInput | FeedbackCreateOrConnectWithoutLoanInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutLoanInput | FeedbackUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: FeedbackCreateManyLoanInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutLoanInput | FeedbackUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutLoanInput | FeedbackUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type RepaymentScheduleUncheckedUpdateManyWithoutLoanNestedInput = {
    create?: XOR<RepaymentScheduleCreateWithoutLoanInput, RepaymentScheduleUncheckedCreateWithoutLoanInput> | RepaymentScheduleCreateWithoutLoanInput[] | RepaymentScheduleUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: RepaymentScheduleCreateOrConnectWithoutLoanInput | RepaymentScheduleCreateOrConnectWithoutLoanInput[]
    upsert?: RepaymentScheduleUpsertWithWhereUniqueWithoutLoanInput | RepaymentScheduleUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: RepaymentScheduleCreateManyLoanInputEnvelope
    set?: RepaymentScheduleWhereUniqueInput | RepaymentScheduleWhereUniqueInput[]
    disconnect?: RepaymentScheduleWhereUniqueInput | RepaymentScheduleWhereUniqueInput[]
    delete?: RepaymentScheduleWhereUniqueInput | RepaymentScheduleWhereUniqueInput[]
    connect?: RepaymentScheduleWhereUniqueInput | RepaymentScheduleWhereUniqueInput[]
    update?: RepaymentScheduleUpdateWithWhereUniqueWithoutLoanInput | RepaymentScheduleUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: RepaymentScheduleUpdateManyWithWhereWithoutLoanInput | RepaymentScheduleUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: RepaymentScheduleScalarWhereInput | RepaymentScheduleScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutLoanNestedInput = {
    create?: XOR<TransactionCreateWithoutLoanInput, TransactionUncheckedCreateWithoutLoanInput> | TransactionCreateWithoutLoanInput[] | TransactionUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLoanInput | TransactionCreateOrConnectWithoutLoanInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutLoanInput | TransactionUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: TransactionCreateManyLoanInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutLoanInput | TransactionUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutLoanInput | TransactionUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutLoanNestedInput = {
    create?: XOR<FeedbackCreateWithoutLoanInput, FeedbackUncheckedCreateWithoutLoanInput> | FeedbackCreateWithoutLoanInput[] | FeedbackUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutLoanInput | FeedbackCreateOrConnectWithoutLoanInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutLoanInput | FeedbackUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: FeedbackCreateManyLoanInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutLoanInput | FeedbackUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutLoanInput | FeedbackUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type LoanCreateNestedOneWithoutRepaymentsInput = {
    create?: XOR<LoanCreateWithoutRepaymentsInput, LoanUncheckedCreateWithoutRepaymentsInput>
    connectOrCreate?: LoanCreateOrConnectWithoutRepaymentsInput
    connect?: LoanWhereUniqueInput
  }

  export type PaymentAllocationCreateNestedManyWithoutScheduleInput = {
    create?: XOR<PaymentAllocationCreateWithoutScheduleInput, PaymentAllocationUncheckedCreateWithoutScheduleInput> | PaymentAllocationCreateWithoutScheduleInput[] | PaymentAllocationUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: PaymentAllocationCreateOrConnectWithoutScheduleInput | PaymentAllocationCreateOrConnectWithoutScheduleInput[]
    createMany?: PaymentAllocationCreateManyScheduleInputEnvelope
    connect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
  }

  export type PaymentAllocationUncheckedCreateNestedManyWithoutScheduleInput = {
    create?: XOR<PaymentAllocationCreateWithoutScheduleInput, PaymentAllocationUncheckedCreateWithoutScheduleInput> | PaymentAllocationCreateWithoutScheduleInput[] | PaymentAllocationUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: PaymentAllocationCreateOrConnectWithoutScheduleInput | PaymentAllocationCreateOrConnectWithoutScheduleInput[]
    createMany?: PaymentAllocationCreateManyScheduleInputEnvelope
    connect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
  }

  export type EnumInstallmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.InstallmentStatus
  }

  export type LoanUpdateOneRequiredWithoutRepaymentsNestedInput = {
    create?: XOR<LoanCreateWithoutRepaymentsInput, LoanUncheckedCreateWithoutRepaymentsInput>
    connectOrCreate?: LoanCreateOrConnectWithoutRepaymentsInput
    upsert?: LoanUpsertWithoutRepaymentsInput
    connect?: LoanWhereUniqueInput
    update?: XOR<XOR<LoanUpdateToOneWithWhereWithoutRepaymentsInput, LoanUpdateWithoutRepaymentsInput>, LoanUncheckedUpdateWithoutRepaymentsInput>
  }

  export type PaymentAllocationUpdateManyWithoutScheduleNestedInput = {
    create?: XOR<PaymentAllocationCreateWithoutScheduleInput, PaymentAllocationUncheckedCreateWithoutScheduleInput> | PaymentAllocationCreateWithoutScheduleInput[] | PaymentAllocationUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: PaymentAllocationCreateOrConnectWithoutScheduleInput | PaymentAllocationCreateOrConnectWithoutScheduleInput[]
    upsert?: PaymentAllocationUpsertWithWhereUniqueWithoutScheduleInput | PaymentAllocationUpsertWithWhereUniqueWithoutScheduleInput[]
    createMany?: PaymentAllocationCreateManyScheduleInputEnvelope
    set?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    disconnect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    delete?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    connect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    update?: PaymentAllocationUpdateWithWhereUniqueWithoutScheduleInput | PaymentAllocationUpdateWithWhereUniqueWithoutScheduleInput[]
    updateMany?: PaymentAllocationUpdateManyWithWhereWithoutScheduleInput | PaymentAllocationUpdateManyWithWhereWithoutScheduleInput[]
    deleteMany?: PaymentAllocationScalarWhereInput | PaymentAllocationScalarWhereInput[]
  }

  export type PaymentAllocationUncheckedUpdateManyWithoutScheduleNestedInput = {
    create?: XOR<PaymentAllocationCreateWithoutScheduleInput, PaymentAllocationUncheckedCreateWithoutScheduleInput> | PaymentAllocationCreateWithoutScheduleInput[] | PaymentAllocationUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: PaymentAllocationCreateOrConnectWithoutScheduleInput | PaymentAllocationCreateOrConnectWithoutScheduleInput[]
    upsert?: PaymentAllocationUpsertWithWhereUniqueWithoutScheduleInput | PaymentAllocationUpsertWithWhereUniqueWithoutScheduleInput[]
    createMany?: PaymentAllocationCreateManyScheduleInputEnvelope
    set?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    disconnect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    delete?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    connect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    update?: PaymentAllocationUpdateWithWhereUniqueWithoutScheduleInput | PaymentAllocationUpdateWithWhereUniqueWithoutScheduleInput[]
    updateMany?: PaymentAllocationUpdateManyWithWhereWithoutScheduleInput | PaymentAllocationUpdateManyWithWhereWithoutScheduleInput[]
    deleteMany?: PaymentAllocationScalarWhereInput | PaymentAllocationScalarWhereInput[]
  }

  export type LoanCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<LoanCreateWithoutTransactionsInput, LoanUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: LoanCreateOrConnectWithoutTransactionsInput
    connect?: LoanWhereUniqueInput
  }

  export type PaymentAllocationCreateNestedManyWithoutTransactionInput = {
    create?: XOR<PaymentAllocationCreateWithoutTransactionInput, PaymentAllocationUncheckedCreateWithoutTransactionInput> | PaymentAllocationCreateWithoutTransactionInput[] | PaymentAllocationUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: PaymentAllocationCreateOrConnectWithoutTransactionInput | PaymentAllocationCreateOrConnectWithoutTransactionInput[]
    createMany?: PaymentAllocationCreateManyTransactionInputEnvelope
    connect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
  }

  export type PaymentAllocationUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<PaymentAllocationCreateWithoutTransactionInput, PaymentAllocationUncheckedCreateWithoutTransactionInput> | PaymentAllocationCreateWithoutTransactionInput[] | PaymentAllocationUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: PaymentAllocationCreateOrConnectWithoutTransactionInput | PaymentAllocationCreateOrConnectWithoutTransactionInput[]
    createMany?: PaymentAllocationCreateManyTransactionInputEnvelope
    connect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type LoanUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<LoanCreateWithoutTransactionsInput, LoanUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: LoanCreateOrConnectWithoutTransactionsInput
    upsert?: LoanUpsertWithoutTransactionsInput
    connect?: LoanWhereUniqueInput
    update?: XOR<XOR<LoanUpdateToOneWithWhereWithoutTransactionsInput, LoanUpdateWithoutTransactionsInput>, LoanUncheckedUpdateWithoutTransactionsInput>
  }

  export type PaymentAllocationUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<PaymentAllocationCreateWithoutTransactionInput, PaymentAllocationUncheckedCreateWithoutTransactionInput> | PaymentAllocationCreateWithoutTransactionInput[] | PaymentAllocationUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: PaymentAllocationCreateOrConnectWithoutTransactionInput | PaymentAllocationCreateOrConnectWithoutTransactionInput[]
    upsert?: PaymentAllocationUpsertWithWhereUniqueWithoutTransactionInput | PaymentAllocationUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: PaymentAllocationCreateManyTransactionInputEnvelope
    set?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    disconnect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    delete?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    connect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    update?: PaymentAllocationUpdateWithWhereUniqueWithoutTransactionInput | PaymentAllocationUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: PaymentAllocationUpdateManyWithWhereWithoutTransactionInput | PaymentAllocationUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: PaymentAllocationScalarWhereInput | PaymentAllocationScalarWhereInput[]
  }

  export type PaymentAllocationUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<PaymentAllocationCreateWithoutTransactionInput, PaymentAllocationUncheckedCreateWithoutTransactionInput> | PaymentAllocationCreateWithoutTransactionInput[] | PaymentAllocationUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: PaymentAllocationCreateOrConnectWithoutTransactionInput | PaymentAllocationCreateOrConnectWithoutTransactionInput[]
    upsert?: PaymentAllocationUpsertWithWhereUniqueWithoutTransactionInput | PaymentAllocationUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: PaymentAllocationCreateManyTransactionInputEnvelope
    set?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    disconnect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    delete?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    connect?: PaymentAllocationWhereUniqueInput | PaymentAllocationWhereUniqueInput[]
    update?: PaymentAllocationUpdateWithWhereUniqueWithoutTransactionInput | PaymentAllocationUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: PaymentAllocationUpdateManyWithWhereWithoutTransactionInput | PaymentAllocationUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: PaymentAllocationScalarWhereInput | PaymentAllocationScalarWhereInput[]
  }

  export type TransactionCreateNestedOneWithoutAllocationsInput = {
    create?: XOR<TransactionCreateWithoutAllocationsInput, TransactionUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutAllocationsInput
    connect?: TransactionWhereUniqueInput
  }

  export type RepaymentScheduleCreateNestedOneWithoutAllocationsInput = {
    create?: XOR<RepaymentScheduleCreateWithoutAllocationsInput, RepaymentScheduleUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: RepaymentScheduleCreateOrConnectWithoutAllocationsInput
    connect?: RepaymentScheduleWhereUniqueInput
  }

  export type TransactionUpdateOneRequiredWithoutAllocationsNestedInput = {
    create?: XOR<TransactionCreateWithoutAllocationsInput, TransactionUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutAllocationsInput
    upsert?: TransactionUpsertWithoutAllocationsInput
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutAllocationsInput, TransactionUpdateWithoutAllocationsInput>, TransactionUncheckedUpdateWithoutAllocationsInput>
  }

  export type RepaymentScheduleUpdateOneRequiredWithoutAllocationsNestedInput = {
    create?: XOR<RepaymentScheduleCreateWithoutAllocationsInput, RepaymentScheduleUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: RepaymentScheduleCreateOrConnectWithoutAllocationsInput
    upsert?: RepaymentScheduleUpsertWithoutAllocationsInput
    connect?: RepaymentScheduleWhereUniqueInput
    update?: XOR<XOR<RepaymentScheduleUpdateToOneWithWhereWithoutAllocationsInput, RepaymentScheduleUpdateWithoutAllocationsInput>, RepaymentScheduleUncheckedUpdateWithoutAllocationsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserCreateNestedOneWithoutFeedbackInput = {
    create?: XOR<UserCreateWithoutFeedbackInput, UserUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbackInput
    connect?: UserWhereUniqueInput
  }

  export type LoanCreateNestedOneWithoutFeedbackInput = {
    create?: XOR<LoanCreateWithoutFeedbackInput, LoanUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: LoanCreateOrConnectWithoutFeedbackInput
    connect?: LoanWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFeedbackNestedInput = {
    create?: XOR<UserCreateWithoutFeedbackInput, UserUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbackInput
    upsert?: UserUpsertWithoutFeedbackInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedbackInput, UserUpdateWithoutFeedbackInput>, UserUncheckedUpdateWithoutFeedbackInput>
  }

  export type LoanUpdateOneWithoutFeedbackNestedInput = {
    create?: XOR<LoanCreateWithoutFeedbackInput, LoanUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: LoanCreateOrConnectWithoutFeedbackInput
    upsert?: LoanUpsertWithoutFeedbackInput
    disconnect?: LoanWhereInput | boolean
    delete?: LoanWhereInput | boolean
    connect?: LoanWhereUniqueInput
    update?: XOR<XOR<LoanUpdateToOneWithWhereWithoutFeedbackInput, LoanUpdateWithoutFeedbackInput>, LoanUncheckedUpdateWithoutFeedbackInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumKycStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKycStatusFilter<$PrismaModel> | $Enums.KycStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumKycStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKycStatusWithAggregatesFilter<$PrismaModel> | $Enums.KycStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumKycStatusFilter<$PrismaModel>
    _max?: NestedEnumKycStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumInterestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InterestType | EnumInterestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InterestType[] | ListEnumInterestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterestType[] | ListEnumInterestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInterestTypeFilter<$PrismaModel> | $Enums.InterestType
  }

  export type NestedEnumTermUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.TermUnit | EnumTermUnitFieldRefInput<$PrismaModel>
    in?: $Enums.TermUnit[] | ListEnumTermUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.TermUnit[] | ListEnumTermUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumTermUnitFilter<$PrismaModel> | $Enums.TermUnit
  }

  export type NestedEnumRepaymentFrequencyFilter<$PrismaModel = never> = {
    equals?: $Enums.RepaymentFrequency | EnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.RepaymentFrequency[] | ListEnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepaymentFrequency[] | ListEnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumRepaymentFrequencyFilter<$PrismaModel> | $Enums.RepaymentFrequency
  }

  export type NestedEnumFeeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FeeType | EnumFeeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeeType[] | ListEnumFeeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeeType[] | ListEnumFeeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeeTypeFilter<$PrismaModel> | $Enums.FeeType
  }

  export type NestedEnumLateFeeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LateFeeType | EnumLateFeeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LateFeeType[] | ListEnumLateFeeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LateFeeType[] | ListEnumLateFeeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLateFeeTypeFilter<$PrismaModel> | $Enums.LateFeeType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumInterestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InterestType | EnumInterestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InterestType[] | ListEnumInterestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterestType[] | ListEnumInterestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInterestTypeWithAggregatesFilter<$PrismaModel> | $Enums.InterestType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInterestTypeFilter<$PrismaModel>
    _max?: NestedEnumInterestTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTermUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TermUnit | EnumTermUnitFieldRefInput<$PrismaModel>
    in?: $Enums.TermUnit[] | ListEnumTermUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.TermUnit[] | ListEnumTermUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumTermUnitWithAggregatesFilter<$PrismaModel> | $Enums.TermUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTermUnitFilter<$PrismaModel>
    _max?: NestedEnumTermUnitFilter<$PrismaModel>
  }

  export type NestedEnumRepaymentFrequencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RepaymentFrequency | EnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.RepaymentFrequency[] | ListEnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.RepaymentFrequency[] | ListEnumRepaymentFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumRepaymentFrequencyWithAggregatesFilter<$PrismaModel> | $Enums.RepaymentFrequency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRepaymentFrequencyFilter<$PrismaModel>
    _max?: NestedEnumRepaymentFrequencyFilter<$PrismaModel>
  }

  export type NestedEnumFeeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeeType | EnumFeeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeeType[] | ListEnumFeeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeeType[] | ListEnumFeeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeeTypeWithAggregatesFilter<$PrismaModel> | $Enums.FeeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeeTypeFilter<$PrismaModel>
    _max?: NestedEnumFeeTypeFilter<$PrismaModel>
  }

  export type NestedEnumLateFeeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LateFeeType | EnumLateFeeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LateFeeType[] | ListEnumLateFeeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LateFeeType[] | ListEnumLateFeeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLateFeeTypeWithAggregatesFilter<$PrismaModel> | $Enums.LateFeeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLateFeeTypeFilter<$PrismaModel>
    _max?: NestedEnumLateFeeTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type NestedEnumInstallmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusFilter<$PrismaModel> | $Enums.InstallmentStatus
  }

  export type NestedEnumInstallmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallmentStatus | EnumInstallmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstallmentStatus[] | ListEnumInstallmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInstallmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.InstallmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstallmentStatusFilter<$PrismaModel>
    _max?: NestedEnumInstallmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LoanCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    disbursedAt?: Date | string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    product: LoanProductCreateNestedOneWithoutLoansInput
    approvedBy?: UserCreateNestedOneWithoutApprovedLoansInput
    disbursedBy?: UserCreateNestedOneWithoutDisbursedLoansInput
    repayments?: RepaymentScheduleCreateNestedManyWithoutLoanInput
    transactions?: TransactionCreateNestedManyWithoutLoanInput
    feedback?: FeedbackCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateWithoutUserInput = {
    id?: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    repayments?: RepaymentScheduleUncheckedCreateNestedManyWithoutLoanInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoanInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutUserInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutUserInput, LoanUncheckedCreateWithoutUserInput>
  }

  export type LoanCreateManyUserInputEnvelope = {
    data: LoanCreateManyUserInput | LoanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutActorInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutActorInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    timestamp?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput>
  }

  export type AuditLogCreateManyActorInputEnvelope = {
    data: AuditLogCreateManyActorInput | AuditLogCreateManyActorInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutUserInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    loan?: LoanCreateNestedOneWithoutFeedbackInput
  }

  export type FeedbackUncheckedCreateWithoutUserInput = {
    id?: string
    loanId?: string | null
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput>
  }

  export type FeedbackCreateManyUserInputEnvelope = {
    data: FeedbackCreateManyUserInput | FeedbackCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LoanCreateWithoutApprovedByInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    disbursedAt?: Date | string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutLoansInput
    product: LoanProductCreateNestedOneWithoutLoansInput
    disbursedBy?: UserCreateNestedOneWithoutDisbursedLoansInput
    repayments?: RepaymentScheduleCreateNestedManyWithoutLoanInput
    transactions?: TransactionCreateNestedManyWithoutLoanInput
    feedback?: FeedbackCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateWithoutApprovedByInput = {
    id?: string
    userId: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    repayments?: RepaymentScheduleUncheckedCreateNestedManyWithoutLoanInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoanInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutApprovedByInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput>
  }

  export type LoanCreateManyApprovedByInputEnvelope = {
    data: LoanCreateManyApprovedByInput | LoanCreateManyApprovedByInput[]
    skipDuplicates?: boolean
  }

  export type LoanCreateWithoutDisbursedByInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    disbursedAt?: Date | string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutLoansInput
    product: LoanProductCreateNestedOneWithoutLoansInput
    approvedBy?: UserCreateNestedOneWithoutApprovedLoansInput
    repayments?: RepaymentScheduleCreateNestedManyWithoutLoanInput
    transactions?: TransactionCreateNestedManyWithoutLoanInput
    feedback?: FeedbackCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateWithoutDisbursedByInput = {
    id?: string
    userId: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    repayments?: RepaymentScheduleUncheckedCreateNestedManyWithoutLoanInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoanInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutDisbursedByInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutDisbursedByInput, LoanUncheckedCreateWithoutDisbursedByInput>
  }

  export type LoanCreateManyDisbursedByInputEnvelope = {
    data: LoanCreateManyDisbursedByInput | LoanCreateManyDisbursedByInput[]
    skipDuplicates?: boolean
  }

  export type LoanUpsertWithWhereUniqueWithoutUserInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutUserInput, LoanUncheckedUpdateWithoutUserInput>
    create: XOR<LoanCreateWithoutUserInput, LoanUncheckedCreateWithoutUserInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutUserInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutUserInput, LoanUncheckedUpdateWithoutUserInput>
  }

  export type LoanUpdateManyWithWhereWithoutUserInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutUserInput>
  }

  export type LoanScalarWhereInput = {
    AND?: LoanScalarWhereInput | LoanScalarWhereInput[]
    OR?: LoanScalarWhereInput[]
    NOT?: LoanScalarWhereInput | LoanScalarWhereInput[]
    id?: StringFilter<"Loan"> | string
    userId?: StringFilter<"Loan"> | string
    productId?: StringFilter<"Loan"> | string
    amount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    purpose?: StringFilter<"Loan"> | string
    notes?: StringNullableFilter<"Loan"> | string | null
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    interestRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFilter<"Loan"> | $Enums.InterestType
    termValue?: IntFilter<"Loan"> | number
    termUnit?: EnumTermUnitFilter<"Loan"> | $Enums.TermUnit
    numberOfInstallments?: IntFilter<"Loan"> | number
    repaymentFrequency?: EnumRepaymentFrequencyFilter<"Loan"> | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFilter<"Loan"> | $Enums.FeeType
    processingFeeAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFilter<"Loan"> | $Enums.LateFeeType
    lateFeeAmount?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFilter<"Loan"> | number
    totalInterest?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFilter<"Loan"> | Decimal | DecimalJsLike | number | string
    rejectionReason?: StringNullableFilter<"Loan"> | string | null
    approvedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    approvedById?: StringNullableFilter<"Loan"> | string | null
    disbursedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    disbursedById?: StringNullableFilter<"Loan"> | string | null
    firstPaymentDueAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    maturityDate?: DateTimeNullableFilter<"Loan"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    version?: IntFilter<"Loan"> | number
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    updatedAt?: DateTimeFilter<"Loan"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutActorInput, AuditLogUncheckedUpdateWithoutActorInput>
    create: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutActorInput, AuditLogUncheckedUpdateWithoutActorInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutActorInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutActorInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    actorId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    beforeState?: JsonNullableFilter<"AuditLog">
    afterState?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutUserInput, FeedbackUncheckedUpdateWithoutUserInput>
    create: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutUserInput, FeedbackUncheckedUpdateWithoutUserInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutUserInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutUserInput>
  }

  export type FeedbackScalarWhereInput = {
    AND?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    OR?: FeedbackScalarWhereInput[]
    NOT?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    id?: StringFilter<"Feedback"> | string
    userId?: StringFilter<"Feedback"> | string
    loanId?: StringNullableFilter<"Feedback"> | string | null
    rating?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
  }

  export type LoanUpsertWithWhereUniqueWithoutApprovedByInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutApprovedByInput, LoanUncheckedUpdateWithoutApprovedByInput>
    create: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutApprovedByInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutApprovedByInput, LoanUncheckedUpdateWithoutApprovedByInput>
  }

  export type LoanUpdateManyWithWhereWithoutApprovedByInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutApprovedByInput>
  }

  export type LoanUpsertWithWhereUniqueWithoutDisbursedByInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutDisbursedByInput, LoanUncheckedUpdateWithoutDisbursedByInput>
    create: XOR<LoanCreateWithoutDisbursedByInput, LoanUncheckedCreateWithoutDisbursedByInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutDisbursedByInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutDisbursedByInput, LoanUncheckedUpdateWithoutDisbursedByInput>
  }

  export type LoanUpdateManyWithWhereWithoutDisbursedByInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutDisbursedByInput>
  }

  export type LoanCreateWithoutProductInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    disbursedAt?: Date | string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutLoansInput
    approvedBy?: UserCreateNestedOneWithoutApprovedLoansInput
    disbursedBy?: UserCreateNestedOneWithoutDisbursedLoansInput
    repayments?: RepaymentScheduleCreateNestedManyWithoutLoanInput
    transactions?: TransactionCreateNestedManyWithoutLoanInput
    feedback?: FeedbackCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateWithoutProductInput = {
    id?: string
    userId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    repayments?: RepaymentScheduleUncheckedCreateNestedManyWithoutLoanInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoanInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutProductInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutProductInput, LoanUncheckedCreateWithoutProductInput>
  }

  export type LoanCreateManyProductInputEnvelope = {
    data: LoanCreateManyProductInput | LoanCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type LoanUpsertWithWhereUniqueWithoutProductInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutProductInput, LoanUncheckedUpdateWithoutProductInput>
    create: XOR<LoanCreateWithoutProductInput, LoanUncheckedCreateWithoutProductInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutProductInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutProductInput, LoanUncheckedUpdateWithoutProductInput>
  }

  export type LoanUpdateManyWithWhereWithoutProductInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutProductInput>
  }

  export type UserCreateWithoutLoansInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    feedback?: FeedbackCreateNestedManyWithoutUserInput
    approvedLoans?: LoanCreateNestedManyWithoutApprovedByInput
    disbursedLoans?: LoanCreateNestedManyWithoutDisbursedByInput
  }

  export type UserUncheckedCreateWithoutLoansInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    approvedLoans?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    disbursedLoans?: LoanUncheckedCreateNestedManyWithoutDisbursedByInput
  }

  export type UserCreateOrConnectWithoutLoansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLoansInput, UserUncheckedCreateWithoutLoansInput>
  }

  export type LoanProductCreateWithoutLoansInput = {
    id?: string
    name: string
    description?: string | null
    minAmount: Decimal | DecimalJsLike | number | string
    maxAmount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    minTermValue: number
    maxTermValue: number
    termUnit: $Enums.TermUnit
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType?: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType?: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanProductUncheckedCreateWithoutLoansInput = {
    id?: string
    name: string
    description?: string | null
    minAmount: Decimal | DecimalJsLike | number | string
    maxAmount: Decimal | DecimalJsLike | number | string
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    minTermValue: number
    maxTermValue: number
    termUnit: $Enums.TermUnit
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType?: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType?: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanProductCreateOrConnectWithoutLoansInput = {
    where: LoanProductWhereUniqueInput
    create: XOR<LoanProductCreateWithoutLoansInput, LoanProductUncheckedCreateWithoutLoansInput>
  }

  export type UserCreateWithoutApprovedLoansInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    loans?: LoanCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    feedback?: FeedbackCreateNestedManyWithoutUserInput
    disbursedLoans?: LoanCreateNestedManyWithoutDisbursedByInput
  }

  export type UserUncheckedCreateWithoutApprovedLoansInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    loans?: LoanUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    disbursedLoans?: LoanUncheckedCreateNestedManyWithoutDisbursedByInput
  }

  export type UserCreateOrConnectWithoutApprovedLoansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApprovedLoansInput, UserUncheckedCreateWithoutApprovedLoansInput>
  }

  export type UserCreateWithoutDisbursedLoansInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    loans?: LoanCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    feedback?: FeedbackCreateNestedManyWithoutUserInput
    approvedLoans?: LoanCreateNestedManyWithoutApprovedByInput
  }

  export type UserUncheckedCreateWithoutDisbursedLoansInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    loans?: LoanUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    approvedLoans?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
  }

  export type UserCreateOrConnectWithoutDisbursedLoansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDisbursedLoansInput, UserUncheckedCreateWithoutDisbursedLoansInput>
  }

  export type RepaymentScheduleCreateWithoutLoanInput = {
    id?: string
    installmentNumber: number
    dueDate: Date | string
    principalAmount: Decimal | DecimalJsLike | number | string
    interestAmount: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    baseAmountDue: Decimal | DecimalJsLike | number | string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    principalPaid?: Decimal | DecimalJsLike | number | string
    interestPaid?: Decimal | DecimalJsLike | number | string
    feePaid?: Decimal | DecimalJsLike | number | string
    penaltyPaid?: Decimal | DecimalJsLike | number | string
    remainingBalance: Decimal | DecimalJsLike | number | string
    status?: $Enums.InstallmentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    allocations?: PaymentAllocationCreateNestedManyWithoutScheduleInput
  }

  export type RepaymentScheduleUncheckedCreateWithoutLoanInput = {
    id?: string
    installmentNumber: number
    dueDate: Date | string
    principalAmount: Decimal | DecimalJsLike | number | string
    interestAmount: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    baseAmountDue: Decimal | DecimalJsLike | number | string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    principalPaid?: Decimal | DecimalJsLike | number | string
    interestPaid?: Decimal | DecimalJsLike | number | string
    feePaid?: Decimal | DecimalJsLike | number | string
    penaltyPaid?: Decimal | DecimalJsLike | number | string
    remainingBalance: Decimal | DecimalJsLike | number | string
    status?: $Enums.InstallmentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    allocations?: PaymentAllocationUncheckedCreateNestedManyWithoutScheduleInput
  }

  export type RepaymentScheduleCreateOrConnectWithoutLoanInput = {
    where: RepaymentScheduleWhereUniqueInput
    create: XOR<RepaymentScheduleCreateWithoutLoanInput, RepaymentScheduleUncheckedCreateWithoutLoanInput>
  }

  export type RepaymentScheduleCreateManyLoanInputEnvelope = {
    data: RepaymentScheduleCreateManyLoanInput | RepaymentScheduleCreateManyLoanInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutLoanInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    reference: string
    providerRef?: string | null
    principalAmount?: Decimal | DecimalJsLike | number | string | null
    interestAmount?: Decimal | DecimalJsLike | number | string | null
    feeAmount?: Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    allocations?: PaymentAllocationCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutLoanInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    reference: string
    providerRef?: string | null
    principalAmount?: Decimal | DecimalJsLike | number | string | null
    interestAmount?: Decimal | DecimalJsLike | number | string | null
    feeAmount?: Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    allocations?: PaymentAllocationUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutLoanInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutLoanInput, TransactionUncheckedCreateWithoutLoanInput>
  }

  export type TransactionCreateManyLoanInputEnvelope = {
    data: TransactionCreateManyLoanInput | TransactionCreateManyLoanInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutLoanInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedbackInput
  }

  export type FeedbackUncheckedCreateWithoutLoanInput = {
    id?: string
    userId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutLoanInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutLoanInput, FeedbackUncheckedCreateWithoutLoanInput>
  }

  export type FeedbackCreateManyLoanInputEnvelope = {
    data: FeedbackCreateManyLoanInput | FeedbackCreateManyLoanInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutLoansInput = {
    update: XOR<UserUpdateWithoutLoansInput, UserUncheckedUpdateWithoutLoansInput>
    create: XOR<UserCreateWithoutLoansInput, UserUncheckedCreateWithoutLoansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLoansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLoansInput, UserUncheckedUpdateWithoutLoansInput>
  }

  export type UserUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    feedback?: FeedbackUpdateManyWithoutUserNestedInput
    approvedLoans?: LoanUpdateManyWithoutApprovedByNestedInput
    disbursedLoans?: LoanUpdateManyWithoutDisbursedByNestedInput
  }

  export type UserUncheckedUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    approvedLoans?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    disbursedLoans?: LoanUncheckedUpdateManyWithoutDisbursedByNestedInput
  }

  export type LoanProductUpsertWithoutLoansInput = {
    update: XOR<LoanProductUpdateWithoutLoansInput, LoanProductUncheckedUpdateWithoutLoansInput>
    create: XOR<LoanProductCreateWithoutLoansInput, LoanProductUncheckedCreateWithoutLoansInput>
    where?: LoanProductWhereInput
  }

  export type LoanProductUpdateToOneWithWhereWithoutLoansInput = {
    where?: LoanProductWhereInput
    data: XOR<LoanProductUpdateWithoutLoansInput, LoanProductUncheckedUpdateWithoutLoansInput>
  }

  export type LoanProductUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    minAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    minTermValue?: IntFieldUpdateOperationsInput | number
    maxTermValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanProductUncheckedUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    minAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    minTermValue?: IntFieldUpdateOperationsInput | number
    maxTermValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutApprovedLoansInput = {
    update: XOR<UserUpdateWithoutApprovedLoansInput, UserUncheckedUpdateWithoutApprovedLoansInput>
    create: XOR<UserCreateWithoutApprovedLoansInput, UserUncheckedCreateWithoutApprovedLoansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApprovedLoansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApprovedLoansInput, UserUncheckedUpdateWithoutApprovedLoansInput>
  }

  export type UserUpdateWithoutApprovedLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    loans?: LoanUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    feedback?: FeedbackUpdateManyWithoutUserNestedInput
    disbursedLoans?: LoanUpdateManyWithoutDisbursedByNestedInput
  }

  export type UserUncheckedUpdateWithoutApprovedLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    loans?: LoanUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    disbursedLoans?: LoanUncheckedUpdateManyWithoutDisbursedByNestedInput
  }

  export type UserUpsertWithoutDisbursedLoansInput = {
    update: XOR<UserUpdateWithoutDisbursedLoansInput, UserUncheckedUpdateWithoutDisbursedLoansInput>
    create: XOR<UserCreateWithoutDisbursedLoansInput, UserUncheckedCreateWithoutDisbursedLoansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDisbursedLoansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDisbursedLoansInput, UserUncheckedUpdateWithoutDisbursedLoansInput>
  }

  export type UserUpdateWithoutDisbursedLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    loans?: LoanUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    feedback?: FeedbackUpdateManyWithoutUserNestedInput
    approvedLoans?: LoanUpdateManyWithoutApprovedByNestedInput
  }

  export type UserUncheckedUpdateWithoutDisbursedLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    loans?: LoanUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    approvedLoans?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
  }

  export type RepaymentScheduleUpsertWithWhereUniqueWithoutLoanInput = {
    where: RepaymentScheduleWhereUniqueInput
    update: XOR<RepaymentScheduleUpdateWithoutLoanInput, RepaymentScheduleUncheckedUpdateWithoutLoanInput>
    create: XOR<RepaymentScheduleCreateWithoutLoanInput, RepaymentScheduleUncheckedCreateWithoutLoanInput>
  }

  export type RepaymentScheduleUpdateWithWhereUniqueWithoutLoanInput = {
    where: RepaymentScheduleWhereUniqueInput
    data: XOR<RepaymentScheduleUpdateWithoutLoanInput, RepaymentScheduleUncheckedUpdateWithoutLoanInput>
  }

  export type RepaymentScheduleUpdateManyWithWhereWithoutLoanInput = {
    where: RepaymentScheduleScalarWhereInput
    data: XOR<RepaymentScheduleUpdateManyMutationInput, RepaymentScheduleUncheckedUpdateManyWithoutLoanInput>
  }

  export type RepaymentScheduleScalarWhereInput = {
    AND?: RepaymentScheduleScalarWhereInput | RepaymentScheduleScalarWhereInput[]
    OR?: RepaymentScheduleScalarWhereInput[]
    NOT?: RepaymentScheduleScalarWhereInput | RepaymentScheduleScalarWhereInput[]
    id?: StringFilter<"RepaymentSchedule"> | string
    loanId?: StringFilter<"RepaymentSchedule"> | string
    installmentNumber?: IntFilter<"RepaymentSchedule"> | number
    dueDate?: DateTimeFilter<"RepaymentSchedule"> | Date | string
    principalAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFilter<"RepaymentSchedule"> | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFilter<"RepaymentSchedule"> | $Enums.InstallmentStatus
    paidAt?: DateTimeNullableFilter<"RepaymentSchedule"> | Date | string | null
    createdAt?: DateTimeFilter<"RepaymentSchedule"> | Date | string
    updatedAt?: DateTimeFilter<"RepaymentSchedule"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutLoanInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutLoanInput, TransactionUncheckedUpdateWithoutLoanInput>
    create: XOR<TransactionCreateWithoutLoanInput, TransactionUncheckedCreateWithoutLoanInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutLoanInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutLoanInput, TransactionUncheckedUpdateWithoutLoanInput>
  }

  export type TransactionUpdateManyWithWhereWithoutLoanInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutLoanInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    loanId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    reference?: StringFilter<"Transaction"> | string
    providerRef?: StringNullableFilter<"Transaction"> | string | null
    principalAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    interestAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    feeAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutLoanInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutLoanInput, FeedbackUncheckedUpdateWithoutLoanInput>
    create: XOR<FeedbackCreateWithoutLoanInput, FeedbackUncheckedCreateWithoutLoanInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutLoanInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutLoanInput, FeedbackUncheckedUpdateWithoutLoanInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutLoanInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutLoanInput>
  }

  export type LoanCreateWithoutRepaymentsInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    disbursedAt?: Date | string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutLoansInput
    product: LoanProductCreateNestedOneWithoutLoansInput
    approvedBy?: UserCreateNestedOneWithoutApprovedLoansInput
    disbursedBy?: UserCreateNestedOneWithoutDisbursedLoansInput
    transactions?: TransactionCreateNestedManyWithoutLoanInput
    feedback?: FeedbackCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateWithoutRepaymentsInput = {
    id?: string
    userId: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoanInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutRepaymentsInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutRepaymentsInput, LoanUncheckedCreateWithoutRepaymentsInput>
  }

  export type PaymentAllocationCreateWithoutScheduleInput = {
    id?: string
    principalAmount?: Decimal | DecimalJsLike | number | string
    interestAmount?: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    transaction: TransactionCreateNestedOneWithoutAllocationsInput
  }

  export type PaymentAllocationUncheckedCreateWithoutScheduleInput = {
    id?: string
    transactionId: string
    principalAmount?: Decimal | DecimalJsLike | number | string
    interestAmount?: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PaymentAllocationCreateOrConnectWithoutScheduleInput = {
    where: PaymentAllocationWhereUniqueInput
    create: XOR<PaymentAllocationCreateWithoutScheduleInput, PaymentAllocationUncheckedCreateWithoutScheduleInput>
  }

  export type PaymentAllocationCreateManyScheduleInputEnvelope = {
    data: PaymentAllocationCreateManyScheduleInput | PaymentAllocationCreateManyScheduleInput[]
    skipDuplicates?: boolean
  }

  export type LoanUpsertWithoutRepaymentsInput = {
    update: XOR<LoanUpdateWithoutRepaymentsInput, LoanUncheckedUpdateWithoutRepaymentsInput>
    create: XOR<LoanCreateWithoutRepaymentsInput, LoanUncheckedCreateWithoutRepaymentsInput>
    where?: LoanWhereInput
  }

  export type LoanUpdateToOneWithWhereWithoutRepaymentsInput = {
    where?: LoanWhereInput
    data: XOR<LoanUpdateWithoutRepaymentsInput, LoanUncheckedUpdateWithoutRepaymentsInput>
  }

  export type LoanUpdateWithoutRepaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutLoansNestedInput
    product?: LoanProductUpdateOneRequiredWithoutLoansNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedLoansNestedInput
    disbursedBy?: UserUpdateOneWithoutDisbursedLoansNestedInput
    transactions?: TransactionUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutRepaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type PaymentAllocationUpsertWithWhereUniqueWithoutScheduleInput = {
    where: PaymentAllocationWhereUniqueInput
    update: XOR<PaymentAllocationUpdateWithoutScheduleInput, PaymentAllocationUncheckedUpdateWithoutScheduleInput>
    create: XOR<PaymentAllocationCreateWithoutScheduleInput, PaymentAllocationUncheckedCreateWithoutScheduleInput>
  }

  export type PaymentAllocationUpdateWithWhereUniqueWithoutScheduleInput = {
    where: PaymentAllocationWhereUniqueInput
    data: XOR<PaymentAllocationUpdateWithoutScheduleInput, PaymentAllocationUncheckedUpdateWithoutScheduleInput>
  }

  export type PaymentAllocationUpdateManyWithWhereWithoutScheduleInput = {
    where: PaymentAllocationScalarWhereInput
    data: XOR<PaymentAllocationUpdateManyMutationInput, PaymentAllocationUncheckedUpdateManyWithoutScheduleInput>
  }

  export type PaymentAllocationScalarWhereInput = {
    AND?: PaymentAllocationScalarWhereInput | PaymentAllocationScalarWhereInput[]
    OR?: PaymentAllocationScalarWhereInput[]
    NOT?: PaymentAllocationScalarWhereInput | PaymentAllocationScalarWhereInput[]
    id?: StringFilter<"PaymentAllocation"> | string
    transactionId?: StringFilter<"PaymentAllocation"> | string
    scheduleId?: StringFilter<"PaymentAllocation"> | string
    principalAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFilter<"PaymentAllocation"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"PaymentAllocation"> | Date | string
  }

  export type LoanCreateWithoutTransactionsInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    disbursedAt?: Date | string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutLoansInput
    product: LoanProductCreateNestedOneWithoutLoansInput
    approvedBy?: UserCreateNestedOneWithoutApprovedLoansInput
    disbursedBy?: UserCreateNestedOneWithoutDisbursedLoansInput
    repayments?: RepaymentScheduleCreateNestedManyWithoutLoanInput
    feedback?: FeedbackCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateWithoutTransactionsInput = {
    id?: string
    userId: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    repayments?: RepaymentScheduleUncheckedCreateNestedManyWithoutLoanInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutTransactionsInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutTransactionsInput, LoanUncheckedCreateWithoutTransactionsInput>
  }

  export type PaymentAllocationCreateWithoutTransactionInput = {
    id?: string
    principalAmount?: Decimal | DecimalJsLike | number | string
    interestAmount?: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    schedule: RepaymentScheduleCreateNestedOneWithoutAllocationsInput
  }

  export type PaymentAllocationUncheckedCreateWithoutTransactionInput = {
    id?: string
    scheduleId: string
    principalAmount?: Decimal | DecimalJsLike | number | string
    interestAmount?: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PaymentAllocationCreateOrConnectWithoutTransactionInput = {
    where: PaymentAllocationWhereUniqueInput
    create: XOR<PaymentAllocationCreateWithoutTransactionInput, PaymentAllocationUncheckedCreateWithoutTransactionInput>
  }

  export type PaymentAllocationCreateManyTransactionInputEnvelope = {
    data: PaymentAllocationCreateManyTransactionInput | PaymentAllocationCreateManyTransactionInput[]
    skipDuplicates?: boolean
  }

  export type LoanUpsertWithoutTransactionsInput = {
    update: XOR<LoanUpdateWithoutTransactionsInput, LoanUncheckedUpdateWithoutTransactionsInput>
    create: XOR<LoanCreateWithoutTransactionsInput, LoanUncheckedCreateWithoutTransactionsInput>
    where?: LoanWhereInput
  }

  export type LoanUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: LoanWhereInput
    data: XOR<LoanUpdateWithoutTransactionsInput, LoanUncheckedUpdateWithoutTransactionsInput>
  }

  export type LoanUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutLoansNestedInput
    product?: LoanProductUpdateOneRequiredWithoutLoansNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedLoansNestedInput
    disbursedBy?: UserUpdateOneWithoutDisbursedLoansNestedInput
    repayments?: RepaymentScheduleUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repayments?: RepaymentScheduleUncheckedUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type PaymentAllocationUpsertWithWhereUniqueWithoutTransactionInput = {
    where: PaymentAllocationWhereUniqueInput
    update: XOR<PaymentAllocationUpdateWithoutTransactionInput, PaymentAllocationUncheckedUpdateWithoutTransactionInput>
    create: XOR<PaymentAllocationCreateWithoutTransactionInput, PaymentAllocationUncheckedCreateWithoutTransactionInput>
  }

  export type PaymentAllocationUpdateWithWhereUniqueWithoutTransactionInput = {
    where: PaymentAllocationWhereUniqueInput
    data: XOR<PaymentAllocationUpdateWithoutTransactionInput, PaymentAllocationUncheckedUpdateWithoutTransactionInput>
  }

  export type PaymentAllocationUpdateManyWithWhereWithoutTransactionInput = {
    where: PaymentAllocationScalarWhereInput
    data: XOR<PaymentAllocationUpdateManyMutationInput, PaymentAllocationUncheckedUpdateManyWithoutTransactionInput>
  }

  export type TransactionCreateWithoutAllocationsInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    reference: string
    providerRef?: string | null
    principalAmount?: Decimal | DecimalJsLike | number | string | null
    interestAmount?: Decimal | DecimalJsLike | number | string | null
    feeAmount?: Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    loan: LoanCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutAllocationsInput = {
    id?: string
    loanId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    reference: string
    providerRef?: string | null
    principalAmount?: Decimal | DecimalJsLike | number | string | null
    interestAmount?: Decimal | DecimalJsLike | number | string | null
    feeAmount?: Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutAllocationsInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutAllocationsInput, TransactionUncheckedCreateWithoutAllocationsInput>
  }

  export type RepaymentScheduleCreateWithoutAllocationsInput = {
    id?: string
    installmentNumber: number
    dueDate: Date | string
    principalAmount: Decimal | DecimalJsLike | number | string
    interestAmount: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    baseAmountDue: Decimal | DecimalJsLike | number | string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    principalPaid?: Decimal | DecimalJsLike | number | string
    interestPaid?: Decimal | DecimalJsLike | number | string
    feePaid?: Decimal | DecimalJsLike | number | string
    penaltyPaid?: Decimal | DecimalJsLike | number | string
    remainingBalance: Decimal | DecimalJsLike | number | string
    status?: $Enums.InstallmentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loan: LoanCreateNestedOneWithoutRepaymentsInput
  }

  export type RepaymentScheduleUncheckedCreateWithoutAllocationsInput = {
    id?: string
    loanId: string
    installmentNumber: number
    dueDate: Date | string
    principalAmount: Decimal | DecimalJsLike | number | string
    interestAmount: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    baseAmountDue: Decimal | DecimalJsLike | number | string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    principalPaid?: Decimal | DecimalJsLike | number | string
    interestPaid?: Decimal | DecimalJsLike | number | string
    feePaid?: Decimal | DecimalJsLike | number | string
    penaltyPaid?: Decimal | DecimalJsLike | number | string
    remainingBalance: Decimal | DecimalJsLike | number | string
    status?: $Enums.InstallmentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RepaymentScheduleCreateOrConnectWithoutAllocationsInput = {
    where: RepaymentScheduleWhereUniqueInput
    create: XOR<RepaymentScheduleCreateWithoutAllocationsInput, RepaymentScheduleUncheckedCreateWithoutAllocationsInput>
  }

  export type TransactionUpsertWithoutAllocationsInput = {
    update: XOR<TransactionUpdateWithoutAllocationsInput, TransactionUncheckedUpdateWithoutAllocationsInput>
    create: XOR<TransactionCreateWithoutAllocationsInput, TransactionUncheckedCreateWithoutAllocationsInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutAllocationsInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutAllocationsInput, TransactionUncheckedUpdateWithoutAllocationsInput>
  }

  export type TransactionUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: StringFieldUpdateOperationsInput | string
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null
    principalAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    feeAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loan?: LoanUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: StringFieldUpdateOperationsInput | string
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null
    principalAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    feeAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepaymentScheduleUpsertWithoutAllocationsInput = {
    update: XOR<RepaymentScheduleUpdateWithoutAllocationsInput, RepaymentScheduleUncheckedUpdateWithoutAllocationsInput>
    create: XOR<RepaymentScheduleCreateWithoutAllocationsInput, RepaymentScheduleUncheckedCreateWithoutAllocationsInput>
    where?: RepaymentScheduleWhereInput
  }

  export type RepaymentScheduleUpdateToOneWithWhereWithoutAllocationsInput = {
    where?: RepaymentScheduleWhereInput
    data: XOR<RepaymentScheduleUpdateWithoutAllocationsInput, RepaymentScheduleUncheckedUpdateWithoutAllocationsInput>
  }

  export type RepaymentScheduleUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loan?: LoanUpdateOneRequiredWithoutRepaymentsNestedInput
  }

  export type RepaymentScheduleUncheckedUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    loans?: LoanCreateNestedManyWithoutUserInput
    feedback?: FeedbackCreateNestedManyWithoutUserInput
    approvedLoans?: LoanCreateNestedManyWithoutApprovedByInput
    disbursedLoans?: LoanCreateNestedManyWithoutDisbursedByInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    loans?: LoanUncheckedCreateNestedManyWithoutUserInput
    feedback?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    approvedLoans?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    disbursedLoans?: LoanUncheckedCreateNestedManyWithoutDisbursedByInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    loans?: LoanUpdateManyWithoutUserNestedInput
    feedback?: FeedbackUpdateManyWithoutUserNestedInput
    approvedLoans?: LoanUpdateManyWithoutApprovedByNestedInput
    disbursedLoans?: LoanUpdateManyWithoutDisbursedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    loans?: LoanUncheckedUpdateManyWithoutUserNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    approvedLoans?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    disbursedLoans?: LoanUncheckedUpdateManyWithoutDisbursedByNestedInput
  }

  export type UserCreateWithoutFeedbackInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    loans?: LoanCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    approvedLoans?: LoanCreateNestedManyWithoutApprovedByInput
    disbursedLoans?: LoanCreateNestedManyWithoutDisbursedByInput
  }

  export type UserUncheckedCreateWithoutFeedbackInput = {
    id?: string
    name: string
    address: string
    occupation: string
    phone: string
    email?: string | null
    passwordHash: string
    role?: $Enums.Role
    kycStatus?: $Enums.KycStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatarUrl?: string | null
    loans?: LoanUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    approvedLoans?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    disbursedLoans?: LoanUncheckedCreateNestedManyWithoutDisbursedByInput
  }

  export type UserCreateOrConnectWithoutFeedbackInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedbackInput, UserUncheckedCreateWithoutFeedbackInput>
  }

  export type LoanCreateWithoutFeedbackInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    disbursedAt?: Date | string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutLoansInput
    product: LoanProductCreateNestedOneWithoutLoansInput
    approvedBy?: UserCreateNestedOneWithoutApprovedLoansInput
    disbursedBy?: UserCreateNestedOneWithoutDisbursedLoansInput
    repayments?: RepaymentScheduleCreateNestedManyWithoutLoanInput
    transactions?: TransactionCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateWithoutFeedbackInput = {
    id?: string
    userId: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    repayments?: RepaymentScheduleUncheckedCreateNestedManyWithoutLoanInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutFeedbackInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutFeedbackInput, LoanUncheckedCreateWithoutFeedbackInput>
  }

  export type UserUpsertWithoutFeedbackInput = {
    update: XOR<UserUpdateWithoutFeedbackInput, UserUncheckedUpdateWithoutFeedbackInput>
    create: XOR<UserCreateWithoutFeedbackInput, UserUncheckedCreateWithoutFeedbackInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedbackInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedbackInput, UserUncheckedUpdateWithoutFeedbackInput>
  }

  export type UserUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    loans?: LoanUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    approvedLoans?: LoanUpdateManyWithoutApprovedByNestedInput
    disbursedLoans?: LoanUpdateManyWithoutDisbursedByNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    occupation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    loans?: LoanUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    approvedLoans?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    disbursedLoans?: LoanUncheckedUpdateManyWithoutDisbursedByNestedInput
  }

  export type LoanUpsertWithoutFeedbackInput = {
    update: XOR<LoanUpdateWithoutFeedbackInput, LoanUncheckedUpdateWithoutFeedbackInput>
    create: XOR<LoanCreateWithoutFeedbackInput, LoanUncheckedCreateWithoutFeedbackInput>
    where?: LoanWhereInput
  }

  export type LoanUpdateToOneWithWhereWithoutFeedbackInput = {
    where?: LoanWhereInput
    data: XOR<LoanUpdateWithoutFeedbackInput, LoanUncheckedUpdateWithoutFeedbackInput>
  }

  export type LoanUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutLoansNestedInput
    product?: LoanProductUpdateOneRequiredWithoutLoansNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedLoansNestedInput
    disbursedBy?: UserUpdateOneWithoutDisbursedLoansNestedInput
    repayments?: RepaymentScheduleUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repayments?: RepaymentScheduleUncheckedUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanCreateManyUserInput = {
    id?: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AuditLogCreateManyActorInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    timestamp?: Date | string
  }

  export type FeedbackCreateManyUserInput = {
    id?: string
    loanId?: string | null
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type LoanCreateManyApprovedByInput = {
    id?: string
    userId: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type LoanCreateManyDisbursedByInput = {
    id?: string
    userId: string
    productId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type LoanUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    product?: LoanProductUpdateOneRequiredWithoutLoansNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedLoansNestedInput
    disbursedBy?: UserUpdateOneWithoutDisbursedLoansNestedInput
    repayments?: RepaymentScheduleUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repayments?: RepaymentScheduleUncheckedUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loan?: LoanUpdateOneWithoutFeedbackNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUpdateWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutLoansNestedInput
    product?: LoanProductUpdateOneRequiredWithoutLoansNestedInput
    disbursedBy?: UserUpdateOneWithoutDisbursedLoansNestedInput
    repayments?: RepaymentScheduleUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repayments?: RepaymentScheduleUncheckedUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateManyWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LoanUpdateWithoutDisbursedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutLoansNestedInput
    product?: LoanProductUpdateOneRequiredWithoutLoansNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedLoansNestedInput
    repayments?: RepaymentScheduleUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutDisbursedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repayments?: RepaymentScheduleUncheckedUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateManyWithoutDisbursedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LoanCreateManyProductInput = {
    id?: string
    userId: string
    amount: Decimal | DecimalJsLike | number | string
    purpose: string
    notes?: string | null
    status?: $Enums.LoanStatus
    interestRate: Decimal | DecimalJsLike | number | string
    interestType: $Enums.InterestType
    termValue: number
    termUnit: $Enums.TermUnit
    numberOfInstallments: number
    repaymentFrequency: $Enums.RepaymentFrequency
    processingFeeType: $Enums.FeeType
    processingFeeAmount?: Decimal | DecimalJsLike | number | string
    processingFeeRate?: Decimal | DecimalJsLike | number | string
    lateFeeType: $Enums.LateFeeType
    lateFeeAmount?: Decimal | DecimalJsLike | number | string
    lateFeeRate?: Decimal | DecimalJsLike | number | string
    gracePeriodDays?: number
    totalInterest?: Decimal | DecimalJsLike | number | string
    totalFees?: Decimal | DecimalJsLike | number | string
    totalPayable?: Decimal | DecimalJsLike | number | string
    rejectionReason?: string | null
    approvedAt?: Date | string | null
    approvedById?: string | null
    disbursedAt?: Date | string | null
    disbursedById?: string | null
    firstPaymentDueAt?: Date | string | null
    maturityDate?: Date | string | null
    closedAt?: Date | string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type LoanUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutLoansNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedLoansNestedInput
    disbursedBy?: UserUpdateOneWithoutDisbursedLoansNestedInput
    repayments?: RepaymentScheduleUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repayments?: RepaymentScheduleUncheckedUpdateManyWithoutLoanNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutLoanNestedInput
    feedback?: FeedbackUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    purpose?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    interestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestType?: EnumInterestTypeFieldUpdateOperationsInput | $Enums.InterestType
    termValue?: IntFieldUpdateOperationsInput | number
    termUnit?: EnumTermUnitFieldUpdateOperationsInput | $Enums.TermUnit
    numberOfInstallments?: IntFieldUpdateOperationsInput | number
    repaymentFrequency?: EnumRepaymentFrequencyFieldUpdateOperationsInput | $Enums.RepaymentFrequency
    processingFeeType?: EnumFeeTypeFieldUpdateOperationsInput | $Enums.FeeType
    processingFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    processingFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeType?: EnumLateFeeTypeFieldUpdateOperationsInput | $Enums.LateFeeType
    lateFeeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lateFeeRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gracePeriodDays?: IntFieldUpdateOperationsInput | number
    totalInterest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalFees?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPayable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    disbursedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disbursedById?: NullableStringFieldUpdateOperationsInput | string | null
    firstPaymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maturityDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RepaymentScheduleCreateManyLoanInput = {
    id?: string
    installmentNumber: number
    dueDate: Date | string
    principalAmount: Decimal | DecimalJsLike | number | string
    interestAmount: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    baseAmountDue: Decimal | DecimalJsLike | number | string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    principalPaid?: Decimal | DecimalJsLike | number | string
    interestPaid?: Decimal | DecimalJsLike | number | string
    feePaid?: Decimal | DecimalJsLike | number | string
    penaltyPaid?: Decimal | DecimalJsLike | number | string
    remainingBalance: Decimal | DecimalJsLike | number | string
    status?: $Enums.InstallmentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyLoanInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    reference: string
    providerRef?: string | null
    principalAmount?: Decimal | DecimalJsLike | number | string | null
    interestAmount?: Decimal | DecimalJsLike | number | string | null
    feeAmount?: Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type FeedbackCreateManyLoanInput = {
    id?: string
    userId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type RepaymentScheduleUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allocations?: PaymentAllocationUpdateManyWithoutScheduleNestedInput
  }

  export type RepaymentScheduleUncheckedUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allocations?: PaymentAllocationUncheckedUpdateManyWithoutScheduleNestedInput
  }

  export type RepaymentScheduleUncheckedUpdateManyWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    baseAmountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feePaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: StringFieldUpdateOperationsInput | string
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null
    principalAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    feeAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allocations?: PaymentAllocationUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: StringFieldUpdateOperationsInput | string
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null
    principalAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    feeAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allocations?: PaymentAllocationUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateManyWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reference?: StringFieldUpdateOperationsInput | string
    providerRef?: NullableStringFieldUpdateOperationsInput | string | null
    principalAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    feeAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    penaltyAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedbackNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentAllocationCreateManyScheduleInput = {
    id?: string
    transactionId: string
    principalAmount?: Decimal | DecimalJsLike | number | string
    interestAmount?: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PaymentAllocationUpdateWithoutScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUpdateOneRequiredWithoutAllocationsNestedInput
  }

  export type PaymentAllocationUncheckedUpdateWithoutScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentAllocationUncheckedUpdateManyWithoutScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentAllocationCreateManyTransactionInput = {
    id?: string
    scheduleId: string
    principalAmount?: Decimal | DecimalJsLike | number | string
    interestAmount?: Decimal | DecimalJsLike | number | string
    feeAmount?: Decimal | DecimalJsLike | number | string
    penaltyAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PaymentAllocationUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule?: RepaymentScheduleUpdateOneRequiredWithoutAllocationsNestedInput
  }

  export type PaymentAllocationUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduleId?: StringFieldUpdateOperationsInput | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentAllocationUncheckedUpdateManyWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduleId?: StringFieldUpdateOperationsInput | string
    principalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    feeAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    penaltyAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}