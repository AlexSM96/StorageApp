import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function UpdateClientForm({ client, onUpdate, onArchive }) {
    const [show, setShow] = useState(false);
    const [editedClient, setEditedClient] = useState(client);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setEditedClient(client)
    }, [client])

    const onSubmit = (event) => {
        event.preventDefault()
        onUpdate(editedClient)
        onArchive(editedClient)
    }

    return (
        <div>
            <Button variant="warning" onClick={handleShow}>
                Изменить
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить ресурс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Наименование клиента"
                            value={editedClient?.name ?? ''}
                            onChange={(event) => setEditedClient({ ...editedClient, name: event.target.value })}
                            required={true} />
                        <br />
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Адрес клиента"
                            value={editedClient?.address ?? ''}
                            onChange={(event) => setEditedClient({ ...editedClient, address: event.target.value })}
                            required={true} />
                        <br />
                        <Form.Check
                            type="checkbox"
                            id={`default-checkbox`}
                            checked={editedClient.isArchive}
                            onChange={(event) => setEditedClient({ ...editedClient, isArchive: event.target.checked })}
                            label="Архив" />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};