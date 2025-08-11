import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createResource, deleteResource, fetchResources, updateResource, archiveResource } from '../../services/Resources'
import { useState, useEffect } from "react";
import ArchiveFilter from "../filtercomponents/ArchiveFilterForm";
import CreateResourceForm from "./CreateResourceForm";
import UpdateResourceForm from "./UpdateResourceForm";

export default function ResourcesForm() {
    const [resources, setResources] = useState([])
    const [filter, setFilter] = useState({ isArchive: null })
    

    useEffect(() => {
        const fetchData = async () => {
            let fetchedResources = await fetchResources(filter)
            setResources(fetchedResources)
        }

        fetchData()
    }, [filter])

    const onCreate = async (resource) => {
        let createdResource = await createResource(resource)
        let fetchedResources = await fetchResources(filter)
        setResources(fetchedResources)
    }

    const onUpdate = async (resource) => {
        let updatedResource = await updateResource(resource)
        let fetchedResources = await fetchResources(filter)
        setResources(fetchedResources)
    }

    const onArchive = async (resource) => {
        let updatedResource = await archiveResource(resource)
        let fetchedResources = await fetchResources(filter)
        setResources(fetchedResources)
    }

    const onDelete = async (resource) => {
        let isDeleted = await deleteResource(resource)
        let fetchedResources = await fetchResources(filter)
        setResources(fetchedResources)
    }

    return (

        <div className={"container"}>
            <h2>Ресурсы</h2>
            <br />
            <div className={"row"}>
                <div className={"col col-md-5"}>
                    <CreateResourceForm onCreate={onCreate} />
                </div>
                <div className={"col"}>
                    <ArchiveFilter filter={filter} setFilter={setFilter} />
                    <br />
                    <Table striped bordered hover responsive="sm" size="sm" variant="dark">
                        <thead>
                            <tr>
                                <th width="70%">Наименование</th>
                                <th>Архив</th>
                                <th colSpan="2" size="sm"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {resources ? resources.map(r => (
                                <tr key={r.id}>
                                    <td>{r.name}</td>
                                    <td>
                                        <Form.Check
                                            disabled
                                            type="checkbox"
                                            id={`disabled-default-checkbox`}
                                            checked={r.isArchive}
                                        />
                                    </td>
                                    <td>
                                        <UpdateResourceForm resource={r} onUpdate={onUpdate} onArchive={onArchive} />
                                    </td>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => onDelete(r)}>Удалить</Button>
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