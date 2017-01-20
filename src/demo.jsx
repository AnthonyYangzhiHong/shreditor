import React from 'react';
import ReactDOM from 'react-dom';
import Shreditor from './index';

class App extends React.Component {

    render() {
        return (
            <div style={{padding: '20px'}}>
                <h2>demo</h2>
                <Shreditor/>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));
