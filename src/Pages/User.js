import { useEffect, useState } from "react";
import { getUsersFromMongo, getUsersFromMysql } from "../composables/Users";
import Swal from "sweetalert2";
import { Accordion, Container, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider } from "@mui/material";

export default function User() {
    const [mongoUsers, setMongoUsers] = useState([]);
    const [mysqlUsers, setMysqlUsers] = useState([]);

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
                    <Table aria-label="mongo's users table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Telefone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                mongoUsers.map((user) => (
                                    <TableRow>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.phoneNumber}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>

                    <Table aria-label="mysql's users table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Telefone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                mysqlUsers.map((user) => (
                                    <TableRow>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.phoneNumber}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Container>                
            }
        </>
    );
}