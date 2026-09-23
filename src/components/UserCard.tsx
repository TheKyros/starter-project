import React from 'react'

// DEFECT: React.FC<any> — no prop typing
const UserCard: React.FC<any> = ({ user }) => {
  return (
    <div className="user-card">
      {/* DEFECT: missing alt attribute — screen reader inaccessible */}
      <img src={user.avatar} />
      {/* DEFECT: tabIndex={1} disrupts natural document tab order */}
      <h3 tabIndex={1}>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => console.log('clicked')}>View Profile</button>
    </div>
  )
}

export default UserCard
