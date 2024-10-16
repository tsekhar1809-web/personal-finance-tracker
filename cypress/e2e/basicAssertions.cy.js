//This spec file deals with the basic assertions 
///<reference types="cypress"/>
describe('Basic assertions',function(){
      it('Basic assertions with should',function(){
         cy.visit('https://example.cypress.io/commands/actions')
        // cy.get('.form-group').find('input').first()
        // .should('be.visible')
         //.should('be.enabled')//label should have text but not having the disabled or enabled property to check
          // .should('have.text','Email address')//text avaialble for the selected UI element
         //exact match 

        cy.get('#email1')
        //to perform type action on email element we need to use type
        .type('ramprasad')
        //is this element is visible or not 
        .should('be.visible')
        //if you want to check state of the UI component enabled or disabled 
        .should('be.enabled')
        //if you want to test the value of respective element then we can use have.value
        .should('have.value','ramprasad')
        //if you want to test the respetive file classname we have to  use have.class
        .should('have.class','form-control action-email')
       
      })
      
      it('and assertions',function(){
      cy.visit('https://example.cypress.io/commands/actions')
      cy.get('#email1')
      //to perform type action on email element we need to use type
      .type('ramprasad')
      //is this element is visible or not 
      .should('be.visible')
      //if you want to check state of the UI component enabled or disabled 
      .and('be.enabled')
      //if you want to test the value of respective element then we can use have.value
      .and('have.value','ramprasad')
      //if you want to test the respetive file classname we have to  use have.class
      .and('have.class','form-control action-email')
     //cy.visit('https://example.cypress.io/commands/assertions')
     //expect(true).to.be.true
     //const o = { foo: 'bar' }
    // expect(o).to.equal(o)
    // expect(o).to.deep.equal({ foo: 'bar' })
     // matching text using regular expression
     //expect('FooBar').to.match(/bar$/i)
      })


})