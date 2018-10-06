import React from "react";
import PropTypes from "prop-types";
import Message from "./Message";

export default class Auction extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    placeAuction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0
    };
  }

  handleChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    });
  };

  handleClick = () => {
    const { name, price } = this.state;
    const { placeAuction } = this.props;
    placeAuction(name, price);
  };

  isValidAuction = () => {
    const { name, price } = this.state;
    return name && name !== "" && price && price !== 0;
  };

  render() {
    const { name, price } = this.state;
    const { message } = this.props;
    return (
      <div className="auction">
        <div className="mb3 ">
          A valid auction should have a name, and a price > 0
        </div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="price"
          min="0"
          step="1"
          value={price}
          onChange={this.handleChange}
        />
        <button disabled={!this.isValidAuction()} onClick={this.handleClick}>
          Add auction
        </button>
        <Message message={message} />
      </div>
    );
  }
}
