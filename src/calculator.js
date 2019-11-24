import * as Constants from "./constants";
/*
Tämä on alun suunnittelua ilman reactJS-komponentteja. luokan saaminen pelittämään yhdessä itselle uuden kirjaston kanssa osoittautui haastavaksi,
joten päädyin jättämään tänne tämän OOP-näytteenä ja reactin puolella CalculatorFront.js toteuttaa vastaavat toiminnot.
*/
export default class Calculator {
    Constructor(gender, weightInKg, timeFromStartingInHours, portions) {
        try {
            this.userWeightInKg = parseInt(weightInKg);
            this.timeFromStarting = parseInt(timeFromStartingInHours);
            this.numberOfPortions = parseInt(portions);
            if (gender === Constants.MAN) {
                var genderBurnFactor =  Constants.MALE_BURN_FACTOR_PER_KG_PER_HOUR
                var genderIntoxicationFactor =  Constants.MALE_INTOXICATION_PER_PORTION_PER_KG
            } else if (gender === Constants.WOMAN) {
                var genderBurnFactor =  Constants.FEMALE_BURN_FACTOR_PER_KG_PER_HOUR
                var genderIntoxicationFactor =  Constants.FEMALE_INTOXICATION_PER_PORTION_PER_KG
            } else {
                throw "Gender 404; value 0 for male, 1 for female.";
            }
        } catch(error) {
            throw "Error in user input: " + error
        }
        this.burnRatePerHour = genderBurnFactor * this.userWeightInKg;
        this.intoxicationAtZeroHour = genderIntoxicationFactor / this.userWeightInKg * this.numberOfPortions;
    }

    CalculateCurrentIntoxication(){
        var currentIntoxication = this.intoxicationAtZeroHour - (this.burnRatePerHour * this.timeFromStarting);
        if (currentIntoxication > 0) {
            return Math.round(currentIntoxication * 100) / 100;
        } else {
            return 0.00;
        }
    }

    CalculteTimeUntilSober(currentIntoxication) {
        if (currentIntoxication > 0) {
            return Math.round((currentIntoxication / this.burnRatePerHour));
        } else {
            return 0;
        }
    }
}
