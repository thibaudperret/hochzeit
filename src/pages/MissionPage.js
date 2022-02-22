import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none'
})

function MissionPage() {
    const { missionId } = useParams();
    
    return <>
        <Typography variant="h5">Deine Mission: {missionId}</Typography>
        <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" type="file" />
            <Button variant="contained" component="span" endIcon={<PhotoCamera />}>Hochladen</Button>
      </label>
    </>
}

export default MissionPage;
