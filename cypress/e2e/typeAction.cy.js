/*
1. Browse the URL "https://example.cypress.io"
2. click on commands dropdown and select Actions 
3. in the actions page verify page heading and introduction paragraph 
4. Check do we have Email address text is available and it holding email textbox with type facility to enter ramprasad@ramanasoft.com 
5. verify email  textbox should contain ramprasad@ramanasoft.com 
*/
/// <reference types="cypress" />

describe('Type command actions', function(){

    //hooks
    beforeEach(()=>{
        cy.visit('https://example.cypress.io')
        cy.get('.dropdown-toggle').click() //dropdown list should be displayed
        cy.get('.dropdown-menu').find('[href="/commands/actions"]').click()
    
    })
    it('type email text into the email textbox', function(){
    cy.get('.dropdown-toggle').click() //dropdown list should be displayed
    cy.get('.dropdown-menu').find('li').eq(2).click() //to naviigate to actions page 
    cy.get('h1').should('contain','Actions')
    cy.get('p').first().should('include.text','Examples of actions being performed on DOM elements in Cypress, for a full reference of commands, go to docs.cypress.io')
    
    //to locate the email address 
    cy.contains('Email address')
    cy.get('.form-group').contains('Email address').should('have.text','Email address')
    cy.get('.form-group').find('#email1')
    cy.get('#email1')//preferrable
    .type('ramprasad@ramanasoft.com')
    .should('have.value','ramprasad@ramanasoft.com')
    
//test for diabled text area
cy.get('.form-group').find('label').eq(1).should('have.text','Disabled Textarea')
cy.contains('Disabled Textarea')//cypress will take care internally whehter this element exist or not 
//.should('have.text','Disabled Textarea')//this statement chekcing the selected element is havinng the provided text or not
.and('be.visible')
.and('not.be.enabled')
    })
it('extra keyboard shortcuts',function(){
    cy.get('.action-email').type('fake@email.com')
    cy.get('.action-email').should('have.value', 'fake@email.com')
    
    // .type() with special character sequences
    cy.get('.action-email').type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
    cy.get('.action-email').type('{del}{selectall}{backspace}')
    
    // .type() with key modifiers
    cy.get('.action-email').type('{alt}{option}') //these are equivalent
    cy.get('.action-email').type('{ctrl}{control}') //these are equivalent
    cy.get('.action-email').type('{meta}{command}{cmd}') //these are equivalent
    cy.get('.action-email').type('{shift}')
    
    // Delay each keypress by 0.1 sec
    cy.get('.action-email').type('slow.typing@email.com', { delay: 100 })
    cy.get('.action-email').should('have.value', 'slow.typing@email.com')
    
    cy.get('.action-disabled')
      // Ignore error checking prior to type
      // like whether the input is visible or disabled
      .type('disabled error checking', { force: true })
    cy.get('.action-disabled').should('have.value', 'disabled error checking')


})
it('focus test',function(){
    //cy.get('.action-focus').should('have.attr',)
    //.focus()
    cy.get('.action-focus').focus()
cy.get('.action-focus').should('have.class', 'focus')
cy.get('[for="password1"]').should('have.attr', 'style', 'color: orange;')
cy.get('[for="password1"]').should('have.attr','style','color: blue;')
})
it.only('blur ', function(){
    cy.get('.action-blur').type('About to blur')
    cy.get('.action-blur').blur()
    cy.get('.action-blur').should('have.class', 'error')
      .prev().should('have.attr', 'style', 'color: red;')
    .next().should('have.value','About to blur')
    cy.get('.action-blur').clear()
    .should('have.value','About to blur')

})

})