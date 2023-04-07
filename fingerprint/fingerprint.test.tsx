import { getFingerprint } from "./fingerprint";
import * as FingerprintJS from "@fingerprintjs/fingerprintjs";

jest.mock("@fingerprintjs/fingerprintjs");

describe("fingerprint", () => {
  it("should get a visitor ID (fingerprint)", async () => {
    // Mock the load function
    (FingerprintJS.load as jest.Mock).mockResolvedValue({
      get: () =>
        Promise.resolve({
          visitorId: "mocked-visitor-id",
        }),
    });

    const visitorId = await getFingerprint();
    expect(visitorId).toBe("mocked-visitor-id");
  });
});
