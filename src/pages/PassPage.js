import { useState } from "react";
import { TextField, Typography, Button, Box } from "@mui/material";

function PassPage({ logIn }) {
    const [password, setPassword] = useState('');

    const keyDown = e => {
        if (e.key === 'Enter') {
            tryLoggingIn();
            e.preventDefault();
        }
    }

    const tryLoggingIn = () => {
        window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
            .then(buffer => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join(''))
            .then(hash => {
                if (hash === 'd9a2129324c7c7d6b3239998f0511769133aeab45be0f9b097abb2bf99658a67') {
                    logIn();
                } else {
                    setPassword('');
                }
            });
    }

    return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="p" sx={{ marginTop: '50px', color: '#9d4a4a', fontSize: '20px' }}>Bitte fügen Sie das Passwort ein</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '100px' }}>
            <TextField 
                label="Passwort"
                type="password"
                value={password}
                onKeyPress={keyDown}
                onChange={e => setPassword(e.target.value)}
                sx={{ 
                    marginRight: '20px',
                    '& label.Mui-focused': {
                        color: '#9d4a4a'
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#9d4a4a',
                    },
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: '#9d4a4a',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#9d4a4a',
                        },
                    },
                }}
            />
            <Button variant="contained" onClick={tryLoggingIn} sx={{ backgroundColor: '#ff7373', '&:hover': { backgroundColor: '#c64f4f' }}}>Zugang</Button>
        </Box>
    </Box>
}

export default PassPage;