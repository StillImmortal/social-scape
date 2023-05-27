import { useState } from "react"
import { useTheme } from "@emotion/react"
import { 
  styled, 
  InputBase,
  IconButton,
  Box
} from "@mui/material"
import { Search } from "@mui/icons-material"


const SearchWrapper = styled('div')(({theme}) => ({
  position: "relative",
  width: "100%",
  height: "40px",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "8px",
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchInputBase = styled(InputBase)(({theme}) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}))


const SearchInput = () => {
  const theme = useTheme()
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <SearchWrapper
      className="hidden md:flex justify-center items-center"
      sx={{ backgroundColor: `${isInputFocused ? theme.palette.background.default : "ihnerit"}`}}
    >
      <IconButton
        sx={{
          height: '100%',
          borderRadius: "8px",
          "& .MuiTouchRipple-root .MuiTouchRipple-child": {
            borderRadius: "8px"
          },
        }}
      >
        <Search />
      </IconButton>
      <SearchInputBase
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Поиск…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </SearchWrapper>
  )
}

export default SearchInput