Feature: Automate the goIbibo flight schedule

    Feature Description
    # Scenario: visit the flight page and put in the fight search values for one way travel using data table
    # Given the user visits the website, close all pop ups and confirm the title
    # Then put in the data in the search flight frame using the data table
    # |Trip       |FromCity |ToCity |DepartureDate |Return Date|Adults|Children|Infants|SpecialFare   |
    # |One-Way    |New Delhi|Patna  |2026-07-03    |           |4     |2       |1      |Armed Forces  |
    # #|Round-trip |Bengaluru|Delhi  |2025-08-05    |2025-10-05 |2     |        |       |Senior Citizen|

    
    Scenario: visit the flight page and put in the fight search values for one way travel using data table
    Given the user visits the website, close all pop ups and confirm the title
    Then put in the data in the search flight frame using json
    

