import { Button, Typography, Box } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import missions from './missions.json';

const Input = styled('input')({
    display: 'none'
})

function MissionPage({ missionId }) {
    const mission = missions[missionId];
    if (!mission) {
        return <p>Mission nicht gefunden</p>
    }

    const tryUploading = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            const rawLog = reader.result.split(',')[1];
            const dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" };

            fetch('https://script.google.com/macros/s/AKfycbwAkvF6oxuMHMsqgyFt9TFX-YBF0cl_sZQPsB9e7RC8O5iu5VLD/exec', { method: 'POST', body: JSON.stringify(dataSend) })
                .then(result => result.json())
                .then(response => console.log(response))
                .catch(error => console.log(error));
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
        <Typography variant="h5" sx={{ marginTop: '100px', color: '#ff7373' }}>Deine Mission:</Typography>
        <Typography variant="p" sx={{ margin: '100px 20px', color: '#9d4a4a' }}>{mission}</Typography>
        <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" type="file" onChange={tryUploading} />
            <Button variant="contained" component="span" endIcon={<PhotoCamera />} sx={{ backgroundColor: '#ff7373' }}>Hochladen</Button>
        </label>
    </Box>;
}

export default MissionPage;
