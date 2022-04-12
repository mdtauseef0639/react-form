import React from "react";

import Input from "./components/Input";
import Select from "./components/Select";
import RadioGroup from "./components/RadioGroup";
import CheckBoxGroup from "./components/CheckBoxGroup";
import Button from "./components/Button";
import {
  webServers,
  services,
  roles,
  selectTitle,
  DEFAULT_USER_STATE,
} from "./constants";
import Db from "./Db";

function App() {
  const [user, setUser] = React.useState(DEFAULT_USER_STATE);
  const [findUser, setFindUser] = React.useState(false)
  const [getUser,setGetUser] = React.useState({
        username:"",
        password:"",
        city:"",
        server:"",
        role:"",
        services:""

  })
  const handleChange = (e) => {
    if (e.target.type === "checkbox" && e.target.name === "services") {
      const { value, checked } = e.target;
      if (checked) {
        setUser({
          ...user,
          services: [...user.services, value],
        });
      } else {
        setUser({
          ...user,
          services: user.services.filter((service) => service !== value),
        });
      }
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate The Form
    if (user.username.length < 3) {
      alert("Username must be at least 3 characters long");
      return;
    }

    if (!user.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
      alert("Password must be required and must have 8 characters and at least 1 digit.");
      return;
    }

    if (!user.city.length || user.city.length < 3) {
      alert("City must be at least 3 characters long");
      return;
    }

    if (user.server === selectTitle || !webServers.includes(user.server)) {
      alert("Please select a web server");
      return;
    }

    if (!user.role) {
      alert("Please select a role");
      return;
    }

    if (user.services.length === 0) {
      alert("Please select atleast 1 Single Sign-on service");
      return;
    }

    if (Db.set(user.username, user)) {
      alert("User Added Successfully");
    }
  };

  const handleReset = () => {
    setUser(DEFAULT_USER_STATE);
  };

  const handleFind=() =>{
    if(Db.exists(user.username))
    {
      setFindUser(true)
      const data = Db.get(user.username)
      console.log(data)
      setGetUser({
        username:data.username,
        password:data.password,
        city:data.city,
        server:data.server,
        role:data.role,
        services:data.services
      })
    }
    else{
      alert("User not found")
    }
  }

  const handleDelete=()=>{
    Db.delete(user.username)
  }

  const handleUpdate=()=>{
    if(Db.exists(user.username))
    {
      const data = Db.get(user.username)
      console.log(data)
      let updatedData = {
        username:data.username,
        password:"",
        city:"",
        server:"",
        role:"",
        services:""
      }
      if(user.password)
      {
        updatedData.password=user.password
      }
      else{
        updatedData.password=data.password
      }
      if(user.city)
      {
        updatedData.city=user.city
      }
      else{
        updatedData.password=data.city
      }
      if(user.server === selectTitle || !webServers.includes(user.server))
      {
        updatedData.server=data.server
      }
      else{
        updatedData.server=user.server
      }
      if(user.role)
    {
      updatedData.role=user.role
    }
    else{
      updatedData.role=data.role
    }
    if(user.services.length===0)
    {
      updatedData.services=data.services
    }
    else{
      updatedData.services=user.services
    }
  Db.delete(user.username)
  setUser(updatedData)
  Db.set(user.username,user)
  }  
  else{
      alert("User not found")
    }

    
  }

  return (
    <div className="app">
      <form className="app-create-user">
        <Input
          label="Username"
          name="username"
          onChange={handleChange}
          value={user.username}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={user.password}
        />
        <Input
          label="City of Employment"
          name="city"
          onChange={handleChange}
          value={user.city}
        />
        <Select
          label="Web Server"
          name="server"
          options={webServers}
          title={selectTitle}
          onChange={handleChange}
          value={user.server}
        />
        <RadioGroup
          label="Please specify your role"
          name="role"
          options={roles}
          onChange={handleChange}
          checkedProp={user.role}
        />
        <CheckBoxGroup
          label="Single Sign-on to the following"
          name="services"
          options={services}
          onChange={handleChange}
          checkedProp={user.services}
        />

        <div className="form-group">
          <div className="group-label" />
          <div className="group-data btn-control">
            <Button
              name="usubmit"
              type="submit"
              onClick={handleSubmit}
              label="Save"
            />

            <Button
              name="reset"
              type="reset"
              onClick={handleReset}
              label="Reset"
            />
          </div>
        </div>
      </form>
      <div>
        <Button
          name="ufind"
          onClick={handleFind}
          label="Find"
        />
        <Button
          name="udelete"
          onClick={handleDelete}
          label="Delete"
        />

        <Button
          name="update"
          onClick={handleUpdate}
          label="Update"
        />
      </div>
      <div>
      {findUser?<ul>
        <li>{getUser.username}</li>
        <li>{getUser.password}</li>
        <li>{getUser.city}</li>
        <li>{getUser.server}</li>
        <li>{getUser.role}</li>
        <li>{getUser.services}</li>
      </ul>:""}
      </div>
    </div>
  );
}

export default App;
