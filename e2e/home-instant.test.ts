import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

test.describe("home instant navigation", () => {
  test("keeps the header and product list visible immediately on the home route", async ({
    page,
    baseURL,
  }) => {
    await instant(
      page,
      async () => {
        await page.goto("/");
        await expect(
          page.getByRole("heading", {
            name: /Experience Pure Sound/i,
          }),
        ).toBeVisible();
        await expect(page.getByText("Popular products")).toBeVisible();
      },
      { baseURL },
    );

    await expect(page.getByText("Popular products")).toBeVisible();
  });

  test("keeps the home header and product list visible on a soft navigation back home", async ({
    page,
  }) => {
    await page.goto("/all-products");

    await instant(page, async () => {
      await page.getByRole("link", { name: "Home" }).first().click();
      await page.waitForURL((url) => url.pathname === "/");
      await expect(
        page.getByRole("heading", {
          name: /Experience Pure Sound/i,
        }),
      ).toBeVisible();
      await expect(page.getByText("Popular products")).toBeVisible();
    });

    await expect(page.getByText("Popular products")).toBeVisible();
  });
});
