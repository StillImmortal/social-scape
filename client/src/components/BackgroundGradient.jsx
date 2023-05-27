import { useSelector } from "react-redux"

const BackgroundGradient = ({ bgHeight, blurHeight }) => {
  const mode = useSelector((state) => state.mode)

  return (
    <>
    <div
      className={`absolute inset-0 w-screen ${bgHeight} z-0 ${mode === "light" ? "auth-bg-gradient-light" : "auth-bg-gradient-dark"}`}
    >
    </div>
    <div
      className={`absolute top-0 w-screen ${blurHeight} backdrop-blur-lg z-1`}
    >

    </div>
    </>
  )
}

export default BackgroundGradient