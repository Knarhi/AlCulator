import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <div className="Header" id="header">
                <h1>Aloholilaskuri</h1>
                <p id="description">Laske suuntaa antava veren alkoholipitoisuus sukupuolen, painon, annosten määrän ja juomisen aloittamisen ajankohdan perusteella.</p>
            </div>
        );
    }
}
