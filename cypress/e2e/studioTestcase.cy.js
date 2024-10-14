describe('studio test suite for Querying command',function(){

it('Browse the Querying command page',function(){
    /*
Test case #1: Querying page heading should be Querying 

1. Browse the website "https://example.cypress.io/" //done
2. Click on the Commands dropdown >> Querying option 
3. in the resulting page we need to check the Page heading should be "Querying"

    */

    cy.visit('https://example.cypress.io')
    cy.get('.dropdown-toggle').click(); //locate the dropdown and expland the dropdown by clicking on it 
    cy.get('.dropdown-menu > :nth-child(1) > a').click(); //perform click action on Querying option exist in Commands dropdown
    cy.get('h1').should('have.text', 'Querying');
})

it('Querying page displaying the cy.get() method',function(){
    /*
Testcase#2 : Querying page displaying the cy.get() method 

1. Browse the website "https://example.cypress.io/"
2. Click on the Commands dropdown and select Querying option 
3. In the resulting page cy.get() method should be present 
4. cy.get() method shoud contain Button with the label Button
    */

    cy.visit('https://example.cypress.io')
    cy.get('.dropdown-toggle').click(); //locate the dropdown and expland the dropdown by clicking on it 
    cy.get('.dropdown-menu > :nth-child(1) > a').click(); //perform click action on Querying option exist in Commands dropdown
    cy.get('#get > a').should('be.visible');
    cy.get('#get > a').should('have.text', 'cy.get()'); //we do have cy.get() or not
    cy.get('#query-btn').should('have.text', '\n                Button\n              ');
})

it('Querying page is displaying the cy.contains() method ',function(){
    /*
Testcase#3 : Querying page is displaying the cy.contains() method 

1. Browse the website "https://example.cypress.io/"
2. Click on the Commands dropdown and select Querying option 
3. In the resulting page cy.contains() method should be present 
4. SaveForm button shoud be present 
    */

    cy.visit('https://example.cypress.io')
    cy.get('.dropdown-toggle').click(); //locate the dropdown and expland the dropdown by clicking on it 
    cy.get('.dropdown-menu > :nth-child(1) > a').click(); //perform click action on Querying option exist in Commands dropdown

    cy.get('#contains > a').should('be.visible');
    cy.get('#contains > a').should('have.text', 'cy.contains()');
    cy.get('.btn > span').should('be.visible');
    cy.get('.btn > span').should('have.text', 'Save Form');
})

it('Querying page displaying the cy.within() method ',function(){
    /*
Testcase#4 : Querying page displaying the cy.within() method 

1. Browse the website "https://example.cypress.io/"
2. Click on the Commands dropdown and select Querying option 
3. In the resulting page cy.within() method should be present 
4. within selection should contain name txtbox , email and password 
    */

    cy.visit('https://example.cypress.io')
    cy.get('.dropdown-toggle').click(); //locate the dropdown and expland the dropdown by clicking on it 
    cy.get('.dropdown-menu > :nth-child(1) > a').click(); //perform click action on Querying option exist in Commands dropdown
    cy.get('#within > a').should('be.visible');
    cy.get('#within > a').should('have.text', '.within()');
    cy.get('#inputName').should('be.visible');
    cy.get('#inputName').should('be.enabled');
    cy.get('#inputEmail').should('be.visible');
    cy.get('#inputEmail').should('be.enabled');
})

it('Querying page displaying the cy.root() method ',function(){
    /*
    Testcase#5 : Querying page displaying the cy.root() method 

1. Browse the website "https://example.cypress.io/"
2. Click on the Commands dropdown and select Querying option 
3. In the resulting page cy.root() method should be present
4 Cy.root should have the information about One
Two
Buckle my shoe

    */

    cy.visit('https://example.cypress.io')
    cy.get('.dropdown-toggle').click(); //locate the dropdown and expland the dropdown by clicking on it 
    cy.get('.dropdown-menu > :nth-child(1) > a').click(); //perform click action on Querying option exist in Commands dropdown
    cy.get('.query-ul > :nth-child(1)').should('be.visible');
    cy.get('.query-ul > :nth-child(1)').should('have.text', 'One');
    cy.get('#root > a').should('be.visible');
    cy.get('#root > a').should('have.text', 'cy.root()');
    cy.get('.query-ul > :nth-child(2)').should('be.visible');
    cy.get('.query-ul > :nth-child(2)').should('have.text', 'Two');
    cy.get('.query-ul > :nth-child(3)').should('be.visible');
    cy.get('.query-ul > :nth-child(3)').should('have.text', 'Buckle my shoe');

  
})


})