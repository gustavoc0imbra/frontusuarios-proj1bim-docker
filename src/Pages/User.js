import { useEffect, useState } from "react";
import { getUsersFromMongo, getUsersFromMysql } from "../composables/Users";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import SimpleTable from "../components/SimpleTable";
import { Add, ExpandMore } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function User() {
  const [mongoUsers, setMongoUsers] = useState([]);
  const [mysqlUsers, setMysqlUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const fetchUsers = async () => {
    const users = await Promise.all([getUsersFromMongo(), getUsersFromMysql()]);
    setMongoUsers(users[0]);
    setMysqlUsers(users[1]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async () => {
    if (!name || !phoneNumber) {
      Swal.fire("Preencha todos os campos.", "", "warning");
      return;
    }

    try {
      await Promise.all([
        fetch("http://localhost:8080/api/v0/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phoneNumber }),
        }),
        fetch("http://localhost:8081/api/v0/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phoneNumber }),
        }),
      ]);

      Swal.fire("Usuário salvo com sucesso!", "", "success");
      closeModal();
      setName("");
      setPhoneNumber("");
      fetchUsers();
    } catch (error) {
      Swal.fire("Erro ao salvar usuário.", "", "error");
    }
  };

  return (
    <Container>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="mongo-panel"
          id="mongo-header"
        >
          <Typography component="span">Tabela Mongo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleTable
            ariaLabel="mongo's users table"
            columns={[
              { title: "ID", key: "id" },
              { title: "Nome", key: "name" },
              { title: "Telefone", key: "phoneNumber" },
            ]}
            data={mongoUsers}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="mysql-panel"
          id="mysql-header"
        >
          <Typography component="span">Tabela MySQL</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleTable
            ariaLabel="mysql's users table"
            columns={[
              { title: "ID", key: "id" },
              { title: "Nome", key: "name" },
              { title: "Telefone", key: "phoneNumber" },
            ]}
            data={mysqlUsers}
          />
        </AccordionDetails>
      </Accordion>

      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={openModal}
      >
        <Add />
      </Fab>

      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>Adicionar Usuário</DialogTitle>
        <DialogContent>
          <DialogContentText>Preencha os dados abaixo:</DialogContentText>
          <TextField
            margin="dense"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Telefone"
            type="text"
            fullWidth
            variant="standard"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="error" variant="contained">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="success" variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
