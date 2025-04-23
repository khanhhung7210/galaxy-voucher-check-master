export enum TypeCode {
  TICKET_VOUCHER = "T",
  GIFT_VOUCHER = "G",
  MOVIE_VOUCHER = "M",
}

export type VoucherType = "T" | "G" | "M";
export interface Voucher {
  id: string;
  value: number;
  expired: number;
  barcode: string;
  pin: string;
  typeId: number;
  categoryId: number;
  name: string;
  memberId: string;
  redeemed: boolean;
  redeemedAt: number;
  typeCode: VoucherType;
}
