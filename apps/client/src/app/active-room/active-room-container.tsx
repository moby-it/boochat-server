import './active-room.css';
export function ActiveRoomContainer() {
  return (
    <div className="room-window">
      <div className="message-list">
        <div className="announcement">
          <span>Laila Stokes created this room</span>
        </div>

        <div className="message sent-message">
          <div className="message-text">
            <span>This is supposed to represent a message to my imaginary friend, Arlo.</span>
          </div>
          <div className="timestamp">
            <span>23:48</span>
          </div>
        </div>

        <div className="message received-message">
          <img
            alt="profile"
            className="sender-avatar"
            src="https://images.unsplash.com/photo-1624431776357-e0fc5d4ed301?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=769&q=80"
          />
          <div className="message-text">
            <span>One line messages are cute.</span>
          </div>
          <div className="timestamp">
            <span>23:49</span>
          </div>
        </div>

        <div className="message sent-message">
          <div className="message-text">
            <span>Ikr.</span>
          </div>
          <div className="timestamp">
            <span>23:49</span>
          </div>
        </div>

        <div className="message received-message">
          <img
            alt="profile"
            className="sender-avatar"
            src="https://images.unsplash.com/photo-1624431776357-e0fc5d4ed301?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=769&q=80"
          />
          <div className="message-text">
            <span>What hapens if I have a lot to say though, like what I did the other day or how that cute person texted me?</span>
          </div>
          <div className="timestamp">
            <span>23:48</span>
          </div>
        </div>

        <div className="message sent-message">
          <div className="message-text">
            <span>Ah, it wraps up nicely</span>
          </div>
          <div className="timestamp">
            <span>23:49</span>
          </div>
        </div>

        <div className="message received-message">
          <img
            alt="profile"
            className="sender-avatar"
            src="https://images.unsplash.com/photo-1624431776357-e0fc5d4ed301?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=769&q=80"
          />
          <div className="message-text">
            <span>Seems so</span>
          </div>
          <div className="timestamp">
            <span>23:48</span>
          </div>
        </div>

        <div className="message sent-message">
          <div className="message-text">
            <span>Yeap</span>
          </div>
          <div className="timestamp">
            <span>23:49</span>
          </div>
        </div>

        <div className="message sent-message">
          <div className="message-text">
            <span>What if I break...</span>
          </div>
          <div className="timestamp">
            <span>23:49</span>
          </div>
        </div>

        <div className="message sent-message">
          <div className="message-text">
            <span>up my sentences?</span>
          </div>
          <div className="timestamp">
            <span>23:49</span>
          </div>
        </div>

        <div className="message sent-message">
          <div className="message-text">
            <span>Or if I forget to answer and I text you later?</span>
          </div>
          <div className="timestamp">
            <span>23:49</span>
          </div>
        </div>
      </div>
      <div className="message-input">
        <input type="text" placeholder="Type your message and press Enter" />
      </div>
    </div>
  );
}
export default ActiveRoomContainer;
