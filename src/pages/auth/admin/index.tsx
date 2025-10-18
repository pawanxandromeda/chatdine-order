import React from 'react';
import Admin from '../../Admin';
import { RequireAuth } from '../../../auth/RequireAuth';

const AdminProtected = () => (
  <RequireAuth>
    <Admin />
  </RequireAuth>
);

export default AdminProtected;
