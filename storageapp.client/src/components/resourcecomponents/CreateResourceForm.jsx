import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default function CreateResourceForm({ onCreate }) {
    const [resource, setResource] = useState(null)
    const onSubmit = (event) => {
        event.preventDefault()
        setResource(null)
        onCreate(resource)
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Control
                size="lg"
                type="text"
                placeholder="Наименование ресурса"
                onChange={(event) => setResource({...resource, name: event.target.value})}
                value={resource?.name ?? ''}
                required={true} />
            <br />
            <Button type="submit" variant="outline-primary">Добавить</Button>
        </Form>
    );
};