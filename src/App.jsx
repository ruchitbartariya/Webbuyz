import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Contact } from "./Pages/Contact";
import { AppLayout } from "./Components/Layout/AppLayout";
import { ErrorPage } from "./Pages/ErroPage";
import { About } from "./Pages/About";
import SellerDashboard from "./Pages/SellerDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/seller/dashboard",
        element: <SellerDashboard />
      }
    ]
  },

]);


const App = ()  => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;