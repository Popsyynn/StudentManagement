import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { color, Container } from '@mui/system';
import { Paper,Button } from '@mui/material';

export default function Student() {
    const paperStyle ={padding:'5opx 20px', width:400 , margin:'40px auto'}
    const[name ,setName] = React.useState('')
    const[department, setDepartment] = React.useState('')
    const[matricNumber ,setMatricNumber] = React.useState('')
    const[students , setSudents] = React.useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const Student={name ,department ,matricNumber}
        console.log(Student)
        fetch("http://localhost:8080/student/save",{method:"POST", headers:{"Content-type":"application/json"},
                body:JSON.stringify(Student)}).then(()=>{console.log("new student added")})
    }
React.useEffect(()=>{
    fetch("http://localhost:8080/student/getAll").then(res=>res.json()
    .then(result=>{
        setSudents(result);
    })
    )},[]
)

  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1>Add Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined"  fullWidth
      value={name}
      onChange={(e=>setName(e.target.value))}
      />
      <TextField id="outlined-basic" label="Student Department" variant="outlined" fullWidth
      value={department}
      onChange={(e=>setDepartment(e.target.value))}
      />
      <TextField id="outlined-basic" label="Matric number" variant="outlined" fullWidth
      value={matricNumber}
      onChange={(e=>setMatricNumber(e.target.value))}
      />
      <Button variant="contained" submit onClick={handleClick}>
        Submit
        </Button>
    </Box></Paper>
    <h1>List of students</h1>

    <Paper elevation={3} style={paperStyle}>
      {students.map(Student=>(
        <Paper elevation={6} style={{margin:"10px" , padding:"15px" ,textAlign:"left"}} key={Student.id}>
            Name:{Student.name}<br/>
            Department:{Student.department}<br/>
            matricNumber:{Student.matricNumber}

            </Paper>

      ))}

    </Paper>
    </Container>
  );
}
