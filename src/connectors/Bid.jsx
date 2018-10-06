import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import Bid from "../components/Bid";

export default class BidConnector extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      lastPrice: null,
      lastBidder: null,
      message: null
    };
  }

  async componentDidMount() {
    const snapshotAuction = await firebase
      .database()
      .ref("auction")
      .once("value");

    const snapshootBid = await firebase
      .database()
      .ref("bid")
      .once("value");

    const auction = snapshotAuction.val();
    const lastBid = snapshootBid.val();
    this.setState({
      name: auction.name,
      lastPrice: lastBid ? lastBid.price : auction.price,
      lastBidder: lastBid ? lastBid.uid : null
    });

    this.subscribeToBids();
  }

  subscribeToBids = () => {
    const { userId } = this.props;
    firebase
      .database()
      .ref("bid")
      .on("value", snapshot => {
        const lastBid = snapshot.val();
        if (lastBid) {
          this.setState((state, props) => {
            return {
              lastPrice: lastBid.price,
              lastBidder: lastBid.uid,
              message:
                lastBid.uid !== userId
                  ? "Another bidder took your place !!"
                  : state.message
            };
          });
        }
      });
  };

  placeBid = (price, userId) => {
    firebase
      .database()
      .ref("bid")
      .set({ price: price, uid: userId })
      .then(() => {
        this.setState({
          message: `You placed a bid at ${price}`
        });
      });
  };

  render() {
    if (!this.state.name) return null;
    return <Bid {...this.state} {...this.props} placeBid={this.placeBid} />;
  }
}
