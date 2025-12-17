import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('homepage renders key sections', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Spaces'
    );
    await expect(
      page.getByRole('link', { name: /book with us/i })
    ).toBeVisible();
  });

  test('portfolio page opens modal', async ({ page }) => {
    await page.goto('/portfolio');
    await page
      .getByRole('button', { name: /view photos/i })
      .first()
      .click();
    await expect(page.getByRole('dialog', { name: /photos/i })).toBeVisible();
    await expect(
      page.getByRole('button', { name: /close project photos/i })
    ).toBeVisible();
  });
});
