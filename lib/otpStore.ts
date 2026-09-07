// In-memory OTP storage with 10-minute expiry
// Key: clean 10-digit mobile number

interface OtpRecord {
  otp: string;
  fullName: string;
  expiresAt: number;
  attempts: number;
}

const globalForOtp = global as unknown as {
  otpCache: Map<string, OtpRecord>;
};

export const otpCache = globalForOtp.otpCache || new Map<string, OtpRecord>();
if (process.env.NODE_ENV !== "production") globalForOtp.otpCache = otpCache;

export function storeOtp(phone: string, fullName: string, otp: string) {
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes validity
  otpCache.set(cleanPhone, {
    otp,
    fullName,
    expiresAt,
    attempts: 0,
  });
}

export function verifyOtp(phone: string, inputOtp: string): { valid: boolean; error?: string; fullName?: string } {
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  const record = otpCache.get(cleanPhone);

  if (!record) {
    return { valid: false, error: "No OTP request found for this number. Please request a new OTP." };
  }

  if (Date.now() > record.expiresAt) {
    otpCache.delete(cleanPhone);
    return { valid: false, error: "OTP has expired. Please request a new code." };
  }

  if (record.attempts >= 5) {
    otpCache.delete(cleanPhone);
    return { valid: false, error: "Too many failed attempts. Please request a new OTP." };
  }

  record.attempts += 1;

  if (record.otp !== inputOtp.trim()) {
    return { valid: false, error: "Incorrect verification code. Please try again." };
  }

  // OTP verified successfully
  const fullName = record.fullName;
  otpCache.delete(cleanPhone);
  return { valid: true, fullName };
}
