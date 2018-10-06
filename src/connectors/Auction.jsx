import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import Auction from "../components/Auction";

export default class AuctionConnector extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  placeAuction = (name, price) => {
    const { userId } = this.props;

    // Save auction and remove bids
    firebase
      .database()
      .ref("auction")
      .set({ name: name, price: price, uid: userId })
      .then(() => {
        firebase
          .database()
          .ref("bid")
          .remove()
          .then(() => {
            this.setState({
              message: `Your auction is active`
            });
          });
      });
  };

  isValidAuction = () => {
    const { name, price } = this.state;
    return name && name !== "" && price && price !== 0;
  };

  render() {
    return (
      <Auction
        {...this.state}
        {...this.props}
        placeAuction={this.placeAuction}
      />
    );
  }
}
