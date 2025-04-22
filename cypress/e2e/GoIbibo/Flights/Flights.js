import {Given, Then, When, And} from "cypress-cucumber-preprocessor/Steps";
import HomePage from "./Flights-POM/HomePage"
import FlightSelection from "./Flights-POM/FlightSelection";
let data

before(() => {
    // disable Cypress's default behavior of logging all XMLHttpRequests and fetches
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.viewport(1280, 720)
    cy.fixture('flight').then((fixtureData)=>{
        data=fixtureData
        cy.log('trip value is '+data.Trip)
    })
  })

const homePage=new HomePage
const flightSelection= new FlightSelection


Given('the user visits the website, close all pop ups and confirm the title',()=>{
    cy.visit('/') //visit the goIbibo site
    homePage.closeAnnoyingPopUp()
    homePage.validateTitle()
    homePage.closeAnnoyingConfirm()    
})

Then ('put in the data in the search flight frame using the data table',(dataTable)=>{
    dataTable.hashes().forEach(element => {
     
        flightSelection.selectTrip(element.Trip)
        flightSelection.selectFromCity(element.FromCity)
        flightSelection.selectToCity(element.ToCity)
        flightSelection.selectDepartureDate(element.DepartureDate)
        if(element.Trip=='Round-trip' & element.ReturnDate!=null){
            flightSelection.selectReturnDate(element.ReturnDate)
        }        
        flightSelection.selectTravellers(element.Adults,element.Children,element.Infants)   
        flightSelection.selectSplFare(element.SpecialFare)
        //flightSelection.clickSearchFlight()
        //flightSelection.clickBackToFlightSearch()


   })
})


Then ('put in the data in the search flight frame using json',()=>{
    cy.log('data trip is '+ data.trip)
    flightSelection.selectTrip(data.Trip)
    flightSelection.selectFromCity(data.FromCity)
    flightSelection.selectToCity(data.ToCity)
    flightSelection.selectDepartureDate(data.DepartureDate)
    // if(element.Trip=='Round-trip' & element.ReturnDate!=null){
    //     flightSelection.selectReturnDate()
    // }        
    flightSelection.selectTravellers(data.Adults,data.Children,data.Infants)   
    flightSelection.selectSplFare(data.SpecialFare)
    //flightSelection.clickSearchFlight()
    //flightSelection.clickBackToFlightSearch()

})