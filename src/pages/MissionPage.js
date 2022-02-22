import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none'
})

function MissionPage() {
    const { missionId } = useParams();

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
    
    return <>
        <Typography variant="h5">Deine Mission: {missionId}</Typography>
        <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" type="file" onChange={tryUploading} />
            <Button variant="contained" component="span" endIcon={<PhotoCamera />}>Hochladen</Button>
      </label>
    </>
}

// function App() {
//     function guardarArchivo(e) {
//       var file = e.target.files[0] //the file
//       var reader = new FileReader() //this for convert to Base64 
//       reader.readAsDataURL(e.target.files[0]) //start conversion...
//       reader.onload = function (e) { //.. once finished..
//         var rawLog = reader.result.split(',')[1]; //extract only thee file data part
//         var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
//         fetch('https://script.google.com/macros/s/AKfycbwAkvF6oxuMHMsqgyFt9TFX-YBF0cl_sZQPsB9e7RC8O5iu5VLD/exec', //your AppsScript URL
//           { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
//           .then(res => res.json()).then((a) => {
//             console.log(a) //See response
//           }).catch(e => console.log(e)) // Or Error in console
//       }
//     }
  
//     return (
//       <div className="App">
//         <div className="App-header">
//           <input type="file" accept="application/pdf" id="customFile" onChange={(e) => guardarArchivo(e)} />
//         </div>
//       </div>
//     );
//   }
  
//   export default App;

export default MissionPage;
