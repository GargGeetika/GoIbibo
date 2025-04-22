class HomePage
{
    titleText='Best Travel Website'
    confirmText='goibibo.com wants to start sending you push notifications'
    closePopup='.logSprite'
    closePopup2='.sc-jlwm9r-1'
    

    closeAnnoyingPopUp(){
        cy.get(this.closePopup).click()
        cy.get(this.closePopup2).click()
    }

    validateTitle(){
        //validate the title of the goibibo page
        cy.title().should('include',this.titleText)
    }

    closeAnnoyingConfirm(){
        cy.on('window:confirm',(confimText)=>{
            expect(confimText).to.contain(this.confirmText)
            return false;
        })
    }

}
export default HomePage