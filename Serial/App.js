import React from 'react';
import ReactDOM from 'react-dom';

import AnimatedSeries from './components/AnimatedSeries';

let addCharacters= 0;



ReactDOM.render(<AnimatedSeries addCharacters={addCharacters}/>,
    document.getElementById('container') );

