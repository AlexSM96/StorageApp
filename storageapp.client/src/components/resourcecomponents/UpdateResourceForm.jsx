import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function UpdateResourceForm({resource, onUpdate, onArchive }) {
    const [show, setShow] = useState(false);
    const [editedResource, setEditedResource] = useState(resource);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setEditedResource(resource)
    },[resource])

    const onSubmit = (event) => {
        event.preventDefault()
        onUpdate(editedResource)
        onArchive(editedResource)
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
                            placeholder="Наименование ресурса"
                            value={editedResource?.name ?? ''}
                            onChange={(event) => setEditedResource({ ...editedResource, name: event.target.value }) }
                            required={true} />
                        <br />
                        <Form.Check
                            type="checkbox"
                            id={`default-checkbox`}
                            checked={editedResource.isArchive}
                            onChange={(event) => setEditedResource({ ...editedResource, isArchive: event.target.checked })}
                            label="Архив"
                        />
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