//hooks 
//beforeEac() //for every it block

//before() //before your test starts execution this block will execute only once
//after() //cleanup test after entire suite execution-  only once
//afterEach() //cleanup test after every it block

///<reference types="cypress" />
describe('hooks in cypress', function(){
    afterEach(function(){
        cy.log('i am in after each hook')
     })
   
 beforeEach(function(){
    cy.log('I am in before Each hook')
 })
 
 after(function(){
    cy.log('i am in after hook')
 })
 before(function(){
    cy.log('I am in before hook')
 })
it('my first test',function(){
    cy.log('i am in my fiirst test')
})
it('my second test',function(){
    cy.log('i am in my second test')
})
it('my 3 test',function(){
    cy.log('i am in my third test')
})
it('my 4 test',function(){
    cy.log('i am in my fourth test')
})
it('my fifth test',function(){
    cy.log('i am in my fifth test')
})
})