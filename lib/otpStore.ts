import crypto from "crypto";

const OTP_SECRET =
  process.env.OTP_SECRET ||
  process.env.RAZORPAY_KEY_SECRET ||
  "promec-india-secure-otp-key-2026-auth";

// Generate a stateless cryptographic token that works across all Vercel serverless lambdas
export function generateOtpToken(phone: string, otp: string): string {
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  const dataToSign = `${cleanPhone}|${otp.trim()}|${expiresAt}`;
  const hash = crypto.createHmac("sha256", OTP_SECRET).update(dataToSign).digest("hex");
  return `${hash}.${expiresAt}`;
}

export function verifyOtpToken(
  phone: string,
  inputOtp: string,
  token?: string
): { valid: boolean; error?: string } {
  const cleanOtp = String(inputOtp || "").trim();
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);

  // If token is provided, verify cryptographically (serverless stateless)
  if (token && token.includes(".")) {
    const [expectedHash, expiresAtStr] = token.split(".");
    const expiresAt = parseInt(expiresAtStr, 10);

    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return { valid: false, error: "OTP has expired. Please request a new code." };
    }

    try {
      const dataToSign = `${cleanPhone}|${cleanOtp}|${expiresAt}`;
      const computedHash = crypto.createHmac("sha256", OTP_SECRET).update(dataToSign).digest("hex");

      const expectedBuffer = Buffer.from(expectedHash, "hex");
      const computedBuffer = Buffer.from(computedHash, "hex");

      if (
        expectedBuffer.length === computedBuffer.length &&
        crypto.timingSafeEqual(expectedBuffer, computedBuffer)
      ) {
        return { valid: true };
      }
    } catch (e) {
      console.error("HMAC verification error:", e);
    }
  }

  // Fallback in-memory check for backwards compatibility
  const record = inMemoryOtpCache.get(cleanPhone);
  if (record) {
    if (Date.now() > record.expiresAt) {
      inMemoryOtpCache.delete(cleanPhone);
      return { valid: false, error: "OTP has expired. Please request a new code." };
    }
    if (record.otp === cleanOtp) {
      inMemoryOtpCache.delete(cleanPhone);
      return { valid: true };
    }
  }

  return { valid: false, error: "Incorrect verification code. Please try again." };
}

// In-memory fallback
interface OtpRecord {
  otp: string;
  fullName: string;
  expiresAt: number;
}

const inMemoryOtpCache = new Map<string, OtpRecord>();

export function storeOtp(phone: string, fullName: string, otp: string) {
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  inMemoryOtpCache.set(cleanPhone, {
    otp: otp.trim(),
    fullName: fullName.trim(),
    expiresAt: Date.now() + 10 * 60 * 1000,
  });
}
