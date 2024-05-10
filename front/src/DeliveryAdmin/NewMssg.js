import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const NewMssg = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <div className="h-24 flex flex-col justify-evenly max-lg:ml-2">
        <h6 className="text-3xl ">Send Message</h6>
      </div>
      <div className="h-80 flex flex-col justify-between">
        <FormControl fullWidth className="bg-white">
          <InputLabel id="demo-simple-select-label">Select User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Active Cooks</MenuItem>
            <MenuItem value={20}>Active Orders</MenuItem>
            <MenuItem value={30}>Active Booked Orders</MenuItem>
            <MenuItem value={40}>All Users</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className="bg-white">
          <InputLabel id="demo-simple-select-label">Title</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Active Cooks</MenuItem>
            <MenuItem value={20}>Active Orders</MenuItem>
            <MenuItem value={30}>Active Booked Orders</MenuItem>
            <MenuItem value={40}>All Users</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-flexible"
          label="Message"
          multiline
          rows={5}
          className="bg-white"
        />
      </div>
      <div className="flex w-full justify-start items-center h-10 mt-4">
        <button className="w-32 float-left px-2 h-10 rounded bg-lanternOrange text-white">
          Submit
        </button>
        <button className="w-32 float-left px-2 mx ml-2 h-10 rounded text-slate-600 border-slate-600 border-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewMssg;
