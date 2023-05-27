import { useState } from "react";
import { 
  Paper,
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery 
} from "@mui/material";
import {
  Menu,
  Close
} from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state";
import { Link, useNavigate } from "react-router-dom";

import { logo } from "../assets";
import SearchInput from "./header/SearchInput";
import IconsBar from "./header/IconsBar";
import ProfileIcon from "./header/ProfileIcon";

const Header = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const isNonMobileScreens = useMediaQuery('(min-width: 768px)')
  

  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  const primaryLight = theme.palette.primary.light
  const alt = theme.palette.background.alt

  return (
    <Paper
      elevation={1}
      square
      className="fixed flex-center h-16 w-screen bg-transparent-blur backdrop-blur-sm z-50"
    >
      <Box
        className="max-w-7xl flex-between w-full h-full px-6 gap-12"
      >
        <Box
          className="flex-center gap-12"
        >
          <Link
            to="/"
            className="flex-center min-w-fit h-full gap-4"
          >
            <img
              src={logo}
              alt="social scape"
              className="w-12 h-12"
            />
            <h1
              className="hidden lg:block text-xl font-semibold"
            >
              Social Scape
            </h1>
          </Link>
          <SearchInput />
        </Box>
        <Box
          className="flex-center  gap-2 md:gap-8"
        >
          <IconsBar isMobile={isNonMobileScreens} />
          <ProfileIcon />
        </Box>
      </Box>
    </Paper>
  )
}

export default Header