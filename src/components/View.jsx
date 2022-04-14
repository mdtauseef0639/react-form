import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "@material-ui/core";
import { Row } from "react-bootstrap";
export default function View({
  id,
  username,
  password,
  city,
  server,
  role,
  services,
  onEdit,
  onDelete,
}) {
  return (
    <Card md={6}>
      <Card.Body>
        <Card.Header>
          {`${username}'s Details`} <sub style={{ color: "red" }}>{id}</sub>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>{username}</ListGroup.Item>
          <ListGroup.Item>{password}</ListGroup.Item>
          <ListGroup.Item>{city}</ListGroup.Item>
          <ListGroup.Item>{server}</ListGroup.Item>
          <ListGroup.Item>{role}</ListGroup.Item>
          <ListGroup.Item>{services}</ListGroup.Item>
        </ListGroup>

        <Button
          variant="primary"
          onClick={() => {
            onEdit(id);
          }}
        >
          <EditIcon />
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onDelete(id);
          }}
        >
          <DeleteIcon />
        </Button>
      </Card.Body>
    </Card>
  );
}
