import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from "./header"
import CalculatorFront from "./CalculatorFront"
import Footer from "./footer"


class Site extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <CalculatorFront />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<Site />, document.getElementById('root'));
