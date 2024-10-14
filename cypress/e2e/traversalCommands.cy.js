/// <reference types="cypress" />
describe('Traversal commands',function(){
    xit('children',function(){
    
    //cy.visit('http://192.168.29.238:8081/Practise%20webpages/cypress_htmlpage.html')
    cy.visit('https://example.cypress.io/commands/traversal')
    cy.get('.secondary-nav').children('.services-2')

    cy.get('.secondary-nav').children('.services-3')
    .children()
    })
    //xit() is used to exclude perticular test from execution

    xit('closest(), parent()',function(){

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

    
    xit('filter() find()',function(){

        cy.visit('https://example.cypress.io/commands/traversal')
        cy.get('.traversal-nav>li')
  .filter('.active').should('contain', 'About')
  cy.get('.traversal-pagination').find('li').find('a').should('have.length', 7)


    })

it('first, last and next',function(){

//selector for table  => .traverstdal-table 
cy.visit('https://example.cypress.io/commands/traversal')
cy.get('.table.traversal-table td').eq(0)
cy.get('.table.traversal-table td').first()
cy.get('.table.traversal-table th')
cy.get('.table.traversal-table tbody')
cy.get('.table.traversal-table tr').eq(-1)
cy.get('.table.traversal-table tr').first()
cy.get('.table.traversal-table tr').eq(0)
cy.get('.traversal-ul').find('li').contains('apples')
.next().should('have.text','oranges')
cy.get('.table.traversal-table tr').last()

cy.get('.traversal-next-all').contains('bananas').next().should('have.text','pineapples')
cy.get('.traversal-next-all').contains('bananas').nextAll().should('have.length',2)
cy.get('.table.traversal-table td').first().nextUntil('Doe')
cy.get('#fruits')
  .nextUntil('#nuts').should('have.length', 7)



//td  => table data
//th  => column heading 
//tbody => table body 
//thead => heading of the table 
//tr  => t row 
//previous commands 

cy.get('.birds').find('.active')
  .prev().should('contain', 'Lorikeets')

  cy.get('.fruits-list').find('.third')
  .prevAll().should('have.length', 2)

  cy.get('.foods-list').find('#veggies')
  .prevUntil('#fruits').should('have.length', 3)
cy.get('.traversal-mark')
  .parent().should('contain', 'Morbi leo risus')


  cy.get('.traversal-pills .active')
  .siblings().should('have.length', 2)

  cy.get('.healthy-foods').find('#fruits').siblings().first()
  cy.get('.healthy-foods').find('#fruits').siblings().last()


//not 
cy.get('.traversal-disabled .btn')
  .not('.btn-default').should('not.contain', 'Disabled')
  cy.get('.traversal-disabled .btn')
  .should('contain', 'Disabled')
//.should('not.be.visible')

})
})
