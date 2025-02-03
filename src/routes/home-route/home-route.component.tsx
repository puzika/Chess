import { Outlet } from "react-router-dom";
import AppWrapper from "../../components/app-wrapper/app-wrapper.component";
import Header from "../../components/header/header.component";

export default function HomeRoute() {
   return (
      <AppWrapper>
         <Header />
         <Outlet />
      </AppWrapper>
   )
}