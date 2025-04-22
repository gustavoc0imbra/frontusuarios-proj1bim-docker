import { useEffect, useState } from "react";
import { getUsersFromMongo, getUsersFromMysql } from "../composables/Users";
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Typography } from "@mui/material";
import SimpleTable from "../components/SimpleTable";
import { Add, ExpandMore } from "@mui/icons-material";

export default function User() {
    const [mongoUsers, setMongoUsers] = useState([]);
    const [mysqlUsers, setMysqlUsers] = useState([]);
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    }

    useEffect(() => {
        const fetchUsers = async () => {

            const users = await Promise.all([getUsersFromMongo(), getUsersFromMysql()]);

            setMongoUsers(users[0]);
            setMysqlUsers(users[1]);
        };

        fetchUsers();
    }, []);

    return (
        <>
            {
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
                                    {
                                        title: "ID",
                                        key: "id"
                                    },
                                    {
                                        title: "Nome",
                                        key: "name"
                                    },
                                    {
                                        title: "Telefone",
                                        key: "phoneNumber"
                                    },
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
                                    {
                                        title: "ID",
                                        key: "id"
                                    },
                                    {
                                        title: "Nome",
                                        key: "name"
                                    },
                                    {
                                        title: "Telefone",
                                        key: "phoneNumber"
                                    },
                                ]}
                                data={mysqlUsers}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Fab
                        color="primary"
                        sx={{
                            position: "fixed",
                            bottom: 16,
                            right: 16
                        }}
                        onClick={openModal}
                    >
                        <Add />
                    </Fab>

                    <Dialog
                        open={open}
                        onClose={closeModal}
                    >
                        <DialogTitle>Adicionar Usuário</DialogTitle>
                        <DialogContent>
                            <DialogContentText></DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeModal} color="error" variant="contained">Cancelar</Button>
                            <Button color="success" variant="contained" >Salvar</Button>
                        </DialogActions>
                    </Dialog>
                </Container>


            }
        </>
    );
}