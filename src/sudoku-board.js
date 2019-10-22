'use strict';

const e = React.createElement;

class SudokuBoard extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      e('div', null, "Hello world!")
    );
  }
}

const domContainer = document.querySelector('#board');
ReactDOM.render(e(SudokuBoard), domContainer);
