import React from "react";
import PropTypes from "prop-types";
import Message from "./Message";

export default class Bid extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastPrice: PropTypes.string.isRequired,
    lastBidder: PropTypes.string,
    placeBid: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      price: null
    };
  }

  handleChange = event => {
    this.setState({
      price: event.target.value
    });
  };

  handleClick = () => {
    const { placeBid, userId } = this.props;
    const { price } = this.state;
    placeBid(price, userId);
  };

  render() {
    const { name, lastPrice, lastBidder, message } = this.props;
    const { price } = this.state;

    return (
      <div className="bid">
        <div>
          <div className="f2 mb3">{name}</div>
          <div className="mb2">{`Current price: ${lastPrice}$`}</div>
        </div>
        <input
          type="number"
          min={lastPrice}
          step="1"
          value={price && price > lastPrice ? price : lastPrice}
          onChange={this.handleChange}
        />
        <button
          disabled={Number(price) <= Number(lastPrice)}
          onClick={this.handleClick}
          title="Choose a higher price than last bidder to place a bid."
        >
          Add bid
        </button>
        <div className="f7 mb2">
          {lastBidder
            ? `Last bid by ${lastBidder}`
            : `No bidder, be the first to bid`}
        </div>

        <Message message={message} />
      </div>
    );
  }
}
