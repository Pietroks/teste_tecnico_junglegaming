import { test, expect } from '@playwright/test'

test.describe('Fluxo de Checkout e Carteiras - Kurio NFT Marketplace', () => {
  test('deve navegar pelo carrinho e avançar para confirmação', async ({ page }) => {
    await page.goto('/finalizar-compra')

    // Verifica cabeçalho da tabela do carrinho
    await expect(page.getByText('NFTs').first()).toBeVisible()
    await expect(page.getByText('Preço').first()).toBeVisible()
    await expect(page.getByText('Edições').first()).toBeVisible()
    await expect(page.getByText('Total').first()).toBeVisible()

    // Verifica resumo de valores
    await expect(page.getByText('Resumo da carteira')).toBeVisible()
    await expect(page.getByText('(-) 00.00')).toBeVisible()

    // Avança para a tela de confirmação
    await page.getByRole('link', { name: 'Conectar e finalizar' }).click()
    await expect(page).toHaveURL('/confirmar-compra')
  })

  test('deve preencher o formulário de pagamento e finalizar compra', async ({ page }) => {
    await page.goto('/confirmar-compra')

    await expect(page.getByRole('heading', { name: 'Perfil do colecionador' })).toBeVisible()
    await expect(page.getByText('Seus NFTs')).toBeVisible()

    // Preenche campos do formulário por name
    await page.locator('input[name="displayName"]').fill('Colecionador Teste')
    await page.locator('input[name="username"]').fill('@colecionador')
    await page.locator('select[name="network"]').selectOption('Ethereum')
    await page.locator('input[name="profileName"]').fill('Perfil Teste')
    await page.locator('input[name="walletAddress"]').fill('0x71C...b49F')
    await page.locator('select[name="walletType"]').selectOption('MetaMask')
    await page.locator('input[name="referralCode"]').fill('REF123')
    await page.locator('input[name="email"]').fill('teste@email.com')
    await page.locator('select[name="ensName"]').selectOption('colecionador.eth')

    // Submete compra
    await page.getByRole('button', { name: 'Confirmar compra' }).click()
    await expect(page).toHaveURL('/compra-realizada')

    // Valida página de compra realizada
    await expect(page.getByText('seus nfts agora estao na sua carteira')).toBeVisible()
    await expect(page.getByText('Detalhes da transação')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Ver no Etherscan' })).toBeVisible()
  })

  test('deve gerenciar perfil e salvar nova carteira com sucesso', async ({ page }) => {
    await page.goto('/perfil')

    await expect(page.getByText('Meu perfil').first()).toBeVisible()
    await expect(page.getByText('Dados do perfil')).toBeVisible()

    // Alterna para aba Carteiras
    await page.getByRole('button', { name: 'Carteiras' }).click()
    await expect(page.getByRole('heading', { name: 'Carteira principal' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Carteira secundária' })).toBeVisible()

    // Preenche cadastro de carteira
    await page.getByPlaceholder('Nome de exibição').fill('Minha MetaMask')
    await page.getByPlaceholder('Apelido da carteira').fill('Cofre Pessoal')
    await page.getByPlaceholder('Endereço 0x da carteira').fill('0x1234567890abcdef')

    // Salva carteira
    await page.getByRole('button', { name: 'Salvar carteira' }).click()

    // Verifica confirmação visual
    await expect(page.getByText('Carteira salva com sucesso!')).toBeVisible()
    await expect(page.getByText('Cofre Pessoal')).toBeVisible()
  })
})
