import React from "react";
import Tile from "./tile";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return <div className="grid">
      {this.props.board.grid.map((row, j) => {
        return <div className="grid-row" key={`row-${j}`}>
          {row.map((tile, i) => {
            return (<Tile tile={tile} key={`tile-${i}-${j}`} update={this.props.update}/>)
          })}
        </div>
      })}
    </div>
  }
} 