// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//




Cypress.Commands.add('selectDynamicDropDown',(selector,txtToFind)=>{ //select the value of the city from the drop down
    cy.get(selector).each(($el,index,$list)=>{ //get all the cities in list using the each loop
        if($el.text().includes(txtToFind)){ //if you find the city you are looking for
            cy.wrap($el).click({ force: true }) //click the city from the drop down list
        }
     })
})

// Cypress.Commands.add("FindMonth",(TravelDate,arrMonthName)=>{
//     //month is the 2nd value in the array -2025-07-03,we are looking for 07
//     var arrMonth=TravelDate.split("-",3)//split departure date into 3 parts, Year, month and date
//     //find the month from the hash map. like if month is 03 in the feature file, then find March
//     let monthName=arrMonthName[arrMonth[1]]//this will give July as the month name for 07
//     //cy.log('month name is '+monthName)
//     return cy.wrap(monthName)
// })

Cypress.Commands.add('FindDate',(TravelDate)=>{
    var arrDate=TravelDate.split('-',3) //split the travel or retun date in year-month-day and store in array
    //date is the 3rd value in the array- 2025-07-03, we are looking for 03
    let dateValue=arrDate[2] //assign datavale the value of date, which is 03
    //if the date is 01-09 we have to split again and remove the 0 to match the calender value which is 1-9 (without 0)
    if(dateValue.split('',1)==0){dateValue=dateValue.split('').pop()   }
    return cy.wrap(dateValue)
})

Cypress.Commands.add('SelectMonth',(selectMonth,TravelDate,arrMonthName,datePicker,dateFwdArrow,dateSelector,dateValue)=>{
        let arrCalValue=[] //define an array to store the month names (Feb and March) in the calender widget
        var arrDate=TravelDate.split('-',3) //split the travel or retun date in year-month-day and store in array
        cy.get(datePicker).click() //click the departure or Retun date on the website
        cy.get(selectMonth).each($el => { //select the months from the calendar widget on the website 
            arrCalValue.push($el.text().split(' ',1))  //get the first month on the widget           
         }).then(()=>{
            //if the month on the calendar widget is March then get the value of the month i.e. 03
                let mon=Object.keys(arrMonthName).find(k=>arrMonthName[k]==arrCalValue[0])
                //now sub the departure or retun date month from calendar month. like 07-03=04. We have to click the forward arrow on
                //calendar 4 times to get to July month.
                let num=parseInt(arrDate[1])-parseInt(mon)
                //now click the arrow 04 times to get to July from March in calendar widget
                Cypress._.times((num), () => {
                cy.get(dateFwdArrow).click()    
            })
            cy.get(dateSelector).each($el=>{ //once the travel month is shown on the calender widget click on the date
                if($el.text()==dateValue){$el.click()}        
            })
    })
})


        





