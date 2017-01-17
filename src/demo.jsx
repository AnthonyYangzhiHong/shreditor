import React from 'react';
import ReactDOM from 'react-dom';
import Shreditor from './editor';

class App extends React.Component {

    render() {
        return (
            <div>
                <h2>demo</h2>
                <Shreditor/>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));
