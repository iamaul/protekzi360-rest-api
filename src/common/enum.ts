export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  DEVELOPER = 'developer',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  EXPIRED = 'expired',
  FAILED = 'failed',
  CANCELED = 'canceled',
  CHALLENGED = 'challenged',
}

export enum PaymentType {
  BANK_TRANSFER = 'bank_transfer',
  E_CHANNEL = 'echannel',
  PERMATA = 'permata',
}
