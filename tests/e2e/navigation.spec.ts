import { test, expect } from '@playwright/test'

test.describe('Navegação e Roteamento - Kurio NFT Marketplace', () => {
  test('deve carregar a página inicial com header, hero e catálogo', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('header')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Início', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Mercado', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Criadores', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Aprenda', exact: true })).toBeVisible()

    await expect(page.locator('header').getByRole('button', { name: 'Entrar' })).toBeVisible()
  })

  test('deve navegar para a página de detalhes do NFT e alternar abas', async ({ page }) => {
    await page.goto('/mercado?id=nft-01')

    await expect(page.getByRole('button', { name: 'Detalhes do NFT' })).toBeVisible()
    await expect(page.getByRole('button', { name: /Avaliações de colecionadores/ })).toBeVisible()
    await expect(page.getByText('Mais desta coleção')).toBeVisible()

    // Alterna para avaliações
    await page.getByRole('button', { name: /Avaliações de colecionadores/ }).click()
    await expect(page.getByText('Baseado em 19 avaliações')).toBeVisible()

    // Alterna de volta para detalhes
    await page.getByRole('button', { name: 'Detalhes do NFT' }).click()
    await expect(page.getByText('Rede', { exact: true })).toBeVisible()
    await expect(page.getByText('Contrato', { exact: true })).toBeVisible()
    await expect(page.getByText('Direitos Autorais', { exact: true })).toBeVisible()
  })

  test('deve abrir o modal de autenticação e alternar entre Entrar e Criar conta', async ({ page }) => {
    await page.goto('/')

    // Abre o modal pelo header
    await page.locator('header').getByRole('button', { name: 'Entrar' }).click()
    await expect(page.getByText('Entre para gerenciar sua carteira')).toBeVisible()

    // Alterna para Criar conta
    await page.getByRole('button', { name: 'Criar conta', exact: true }).click()
    await expect(page.getByPlaceholder('Nome de usuário')).toBeVisible()

    // Alterna de volta para Entrar no modal
    await page.getByRole('button', { name: 'Entrar', exact: true }).click()
    await expect(page.getByPlaceholder('contato@email.com')).toBeVisible()
  })

  test('deve alternar as imagens do carrossel do hero ao clicar nos botões elipse', async ({ page }) => {
    await page.goto('/')

    const heroImg = page.locator('section img[alt^="Destaque Kurio"]')
    await expect(heroImg).toHaveAttribute('alt', 'Destaque Kurio 1')

    // Clica no segundo botão elipse
    await page.getByRole('button', { name: 'Ver imagem 2' }).click()
    await expect(heroImg).toHaveAttribute('alt', 'Destaque Kurio 2')

    // Clica no terceiro botão elipse
    await page.getByRole('button', { name: 'Ver imagem 3' }).click()
    await expect(heroImg).toHaveAttribute('alt', 'Destaque Kurio 3')

    // Clica de volta no primeiro botão elipse
    await page.getByRole('button', { name: 'Ver imagem 1' }).click()
    await expect(heroImg).toHaveAttribute('alt', 'Destaque Kurio 1')
  })
})
