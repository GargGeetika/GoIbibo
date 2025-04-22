
class FlightSelection
{
    rdRoundTrip='li.sc-12foipm-69:nth-child(2) > span' //select round trip
    //From and to city controls
    txtFrom=':nth-child(1) > .sc-12foipm-22 > .sc-12foipm-2 > .sc-12foipm-3' // select the from object
    txtTo=':nth-child(2) > .sc-12foipm-22 > .sc-12foipm-2 > .sc-12foipm-3' //select the To object
    txtFlight='.sc-12foipm-25 > input:nth-child(2)' // airport name text box (departure and destination)
    selectFlightDropDown='#autoSuggest-list >li>div>div>div>p>span.autoCompleteTitle'//select the flight from dynamic dropdown
    //departure date controls
    departureDatePicker=':nth-child(3) > .sc-12foipm-2' //departure date picker
    selectMonth='.DayPicker-Caption>div' //select month like Jan, Feb from calendar
    dateFwdArrow='span.DayPicker-NavButton:nth-child(2)' //fwd arrow in date picker
    dateSelector=':nth-child(1)>div.DayPicker-Body>div>div>p.fsw__date'//date value
    //Retun date controls
    returnDatePicker=':nth-child(4) > .sc-12foipm-2' //departure date picker
    //Travellers & class control
    dwnTravellerDownArrow='.fswDownArrowTraveller' //select travellers drop down
    plusAdultTrav='div.sc-12foipm-47:nth-child(1) > div:nth-child(3) > span:nth-child(3)' //Add Adult traveller
    plusChildTrav='div.sc-12foipm-47:nth-child(2) > div:nth-child(3) > span:nth-child(3)'//Add child traveller
    plusInfantTrav='div.sc-12foipm-47:nth-child(3) > div:nth-child(3) > span:nth-child(3)'//Add child traveller
    btnDoneTravellers='.sc-12foipm-64'//done button for travellers
    //special fare controls
    chkSplFare='div.sc-12foipm-90' // this is a array of 4 spl fares check boxes
    chkSelectedSplFare='div.sc-12foipm-91.biWUTl'//select the special fare
    btnSearchFlight='.sc-12foipm-72'// click on flight search button
    returnToSearchPage='span.sc-brPLxw' //click on goibibo on top left to return to search flight page
    monthName
    dateVal
    arrMonthName={
        '01':'January',
        '02':'Febuary',
        '03':'March',
        '04':'April',
        '05':'May',
        '06':'June',
        '07':'July',
        '08':'August',
        '09':'September',
        '10':'October',
        '11':'November',
        '12':'December',
    }
  

    selectTrip(trip){ //select If the trip is one-way or round trip        
            cy.get(this.rdRoundTrip).click() //click the round trip option
    }

    selectFromCity(fromCity){  //select the departure city
        //cy.get(this.txtFrom).click({force:true})
        cy.contains(this.txtFrom,'From').click({force:true})
        cy.get(this.txtFrom).then(($ele)=>{
            if($ele.text()==='From'){
                cy.get(this.txtFlight).clear()
                cy.get(this.txtFlight).type(fromCity)
                cy.wait(2000)
                cy.selectDynamicDropDown(this.selectFlightDropDown,fromCity)//this function is defined on command.js      
            }
        })

    }

    selectToCity(toCity){ // select the arrival city
        cy.get(this.txtTo).click({force:true})
        cy.get(this.txtTo).then(($ele)=>{
            if($ele.text()==='To'){
                cy.get(this.txtFlight).clear()
                cy.get(this.txtFlight).type(toCity)
                cy.wait(2000)
                cy.selectDynamicDropDown(this.selectFlightDropDown,toCity)//this function is defined on command.js      
            }
        })
    }

    selectDepartureDate(depDate){
      
        cy.FindDate(depDate).then((dateValue)=>{
            this.dateVal=dateValue
        }).then(()=>{
            cy.SelectMonth(this.selectMonth,depDate,this.arrMonthName,this.departureDatePicker,this.dateFwdArrow,this.dateSelector,this.dateVal)            
        })
    }  

    selectReturnDate(retDate){
        cy.FindDate(retDate).then((dateValue)=>{
            this.dateVal=dateValue
        }).then(()=>{
            cy.SelectMonth(this.selectMonth,retDate,this.arrMonthName,this.returnDate,this.dateFwdArrow,this.dateSelector,this.dateVal)            
        })
        
    }

    selectTravellers(adults,children,infants){
        cy.get(this.dwnTravellerDownArrow).click()
        if (adults>0){
            Cypress._.times((adults-1), () => {
                cy.get(this.plusAdultTrav).click()
            })
        }
        if (children>0){
            Cypress._.times((children), () => {
                cy.get(this.plusChildTrav).click()
            })
        }
        if (infants>0){
            Cypress._.times((infants), () => {
                cy.get(this.plusInfantTrav).click()
            })
        }
        cy.get(this.btnDoneTravellers).click()

    }

    selectSplFare(specialFare){
        if(specialFare !=='NA'){
            cy.log('spl fare is '+specialFare)
            cy.get(this.chkSplFare).each(($ele,index,$list)=>{
                cy.log($ele.text())
                if($ele.text().includes(specialFare)){$ele.click()}
              
            })            
        }
    }

    clickSearchFlight(){
        cy.get(this.btnSearchFlight).click()

    }

    clickBackToFlightSearch(){
        cy.get(this.returnToSearchPage).click()
    }

}
export default FlightSelection