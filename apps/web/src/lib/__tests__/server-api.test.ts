import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("serverFetchAPI", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("fetches from correct URL", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: "test" }),
    });

    const { serverFetchAPI } = await import("../server-api");
    const result = await serverFetchAPI("/api/test");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/test"),
      expect.objectContaining({ cache: "no-store" })
    );
    expect(result).toEqual({ data: "test" });
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: () => Promise.resolve("Not found"),
    });

    const { serverFetchAPI } = await import("../server-api");
    await expect(serverFetchAPI("/api/missing")).rejects.toThrow("API 404");
  });
});
