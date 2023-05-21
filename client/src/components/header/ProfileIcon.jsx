import { IconButton } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ProfileIcon = () => {
  return (
    <div className=''>
      <IconButton
        disableRipple
        sx={{
          pr: '0px',
          borderRadius: '0px',
        }}
      >
        <div className="w-12 h-12 rounded-full bg-red-100">

        </div>
        <ArrowDropDownIcon />
      </IconButton>
    </div>
  )
}

export default ProfileIcon