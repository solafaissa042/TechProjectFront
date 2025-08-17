import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./feachers/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./feachers/auth/Welcome";
import NotesList from "./feachers/notes/NotesList";
import UsersList from "./feachers/users/UsersList";
import EditUser from "./feachers/users/EditUser";
import EditNote from "./feachers/notes/EditNote";
import NewUserForm from "./feachers/users/NewUserForm";
import NewNote from "./feachers/notes/NewNote";
import Prefetch from "./feachers/auth/Prefetch";
import PersistLogin from "./feachers/auth/PersistLogin";
import RequireAuth from "./feachers/auth/RequireAuth";
import { ROLES } from "./config/roles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/*end protected routes */}
      </Route>
    </Routes>
  );
}

export default App;
