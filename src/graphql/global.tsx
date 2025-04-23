/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from "graphql-request";
import { fetchGraphQL } from "./server";
import { Voucher } from "@/types/global";
import { decryptId } from "@/utils/encryption";
// import { notFound } from "next/navigation";

export const GetVoucher = gql`
  query VoucherDetail($barcode: String!) {
    voucherDetail(barcode: $barcode) {
      id
      value
      expired
      barcode
      pin
      typeId
      categoryId
      name
      typeCode
      memberId
      redeemed
      redeemedAt
    }
  }
`;
export async function getVoucher(encryptedId: string): Promise<Voucher> {
  const response = await fetchGraphQL(GetVoucher, { barcode: encryptedId });
  //   if (!response.ok) {
  //     if (response.status === 404) {
  //       notFound();
  //     }
  //     throw new Error("Failed to fetch voucher");
  //   }
  return response.voucherDetail;
}
