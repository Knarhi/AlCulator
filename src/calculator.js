import * as Constants from "./constants";

export default class Calculator {
    Constructor(gender, weightInKg, timeFromStartingInHours, portions) {
        this.userWeightInKg = weightInKg;
        this.timeFromStarting = timeFromStartingInHours;
        this.numberOfPortions = portions;

        if (gender === Constants.MAN) {
            var genderBurnFactor =  Constants.MALE_BURN_FACTOR_PER_KG_PER_HOUR
            var genderIntoxicationFactor =  Constants.MALE_INTOXICATION_PER_PORTION_PER_KG
        } else  {
            var genderBurnFactor =  Constants.FEMALE_BURN_FACTOR_PER_KG_PER_HOUR
            var genderIntoxicationFactor =  Constants.FEMALE_INTOXICATION_PER_PORTION_PER_KG
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
