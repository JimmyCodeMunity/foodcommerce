import React, { useState } from "react";
import {
  AdminIdContext,
  AuthContext,
  ClientIdContext,
  CookIdContext,
  DriverIdContext,
  EmailContext,
  MealIdContext,
  RoleContext,
  ShiftIdContext,
} from "./Helper/Context";
import Router from "./AppRoutes";
import { ShiftProvider } from "./Helper/ShiftContent";
function App() {
  const [email, setEmail] = useState("");
  const [clientId, setClientId] = useState("");
  const [cookId, setCookId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mealId, setMealId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [locId, setLocId] = useState("");
  const [role, setRole] = useState("");

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <EmailContext.Provider value={{ email, setEmail }}>
        <RoleContext.Provider value={{ role, setRole }}>
          <ClientIdContext.Provider value={{ clientId, setClientId, locId, setLocId }}>
            <CookIdContext.Provider value={{ cookId, setCookId }}>
              <MealIdContext.Provider value={{ mealId, setMealId }}>
                <DriverIdContext.Provider value={{ driverId, setDriverId }}>
                  <AdminIdContext.Provider value={{ adminId, setAdminId }}>
                    <Router />
                  </AdminIdContext.Provider>
                </DriverIdContext.Provider>
                <ShiftProvider></ShiftProvider>
              </MealIdContext.Provider>
            </CookIdContext.Provider>
          </ClientIdContext.Provider>
        </RoleContext.Provider>
      </EmailContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
