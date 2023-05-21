import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../assets";

import SearchInput from "./header/SearchInput";
import IconsBar from "./header/IconsBar";
import ProfileIcon from "./header/ProfileIcon";
  
const Header = () => {
  return (
    <Paper elevation={1} square className='fixed flex-center h-16 w-screen bg-transparent-blur shadow-border-bottom backdrop-blur-sm'>
      <div className='max-w-7xl flex items-center justify-between w-full h-full px-6 gap-12'>
        <div className="flex items-center gap-12">
          <Link 
            to='/'
            className="flex h-full items-center gap-4"
          >
            <img src={logo} alt="social scape" className="w-12 h-12" />
            <h1 className="text-xl font-semibold">Social Scape</h1>
          </Link>
          <SearchInput />
        </div>
        <div className="flex items-center gap-12">
          <IconsBar />
          <ProfileIcon />
        </div>
      </div>
    </Paper>
  )
}

export default Header