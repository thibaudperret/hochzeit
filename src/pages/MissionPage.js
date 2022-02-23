import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import missions from './missions.json';
import { useState } from 'react';

const Input = styled('input')({
    display: 'none'
});

function MissionPage({ missionId }) {
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const errorMessages = ['Bitte noch einmal versuchen', 'Es gibt leider ein Problem mit dem Hochladen, bitte geh zu Céline Saxer'];
    const [nError, setNError] = useState(0);

    const mission = missions[missionId];
    if (!mission) {
        return <p>Fotoaufgabe nicht gefunden</p>
    }

    const tryUploading = event => {
        setLoading(true);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            const rawLog = reader.result.split(',')[1];
            const dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" };

            fetch('https://script.google.com/macros/s/AKfycbwAkvF6oxuMHMsqgyFt9TFX-YBF0cl_sZQPsB9e7RC8O5iu5VLD/exec', { method: 'POST', body: JSON.stringify(dataSend) })
                .then(result => result.json())
                .then(() => {
                    setLoading(false);
                    setDone(true);
                })
                .catch(error => {
                    setLoading(false);
                    setNError(nError + 1);
                });
        }
    }
    
    return <Box sx={{ 
        width: '100%',
        height: '100%',
        backgroundColor: '#ffe0b8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <Typography variant="h4" sx={{ marginTop: '50px', color: '#ff7373' }}>Deine Fotoaufgabe</Typography>
        <Typography variant="p" sx={{ margin: '100px 20px', color: '#9d4a4a', fontSize: '20px' }}>{mission}</Typography>
        {!done && <>
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" type="file" onChange={tryUploading} />
                <Button 
                    variant="contained"
                    component="span"
                    endIcon={<PhotoCamera />}
                    sx={{ backgroundColor: '#ff7373', '&:hover': { backgroundColor: '#c64f4f' } }}
                    disabled={loading}
                >Hochladen</Button>
            </label>
            {loading && <CircularProgress sx={{ color: '#ff7373', marginTop: '20px' }} />}
            {(!loading && nError > 0) && <Typography variant="p" sx={{ color: '#ff7373', margin: '20px', textAlign: 'center' }}>{errorMessages[nError - 1]}</Typography>}
        </>}
        {done && <Typography variant="h5" sx={{ color: '#ff7373', margin: '20px' }}>Danke für deinen Beitrag !</Typography>}
    </Box>;
}

export default MissionPage;
