import { Outlet } from "react-router-dom";
import AppWrapper from "../../components/app-wrapper/app-wrapper.component";
import Header from "../../components/header/header.component";
import Sidebar from "../../components/sidebar/sidebar.component";

export default function HomeRoute() {
   return (
      <AppWrapper>
         <Sidebar />
         <Header />
         <Outlet />
      </AppWrapper>
   )
}