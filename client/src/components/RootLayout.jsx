import { Outlet } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default RootLayout