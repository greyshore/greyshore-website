describe('form', () => {
  it('is validated', () => {
    cy.visit('index.html')

    cy.get('form#contact-form').within(() => {
      // check input and label programatic associations
      const getInputByLabel = (label) => {
        return cy
          .contains('label', label)
          .invoke('attr', 'for')
          .then((id) => {
            cy.get('#' + id)
          })
      }
      getInputByLabel('Full Name *').type('Louise Smith')
      getInputByLabel('Full Name *').should('have.value', 'Louise Smith')

      getInputByLabel('Phone').type('980-888-8888')
      getInputByLabel('Phone').should('have.value', '980-888-8888')
      
      getInputByLabel('Contact Email *').type('louise@test.com')
      getInputByLabel('Contact Email *').should('have.value', 'louise@test.com')

    })
  })
})