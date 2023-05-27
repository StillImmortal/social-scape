import { useSelector } from "react-redux";
import { IconButton } from "@mui/material"
import { ArrowDropDown } from '@mui/icons-material';

import UserImage from "../UserImage";

const ProfileIcon = () => {
  const { picturePath } = useSelector((state) => state.user)

  return (
    <div className=''>
      <IconButton
        disableRipple
        sx={{
          pr: '0px',
          borderRadius: '0px',
        }}
      >
        <UserImage size="48px" image={picturePath} />
        <ArrowDropDown />
      </IconButton>
    </div>
  )
}

export default ProfileIcon