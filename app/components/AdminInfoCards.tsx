export default function AdminInfoCards() {
  return (
    <>
      <div className="admin_card_container">
        <div className="admin_card">
          <div className="heading">
            <p>Personal Information</p>
          </div>
          <div className="info">
            <p className="green">First Name</p>
            <p>data.firstname</p>
            <br />
            <p className="green">Last Name</p>
            <p>data.lastname</p>
            <br />
            <p className="green">About Me</p>
            <p>data.aboutme</p>
          </div>
        </div>
      </div>
    </>
  );
}
