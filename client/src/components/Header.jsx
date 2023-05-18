import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../assets";

import SearchInput from "./header/SearchInput";
import IconsBar from "./header/IconsBar";
  
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
          <div className="w-10 h-10 bg-red-100">
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default Header