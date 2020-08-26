describe('The Landing Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads title', () => {
    cy.get('.title')
      .should('contain', 'Welcome to the trivial pursuit of fruit!')
  })

  it('finds questions', () => {
    cy.get('[type="radio"]').first().should('have.class', 'correct')
  })

  //this test is a little finicky - passes when the page loads the data correctly, but also fails (presumably when there isn't any data) - needs some work!
  it('updates score', () => {
    cy.get('[type="radio"]').first().check()
    cy.get('.water').should('contain', 'water: 30')
  })
})
