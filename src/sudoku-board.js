'use strict';

const e = React.createElement;

class SudokuBoard extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>Here's my board</div>
    );
  }
}

const domContainer = document.querySelector('#board');
ReactDOM.render(e(SudokuBoard, domContainer));
