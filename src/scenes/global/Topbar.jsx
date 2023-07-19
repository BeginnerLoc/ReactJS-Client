import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationstModeOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsModeOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* search bar */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="search" />
                <IconButton type='button' sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* icon */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />

                    ) : (
                        <LightModeOutlinedIcon/>
                    )
                    }
                </IconButton>
                <IconButton>
                    <NotificationstModeOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsModeOutlinedIcon />
                </IconButton>
                <IconButton>
                    <WysiwygIcon onClick={() => navigate('/')} />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Topbar