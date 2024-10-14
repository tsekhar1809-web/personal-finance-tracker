describe('template spec', () => {
  it('Cypress playground testcase', () => {
    cy.visit('https://example.cypress.io')

    //below statements copied from cypress play ground
    cy.get('.navbar-brand')
    cy.get('.dropdown-toggle')
  })

  it('utilities testcase', function() {
    cy.visit('https://example.cypress.io');
    cy.get('#navbar > :nth-child(1) > :nth-child(2) > a')
    .click();//action performed by your cypress
    // cy.get('#_ > a')
    //.click(); //click action to be performed on above yielded subject
    cy.get('h1').should('be.visible');
    cy.get('h1').should('have.text', 'Utilities');
    cy.get('.container > p').should('be.visible');
    cy.get('.container > p > a').should('have.attr', 'href', 'https://on.cypress.io/_');
    cy.get(':nth-child(1) > p > a > code').should('have.text', 'Cypress._.method()');
  });

   it('api testcase', function() {
    cy.visit('https://example.cypress.io');
    //cy.get('h1').should('have.text', 'Cypress API');
    cy.get('#navbar > :nth-child(1) > :nth-child(3) > a').click();
    cy.get('h1').should('have.text', 'Cypress API');
    //have.text is used to exactly matches text provided by the testers to the UI component text
    //expected result you are mentioning the assertion 
    // that input matches with output provided by your cypress action

    cy.get('h1').should('be.visible');
    //be.visible  =>  is this UI component is visble to the customer or not 
    //should be visible 
    //should(be.visble)
    cy.get('.container > p').should('be.visible');
    cy.get('.container > p').should('have.text', 'Examples of uses of the Cypress API, for a full reference, go to docs.cypress.io\n      ');
    cy.get('#Commands\\.add > a').should('be.visible');
    cy.get('#Commands\\.add > a').should('have.attr', 'href', 'https://on.cypress.io/custom-commands');
    //have.attr is used to detect the element priperties or attributes and matches with input provided by you

    cy.get('#Commands\\.add > a')//to select the UI component 
    .should('have.text', 'Cypress.Commands.add()');//adding an assertion to the yeilded subject

    cy.get(':nth-child(1) > pre > .javascript')//locate the element 
    .should('have.text', 'Cypress.Commands.add(\'console\', {\n  prevSubject: true,\n}, (subject, method) => {\n  method = method || \'log\'\n\n  // log the subject to the console\n  console[method](\'The subject is\', subject)\n  return subject');
    // validating the statement 

    cy.get('.dropdown-toggle')//this is to select the element from the page
    .click();//to perform an action
  });

  it('commands tests', function() {
    cy.visit('https://example.cypress.io');
    cy.get('.dropdown-toggle')//select element 
    .click();//perform an action 
    
    cy.get('.dropdown-menu > :nth-child(1) > a').click();
    cy.get('.dropdown-toggle').click();
    cy.get(':nth-child(16) > a').click();
    cy.get('h1')//locate the element 
    .should('be.visible'); //perfrom assertion =>  is it visible to the customer or not 

    cy.get('h1')//locate element 
    .should('have.text', 'Cookies');//perform test or validation
    cy.get('.container > p').should('be.visible');
    cy.get('.container > p').should('have.text', 'Examples of managing cookies in Cypress, for a full reference of commands, go to docs.cypress.io\n      ');
    cy.get(':nth-child(1) > .row > .col-xs-5 > .well > .set-a-cookie').should('be.enabled');
    cy.get(':nth-child(1) > .row > .col-xs-5 > .well > .set-a-cookie').should('be.visible');
    cy.get(':nth-child(1) > .row > .col-xs-5 > .well > .set-a-cookie').should('have.class', 'set-a-cookie');
    cy.get(':nth-child(1) > .row > .col-xs-5 > .well > .set-a-cookie').should('have.class', 'btn');
    cy.get(':nth-child(1) > .row > .col-xs-5 > .well > .set-a-cookie').should('have.class', 'btn-success');
    cy.get(':nth-child(1) > .row > .col-xs-5 > .well > .set-a-cookie').should('have.text', 'Set Cookie');
    cy.get(':nth-child(2) > .row > .col-xs-5 > .well > .set-a-cookie').should('have.text', 'Set Cookie');
  });
// should be visible // is it visible to the customer or not 
// should be enabled  // this is enabled to perform an action 

//should have.text => to chekc the text present in that element 
//shoulld have.attr =>  to check the attribute values

})