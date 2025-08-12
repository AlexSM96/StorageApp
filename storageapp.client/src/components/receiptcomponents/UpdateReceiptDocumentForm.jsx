import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import { fetchResources } from '../../services/Resources';
import { fetchMeasureUnits } from '../../services/MeasureUnits';
import { formatDateISO } from '../../services/formaters/DateFormater';

export default function UpdateReceiptDocumentForm({ document, onUpdate }) {
    const [doc, setDoc] = useState(document);
    const [show, setShow] = useState(false);
    const [resources, setResources] = useState([]);
    const [units, setUnits] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rows, setRows] = useState([]);

    const handleAddRow = () => {
        const newRow = { id: Date.now() + Math.random(), resource: '', measureUnit: '', quantity: '' };
        setRows([...rows, newRow]);
    };

    const handleRemoveRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const receiptResources = rows.map(r => ({
            resourceId: r.resource,
            measureUnitId: r.measureUnit,
            quantity: r.quantity,
        }));

        const updatedDocument = { ...doc, receiptResources };

        onUpdate(updatedDocument);
    }

    useEffect(() => {
        const fetchData = async () => {
            let fetchedResources = await fetchResources({ isArchive: false });
            let fetchedUnits = await fetchMeasureUnits({ isArchive: false });
            setResources(fetchedResources);
            setUnits(fetchedUnits);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (document && show) {
            setDoc({ ...document });
            const initialRows = (document?.receiptResources || []).map(r => ({
                id: r.id || Date.now() + Math.random(),
                resource: r.resource.id,
                measureUnit: r.measureUnit.id,
                quantity: r.quantity,
            }));
            setRows(initialRows);
        }
    }, [show, document]);

    return (
        <div>
            <Button variant="warning" onClick={handleShow}>
                Изменить
            </Button>
            <Form onSubmit={onSubmit}>
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить документ поступления</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Номер документа"
                            onChange={(event) => setDoc({ ...doc, number: event.target.value })}
                            value={doc?.number ?? ''}
                            required={true}
                        />
                        <br />
                        <Form.Control
                            size="lg"
                            type="date"
                            placeholder="Дата постуления"
                            onChange={(event) => setDoc({ ...doc, date: event.target.value })}
                            value={formatDateISO(new Date(doc?.date ?? ''))}
                            required={true}
                        />
                        <br />
                        <Button onClick={handleAddRow} type="button" variant="success">Добавить строку</Button>
                        <Table striped bordered hover size="sm" variant="dark" style={{ marginTop: '10px', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th width={'35%'}>Ресурс</th>
                                    <th width={'35%'}>Единица измерения</th>
                                    <th>Кол-во</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows?.map((r) => (
                                    <tr key={r.id}>
                                        <td>
                                            <Form.Select
                                                value={r.resource}
                                                onChange={(e) => {
                                                    const newResourceId = e.target.value;
                                                    setRows(prevRows =>
                                                        prevRows.map(row =>
                                                            row.id === r.id ? { ...row, resource: newResourceId } : row
                                                        )
                                                    );
                                                }}
                                            >
                                                <option defaultValue>--Выберите ресурс--</option>
                                                {resources.map(r => (
                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                ))}
                                            </Form.Select>
                                        </td>

                                        <td>
                                            <Form.Select
                                                value={r.measureUnit}
                                                onChange={(e) => {
                                                    const newUnitId = e.target.value;
                                                    setRows(prevRows => 
                                                        prevRows.map(row =>
                                                            row.id === r.id ? { ...row, measureUnit: newUnitId } : row
                                                        )
                                                    )
                                                }}
                                            >
                                                <option defaultValue>--Выберите еденицу измерения--</option>
                                                {units.map(u => (
                                                    <option key={u.id} value={u.id}>{u.name}</option>
                                                ))}
                                            </Form.Select>
                                        </td>

                                        <td>
                                            <Form.Control
                                                min={0}
                                                type="number"
                                                value={r.quantity}
                                                onChange={(e) => {
                                                    const newQuantity = e.target.value;
                                                    setRows(prevRows => 
                                                        prevRows.map(row =>
                                                            row.id == r.id ? { ...row, quantity: newQuantity } : row
                                                        )
                                                    )
                                                }}
                                            />
                                        </td>

                                        <td>
                                            <Button variant="danger" onClick={() => handleRemoveRow(r.id)}>Удалить</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={onSubmit}>Сохранить</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </div>
    );
};