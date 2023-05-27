import { IconButton } from "@mui/material"
import { ArrowDropDown } from '@mui/icons-material';

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
        <ArrowDropDown />
      </IconButton>
    </div>
  )
}

export default ProfileIcon