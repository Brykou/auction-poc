import React from "react";

export default function Mssage({ message }) {
  if (!message) {
    return null;
  }
  return <div className="message">{message}</div>;
}
