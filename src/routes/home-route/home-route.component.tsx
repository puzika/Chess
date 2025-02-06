import { useContext } from "react";
import { ScreenSizeContext } from "../../screen-size.context";
import { device } from "../../breakpoints";
import { Outlet } from "react-router-dom";
import AppWrapper from "../../components/app-wrapper/app-wrapper.component";
import Header from "../../components/header/header.component";
import Sidebar from "../../components/sidebar/sidebar.component";

export default function HomeRoute() {
   const { screenSize } = useContext(ScreenSizeContext);

   return (
      <AppWrapper>
         { screenSize <= device.mb && (<Sidebar />) }
         <Header />
         <Outlet />
      </AppWrapper>
   )
}