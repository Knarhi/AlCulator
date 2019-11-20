"use strict";
class Calculator {

    constructor(gender, weightInKg, timeOfStarting, portions) {
        this.man = 0
        this.woman = 1
        this.userWeightInKg = weightInKg;
        this.timeOfStarting = timeOfStarting;
        this.numberOfPortions = portions;
        this.currentTime = new Date();
        this.hoursFromStarting = Math.abs(this.currentTime - this.timeOfStarting) / 3600000;
        if (gender === this.man) {
            this.genderBurnFactor = 0.013;
            this.genderIntoxicationFactor = 16;
        } else  {
            this.genderBurnFactor = 0.015;
            this.genderIntoxicationFactor = 18.18;
        }
        this.burnRatePerHour = this.genderBurnFactor * this.userWeightInKg;
        this.intoxicationAtZerHour = this.genderIntoxicationFactor / this.userWeightInKg * this.numberOfPortions;
    }

    this.calculateCurrentIntoxication(){

        var currentIntoxication = this.intoxicationAtZerHour - (this.burnRatePerHour * this.hoursFromStarting);

        if (currentIntoxication > 0) {
            return Math.round(currentIntoxication * 100) / 100;
        } else {
            return 0.00;
        }
    }

    this.calculteTimeUntilSober(currentIntoxication) {
        if (currentIntoxication > 0) {
            return Math.round((currentIntoxication / this.burnRatePerHour));
        } else {
            return 0;
        }
    }

    this.giveResultParagraph() {
        var currentIntoxication = calculateCurrentIntoxication();
        var timeUntilSober = calculteTimeUntilSober(currentIntoxication);
        var paragraph = "<p id=result>" currentIntoxication.toString() +  " promillen känni päällä, " + timeUntilSober.toString() + " tuntia selviämiseen.</p>"
        return(paragraph);
    }
}
