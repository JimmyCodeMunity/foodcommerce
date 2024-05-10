import React, { createContext, useState, useContext } from 'react';

const ShiftContent = createContext();

export const ShiftProvider = ({ children }) => {
  const [shiftId, setShiftId] = useState(null);

  return (
    <ShiftContent.Provider value={{ shiftId, setShiftId }}>
      {children}
    </ShiftContent.Provider>
  );
};

export const useData = () => useContext(ShiftContent);
