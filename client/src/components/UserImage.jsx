import { Box } from "@mui/material"

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box
      width={size}
      height={size}
      overflow="hidden"
      borderRadius="50%"
    >
      <img 
        src={`http://localhost:5000/assets/${image}`}
        alt="user"
        width={size}
        height={size}
        borderRadius="50%"
        style={{
          objectFit: "cover"
        }}
      />
    </Box>
  )
}

export default UserImage