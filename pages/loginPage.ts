import {Page, Locator} from '@playwright/test';
// Recebe o page no constructor, encapsula os seletores, metodos claros Ex: login(), fillEmail()... . Retornam os locatos para o teste, apenas para fazer o (ASSERT). É melhor, por que se um seletor mudar no HTML, só atualizamos em um único local do Page Object.

export class LoginPage{
  // Locators
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly statusMessage: Locator;
  readonly credentialsBox: Locator;

  constructor(private page:Page) {
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
    this.errorMessage = page.locator('#errorMessage');
    this.statusMessage = page.locator('#statusMessage');
    this.credentialsBox = page.locator('.credentials-info');
  }

  // Navegar para a tela de login
  async goto() {
    await this.page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html');
  }

  // Ação de Login
  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Apenas preencher Email
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  // Apenas preencher Senha
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  // Apenas clicar no botão de login
  async clickSubmit() {
    await this.loginButton.click();
  }
}