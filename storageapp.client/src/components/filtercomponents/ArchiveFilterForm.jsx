import Form from 'react-bootstrap/Form';

export default function ArchiveFilter({ filter, setFilter }) {
    return (
        <div>
            <Form.Select onChange={(event) => setFilter({ ...filter, isArchive: event.target.value })}>
                <option value={''}>Все</option>
                <option value={true}>В архиве</option>
                <option value={false}>Не в архиве</option>
            </Form.Select>
        </div>
    );
}