import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { IconButton } from "@mui/material"
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help
} from "@mui/icons-material"

import { setMode } from "../../state"

const IconsBar = ({ isMobile }) => {
  const dispatch = useDispatch()
  const mode = useSelector((state) => state.mode)
  const navigate = useNavigate()

  return (
    <nav className='flex items-center gap-2'>
      {isMobile ? (
        <>
          <IconButton
            onClick={() => dispatch(setMode())}
          >
            {mode === "light" ? (<DarkMode />) : (<LightMode />)}
          </IconButton>

          <IconButton
            onClick={() => navigate("/messages")}
          >
            <Message />
          </IconButton>

          <IconButton
            onClick={() => navigate("/help")}
          >
            <Help />
          </IconButton>

          <IconButton
            onClick={() => navigate("/notifications")}
          >
            <Notifications />
          </IconButton>
        </>
      )
      : (
        <>
          <IconButton
            onClick={() => navigate("/search")}
          >
            <Search 
              sx={{
                width: "28px",
                height: "28px"
              }}
            />
          </IconButton>
          
          <IconButton
            onClick={() => navigate("/notifications")}
          >
            <Notifications 
              sx={{
                width: "28px",
                height: "28px"
              }}
            />
          </IconButton>
        </>
      )
    }
    </nav>
  )
}

export default IconsBar