# Kurio — NFT Marketplace

Plataforma de marketplace de tokens não fungíveis (NFTs) desenvolvida em React e TypeScript, construída com fidelidade visual ao layout do Figma e aderência rigorosa à stack tecnológica exigida pelo desafio técnico frontend.

A aplicação simula todos os fluxos essenciais de um marketplace Web3: descoberta de ativos digitais, inspeção detalhada de tokens, gerenciamento dinâmico de carrinho, validação e finalização de compra, emissão de comprovante em blockchain simulada, autenticação com persistência de sessão e gestão de perfil de colecionador e carteiras.

---

## 1. Stack Tecnológica

| Responsabilidade | Tecnologia | Descrição e Aplicação no Projeto |
| :--- | :--- | :--- |
| Interface | React 19 | Componentização declarativa, hooks nativos e renderização otimizada. |
| Tipagem | TypeScript 6 | Tipagem estática fim a fim em contratos, modelos, rotas e propriedades de componentes. |
| Roteamento | TanStack Router | File-based routing com type-safety absoluto, loaders e tratamento de histórico. |
| Estado Remoto | TanStack Query | Gerenciamento de cache, revalidações assíncronas e mutations. |
| Cliente HTTP | Axios | Camada de transporte HTTP com interceptors e tratamento padronizado de respostas. |
| Tempo Real | Socket.IO Client | Cliente de WebSocket reativo para eventos em tempo real (`nft.updated`, `order.updated`). |
| Estilização | Tailwind CSS v4 | Engine utilitária configurada com a paleta de cores e tipografia especificadas no Figma. |
| Componentes | shadcn/ui & Radix UI | Primitivas acessíveis e customizadas sem dependência de temas externos. |
| Mocking de Rede | MSW (Mock Service Worker) | Interceptação de tráfego de rede no Service Worker do navegador (`src/mocks/`). |
| Testes E2E | Playwright | Suíte automatizada cobrindo navegação, carrinho, checkout, autenticação e carteiras. |
| Auditoria | Lighthouse & LHCI | Scripts automatizados para medição de Performance, Acessibilidade, Boas Práticas e SEO. |

---

## 2. Documentação Detalhada das Telas e Fluxos

### 2.1. Tela Inicial e Catálogo de Ativos (`/`)
- **Cabeçalho (Header)**: Logotipo oficial Kurio, links de navegação (`Início`, `Mercado`, `Criadores`, `Aprenda`), ícone de busca com transição de cor, atalho para o carrinho de compras com badge numérico sincronizado em tempo real e botão contextual de autenticação (`Entrar` ou `Meu perfil` quando autenticado).
- **Seção Hero**: Título de alto impacto visual, descrição editorial sobre a curadoria do marketplace, métricas de volume e número de colecionadores, e botão de chamada para ação direta no catálogo.
- **Catálogo de NFTs**: Grade com cards de ativos digitais, apresentando imagem do token, nome, identificador numérico, coleção, autor, preço em ETH e botão interativo para visualização de detalhes.
- **Seção de Artistas e Coleções em Destaque**: Apresentação de criadores verificados e coleções com maior volume de negociação recente.
- **Rodapé (Footer)**: Estrutura institucional completa com links de navegação, termos de uso, privacidade, canais de suporte e atalho direto para a área de perfil.

### 2.2. Detalhes do NFT (`/mercado?id=...`)
- **Navegação Breadcrumbs**: Rastro de navegação `Início / Mercado / Detalhes do NFT`.
- **Galeria de Miniaturas**: Exibição da arte principal com carrossel lateral/inferior de miniaturas interativas permitindo alternar a perspectiva da peça.
- **Metadados do Token**: Título da obra, autor com avatar e selo de verificação, coleção, identificador de contrato (padrão ERC-721/Metaplex), rede blockchain e indicador de disponibilidade.
- **Controles de Compra e Quantidade**:
  - Seletor de edições e controle incremental/decremental de quantidade (`-` e `+`).
  - Botão de favoritar ativo com feedback de estado (preenchimento de ícone e borda destacada).
  - Botão `Comprar agora` que adiciona imediatamente o item e as edições selecionadas ao carrinho e redireciona ao checkout.
- **Abas de Informações**:
  - *Detalhes do NFT*: Descrição conceitual da obra, especificações técnicas da rede, dados do contrato inteligente auditado e termos de direitos autorais e royalties (5%).
  - *Avaliações de colecionadores (19)*: Avaliações verificadas na blockchain com classificação por estrelas e comentários autenticados.
- **Carrossel "Mais desta coleção"**:
  - Exibição de 5 cards por visualização com imagem (212x212px, border-radius 13px), nome, quantidade e preço destacado em laranja, acompanhado de paginação por elipses.

### 2.3. Carrinho de Compras (`/finalizar-compra`)
- **Tabela de Itens (Largura 782px)**:
  - Colunas estruturadas: `NFTs`, `Preço`, `Edições`, `Total` e Ação de Remoção.
  - Cada linha apresenta miniatura do token (70x70px), nome, ID numérico, preço unitário, seletor de quantidade dinâmico (+/-), total calculado automaticamente e botão de lixeira para exclusão.
- **Resumo da Carteira**:
  - Campo de código promocional com botão `Aplicar`.
  - Exibição de `Subtotal`, `Taxa de lançamento` fixada em `(-) 00.00`, `Taxa de rede` calculada e `Total`.
  - Botão de ação principal `Conectar e finalizar` direcionando para o pagamento.
- **Carrossel "Colecionadores também viram"**:
  - Vitrine horizontal com recomendações inteligentes de outros itens do ecossistema.

### 2.4. Pagamento e Perfil do Colecionador (`/confirmar-compra`)
- **Formulário do Colecionador (763px de largura)**:
  - Campos estritos com validação HTML5 e indicativo visual de obrigatoriedade via asterisco vermelho (`*`):
    - Linha 1: `Nome de exibição` e `Nome de usuário`.
    - Linha 2: `Rede` (select nativo) e `Nome do perfil`.
    - Linha 3: `Endereço da carteira` (placeholder `Endereço 0x da carteira`) e campo auxiliar opcional sem label para ENS ou carteira secundária.
    - Linha 4: `Tipo de carteira` (MetaMask, Coinbase Wallet, WalletConnect, Phantom) e `Código de indicação`.
    - Linha 5: `E-mail` e `Nome ENS` (select de domínio).
    - Opções: Checkbox circular `Usar outra carteira?` com tooltip de ajuda e área de observação do colecionador.
- **Resumo do Pedido ("Seus NFTs")**:
  - Listagem dos itens selecionados com visualização em modo somente leitura (quantidade fixa).
  - Cálculo de subtotal, desconto de lançamento e taxa de rede.
  - Seletor de carteira de pagamento com opção de alternância e botão `Confirmar compra` acoplado à validação integral do formulário.

### 2.5. Confirmação do Pedido / Compra Realizada (`/compra-realizada`)
- **Card Centralizado (578px de largura)**:
  - Imagem de celebração `thanckyou.png`.
  - Título `seus nfts agora estao na sua carteira` em tipografia negrito centralizada.
  - Grade com 4 colunas com divisores verticais: `ID de transação`, `Data`, `Total` pago e `Carteira` utilizada.
  - Seção `Detalhes da transação` com a relação de NFTs adquiridos, edições e subtotal.
  - Alinhamento à direita para taxa de rede e total pago em ETH.
  - Mensagem de confirmação de registro permanente na rede Ethereum.
  - Botão de redirecionamento externo `Ver no Etherscan`.
  - Barra decorativa inferior de 10px na cor `#D28A4C`.

### 2.6. Autenticação e Sessão (Modal Multiúso)
- Modal acessível disparado pelo botão `Entrar` no cabeçalho:
  - Cabeçalho com alternância dinâmica entre `Entrar` e `Criar conta`, com destaque em cor laranja `#E89B55` para a aba ativa.
  - **Fluxo de Login**: Inputs para e-mail, senha com botão de alternância de visibilidade (ícones `Eye` / `EyeOff`), link `Esqueceu a senha?`, botão de submissão e autenticação social via Google e Facebook.
  - **Fluxo de Cadastro**: Campos para nome de usuário, e-mail, senha e confirmação de senha.
  - **Efeito Pós-Autenticação**: Ao submeter qualquer um dos formulários, o estado global é atualizado, os dados da sessão são armazenados no `localStorage` e o botão do cabeçalho transforma-se automaticamente em `Meu perfil`, permitindo acesso direto à conta.

### 2.7. Meu Perfil — Dados do Perfil (`/perfil`)
- **Menu Lateral Fixo (310x407px)**:
  - 7 seções com ícones dedicados: `Dados do perfil`, `Carteiras`, `Atividades`, `Lista de interesse`, `Ofertas`, `Arquivos baixados` e `Suporte`.
  - Indicador visual ativo na borda lateral esquerda (`border-l-2 border-[#D28A4C]`) para a rota selecionada.
  - Botão de encerramento de sessão `Sair` em destaque laranja, que executa o logout, limpa a sessão e redireciona à página inicial.
- **Conteúdo "Dados do perfil"**:
  - Formulário `Perfil do colecionador` com campos limpos e placeholders explicativos para `Nome de exibição`, `Nome de usuário`, `E-mail`, `Nome do ENS` (com seletor de extensão `.eth` / `.sol` / `.lens`) e `Apelido da carteira`.
  - Gestão de Avatar: visualização circular com botões `Alterar` e `Remover`.
  - Seção `Alterar senha`: campos para senha atual, nova senha e confirmação de nova senha com botão de salvar.

### 2.8. Meu Perfil — Gestão de Carteiras (`/perfil`)
- **Seção "Carteira principal"**:
  - Cabeçalho com título `Carteira principal` (17px bold) e botão `Adicionar` em laranja sem fundo.
  - Texto descritivo informando a finalidade das carteiras nos pagamentos e no recebimento de NFTs.
  - Listagem reativa das carteiras salvas, exibindo identificador visual, apelido, rede, endereço criptográfico truncado, botão de cópia com confirmação e botão de lixeira para remoção.
- **Formulário de Cadastro de Carteira**:
  - `Nome de exibição` ao lado de `Apelido da carteira`.
  - Select `Rede` (`Ethereum`, `Polygon`, `Arbitrum`, `Optimism`) ao lado de `Nome de perfil`.
  - `Endereço da carteira` ao lado de input sem label para ENS ou carteira secundária.
  - Select `Tipo de carteira` (`MetaMask`, `Coinbase Wallet`, `WalletConnect`, `Rainbow`) ao lado de `Código de indicação`.
  - `E-mail` ao lado de `Nome ENS` (select `.ens` / `.eth` + input de texto).
  - Botão `Salvar carteira` com feedback visual de sucesso (*"Carteira salva com sucesso!"*).
- **Seção "Carteira secundária"**:
  - Título com checkbox circular `rounded-full` para vinculação à carteira principal.
  - Estado vazio com mensagem centralizada: *"Você ainda não adicionou uma carteira secundária."* quando não houver itens cadastrados.

### 2.9. Comunicação em Tempo Real (`/realtime`)
- Demonstração com `Socket.IO` implementando listeners para eventos de mercado (`nft.updated`, `order.updated`), exibição de status de conexão, latência e log de eventos recebidos em tempo real.

---

## 3. Gerenciamento de Estado e Arquitetura

1. **CartContext (`src/context/cart-context.tsx`)**:
   - Controle global de itens adicionados ao carrinho.
   - Sincronização automática com `localStorage`.
   - Métodos: `addItem`, `removeItem`, `updateQuantity`, `clearCart`.
   - Propriedades computadas: `itemCount`, `subtotal`, `total`.
   - Notificação em tempo real do badge numérico no Header.

2. **AuthContext (`src/context/auth-context.tsx`)**:
   - Controle do ciclo de vida da sessão do usuário.
   - Persistência das credenciais no `localStorage`.
   - Métodos: `login(userData)` e `logout()`.
   - Saneamento automático de dados legados no carregamento da aplicação.

3. **TanStack Router (`src/routes/`)**:
   - Roteamento estruturado em arquivos (`__root.tsx`, `index.tsx`, `mercado.tsx`, `finalizar-compra.tsx`, `confirmar-compra.tsx`, `compra-realizada.tsx`, `perfil.tsx`, `realtime.tsx`).
   - Geração automática da árvore de rotas tipada via `@tanstack/react-router`.

---

## 4. Testes Automatizados com Playwright

A suíte de testes ponta a ponta (E2E) foi construída para validar os fluxos críticos da aplicação:

```bash
npx playwright test tests/e2e
```

### Casos de Teste Cobertos:
1. **Navegação e Estrutura Principal**:
   - Carregamento da página inicial, verificação do cabeçalho, logotipo, links de navegação e catálogo.
2. **Detalhes do Token e Interatividade**:
   - Acesso à rota `/mercado?id=nft-01`, alternância entre as abas *Detalhes do NFT* e *Avaliações*, inspeção de especificações da rede e contrato.
3. **Autenticação**:
   - Abertura do modal, alternância dinâmica entre *Entrar* e *Criar conta*, validação de visibilidade de campos.
4. **Carrinho de Compras**:
   - Acesso ao carrinho em `/finalizar-compra`, validação da tabela de colunas, resumo da carteira e transição para a tela de pagamento.
5. **Checkout e Finalização**:
   - Preenchimento completo do formulário do colecionador em `/confirmar-compra`, submissão, verificação da rota `/compra-realizada`, validação de dados da transação e link do explorador.
6. **Gestão de Perfil e Carteiras**:
   - Acesso a `/perfil`, transição para a aba *Carteiras*, preenchimento do formulário de cadastro, submissão, validação do feedback de sucesso e persistência na listagem.

---

## 5. Auditoria de Qualidade com Lighthouse

O repositório inclui a configuração do Lighthouse CI (`lighthouserc.json`) e um script dedicado para execução de auditorias:

```bash
# Executar auditoria automatizada do Lighthouse
npm run audit:lighthouse
```

Metas avaliadas nas rotas principais:
- Performance
- Acessibilidade (contraste de cores, semântica HTML5, roles ARIA e navegação por teclado)
- Melhores Práticas
- SEO

---

## 6. Como Executar o Projeto Localmente

### Pré-requisitos:
- Node.js versão 18 ou superior
- Gerenciador de pacotes `npm`

### Passos:
```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Comandos de Verificação:
```bash
# Checagem estática de tipos TypeScript
npm run typecheck

# Execução da suíte de testes E2E Playwright
npm run test:e2e

# Build de produção otimizado
npm run build

# Pré-visualização do build de produção
npm run preview
```

---

## 7. Configuração de Deploy em Produção (Vercel)

Para publicação em ambientes como Vercel, o arquivo de configuração `vercel.json` foi incluído na raiz do projeto com as regras de rewrite necessárias para garantir que o roteamento SPA (Single Page Application) do TanStack Router funcione em acessos diretos e recarregamentos de página (F5):

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 8. Decisões de Projeto e Responsividade

- **Priorização do Design Desktop e Garantia de Responsividade Total**: Devido à limitação de tempo para a entrega do teste técnico, a fidelidade direta às pranchetas do Figma foi priorizada para a resolução Desktop (1440px). No entanto, **foi garantida e implementada a total responsividade do site em todas as telas**, abrangendo smartphones (360px a 430px), tablets (768px a 1024px) e monitores desktop (1200px a 1920px+). Não há estouros horizontais de layout (`horizontal scroll indesejado`), elementos sobrepostos ou botões inacessíveis.
- **Detalhamento da Adaptação por Tela e Componente**:
  - **Header / Navegação**: No desktop exibe o menu inline completo; em telas mobile e tablet ativa automaticamente o menu retrátil (hambúrguer) com alternância fluida entre os links de navegação (`Início`, `Mercado`, `Criadores`, `Aprenda`) e ações de acesso.
  - **Tela Inicial / Hero**: Imagem de destaque com escala dinâmica (`w-full max-w-[450px] aspect-square`), botões de ação em pilha vertical em larguras reduzidas e alinhamento horizontal no desktop.
  - **Mercado e Vitrines**: Grids de itens ajustados dinamicamente de 1 coluna (mobile) até 4 colunas (desktop), preservando a legibilidade dos preços em ETH e botões de compra.
  - **Finalizar Compra**: A tabela analítica do carrinho é encapsulada em contêiner com rolagem horizontal controlada (`overflow-x-auto`), garantindo que os dados fiscais e o resumo do pedido fiquem acessíveis sem quebrar a estrutura da página.
  - **Confirmar Compra (Formulário de Carteira e Faturamento)**: Os campos de entrada foram construídos com flexbox fluido (`w-full sm:flex-1`), empilhando verticalmente no celular para facilitar a digitação em telas de toque e organizando-se em duas colunas harmoniosas no desktop.
  - **Compra Realizada**: A seção do recibo com as 4 métricas da transação adapta-se para 2 colunas no mobile (`grid-cols-2`) e 4 colunas no desktop (`sm:grid-cols-4`), preservando a leitura dos hashes e valores.
  - **Meu Perfil**: Estrutura adaptada em `flex-col lg:flex-row`, exibindo as abas superiores em telas mobile e a barra lateral de navegação no desktop.
- **Simulação Web3**: As operações de blockchain, transações e conexão de carteiras são tratadas de forma determinística na camada de interface e contexto, sem dependência de extensões de navegador (MetaMask) ou redes de teste reais, atendendo integralmente ao escopo do desafio.
