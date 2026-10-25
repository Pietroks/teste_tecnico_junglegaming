import { test, expect } from '@playwright/test'

test.describe('Testes de Regressão Visual', () => {
  test('snapshot visual da página inicial', async ({ page }) => {
    await page.goto('/')
    // Aguarda o carregamento dos elementos principais
    await expect(page.locator('h1')).toBeVisible()

    // Compara o screenshot com a baseline
    await expect(page).toHaveScreenshot('home-page.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    })
  })

  test('snapshot visual da página de itens', async ({ page }) => {
    await page.goto('/items')
    await expect(page.getByText('Configurar TanStack Router')).toBeVisible()

    await expect(page).toHaveScreenshot('items-page.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    })
  })

  test('snapshot visual da página de tempo real', async ({ page }) => {
    await page.goto('/realtime')
    await expect(page.locator('h1')).toBeVisible()

    await expect(page).toHaveScreenshot('realtime-page.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    })
  })
})
