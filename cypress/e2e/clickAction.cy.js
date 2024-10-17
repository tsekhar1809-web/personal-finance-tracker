///<reference types="cypress" />
describe('click action', function(){
   beforeEach(function(){
    //this code will execute for every it block
    //before executing the it block we will be on actions page
    cy.visit('https://example.cypress.io')
    cy.get('.dropdown-toggle').click() //expanding the dropdown options
    cy.contains('Actions').click()


   })
    it('click()',function(){
      cy.get('.action-btn').click()
      cy.get('#action-canvas').click()
//click wiht position names
      cy.get('#action-canvas').click('topLeft')
      cy.get('#action-canvas').click('top')
      cy.get('#action-canvas').click('topRight')
      cy.get('#action-canvas').click('left')
      cy.get('#action-canvas').click('right')
      cy.get('#action-canvas').click('bottomLeft')
      cy.get('#action-canvas').click('bottom')
      cy.get('#action-canvas').click('bottomRight')
      //click with x, y coordinates
      cy.get('#action-canvas')
      cy.get('#action-canvas').click(80, 75)
       // click 80px on x coord and 75px on y coord
      cy.get('#action-canvas').click(170, 75)
      cy.get('#action-canvas').click(80, 165)
      cy.get('#action-canvas').click(100, 185)
      cy.get('#action-canvas').click(125, 190)
      cy.get('#action-canvas').click(150, 185)
      cy.get('#action-canvas').click(170, 165)

      // click multiple elements by passing multiple: true
cy.get('.action-labels>.label').click({ multiple: true })

// Ignore error checking prior to clicking
//is being covered by another element: current element is not clickable eventhough i want to click on it 
//{force: true}
cy.get('.action-opacity>.btn')
//.click()//got failed as this element is covered by another element
.click({ force: true })

    })
it('dblclick()', function(){
// Our app has a listener on 'dblclick' event in our 'scripts.js'
// that hides the div and shows an input on double click
cy.get('.action-div').dblclick()
cy.get('.action-div').should('not.be.visible')
cy.get('.action-input-hidden').should('be.visible')

})
it('right click()',function(){

    // that hides the div and shows an input on right click
cy.get('.rightclick-action-div').rightclick()
cy.get('.rightclick-action-div').should('not.be.visible')
cy.get('.rightclick-action-input-hidden').should('be.visible')
cy.get('.rightclick-action-input-hidden').clear().type('ram')
})
it('check() for radio and checkboxes',function(){
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check()
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').should('be.checked')
    
    cy.get('.action-radios [type="radio"]').not('[disabled]').check()
    cy.get('.action-radios [type="radio"]').not('[disabled]').should('be.checked')
    
    // .check() accepts a value argument
    cy.get('.action-radios [type="radio"]').check('radio1')
    cy.get('.action-radios [type="radio"]').should('be.checked')
    
    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox2'])
    cy.get('.action-multiple-checkboxes [type="checkbox"]').should('be.checked')
    
    // Ignore error checking prior to checking
    cy.get('.action-checkboxes [disabled]').check({ force: true })
    cy.get('.action-checkboxes [disabled]').should('be.checked')
    
    cy.get('.action-radios [type="radio"]').check('radio3', { force: true })
    cy.get('.action-radios [type="radio"]').should('be.checked')

})

it('uncheck',function(){

    // By default, .uncheck() will uncheck all matching
// checkbox elements in succession, one after another
cy.get('.action-check [type="checkbox"]')
.not('[disabled]')
.uncheck()
cy.get('.action-check [type="checkbox"]')
.not('[disabled]')
.should('not.be.checked')

// .uncheck() accepts a value argument
cy.get('.action-check [type="checkbox"]')
.check('checkbox1')
cy.get('.action-check [type="checkbox"]')
.uncheck('checkbox1')
cy.get('.action-check [type="checkbox"][value="checkbox1"]')
.should('not.be.checked')

// .uncheck() accepts an array of values
cy.get('.action-check [type="checkbox"]')
.check(['checkbox1', 'checkbox3'])
cy.get('.action-check [type="checkbox"]')
.uncheck(['checkbox1', 'checkbox3'])
cy.get('.action-check [type="checkbox"][value="checkbox1"]')
.should('not.be.checked')
cy.get('.action-check [type="checkbox"][value="checkbox3"]')
.should('not.be.checked')

// Ignore error checking prior to unchecking
cy.get('.action-check [disabled]').uncheck({ force: true })
cy.get('.action-check [disabled]').should('not.be.checked')
})
it.only('select()',function(){

    // at first, no option should be selected
cy.get('.action-select')
.should('have.value', '--Select a fruit--')

// Select option(s) with matching text content
cy.get('.action-select').select('apples')
// confirm the apples were selected
// note that each value starts with "fr-" in our HTML
cy.get('.action-select').should('have.value', 'fr-apples')

cy.get('.action-select-multiple')
.select(['apples', 'oranges', 'bananas'])
cy.get('.action-select-multiple')
// when getting multiple values, invoke "val" method first
.invoke('val')
.should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

// Select option(s) with matching value
cy.get('.action-select').select('fr-bananas')
cy.get('.action-select')
// can attach an assertion right away to the element
.should('have.value', 'fr-bananas')

cy.get('.action-select-multiple')
.select(['fr-apples', 'fr-oranges', 'fr-bananas'])
cy.get('.action-select-multiple')
.invoke('val')
.should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

// assert the selected values include oranges
cy.get('.action-select-multiple')
.invoke('val').should('include', 'fr-oranges')
})
})