import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import { fetchResources } from '../../services/Resources';
import { fetchMeasureUnits } from '../../services/MeasureUnits';

export default function CreateReceiptDocumentForm({ onCreate }) {
    const [doc, setDoc] = useState({ number: '', date: '', receiptResources: [] });
    const [resources, setResources] = useState([]);
    const [units, setUnits] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [rows, setRows] = useState([
        { id: Date.now(), resource: '', measureUnit: '', quantity: '' },
    ]);

    const handleAddRow = () => {
        const newRow = { id: Date.now(), resource: '', measureUnit: '', quantity: '' };
        setRows([...rows, newRow]);
    };

    const handleRemoveRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const receiptResources = rows.map(row => ({
            resourceId: row.resource,
            measureUnitId: row.measureUnit,
            quantity: row.quantity,
        }));

        setDoc(prevDoc => ({
            ...prevDoc,
            receiptResources,
        }));

        onCreate({
            ...doc,
            receiptResources,
        });

        setDoc(null)
        setRows(null)
    };

    useEffect(() => {
        const fetchData = async () => {
            let fetchedResources = await fetchResources({ isArchive: false });
            let fetchedUnits = await fetchMeasureUnits({ isArchive: false });
            setResources(fetchedResources);
            setUnits(fetchedUnits);
        };
        fetchData();
    }, []);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Добавить
            </Button>
            <Form onSubmit={onSubmit}>
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить документ поступления</Modal.Title>
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
                                value={doc?.date ?? ''}
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
                                    {rows?.map((row) => (
                                        <tr key={row.id}>
                                            <td>
                                                <Form.Select
                                                    value={row.resource}
                                                    onChange={(e) => {
                                                        const newRows = rows.map(r =>
                                                            r.id === row.id ? { ...r, resource: e.target.value} : r
                                                        );
                                                        setRows(newRows);
                                                    }}
                                                >
                                                    <option defaultValue>--Выбрете ресурс--</option>
                                                    {resources.map(r => (
                                                        <option key={r.id} value={r.id}>{r.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </td>

                                            <td>
                                                <Form.Select
                                                    value={row.measureUnit}
                                                    onChange={(e) => {
                                                        const newRows = rows.map(r =>
                                                            r.id === row.id ? { ...r, measureUnit: e.target.value } : r
                                                        );
                                                        setRows(newRows);
                                                    }}
                                                >
                                                    <option defaultValue>--Выбрете еденицу измерения--</option>
                                                    {units.map(u => (
                                                        <option key={u.id} value={u.id}>{u.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </td>

                                            <td>
                                                <Form.Control
                                                    min={0}
                                                    type="number"
                                                    value={row.quantity}
                                                    onChange={(e) => {
                                                        const newRows = rows.map(r =>
                                                            r.id === row.id ? { ...r, quantity: e.target.value } : r
                                                        );
                                                        setRows(newRows);
                                                    }}
                                                />
                                            </td>

                                            <td>
                                                <Button variant="danger" onClick={() => handleRemoveRow(row.id)}>Удалить</Button>
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
}