// import { test, expect } from "@playwright/test";
import {test, expect} from '../fixtures/auth.fixture';
import { LoginPage } from "../pages/loginPage";

test.describe('Login Teste com Page Object Model', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login de cliente válido com validação de redirecionamento para o painel.', async({page}) => {
    await loginPage.login('admin@system.com', 'AdminPassword123');
    await expect(loginPage.statusMessage).toBeVisible();
    await expect(loginPage.statusMessage).toContainText(/Login bem-sucedido/i);
    await expect(page).toHaveURL(/painel\.html/);
  });

  test('Login com senha incorreta validando mensagem de erro visível.', async() => {
    await loginPage.login('admin@system.com', 'passwordInvalid');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(/Erro: usuário não encontrado|Credenciais inválidas/i);
  });

  test('Testar visibilidade do Botão Login', async() => {
    await expect(loginPage.loginButton).toBeDisabled();
  });
});

test.describe('Testes com fixture autenticada', () => {
  test('Abre o painel já logado', async ({ loggedPage }) => {
    await expect(loggedPage).toHaveURL(/painel\.html/);
  });
});