/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import * as React from "react";
import { getVoucher } from "@/graphql/global";
import { TypeCode } from "@/types/global";
import ItemVoucher from "./components/Voucher";
import { decryptId } from "@/utils/encryption";

export default async function VoucherCode({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: string }>;
}) {
  const id = (await params).id;
  const type = (await searchParams).type;
    const encryptedId = decryptId(id);
  
  const voucher = await getVoucher(encryptedId);

  const checkValidVoucher = (): boolean => {
    if (!voucher) return false;
    if (type && type !== voucher.typeCode) return false;
    return true;
  };



  return (
    <div className="min-h-screen bg-gray-50 lg:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl overflow-hidden">
        {checkValidVoucher() ? (
          <div className="flex">
            {type && type === TypeCode.GIFT_VOUCHER && (
              <ItemVoucher
                src="/images/GV.png"
                voucher={voucher}
                src1="/images/GV-1.png"
              />
            )}
            {type && type === TypeCode.TICKET_VOUCHER && (
              <ItemVoucher
                src="/images/TV.png"
                voucher={voucher}
                src1="/images/TV-1.png"
              />
            )}
            {type && type === TypeCode.MOVIE_VOUCHER && (
              <ItemVoucher
                src="/images/MV.png"
                voucher={voucher}
                src1="/images/MV-1.png"
              />
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Image
              src="/images/404-error.png"
              alt="404"
              width={500}
              height={500}
            />
          </div>
        )}
      </div>
    </div>
  );
}
