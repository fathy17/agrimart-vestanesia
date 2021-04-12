import React, { useState } from 'react';
export const ErrorContext = React.createContext([{}, () => {}]);

export const ErrorProvider = (props) => {
  const [error, setError] = useState(null);

  return (
    <ErrorContext.Provider value={[error, setError]}>
      {props.children}
    </ErrorContext.Provider>
  );
};
