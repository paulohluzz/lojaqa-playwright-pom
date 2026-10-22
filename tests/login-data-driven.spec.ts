import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

const cenarios = [
  {
    nome: 'Cliente válido faz login com sucesso',
    email: 'user@system.com',
    senha: 'UserPassword123',
    mensagemErro: null,
  },
  {
    nome: 'Admin válido faz login com sucesso',
    email: 'admin@system.com',
    senha: 'AdminPassword123',
    mensagemErro: null,
  },
  {
    nome: 'Cliente com senha errada',
    email: 'user@system.com',
    senha: 'senhaIncorreta',
    mensagemErro: /Erro: usuário não encontrado|Credenciais inválidas/i,
  },
];

for (const cenario of cenarios) {
  test(cenario.nome, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(cenario.email, cenario.senha);

    if (cenario.mensagemErro) {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(cenario.mensagemErro);
    } else {
      await expect(page).toHaveURL(/painel\.html/);
    }
  });
}