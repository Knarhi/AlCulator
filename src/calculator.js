class Calculator {

    constructor(gender, weight, timeOfStarting, portions) {
        this.man = 0
        this.woman = 1
        this.userSex = gender;
        this.userWeightInKg = weight;
        this.timeOfStarting = timeOfStarting;
        this.numberOfPortions = portions;
        this.currentTime = new Date();
        this.hoursFromStarting = Math.abs(this.currentTime - this.timeOfStarting) / 3600000;
        if (this.userSex === man) {
            this.genderBurnFactor = 0.013;
            this.genderIntoxicationFactor = 16;
        } else  {
            this.genderBurnFactor = 0.015;
            this.genderIntoxicationFactor = 18.18;
        }
        this.burnRatePerHour = this.genderBurnFactor * this.userWeight;
    }

    calculateCurrentIntoxication(){
        var intoxicationAtZerHour = this.genderIntoxicationFactor / this.userWeightInKg * this.numberOfPortions;
        var currentIntoxication = intoxicationAtZerHour - (this.burnRatePerHour * this.hoursFromStarting);

        if (currentIntoxication > 0) {
            return Math.round(currentIntoxication * 100) / 100;
        } else {
            return 0.00;
        }
    }

    calculteTimeUntilSober(currentIntoxication) {
        if (currentIntoxication > 0) {
            return Math.round((currentIntoxication / this.burnRatePerHour));
        } else {
            return 0;
        }
    }

    this.giveResultArray() {
        var currentIntoxication = calculateCurrentIntoxication();
        var timeUntilSober = calculateCurrentIntoxication(currentIntoxication);
        return([currentIntoxication,timeuntilSober]);
    }
}
