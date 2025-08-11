import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default function MeasureUnitCreateForm({ onCreate }) {
    const [unit, setUnit] = useState(null)
    const onSubmit = (event) => {
        event.preventDefault()
        setUnit(null)
        onCreate(unit)
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Control
                size="lg"
                type="text"
                placeholder="Наименование еденицы измерения"
                onChange={(event) => setUnit({ ...unit, name: event.target.value })}
                value={unit?.name ?? ''}
                required={true} />
            <br />
            <Button type="submit" variant="outline-primary">Добавить</Button>
        </Form>
    );
};