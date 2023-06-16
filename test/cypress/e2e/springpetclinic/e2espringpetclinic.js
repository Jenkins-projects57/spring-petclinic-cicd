import { Given, When, The, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('Access the springpet clinic', () => {
    //Access google 
    cy.visit("http://44.192.10.141:8080/")
    //Verify we are in home page 
    cy.xpath("//*[text()='Welcome']").should('have.text',"Welcome");

})
When('Click on any button for pass test', () => {
    //Click on Find owners
    cy.xpath("//*[text() = 'Find owners']").click();
    cy.log("User is in Find owners")
    //Click o Ventarnary 
    cy.xpath("//*[text() = 'Veterinarians']").click();
    cy.log("User is on vetarnary page");
})

Then('Click on amy button for fail test', () => {

    //Click on errors page 
    cy.xpath("//*[text()='Error']").click();
    cy.log("User is in Error page")

})