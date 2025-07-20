import React from 'react'
import {assets} from "../assets/assets.js";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";


const UserDashboard = () => {
  const {userData} = useContext(AppContext);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <h5 className="fw-semibold text-lg">
                Welcome {userData ? userData.name : 'Developer'} <span role="img" aria-label="wave">👋</span>
      </h5>
    </div>
  )
}

export default UserDashboard