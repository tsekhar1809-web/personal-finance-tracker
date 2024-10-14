/// <reference types="cypress" />
describe('Traversal commands',function(){
    it('children',function(){
    
    //cy.visit('http://192.168.29.238:8081/Practise%20webpages/cypress_htmlpage.html')
    cy.visit('https://example.cypress.io/commands/traversal')
    cy.get('.secondary-nav').children('.services-2')

    cy.get('.secondary-nav').children('.services-3')
    .children()
    })
    //xit() is used to exclude perticular test from execution

    it.only('closest(), parent()',function(){

        cy.visit('https://example.cypress.io/commands/traversal')
        cy.get('.traversal-badge')
  .closest('div')
  .should('have.class', 'well')
  cy.get('.traversal-badge')
  .parent()
  //class="list-group-item"
  .should('have.class', 'list-group-item')
  cy.get('.traversal-badge')
  .parents().should('match', 'div')

    })

    
    it.only('filter() find()',function(){

        cy.visit('https://example.cypress.io/commands/traversal')
        cy.get('.traversal-nav>li')
  .filter('.active').should('contain', 'About')
  cy.get('.traversal-pagination').find('li').find('a').should('have.length', 7)


    })


})
