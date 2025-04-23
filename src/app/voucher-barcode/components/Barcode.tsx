/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import * as ExcelJS from "exceljs";
import QRCode from "qrcode";
import JSZip from "jszip";
import { Upload, Download, FileText, RefreshCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { encryptId } from "@/utils/encryption";

interface ProcessProgress {
  current: number;
  total: number;
  status: string;
}

const BATCH_SIZE = 100; // Xử lý 100 voucher một lần

const VoucherProcessor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<ProcessProgress>({
    current: 0,
    total: 0,
    status: "",
  });
  const [message, setMessage] = useState<{ type: string; content: string }>({
    type: "",
    content: "",
  });

  const generateQRCode = async (text: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const dataUrl = await QRCode.toDataURL(text, {
            width: 200,
            margin: 1,
            errorCorrectionLevel: "H",
          });
          resolve(dataUrl);
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  };

  const dataURLtoBlob = (dataUrl: string): Blob => {
    const arr = dataUrl.split(",");
    if (arr.length < 2) throw new Error("Invalid Data URL");

    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error("Could not find MIME type");

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);

    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new Blob([u8arr], { type: mime });
  };

  const generateNewCode = (parentType: string, barcode: string): string => {
    if (!barcode || !parentType) return "";

    const newCode = encryptId(barcode);
    const url = `https://voucher.galaxycine.vn/${newCode}?type=${parentType}`;
    return url;
  };

  // Xử lý theo batch
  const processBatch = async (
    worksheet: ExcelJS.Worksheet,
    startRow: number,
    endRow: number,
    qrFolder: JSZip | null,
    columns: { newCode: number; qrFile: number; qrLink: number }
  ) => {
    for (let rowNumber = startRow; rowNumber <= endRow; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      const parentTypeCell = row.getCell(3); // Min Type Column
      const barcodeCell = row.getCell(7); // Barcode Column

      if (parentTypeCell?.value && barcodeCell?.value) {
        const parentType = parentTypeCell.value.toString();
        const barcode = barcodeCell.value.toString();
        const newCode = generateNewCode(parentType, barcode);

        // Thêm mã mới vào Excel
        row.getCell(columns.newCode).value = newCode;

        // Tạo QR code
        const qrDataUrl = await generateQRCode(newCode);
        const qrBlob = dataURLtoBlob(qrDataUrl);
        const qrFileName = `${parentType}-${barcode}.png`;

        if (qrFolder) {
          qrFolder.file(qrFileName, qrBlob);
        }

        // Thêm tên file QR vào Excel
        row.getCell(columns.qrFile).value = qrFileName;
        const qrLinkCell = row.getCell(columns.qrLink);
        qrLinkCell.value = {
          text: "View QR Code",
          hyperlink: `./qrcodes/${qrFileName}`,
          tooltip: `Open QR code for ${barcode}`,
        };
        qrLinkCell.font = {
          color: { argb: "0563C1" },
          underline: true,
        };
        // Cập nhật tiến trình
        setProgress((prev) => ({
          ...prev,
          current: rowNumber - 3,
          status: `Đang xử lý voucher ${rowNumber - 3}/${prev.total}`,
        }));
      }
    }
  };

  const processExcel = async (buffer: ArrayBuffer) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new Error("Không tìm thấy worksheet trong file Excel");
    }

    const totalRows = worksheet.rowCount - 3; // Trừ 3 dòng header
    setProgress({ current: 0, total: totalRows, status: "Bắt đầu xử lý..." });

    const NEW_CODE_COL = worksheet.columnCount + 1;
    const QR_FILE_COL = NEW_CODE_COL + 1;
    const QR_LINK_COL = QR_FILE_COL + 1;

    const zip = new JSZip();
    const qrFolder = zip.folder("qrcodes");

    try {
      // Thêm và style headers
      const headerRow2 = worksheet.getRow(2);
      const headerRow3 = worksheet.getRow(3);

      headerRow2.getCell(NEW_CODE_COL).value = "";
      headerRow3.getCell(NEW_CODE_COL).value = "Generated URL QR Code";

      headerRow2.getCell(QR_FILE_COL).value = "";
      headerRow3.getCell(QR_FILE_COL).value = "QR Code File";

      // Cột hyperlink QR
      headerRow2.getCell(QR_LINK_COL).value = "";
      headerRow3.getCell(QR_LINK_COL).value = "QR Code Link";

      [NEW_CODE_COL, QR_FILE_COL,QR_LINK_COL].forEach((col) => {
        const cell = headerRow3.getCell(col);
        cell.font = { bold: true };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE0E0E0" },
        };
      });

      // Xử lý theo batch
      for (
        let startRow = 4;
        startRow <= worksheet.rowCount;
        startRow += BATCH_SIZE
      ) {
        const endRow = Math.min(startRow + BATCH_SIZE - 1, worksheet.rowCount);
        await processBatch(worksheet, startRow, endRow, qrFolder, {
          newCode: NEW_CODE_COL,
          qrFile: QR_FILE_COL,
          qrLink: QR_LINK_COL
        });

        // Cho browser "thở" giữa các batch
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Set độ rộng cột
      worksheet.getColumn(NEW_CODE_COL).width = 35;
      worksheet.getColumn(QR_FILE_COL).width = 25;
      worksheet.getColumn(QR_LINK_COL).width = 15;

      setProgress((prev) => ({ ...prev, status: "Đang tạo file ZIP..." }));

      // Tạo zip file
      const excelBuffer = await workbook.xlsx.writeBuffer();
      zip.file("vouchers.xlsx", excelBuffer);

      const zipContent = await zip.generateAsync({
        type: "blob",
        streamFiles: true, // Tối ưu cho file lớn
      });

      // Tải xuống file
      const url = window.URL.createObjectURL(zipContent);
      const a = document.createElement("a");
      a.href = url;
      a.download = "vouchers_package.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return totalRows;
    } catch (error) {
      throw new Error(
        `Lỗi khi xử lý Excel: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage({
        type: "success",
        content: "File đã được tải lên thành công!",
      });
    }
  };

  const handleProcess = async () => {
    if (!file) return;

    setLoading(true);
    setMessage({ type: "", content: "" });
    setProgress({ current: 0, total: 0, status: "Đang chuẩn bị..." });

    try {
      const buffer = await file.arrayBuffer();
      const processedCount = await processExcel(buffer);

      setMessage({
        type: "success",
        content: `Đã xử lý thành công ${processedCount} voucher! File ZIP đã được tải xuống.`,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      setMessage({
        type: "error",
        content: error instanceof Error ? error.message : "Lỗi không xác định",
      });
    } finally {
      setLoading(false);
      setProgress((prev) => ({ ...prev, status: "Hoàn thành" }));
      setFile(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Voucher & QR Code Generator
          </CardTitle>
          <CardDescription>
            Upload an Excel file to generate voucher codes and QR codes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file" className="text-sm font-medium">
                Excel File
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                  disabled={loading}
                />
                <Upload className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-sm text-gray-500">
                Supported formats: .xlsx, .xls
              </p>
            </div>

            {/* Process Button */}
            <Button
              onClick={handleProcess}
              disabled={!file || loading}
              className="w-full sm:w-auto min-w-[200px]"
              variant={loading ? "outline" : "default"}
            >
              {loading ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Process & Download
                </>
              )}
            </Button>
          </div>

          {/* Progress Section */}
          {loading && progress.total > 0 && (
            <CardContent className="border-blue-100">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2">
                      <RefreshCcw className="w-4 h-4 animate-spin" />
                      {progress.status}
                    </span>
                    <span className="font-medium">
                      {Math.round((progress.current / progress.total) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(progress.current / progress.total) * 100}
                    className="h-2"
                  />
                  <p className="text-sm text-gray-500">
                    Processing {progress.current} of {progress.total} vouchers
                  </p>
                </div>
              </CardContent>
            </CardContent>
          )}
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-4 space-y-2 text-sm text-gray-600">
            <li>Upload your Excel file containing voucher data</li>
            <li>
              Click &quot;Process & Download&quot; to start generating codes
            </li>
            <li>Wait for the processing to complete</li>
            <li>Download will start automatically when finished</li>
            <li>Extract the ZIP file to access your vouchers and QR codes</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoucherProcessor;
