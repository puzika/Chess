import { Outlet } from "react-router-dom";
import Header from "../../components/header/header.component";

export default function HomeRoute() {
   return (
      <>
         <Header />
         <Outlet />
      </>
   )
}