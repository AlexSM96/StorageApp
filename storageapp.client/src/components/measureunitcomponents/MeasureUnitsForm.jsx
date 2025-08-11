import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ArchiveFilter from "../filtercomponents/ArchiveFilterForm";
import { useEffect, useState } from "react";
import { createMeasureUnits, fetchMeasureUnits, updateMeasureUnits, deleteMeasureUnits, archiveMeasureUnits } from "../../services/MeasureUnits";
import MeasureUnitCreateForm from './MeasureUnitCreateForm'
import UpdateMeasureUnitForm from './UpdateMeasureUnitForm'

export default function MeasureUnitsForm() {
    const [measureUnits, setMeasureUnits] = useState([])
    const [filter, setFilter] = useState({ isArchive: null })
    useEffect(() => {
        const fetchData = async () => {
            let fetchedMeasureUnits = await fetchMeasureUnits(filter)
            setMeasureUnits(fetchedMeasureUnits)
        }

        fetchData()
    }, [filter])

    const onCreate = async (unit) => {
        const createdUnit = await createMeasureUnits(unit)
        let fetchedMeasureUnits = await fetchMeasureUnits(filter)
        setMeasureUnits(fetchedMeasureUnits)
    }

    const onUpdate = async (unit) => {
        let updatedUnit = await updateMeasureUnits(unit);
        let fetchedMeasureUnits = await fetchMeasureUnits(filter)
        setMeasureUnits(fetchedMeasureUnits)
    }

    const onArchive = async (unit) => {
        let updatedUnit = await archiveMeasureUnits(unit);
        let fetchedMeasureUnits = await fetchMeasureUnits(filter)
        setMeasureUnits(fetchedMeasureUnits)
    }

    const onDelete = async (unit) => {
        let ieDeleted = await deleteMeasureUnits(unit)
        let fetchedMeasureUnits = await fetchMeasureUnits(filter)
        setMeasureUnits(fetchedMeasureUnits)
    }

    return (
        <div className={"container"}>
            <h2>Еденицы измерения</h2>
            <br />
            <div className={"row"}>
                <div className={"col col-md-5"}>
                    <MeasureUnitCreateForm onCreate={onCreate} />
                </div>
                <div className={"col"}>
                    <ArchiveFilter filter={filter} setFilter={setFilter} />
                    <br />
                    <Table striped bordered hover size="sm" variant="dark">
                        <thead>
                            <tr>
                                <th width="70%">Наименование</th>
                                <th>Архив</th>
                                <th colSpan="3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {measureUnits ? measureUnits.map(mu => (
                                <tr key={mu.id}>
                                    <td>{mu.name}</td>
                                    <td>
                                        <Form.Check
                                            disabled
                                            type="checkbox"
                                            id={`disabled-default-checkbox`}
                                            checked={mu.isArchive}
                                        />
                                    </td>
                                    <td>
                                        <UpdateMeasureUnitForm unit={mu} onUpdate={onUpdate} onArchive={onArchive} />
                                    </td>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => onDelete(mu)}>Удалить</Button>
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