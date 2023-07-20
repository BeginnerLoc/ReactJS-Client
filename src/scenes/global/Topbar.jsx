import { Box, IconButton, Typography, useTheme } from '@mui/material';
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
import ProjectContext from '../../context/ProjectContext';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    const { projectName } = useContext(ProjectContext);


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

            <Box
                display="flex"
                flexDirection="row"
                width={100}
                justifyContent="space-between"
            >
                <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Current:</Typography>
                <Typography color={'red'} sx={{ fontWeight: 'bold' }} variant="subtitle1">{projectName}</Typography>
            </Box>


            {/* icon */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />

                    ) : (
                        <LightModeOutlinedIcon />
                    )
                    }
                </IconButton>
                <IconButton>
                    <NotificationstModeOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsModeOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => navigate('/')} >
                    <WysiwygIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Topbar