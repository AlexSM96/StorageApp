import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function UpdateMeasureUnitForm({ unit, onUpdate, onArchive }) {
    const [show, setShow] = useState(false);
    const [editedUnit, setEditedUnit] = useState(unit);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setEditedUnit(unit)
    }, [unit])

    const onSubmit = (event) => {
        event.preventDefault()
        onUpdate(editedUnit)
        onArchive(editedUnit)
    }

    return (
        <div>
            <Button variant="warning" onClick={handleShow}>
                Изменить
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить еденицу измерения</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Наименование еденицы измерения"
                            value={editedUnit?.name ?? ''}
                            onChange={(event) => setEditedUnit({ ...editedUnit, name: event.target.value })}
                            required={true} />
                        <br />
                        <Form.Check
                            type="checkbox"
                            id={`default-checkbox`}
                            checked={editedUnit.isArchive}
                            onChange={(event) => setEditedUnit({ ...editedUnit, isArchive: event.target.checked })}
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