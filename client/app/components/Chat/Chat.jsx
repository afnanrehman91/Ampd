import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
  render() {
    return (
      <div className="chat-container">
        <div className="panel-heading" id="accordion">
          <div className="msg-wgt-header">
            <i className="fa fa-commenting-o" /> Group Chat
            <div className="btn-group pull-right">
              <a
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapseOne"
              >
                <i className="fa fa-window-maximize" />
              </a>
            </div>
          </div>
        </div>
        <div className="panel-collapse collapse" id="collapseOne">
          <div className="msg-row-container">
            <div className="msg-row">
              <div className="msg-wgt-body">
                {this.props.messages.map(message => {
                  return (
                    <div className="MessagesFont" key={message.message}>
                      <i className="pull-left fa fa-user-circle" />
                      <strong className="primary-font">
                        {message.author}:
                      </strong>{" "}
                      {message.message}
                    </div>
                  );
                })}
              </div>
              <div className=".msg-wgt-footer card-footer">
                <div className="input-group">
                  <input
                    type="textarea"
                    id="Message"
                    placeholder="Message"
                    name="message"
                    className="form-control input-sm chat_input"
                    value={this.props.message}
                    onChange={this.props.handleChange}
                  />
                  <span className="input-group-btn">
                    <button
                      onClick={this.props.handleSend}
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fa fa-send fa-1x" aria-hidden="true" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
