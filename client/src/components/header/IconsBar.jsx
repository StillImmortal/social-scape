import DarkModeIcon from '@mui/icons-material/DarkMode';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const IconBtn = ({icon}) => {
  return (
    <Link
      to='/'
    >
      <IconButton>
        {icon}
      </IconButton>
    </Link>
  )
}

const IconsBar = () => {
  return (
    <nav className='flex items-center gap-2'>
      <IconBtn
        icon={<DarkModeIcon />}
      />
      <IconBtn
        icon={<ChatIcon />}
      />
      <IconBtn
        icon={<NotificationsIcon />}
      />
      <IconBtn
        icon={<HelpIcon />}
      />
    </nav>
  )
}

export default IconsBar