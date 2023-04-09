import FingerprintJS from '@fingerprintjs/fingerprintjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });


export async function getFingerprint() {
  // Initialize an agent with your API key
  const fp = await FingerprintJS.load({ apiKey: process.env.FINGERPRINT_API_KEY });

  // Get the visitor identifier
  const result = await fp.get();

  // The unique user fingerprint is available as `result.visitorId`
  console.log(result.visitorId);
  return result.visitorId; // Add this line to return the visitorId
}

export default getFingerprint;
