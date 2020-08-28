import React from 'react';

export default class Tile extends React.Component {

  handleClick(event) {
    event.preventDefault();
    const flagged = event.altKey ? true : false;

    this.props.update(this.props.tile, flagged);
  }

  render() {
    let klass = "";
    let text = "";
    const tile = this.props.tile;
    if (tile.explored) {
      if (tile.bombed) {
        klass = "bombed";
      } else {
        klass = "explored";
        const count = tile.adjacentBombCount();
        if (count > 0) {
          text = `${count}`;
          klass += ` bomb-${text}`;
        }
      }
    } else {
      if (tile.flagged) {
        klass = "flagged";
      }
    }
    return <div className={`tile ${klass}`} onClick={this.handleClick.bind(this)}>{text}</div>;
  }

}