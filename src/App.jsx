import { RouterProvider } from "react-router";
import { router } from "./appRoutes.jsx";
import { AuthProvider } from "./features/auth/authContext.jsx";
import { interviewProvider } from "./features/interview/interview.context.jsx";
function App() {
  return (
    <AuthProvider>
      <interviewProvider>
        <RouterProvider router={router} />
      </interviewProvider>
    </AuthProvider>
  );
}

export default App;
