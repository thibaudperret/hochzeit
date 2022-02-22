import { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";

function PassPage({ logIn }) {
    const [password, setPassword] = useState('');

    const tryLoggingIn = () => {
        window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
            .then(buffer => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join(''))
            .then(hash => {
                if (hash === 'd9a2129324c7c7d6b3239998f0511769133aeab45be0f9b097abb2bf99658a67') {
                    logIn();
                } else {
                    setPassword(false);
                }
            });
    }

    return <>
        <Typography variant="h6">Bitte fügen Sie das Passwort ein</Typography>
        <TextField label="Passwort" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={tryLoggingIn}>Zugang</Button>
    </>
}

export default PassPage;