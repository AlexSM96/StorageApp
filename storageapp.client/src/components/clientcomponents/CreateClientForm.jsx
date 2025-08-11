import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default function CreateClientForm({ onCreate }) {
    const [client, setClient] = useState(null)
    const onSubmit = (event) => {
        event.preventDefault()
        setClient(null)
        onCreate(client)
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Control
                size="lg"
                type="text"
                placeholder="Наименование клиента"
                onChange={(event) => setClient({ ...client, name: event.target.value })}
                value={client?.name ?? ''}
                required={true} />
            <br />
            <Form.Control
                size="lg"
                type="text"
                placeholder="Адрес клиента"
                onChange={(event) => setClient({ ...client, address: event.target.value })}
                value={client?.address ?? ''}
                required={true} />
            <br />
            <Button type="submit" variant="outline-primary">Добавить</Button>
        </Form>
    );
};