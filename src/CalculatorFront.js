import React from 'react';
import * as Constants from "./constants";

export default class CalculatorFront extends React.Component {
    constructor(props) {
        super(props)
        this.CalculateResults = this.CalculateResults.bind(this);
        this.state = {
            gender: null,
            weightInKg: null,
            timeFromStarting: null,
            portions: null,
            intoxication: null,
            timeUntilSober: null,
        }
    }

    AreInputStatesSet() {
        try{
            if (this.state.gender === null) {
                return false;
            } else if (this.state.weightInKg === null) {
                return false;
            } else if (this.state.timeFromStarting === null) {
                return false;
            } else if (this.state.portions === null) {
                return false;
            } else {
                return true;
            }
        } catch(error) {
            throw "user inputs not in place: " + error
        }
    }

    GetGenderBurnFactor(gender) {
        var genderBurnFactor = 0;
        if (gender === Constants.MAN) {
            genderBurnFactor = Constants.MALE_BURN_FACTOR_PER_KG_PER_HOUR;
        } else if (gender === Constants.WOMAN) {
            genderBurnFactor = Constants.FEMALE_BURN_FACTOR_PER_KG_PER_HOUR;
        }  else {
            throw "Gender 404";
        }
        return genderBurnFactor;
    }

    GetGenderIntoxicationFactor(gender) {
        var genderIntoxicationFactor = 0
        if (gender === Constants.MAN) {
            genderIntoxicationFactor = Constants.MALE_INTOXICATION_PER_PORTION_PER_KG;
        } else if (gender === Constants.WOMAN) {
            genderIntoxicationFactor = Constants.FEMALE_INTOXICATION_PER_PORTION_PER_KG
        } else {
            throw "Gender 404"
        }
        return genderIntoxicationFactor
    }

    CalculateBurnRate(genderBurnFactor) {
        var burnRatePerHour = genderBurnFactor * this.state.weightInKg
        this.setState({burnRatePerHour: burnRatePerHour});
        return burnRatePerHour;
    }

    CalculateintoxicationAtZeroHour(genderIntoxicationFactor) {
        var intoxicationAtZeroHour = genderIntoxicationFactor / this.state.weightInKg * this.state.portions;
        this.setState({intoxicationAtZeroHour: intoxicationAtZeroHour});
        return intoxicationAtZeroHour;
    }

    CalculateCurrentIntoxication(intoxicationAtZeroHour) {
        var currentIntoxication = intoxicationAtZeroHour - (this.state.burnRatePerHour * this.state.timeFromStarting);
        currentIntoxication = Math.round(currentIntoxication *100) / 100
        if (currentIntoxication > 0) {
            this.setState({currentIntoxication: currentIntoxication});
            return currentIntoxication;
        } else {
            this.setState({currentIntoxication: 0.00});
            return 0.00;
        }
    }

    CalculateTimeUntilSober(currentIntoxication, burnRatePerHour) {
        var timeUntilSober = 0
        if (currentIntoxication > 0) {
            timeUntilSober = Math.round((currentIntoxication / burnRatePerHour));
        }
        this.setState({timeUntilSober: timeUntilSober});
        return timeUntilSober;
    }

    CalculateResults() {
        if (this.AreInputStatesSet() === false) {
            return null;
        } else {
            var burnFactor = this.GetGenderBurnFactor(this.state.gender);
            var intoxicationFactor = this.GetGenderIntoxicationFactor(this.state.gender);
            var burnRate = this.CalculateBurnRate(burnFactor);
            var intoxicationAtZeroHour = this.CalculateintoxicationAtZeroHour(intoxicationFactor);
            var currentIntoxication = this.CalculateCurrentIntoxication(intoxicationAtZeroHour);
            var timeUntilSober = this.CalculateTimeUntilSober(currentIntoxication, burnRate);
            var intoxicationMessage = "Olet tällä hetkellä " + currentIntoxication.toString() + " promillen humalassa."
            var soberingMessage = "Alkoholin täydellisessä poistumisessa kehostasi kestää noin " + timeUntilSober.toString() + " tuntia."
            this.setState({intoxication: intoxicationMessage});
            this.setState({timeUntilSober: soberingMessage});
            return(currentIntoxication, timeUntilSober);
        }
    }

    render() {
        return(
            <div className="calculator">
                <div className="inputform">
                    Sukupuoli<br/>
                    <input type="radio" name="gender" value="0" onChange={e => this.setState({gender: 0})}/>Mies<br/>
                    <input type="radio" name="gender" value="1" onChange={e => this.setState({gender: 1})}/>Nainen<br/>
                    Paino (kg)<br/>
                    <input type="number" name="weight" min="1" onChange={e => this.setState({weightInKg: parseInt(e.target.value)})}/><br/>
                    Aika juomisen aloittamisesta tunteina<br/>
                    <input type="number" name="hrs-since-beginning" onChange={e => this.setState({timeFromStarting: parseInt(e.target.value)})}/><br/>
                    Alkoholiannosten määrä<br/>
                    (Yksi on esimerkiksi 0,33cl keskiolut tai 4cl väkevää alkoholijuomaa kuten vodkaa)<br/>
                    <input type="number" name="portions" onChange={e =>this.setState({portions: parseInt(e.target.value)})}/><br/>
                    <input type="button" name="calculate" value="laske" onClick={this.CalculateResults}/>
                </div>
                <div className="results">
                    <p>{this.state.intoxication}</p>
                    <p>{this.state.timeUntilSober}</p>
                </div>
            </div>
        );
    }
}
