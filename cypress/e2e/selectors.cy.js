describe('My first test suite with basic selectors',()=>{
 //describe is test suite 
 //Here we need to write your it blocks 
 // each it block represent a single test 
 //by using cypress playground we detect UI components to perform an action
 //Studio commands => record and playback with in cypress 
 // enable experimentalStudio in cypress.config.js 

 it('My first test with tag name selector',()=>{

     cy.visit('https://example.cypress.io')

     //cy.title() is used to Get the document.title property of the page that is currently active.
     cy.title()
     //cy.get()- Get one or more DOM elements by selector
     //cy.get(selector) - tag name , class name and ID , Attribute 
     //cy.get(selector, options)
     //<h1>Kitchen Sink</h1>  => header tag 
     //h2 ...h6 tags 
        
     cy.get('h1')
     cy.get('.container > p')
     cy.get(':nth-child(3) > .container > .row > #utilities > h2')
     cy.get(':nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > :nth-child(1)')

 })

 it('My second test with class name selector',()=>{

     // to browse the URL we use cy.visit()
     cy.visit('https://example.cypress.io')

     //cy.title() is used to Get the document.title property of the page that is currently active.
     cy.title()
    // classname selector 
    //for class names to reoresent in cypress  use to add prefix .  => 
     //classname is cypressclass  => .cypressclass 

    cy.get('.banner-alt')
    //cy.get('[data-top="267.3437550663948"]')
    cy.get('.home-list > :nth-child(2) > ul > :nth-child(1) > a')

 })

 it('My third test with ID selector',()=>{

     // to browse the URL we use cy.visit()
     cy.visit('https://example.cypress.io')

     //cy.title() is used to Get the document.title property of the page that is currently active.
     cy.title()
    // ID selector 
    //for ID selectors  to represent in cypress  use to add prefix #  => 
     //ID is 123  => #123
    cy.get('#utilities')
    cy.get('.pull-right > li > a')
    cy.get('#navbar > :nth-child(1) > :nth-child(3) > a')
   

 })

 it('My fourth test with Attribute selector',()=>{

     // to browse the URL we use cy.visit()
     cy.visit('https://example.cypress.io')

     //cy.title() is used to Get the document.title property of the page that is currently active.
     cy.title()
    // attribute selector 
    cy.get('[href="/commands/cookies"]')

   //tag name selector 
   //class name  => .classname
   //id selecotr => #id 
   //Attribute  => [attributename="value"]

 })




 /* ==== Test Created with Cypress Studio ==== */
 it('my studio test ', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('https://example.cypress.io');
  cy.get('.dropdown-toggle').should('have.text', 'Commands ');
  cy.get('.dropdown-toggle').click();
  cy.get('.dropdown-menu > :nth-child(4) > a').click();
  cy.get(':nth-child(1) > h4 > a').should('be.visible');
  cy.get(':nth-child(1) > h4 > a').should('have.attr', 'href', 'https://on.cypress.io/window');
  cy.get(':nth-child(1) > h4 > a').should('have.text', 'cy.window()');
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('#document > a').click();
  /* ==== End Cypress Studio ==== */
 });
})