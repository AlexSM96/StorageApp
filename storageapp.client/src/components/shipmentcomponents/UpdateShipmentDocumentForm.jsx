import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { fetchClients } from '../../services/Clients'
import { fetchBalances } from '../../services/Balances'
import { formatDateISO } from '../../services/formaters/DateFormater'

export default function UpdateShipmentDocumentForm({ document, onUpdate, errRef, errMsg }) {
    const [doc, setDoc] = useState(document);
    const [balances, setBalances] = useState([]);
    const [clients, setClients] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rows, setRows] = useState([]);

    const handleQuantityChange = (resourceId, measureUnitId, value) => {
        setRows(prevRows => {
            const index = prevRows.findIndex(r => r.resourceId === resourceId && r.measureUnitId === measureUnitId);
            if (index >= 0) {
                const newRows = [...prevRows];
                newRows[index] = { resourceId, measureUnitId, quantity: value };
                return newRows;
            } else {
                return [...prevRows, { resourceId, measureUnitId, quantity: value }];
            }
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const shipmentResources = rows.map(r => ({
            resourceId: r.resourceId,
            measureUnitId: r.measureUnitId,
            quantity: r.quantity,
        })).filter(r => r.quantity > 0);

        setDoc(prev => ({ ...prev, shipmentResources }));
        onUpdate({ ...doc, shipmentResources });
    };

    useEffect(() => {
        const fetchData = async () => {
            let fetchedBalances = await fetchBalances();
            let fetchedClients = await fetchClients({ isArchive: false });
            setBalances(fetchedBalances);
            setClients(fetchedClients);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setDoc(document)
    }, [document])

    useEffect(() => {
        if (show) {
            setRows(
                (doc?.shipmentResources || []).map(r => ({
                    resourceId: r?.resource?.id ?? '',
                    measureUnitId: r?.measureUnit?.id ?? '',
                    quantity: r?.quantity ?? '',
                }))
            );
        }
    }, [show, doc?.shipmentResources]);

    return (
        <div>
            <Button variant="warning" onClick={handleShow}>Изменить</Button>

            <Form onSubmit={onSubmit}>
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить документ отгрузки</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {errMsg ? (
                            <Alert key={'danger'} variant={'danger'} ref={errRef} dismissible>
                                {errMsg}
                            </Alert>
                        ) : <></>}
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Номер документа"
                            onChange={(event) => setDoc({ ...doc, number: event.target.value })}
                            value={doc?.number ?? ''}
                            required={true}
                        />
                        <br />
                        <Form.Select
                            size="lg"
                            value={doc?.client?.id ?? ''}
                            onChange={(event) => setDoc({ ...doc, client: { id: event.target.value }})}
                            required={true}
                        >
                            <option>--Выберете клиента--</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </Form.Select>
                        <br />
                        <Form.Control
                            size="lg"
                            type="date"
                            onChange={(event) => setDoc({ ...doc, date: event.target.value })}
                            value={formatDateISO(new Date(doc?.date ?? ''))}
                            required={true}
                        />
                        <br />

                        <Table striped bordered hover size="sm" variant="dark" style={{ marginTop: '10px', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th width={'35%'}>Ресурс</th>
                                    <th width={'35%'}>Единица измерения</th>
                                    <th>Доступно</th>
                                    <th>Кол-во на отгрузку</th>
                                </tr>
                            </thead>
                            <tbody>
                                {balances.map(b => (
                                    <tr key={`${b.resource.id}_${b.measureUnit.id}`}>
                                        <td>{b.resource.name}</td>
                                        <td>{b.measureUnit.name}</td>
                                        <td>{b.quantity}</td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                min={0}
                                                max={b.quantity}
                                                value={rows?.find(r => r.resourceId === b.resource.id && r.measureUnitId === b.measureUnit.id)?.quantity ?? ''}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        b.resource.id,
                                                        b.measureUnit.id,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                        <Button variant="primary" onClick={onSubmit}>Сохранить</Button>
                    </Modal.Footer>

                </Modal>
            </Form>
        </div>
    )
};
