describe('página de cadastro de usuários', () => {

    beforeEach(() => {
        cy.visit('https://front.serverest.dev/cadastrarusuarios')
    })

    it('deve realizar o cadastro de um novo usuário admin com sucesso', () => {
        const dynamic_email = `test_${Date.now()}@teste.com`

        cy.get('#nome').type('teste123')
        cy.get('#email').type(dynamic_email)
        cy.get('#password').type('123456')
        cy.get('#administrador').click()
        cy.get('button[type="submit"]').click()

        cy.contains('Cadastro realizado com sucesso')
        cy.url().should('include', '/admin/home')
    })

    it('deve validar mensagem de erro ao tentar cadastrar email que já existe', () => {
        cy.get('#nome').type('fulano de tal')
        cy.get('#email').type('fulano@qa.com')
        cy.get('#password').type('teste')
        
        cy.get('button[type="submit"]').click()
        cy.contains('Este email já está sendo usado').should('be.visible')
    })
})