"use client";
import * as React from "react";
import VoucherProcessor from "./components/Barcode";

export default function VoucherBarcode() {
  return (
    <div className="min-h-screen bg-gray-50 lg:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl overflow-hidden">
        <VoucherProcessor />
      </div>
    </div>
  );
}
