import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import Input from "./Input";
import EditIcon from "@mui/icons-material/Edit";

import Select from "./Select";
import RadioGroup from "./RadioGroup";
import CheckBoxGroup from "./CheckBoxGroup";
// import Button from "./components/Button";
import {
  webServers,
  services,
  roles,
  selectTitle,
  DEFAULT_USER_STATE,
} from "../constants";
import View from "./View";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [user, setUser] = React.useState({
    id: new Date().getTime().toString(),
    username: "",
    password: "",
    city: "",
    server: "",
    role: "",
    services: [],
  });
  const [toggleEdit, setToggleEdit] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);
  const [view, setView] = useState(false);
  const data = JSON.parse(localStorage.getItem("Details"));
  const data2 = [];
  const initialData = data ? data : data2;

  const [entries, setEntries] = React.useState(initialData);

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

  const handleSave = (e) => {
    e.preventDefault();

    //           Validate The Form

    if (user.username.length < 3) {
      alert("Username must be at least 3 characters long");
      return;
    }

    if (
      !user.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
      )
    ) {
      alert(
        "Password must be required and must have 8 characters and at least 1 digit."
      );
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

    else if (user && toggleEdit) {
      setEntries(
        entries.map((entry) => {
          if (entry.id === isEditItem) {
            return { ...entry, id: entry.id, username: user.username, password: user.password, city: user.city, server: user.server, role: user.role, services: user.services }

          }
          return entry

        })
      )

      setToggleEdit(false)
      setIsEditItem(null)

    }
    else {
      setUser(x => {
        return { ...x, id: new Date().getTime().toString() }
      })
      setEntries(preValues => {
        return [...preValues, user]
      })
    }

  };


  const handleReset = () => {
    setUser(DEFAULT_USER_STATE);
  };

  function handleView() {
    setView(true);
  }

  function editItem(id) {
    let newEditItem = entries.find((entry) => {
      return entry.id === id;
    });


    setIsEditItem(id);
    setToggleEdit("true")
  }

  function deleteItem(id) {
    setEntries((prevItem) => {
      return prevItem.filter((entry) => {
        return entry.id !== id;
      });
    });
  }

  useEffect(() => {
    localStorage.setItem("Details", JSON.stringify(entries));
  }, [entries]);



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
            <Button onClick={handleSave} variant="contained" style={{ marginRight: "px" }}>
              Save
            </Button>
            {toggleEdit ? (
              <Button onClick={handleSave}>
                <EditIcon /> Update
              </Button>
            ) : null}

            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </form>
      <div>
        <Button variant="contained" onClick={handleView}>
          View
        </Button>
      </div>
      <Container fluid>
        <Row>
          <Col md={8}>
            {view
              ? entries.map((entry) => {
                return (
                  <View
                    id={entry.id}
                    key={entry.id}
                    username={entry.username}
                    password={entry.password}
                    city={entry.city}
                    server={entry.server}
                    role={entry.role}
                    services={entry.services}
                    onDelete={deleteItem}
                    onEdit={editItem}
                  />
                );
              })
              : ""}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
