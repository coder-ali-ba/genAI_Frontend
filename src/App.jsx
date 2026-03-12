import { RouterProvider } from "react-router"
import { router } from "./appRoutes.jsx"
function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
