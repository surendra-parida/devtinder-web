import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import appStore from "./utils/store";
import "react-toastify/dist/ReactToastify.css";

import Body from "./layout/Body";
import Chat from "./features/chat/chat";

const LoginCard = lazy(() => import("./features/auth/Login"));
const Profile = lazy(() => import("./features/profile/Profile"));
const Feed = lazy(() => import("./features/feed/Feed"));
const Connections = lazy(() => import("./features/connections/Connections"));
const Requests = lazy(() => import("./features/requests/Requests"));

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Suspense
          fallback={<div className="text-center mt-10">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="login" element={<LoginCard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default App;
