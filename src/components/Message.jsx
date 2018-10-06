import React from "react";

export default function Message({ message }) {
  if (!message) {
    return null;
  }
  return <div className="message">{message}</div>;
}
