import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const reportDir = path.resolve(process.cwd(), 'lighthouse-report')
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true })
}

const reportPath = path.join(reportDir, 'lighthouse-summary.html')
const targetUrl = process.env.URL || 'http://localhost:5173/'

console.log(`\n🚀 Iniciando Auditoria Lighthouse em: ${targetUrl}`)

try {
  const cmd = `npx lighthouse ${targetUrl} --output=html --output-path="${reportPath}" --chrome-flags="--headless" --view=false --quiet`
  execSync(cmd, { stdio: 'inherit' })
  console.log(`\n✅ Relatório Lighthouse gerado com sucesso em: ${reportPath}\n`)
} catch (error) {
  console.error('\n❌ Erro durante a execução do Lighthouse:', error.message)
  process.exit(1)
}
