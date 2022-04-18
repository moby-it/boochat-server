export function RoomSlot() {
  return (
    <div className="room-slot">
      <div className="avatar">
        <img
          alt="profile"
          src="https://images.unsplash.com/photo-1624431776357-e0fc5d4ed301?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=769&q=80"
          className="avatar-md"
        />
        <span hidden className="active-user"></span>
      </div>
      <div className="room-slot-txt">
        <div>Laila Stokes</div>
        <div>Are we going to the movies tomorrow moveies blacbsaeoa fglaegiu</div>
      </div>
    </div>
  );
}
export default RoomSlot;
