import { 
  Box,
  useMediaQuery
} from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from './widgets/UserWidget'

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1024px)")
  const { id, picturePath } = useSelector((state) => state.user)
  return (
    <Box 
      component="section"
      className={`relative w-full max-w-screen-2xl mx-auto py-8 px-[6%] ${isNonMobileScreens ? "flex" : "block"} gap-2 justify-between z-40`}
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget userId={id} picturePath={picturePath} />
      </Box>

      <Box 
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
      </Box>

      {isNonMobileScreens && (
        <Box flexBasis="26%">

        </Box>
      )}
    </Box>
  )
}

export default Home