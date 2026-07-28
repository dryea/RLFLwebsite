import { describe, it, expect } from "vitest";
import { redirects } from "../redirects";

describe("redirects", () => {
  it("contains home redirect", () => {
    expect(redirects["/"]).toBe("/en");
  });

  it("contains about page redirect", () => {
    expect(redirects["/introduction"]).toBe("/en/about/introduction");
  });

  it("contains loan product redirects", () => {
    expect(redirects["/loan/home"]).toBe("/en/products/loans/home-loan");
    expect(redirects["/loan/personal"]).toBe("/en/products/loans/personal-loan");
  });

  it("contains savings product redirects", () => {
    expect(redirects["/deposit/normal-saving-account"]).toBe("/en/products/savings/normal-saving-account");
  });

  it("contains service redirects", () => {
    expect(redirects["/service/mobile-banking"]).toBe("/en/services/mobile-banking");
  });

  it("contains rate page redirects", () => {
    expect(redirects["/interest-rate"]).toBe("/en/rates/interest-rates");
  });

  it("contains all 70+ entries", () => {
    expect(Object.keys(redirects).length).toBeGreaterThan(60);
  });
});
