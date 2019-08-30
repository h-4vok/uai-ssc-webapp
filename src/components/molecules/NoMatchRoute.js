import React from 'react';

export const NoMatchRoute = ({ location }) => (
  <div>
    <p className="no-match">
      Ningún resultado para <code>{location.pathname}</code>
    </p>
  </div>
);
