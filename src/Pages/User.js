import { useEffect, useState } from "react";
import { getUsersFromMongo, getUsersFromMysql, saveUserMongo, saveUserMysql } from "../composables/Users";
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import SimpleTable from "../components/SimpleTable";
import { Add, ExpandMore } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function User() {
  const [mongoUsers, setMongoUsers] = useState([]);
  const [mysqlUsers, setMysqlUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({name: "", phoneNumber: ""});

  const resetUsrFields = () => {
    setUser({...user, name: "", phoneNumber: ""});
  };

  const openModal = () => {
    resetUsrFields();
    setOpen(true);
  };

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
    if (!user.name || !user.phoneNumber) {
      Swal.fire({
        title: "Preencha todos os campos.",
        icon: "warning",
        theme: "dark",
        confirmButtonColor: "#2196f3"
      });
      return;
    }

    const [mongoUser, mysqlUser] = await Promise.all([saveUserMongo(user), saveUserMysql(user)]);

    setMongoUsers([...mongoUsers, mongoUser]);
    setMysqlUsers([...mysqlUsers, mysqlUser]);

    resetUsrFields();

    Swal.fire({
      title: "Usuário salvo com sucesso!",
      html: `ID no <b>MongoDB</b>: ${mongoUser.id}<br>ID no <b>MySQL</b>: ${mysqlUser.id}<br>Consulte as listas para verificar a persistência!`,
      icon: "success",
      showConfirmButton: true,
      theme: "dark",
      confirmButtonColor: "#2196f3"
    }).then((result) => {
      if(result.isConfirmed) {
        closeModal();
      }
    });
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: 2
          }}
        >
          <Grid size={"grow"}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="mongo-panel"
                id="mongo-header"
              >
                <Typography component="span">Tabela Mongo</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  maxHeight: "80vh",
                  overflowY: "auto"
                }}
              >
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
          </Grid>
          
          <Grid size={"grow"}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="mysql-panel"
                id="mysql-header"
              >
                <Typography component="span">Tabela MySQL</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  maxHeight: "80vh",
                  overflowY: "auto"
                }}
              >
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
          </Grid>
        </Grid>

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
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
            />
            <TextField
              margin="dense"
              label="Telefone"
              type="number"
              fullWidth
              variant="standard"
              value={user.phoneNumber}
              onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
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
    </ThemeProvider>
    
  );
}
