import { Outlet } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"
import BackgroundGradient from "./BackgroundGradient"

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="relative pt-16 h-[2000px]">
        <BackgroundGradient bgHeight={"h-screen"} blurHeight={"h-[105vh]"} />
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default RootLayout