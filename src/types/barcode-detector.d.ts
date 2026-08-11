/**
 * Type สำหรับ Barcode Detection API — ยังไม่มีใน lib.dom ของ TypeScript
 * รองรับ: Chrome/Edge/Android WebView, Safari 17+ (บางส่วน)
 */
interface DetectedBarcode {
  rawValue: string
  format: string
  boundingBox: DOMRectReadOnly
  cornerPoints: { x: number; y: number }[]
}

interface BarcodeDetectorOptions {
  formats?: string[]
}

declare class BarcodeDetector {
  constructor(options?: BarcodeDetectorOptions)
  detect(source: CanvasImageSource | Blob | ImageData): Promise<DetectedBarcode[]>
  static getSupportedFormats(): Promise<string[]>
}

interface Window {
  BarcodeDetector?: typeof BarcodeDetector
}
