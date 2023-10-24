import { createBrowserRouter } from "react-router-dom";

import { Home } from "./Home";
import { Detail } from "./Detail";
import { NotFound } from "./NotFound";

import { Layout } from "../Components/Layout";

const router = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/detail/:cripto",
                element: <Detail/>
            },
            {
                path:"*",
                element: <NotFound/>
            }

        ]
    }

])
export {router};