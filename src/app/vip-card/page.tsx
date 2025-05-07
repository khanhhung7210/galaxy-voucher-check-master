"use client";
import React, { useState } from "react";
import Image from "next/image";

const MovieCount= 2710;
const GiftCount = 1504;
export default function VipCard() {
  const [showVoucherDetail, setShowVoucherDetail] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<number|null>(null);
  const [showGiftDetail, setShowGiftDetail] = useState(false);
  const [selectedGift, setSelectedGift] = useState<number|null>(null);

  return (
    <>
{/* Thông tin Movie Voucher */}
      {showVoucherDetail && (
        <div onClick={() => setShowVoucherDetail(false)} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start overflow-auto">
          <div className="bg-white w-full max-w-md mt-20 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4 text-center font-semibold text-xl">Movie Voucher</div>
            <div className="p-4 space-y-4 text-sm text-gray-700">
              <div>
                <h3 className="font-extrabold">1. Thông tin Voucher</h3>
                <ul className="list-disc list-inside">
                <li> Mã số Voucher: {selectedVoucher !== null ? String(selectedVoucher + 1).padStart(6, '0') : ''}</li>
                  <li>Loại Voucher: Movie Voucher</li>
                  <li>Giá trị Voucher: 1 vé</li>
                  <li>Ngày phát hành: xx/yy/zzzz</li>
                  <li>Ngày hết hạn: xx/yy/zzzz</li>
                </ul>
              </div>
              <div>
                <h3 className="font-extrabold">2. Điều kiện và điều khoản sử dụng</h3>
                <ul className="list-disc list-inside">
                  <li>Vé được áp dụng cho phim 2D ngoại trừ phòng chiếu max, phòng chiếu VIP;</li>
                  <li>Không áp dụng Cine De Kids;</li>
                  <li>Không áp dụng cho suất chiếu sớm, suất chiếu đặc biệt;</li>
                  <li>Không áp dụng đổi vé online;</li>
                  <li>Vé chỉ áp dụng cho một người, không kèm theo trẻ em;</li>
                  <li>Vé không có giá trị quy đổi thành tiền;</li>
                </ul>
              </div>
              <div>
                <h3 className="font-extrabold">3. Hướng dẫn sử dụng</h3>
                <ul className="list-disc list-inside">
                  <li>Khánh hàng cung cấp thẻ VIP cho nhân viên tại quầy → nhân viên sẽ hỗ trợ tư vấn suất chiếu phù hợp → nhân viên sẽ trừ lượt vé tương ứng trong tài khoản thẻ VIP của khách hàng → nhân viên in vé vào Rạp cho khách  </li>
                  <li>Vé đã đổi không hoàn lãi, không đổi suất chiếu, trừ trường hợp suất chiếu bị hủy bởi rạp</li>
                </ul>
              </div>
            {/* Thay ảnh QR */}
              <div className="w-1/2 h-40 bg-gray-200 mb-4 flex items-center justify-center mx-auto rounded"> QR Voucher </div>
              {/* <div className="w-1/2 h-40 mb-4 flex items-center justify-center mx-auto rounded overflow-hidden">
                <img 
                  src="/images/qrcode.png" 
                  alt="QR Gift" 
                  className="h-full object-contain" 
                /> */}
              <button onClick={() => setShowVoucherDetail(false)} className="w-1/2 bg-orange-500 text-white py-3 rounded mx-auto block text-center">Áp dụng</button>
            </div>
          </div>
        </div>
      )}

      
{/* Thông tin Gift 100.000đ */}
      {showGiftDetail && (
        <div onClick={() => setShowGiftDetail(false)} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start overflow-auto">
          <div className="bg-white w-full max-w-md mt-20 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4 text-center font-semibold text-xl">Gift 100.000đ</div>
            <div className="p-4 space-y-4 text-sm text-gray-700">
              <div>
                <h3 className="font-extrabold">1. Thông tin Voucher</h3>
                <ul className="list-disc list-inside">
                <li> Mã số Voucher: {selectedGift !== null ? String(selectedGift + 1).padStart(6, '0') : ''}</li>
                  <li>Loại Voucher: Gift 100.000đ</li>
                  <li>Giá trị Voucher: 100.000đ</li>
                  <li>Ngày phát hành: xx/yy/zzzz</li>
                  <li>Ngày hết hạn: xx/yy/zzzz</li>
                </ul>
              </div>
              <div>
                <h3 className="font-extrabold">2. Điều kiện sử dụng</h3>
                <ul className="list-disc list-inside">
                  <li>Vé được áp dụng cho tất cả các cụm Rạp Galaxy;</li>
                  <li>Vé không có giá trị quy đổi thành tiền;</li>
                  <li>Không hoàn trả bằng tiền khi không sử dụng hết mệnh giá</li>
                </ul>
              </div>
              <div>
                <h3 className="font-extrabold">3. Hướng dẫn sử dụng</h3>
                <ul className="list-disc list-inside">
                  <li>Khách hàng cung cấp thẻ VIP cho nhân viên tại quầy → nhân viên sẽ hỗ trợ tư vấn suất chiếu phù hợp → nhân viên sẽ trừ lượt vé tương ứng trong tài khoản thẻ VIP của khách hàng → nhân viên in vé vào Rạp cho khách.</li>
                  <li>Vé đã đổi không hoàn lại, không đổi suất chiếu, trừ trường hợp suất chiếu bị hủy bởi rạp</li>
                </ul>
              </div>
              {/* Thay ảnh QR */}
              <div className="w-1/2 h-40 bg-gray-200 mb-4 flex items-center justify-center mx-auto rounded"> QR Gift </div> 
              {/* Thay ảnh QR */}
              {/* <div className="w-1/2 h-40 mb-4 flex items-center justify-center mx-auto rounded overflow-hidden">
                <img 
                  src="/images/qrcode.png" 
                  alt="QR Gift" 
                  className="h-full object-contain" 
                />
              </div> */}
              <button
                onClick={() => setShowGiftDetail(false)}
                className="w-1/2 bg-orange-500 text-white py-3 rounded mx-auto block text-center"
                >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
{/* Thông tin của thẻ VIP */}
      <div className="bg-blue-600 text-white p-5 px-5 text-center text-xl font-semibold">Thông tin khách hàng</div>
      <div className="bg-gray-50 w-full p-4">
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4 flex items-start justify-between gap-4"   style={{ background: 'linear-gradient(140deg, #fc9f55, #60a5fa)' }}
          >
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-sm text-gray-700">Số thẻ</p>
                <p className="text-lg font-bold">270104</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-700">Họ và tên</p>
                <p className="text-lg font-bold">Huỳnh Khánh Hưng</p>
              </div>
              <div>
                <p className="text-sm text-gray-700">Số điện thoại</p>
                <p className="text-lg font-bold">0912712509</p>
              </div>
            </div>
            <Image src="/images/galaxy-logo-mobile.png" alt="GalaxyCinema" width={80} height={10} className="object-contain" />
          </div>
        </div>
{/* Thông tin Movie voucher */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Movie Voucher</h4>
            {/* Số lượng voucher */}
            <span className="text-gray-500">x{MovieCount}</span>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {/* Chạy theo số lượng voucher */}
            {[...Array(MovieCount)].map((_, idx) => (
              <div key={idx} className="flex-none w-1/2 snap-center bg-white rounded-lg shadow p-2 flex-shrink-0">
                <Image
      src={`/images/free-ticket.jpeg`}
      alt={`Voucher ${idx+1}`}
      width={941}
      height={628}
      className="w-full h-24 object-cover rounded mb-2"
    />
                <div className="text-xs text-gray-700 space-y-1">
                  <p className="font-extrabold">Movie Voucher</p>
                  <p>Mã số: {String(idx + 1).padStart(6, '0')}</p>
                  <p>Ngày phát hành: xx/yy/zzzz</p>
                  <p>Ngày hết hạn: xx/yy/zzzz</p>
                </div>
                <button onClick={() => { setShowVoucherDetail(true); setSelectedVoucher(idx); }} className="mt-2 w-full bg-orange-500 text-white py-2 rounded text-sm">Dùng ngay</button>
              </div>
            ))}
          </div>
        </section>
        <hr className="w-full border-t1 border-gray-400" />
        {/* Thông tin Gift 100.000đ */}
        <section className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Gift 100.000đ</h4> 
            {/* Số lượng voucher */}
            <span className="text-gray-500">x{GiftCount}</span>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {/* chạy theo số lượng voucher */}
            {[...Array(GiftCount)].map((_, idx) => (
              <div key={idx} className="flex-none w-1/2 snap-center bg-white rounded-lg shadow p-2 flex-shrink-0">
                <Image
      src={`/images/free-ticket.jpeg`}
      alt={`Voucher ${idx+1}`}
      width={941}
      height={628}
      className="w-full h-24 object-cover rounded mb-2"
    />
                <div className="text-xs text-gray-700 space-y-1">
                  <p className="font-extrabold">Gift 100.000đ</p>
                  <p>Mã số: {String(idx + 1).padStart(6, '0')}</p>
                  <p>Ngày phát hành: xx/yy/zzzz</p>
                  <p>Ngày hết hạn: xx/yy/zzzz</p>
                </div>
                <button
                  onClick={() => { setShowGiftDetail(true); setSelectedGift(idx); }}
                  className="mt-2 w-full bg-orange-500 text-white py-2 rounded text-sm"
                >
                  Dùng ngay
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
} 