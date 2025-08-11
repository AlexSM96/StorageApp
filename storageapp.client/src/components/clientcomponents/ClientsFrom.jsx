import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ArchiveFilter from "../filtercomponents/ArchiveFilterForm";
import { useEffect, useState } from "react";
import { fetchClients, createClient, updateClient, archiveClient, deleteClient } from "../../services/Clients";
import UpdateClientForm from "./UpdateClientForm";
import CreateClientForm from "./CreateClientForm";

export default function ClientsForm() {
    const [clients, setClients] = useState([])
    const [filter, setFilter] = useState({ isArchive: null })

    useEffect(() => {
        const fetchData = async () => {
            let fetchedClients = await fetchClients(filter);
            setClients(fetchedClients)
        }

        fetchData()
    }, [filter])

    const onCreate = async (client) => {
        let createdClient = await createClient(client)
        let fetchedClients = await fetchClients(filter);
        setClients(fetchedClients)
    }

    const onUpdate = async (client) => {
        let updatedResource = await updateClient(client)
        let fetchedClients = await fetchClients(filter);
        setClients(fetchedClients)
    }

    const onArchive = async (client) => {
        let updatedResource = await archiveClient(client)
        let fetchedClients = await fetchClients(filter);
        setClients(fetchedClients)
    }

    const onDelete = async (client) => {
        let isDeleted = await deleteClient(client)
        let fetchedClients = await fetchClients(filter);
        setClients(fetchedClients)
    }

    return (
        <div className={"container"}>
            <h2>Клиенты</h2>
            <br />
            <div className={"row"}>
                <div className={"col col-md-5"}>
                    <CreateClientForm onCreate={onCreate} />
                </div>
                <div className={"col"}>
                    <ArchiveFilter filter={filter} setFilter={setFilter} />
                    <br />
                    <Table striped bordered hover size="sm" variant="dark">
                        <thead>
                            <tr>
                                <th width="35%">Наименование</th>
                                <th width="35%">Адрес</th>
                                <th>Архив</th>
                                <th colSpan="3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients ? clients.map(c => (
                                <tr key={c.id}>
                                    <td>{c.name}</td>
                                    <td>{c.address}</td>
                                    <td>
                                        <Form.Check
                                            disabled
                                            type="checkbox"
                                            id={`disabled-default-checkbox`}
                                            checked={c.isArchive}
                                        />
                                    </td>
                                    <td>
                                        <UpdateClientForm client={c} onUpdate={onUpdate} onArchive={onArchive} />
                                    </td>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => onDelete(c)}>Удалить</Button>
                                    </td>
                                </tr>
                            )) : <tr></tr>}

                        </tbody>
                    </Table>
                </div>
            </div>
            
            
        </div>
    );
};