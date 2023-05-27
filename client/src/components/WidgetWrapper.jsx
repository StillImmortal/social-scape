import {
  Paper,
  styled
} from "@mui/material"

const WidgetWrapper = styled(Paper)(({ theme }) => ({
  zIndex: "100",
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "12px"
}))


export default WidgetWrapper