import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Pages
import InsertionForm from "./pages/insertionForm";
import Machines from "./pages/machines";
import ActiveBreakdowns from "./pages/activeBreakdown";
import ActiveMaintainence from "./pages/activeMaintenece";
//Styles


function App() {
  
  const [selectedUser , setSelectedUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(1);
  const [enquiryData, setEnquiryData] = useState(-1);
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState(0);

  return (
    <Router>
      {/* <Header /> */}
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route
                exact
                path='/'
                render={() => <InsertionForm 
                  setSelectedUser={setSelectedUser} 
                  loginStatus={loginStatus} 
                  setLoginstatus={setLoginStatus} 
                  userId={userId} 
                  token={token} 
                  setToken={setToken} 
                  setEnquiryData={setEnquiryData}
                  />}
              />
              <Route
                exact
                path='/machine'
                render={() => <Machines 
                  setSelectedUser={setSelectedUser} 
                  loginStatus={loginStatus} 
                  setLoginstatus={setLoginStatus} 
                  userId={userId} 
                  token={token} 
                  setToken={setToken} 
                  setEnquiryData={setEnquiryData}
                  />}
              />
                <Route
                exact
                path='/activebreakdown'
                render={() => <ActiveBreakdowns 
                  setSelectedUser={setSelectedUser} 
                  loginStatus={loginStatus} 
                  setLoginstatus={setLoginStatus} 
                  userId={userId} 
                  token={token} 
                  setToken={setToken} 
                  setEnquiryData={setEnquiryData}
                  />}
              />
                <Route
                exact
                path='/activemaintainence'
                render={() => <ActiveMaintainence 
                  setSelectedUser={setSelectedUser} 
                  loginStatus={loginStatus} 
                  setLoginstatus={setLoginStatus} 
                  userId={userId} 
                  token={token} 
                  setToken={setToken} 
                  setEnquiryData={setEnquiryData}
                  />}
              />
            </Switch>
          </AnimatePresence>
        )}
      />
    </Router>
  );
}

export default App;
