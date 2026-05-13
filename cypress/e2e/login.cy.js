describe('Página de Login', () => {

    beforeEach(() => {
        cy.visit('https://front.serverest.dev/login')
    })

    it('deve carregar o logo do ServeRest', () => {
        cy.get('img.imagem')
          .should('be.visible')
          .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0)
          })
    })

    it('deve carregar os placeholders de login e senha', () => {
        cy.get('input[name="email"]')
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Digite seu email')

        cy.get('input[name="password"]')
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Digite sua senha')
    })

    it('deve fazer login com sucesso e redirecionar para home', () => {
        cy.get('#email').type('fulano@qa.com')
        cy.get('#password').type('teste')
        cy.get('button[type="submit"]').click()
        
        cy.url().should('include', '/admin/home')
    })

    it('deve exibir um erro ao tentar logar com credenciais inválidas', () => {
        cy.get('#email').type('usuario_que_so_deus_sabe@teste.com')
        cy.get('#password').type('batatinhafrita123')
        cy.get('button[type="submit"]').click()

        cy.contains('Email e/ou senha inválidos')
          .should('be.visible')

        cy.url().should('not.include', '/admin/home')
    })

    it('deve validar mensagens de erro obrigatórias ao não preencher email e senha', () => {
        cy.get('button[type="submit"]').click()

        cy.contains('Email é obrigatório')
          .should('be.visible')
        cy.contains('Password é obrigatório')
          .should('be.visible')
    })





})