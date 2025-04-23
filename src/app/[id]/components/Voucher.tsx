"use client";
import { TypeCode, Voucher } from "@/types/global";
import { useBarcode } from "next-barcode";
import Image from "next/image";
import TermsList from "./Terms";

function normalizeTimestamp(timestamp: number): number {
  if (timestamp.toString().length === 10) {
    return timestamp * 1000;
  }
  return timestamp;
}

function formatVNDPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(timestamp: number): string {
  // Normalize the timestamp
  const normalizedTimestamp = normalizeTimestamp(timestamp);
  const date = new Date(normalizedTimestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
const ItemVoucher = ({
  voucher,
  src,
  src1,
}: {
  voucher: Voucher;
  src: string;
  src1: string;
}) => {
  const { inputRef } = useBarcode({
    value: "XXXXGALAXYXXX",
    options: {
      margin: 0,
      fontSize: 16,
      textMargin: 2,
      height: 140,
      background: "#ffffff",
    },
  });
  const formattedPrice = formatVNDPrice(voucher.value);
  const formattedDate = formatDate(voucher.expired);

  const TextTerms = {
    T: {
      vi: {
        1: "Không áp dụng tại Galaxy Sala",
        2: "Không áp dụng cho phòng chiếu 3D, Imax",
        3: "Không áp dụng cho Cine De Kids",
        4: "Không áp dụng đổi vé online",
      },
      en: {
        1: "Not applicable at Galaxy Sala",
        2: "Not applicable for 3D and Imax screenings",
        3: "Not applicable for Cine De Kids",
        4: "Not applicable for online ticket exchanges",
      },
    },
    M: {
      vi: {
        1: "Không áp dụng cho phòng chiếu Imax, 3D, phòng chiếu VIP",
        2: "Không áp dụng cho Cine De Kids",
        3: "Không áp dụng cho suất chiếu sớm, suất chiếu đặc biệt",
        4: "Không áp dụng đổi vé online",
      },
      en: {
        1: "Not applicable for Imax, 3D, VIP screenings",
        2: "Not applicable for Cine De Kids",
        3: "Not applicable for early screenings, special screenings",
        4: "Not applicable for online ticket exchanges",
      },
    },
    G: {
      vi: {
        1: "Phiếu được áp dụng cho tất cả các cụm rạp Galaxy",
        2: "Phiếu không có giá trị khi rách, tẩy xoá hoặc hư hỏng",
        3: "Phiếu chỉ có giá trị khi mà vạch vẫn còn nguyên",
        4: "Phiếu không có giá trị quy đổi thành tiền",
        5: "Phiếu không có giá trị sử dụng nếu chưa đóng dấu",
        6: "Không hoàn trả bằng tiền khi không sử dụng hết mệnh giá",
      },
      en: {
        1: "Voucher is applicable for all Galaxy cinemas",
        2: "Voucher is invalid if torn, erased, or damaged",
        3: "Voucher is only valid if the barcode is intact",
        4: "Voucher is not exchangeable for cash",
        5: "Voucher is invalid if not stamped",
        6: "No cash refund if not fully used",
      },
    },
  };

  return (
    <div className="w-full lg:p-8 p-2">
      <div className="relative lg:shadow-2xl shadow-lg lg:rounded-[25px] rounded-[10px] bg-white">
        <Image
          src={src}
          alt="Galaxy Cinema"
          width={400}
          height={200}
          className="w-full h-full object-fill"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-transparent bg-opacity-50 flex justify-between items-center 856:p-5 p-2">
          <div className="relative h-full lg:w-[24.5%] 856:w-[25%] w-[25%]">
            <h3 className="text-red-600 font-bold lg:text-2xl 856:text-xl md:text-base text-xs absolute lg:bottom-7 lg:left-0 856:bottom-8 412:bottom-6 md:bottom-14 bottom-5 856:p-4 w-full text-center">
              {formattedPrice}
            </h3>
          </div>
          <div className="flex-1 h-full relative">
            {voucher.typeCode === TypeCode.TICKET_VOUCHER && (
              <TermsList terms={TextTerms} type="T" />
            )}
            {voucher.typeCode === TypeCode.MOVIE_VOUCHER && (
              <TermsList terms={TextTerms} type="M" />
            )}
            {voucher.typeCode === TypeCode.GIFT_VOUCHER && (
              <TermsList terms={TextTerms} type="G" />
            )}

            <div className="absolute w-auto xl:-right-24 lg:-right-18 759:-right-10 sm:-right-32 md:-right-32 -right-12 z-[999] lg:bottom-18 sm:bottom-12 412:bottom-7 bottom-6">
              <Image
                src="/images/Stamp.webp"
                alt="Galaxy Cinema"
                width={400}
                height={400}
                className="object-fill xl:w-[200px] xl:h-[200px] lg:w-[180px] lg:h-[180px]  md:w-3/4 md:h-3/4 759:w-[180px] 759:h-[180px] w-[100px] h-[100px]"
              />
              <h3 className="absolute w-full xl:right-2 lg:-right-2 z-[999] xl:-bottom-24 sm:-right-4 -right-1 sm:-bottom-24 412:-bottom-12 -bottom-14 text-blue-600 lg:text-xl font-bold 856:text-lg lg:ml-0 856:ml-10 ml-1 md:text-base sm:text-[14px] text-[7px] block h-1/2">
                {formattedDate}
              </h3>
            </div>
          </div>
          <div className="relative h-full lg:w-[14%] 856:w-[15%] w-[14%]">
            <div className="rotate-90 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                ref={inputRef}
                className="h-full 856:w-[200px] sm:w-[160px] w-[80px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8 relative lg:shadow-2xl shadow-lg lg:rounded-[25px] rounded-[10px] bg-white">
        <Image
          src={src1}
          alt="Galaxy Cinema"
          width={400}
          height={200}
          className="w-full h-full object-fill"
        />
      </div>
    </div>
  );
};
export default ItemVoucher;
