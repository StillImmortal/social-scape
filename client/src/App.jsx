import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./mui/theme";

import RootLayout from "./components/RootLayout"
import Home from "./pages/Home"
import Login from "./pages/Login";


const App = () => {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="messages" element={<div>Messages</div>} />
            <Route path="help" element={<div>Help</div>} />
            <Route path="notifications" element={<div>Notifications</div>} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App