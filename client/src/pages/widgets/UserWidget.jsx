import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Twitter,
  LinkedIn
} from "@mui/icons-material"
import {
  Box,
  Divider,
  Typography,
  useTheme,
  IconButton
} from "@mui/material"

import UserImage from "../../components/UserImage"
import WidgetWrapper from "../../components/WidgetWrapper"

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null)
  const { palette } = useTheme()
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)

  const { dark, medium, main } = palette.neutral

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:5000/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      setUser(data)
    }
    getUser()
  }, [])

  if (!user) return null

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends
  } = user

  return (
    <WidgetWrapper
      elevation={2}
    >
      <Box
        className="flex-between pb-4 gap-2 hover:cursor-pointer"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <Box
          className="flex-between gap-4"
        >
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              fontSize="18px"
              color={dark}
              fontWeight="600"
              sx={{
                transition: "color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
                "&:hover": {
                  color: palette.primary.main
                }
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium} >
              {friends.length} friends
            </Typography>
          </Box>
        </Box>
        <IconButton sx={{transform: "translateX(8px)"}}>
          <ManageAccountsOutlined />
        </IconButton>
      </Box>

      <Divider />

      <Box className="py-4">
        <Box className="flex items-center gap-4 mb-2">
          <LocationOnOutlined style={{ fontSize: "30px" }} color={main} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box className="flex items-center gap-4 mb-2">
          <WorkOutlineOutlined style={{ fontSize: "30px" }} color={main} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />
        
      <Box className="py-4">
        <Box className="flex-between mb-2">
          <Typography color={medium}>Профиль просмотрен</Typography>
          <Typography color={main} fontWeight={500}>{viewedProfile}</Typography>
        </Box>
        <Box className="flex-between mb-2">
          <Typography color={medium}>Количество впечатлений</Typography>
          <Typography color={main} fontWeight={500}>{impressions}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box className="py-4">
        <Typography color={main} fontWeight={500} mb="1rem">
          Мои социальные сети
        </Typography>
        <Box className="flex-between gap-4">
          <Box className="flex-between gap-4">
            <Twitter />
            <Typography color={main} fontWeight={500}>
              Twitter
            </Typography>
          </Box>
          <IconButton sx={{transform: "translateX(8px)"}}>
            <EditOutlined color={main} /> 
          </IconButton>
        </Box>

        <Box className="flex-between gap-4">
          <Box className="flex-between gap-4">
            <LinkedIn />
            <Typography color={main} fontWeight={500}>
              LinkedIn
            </Typography>
          </Box>
          <IconButton sx={{transform: "translateX(8px)"}}>
            <EditOutlined color={main} />
          </IconButton>
        </Box>
      </Box>
    </WidgetWrapper>
  )
}

export default UserWidget