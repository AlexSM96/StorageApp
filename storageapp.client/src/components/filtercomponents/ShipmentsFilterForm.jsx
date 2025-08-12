import { useEffect } from 'react';
import { useState } from 'react';
import { fetchResources } from '../../services/Resources';
import { fetchMeasureUnits } from '../../services/MeasureUnits'
import { fetchShipmentDocuments } from '../../services/Shipments'
import Form from 'react-bootstrap/Form';
import { fetchClients } from '../../services/Clients';

export default function ShipmetsFilterForm({ filter, setFilter }) {
    const [shipments, setShipments] = useState([])
    const [resources, setResources] = useState([])
    const [clients, setClients] = useState([])
    const [units, setUnits] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            let fetchedShipments = await fetchShipmentDocuments()
            let fetchedResources = await fetchResources({ isArchive: false })
            let fetchedUnits = await fetchMeasureUnits({ isArchive: false })
            let fetchedClients = await fetchClients({isArchive: false})

            setShipments(fetchedShipments)
            setResources(fetchedResources)
            setClients(fetchedClients)
            setUnits(fetchedUnits)
        }

        fetchData()
    }, [filter])

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col'}>
                    <label>Дата с</label>
                    <Form.Control
                        type="date"
                        onChange={(event) =>
                            setFilter({ ...filter, from: event.target.value })
                        }
                    />
                </div>
                <div className={'col'}>
                    <label>Дата по</label>
                    <Form.Control
                        type="date"
                        onChange={(event) =>
                            setFilter({ ...filter, to: event.target.value })
                        }
                    />
                </div>
                <div className={'col'}>
                    <label>Номер поступления</label>
                    <Form.Select
                        multiple={true}
                        value={filter?.numbers || []}
                        onChange={(event) => {
                            const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value).filter(item => item != null && item !== '');
                            setFilter({ ...filter, numbers: selectedOptions });
                        }}
                    >
                        <option value={''}>--выберите номер поступления--</option>
                        {shipments?.map(s => (
                            <option key={s.id} value={s.number}>{s.number}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className={'col'}>
                    <label>Клиент</label>
                    <Form.Select
                        multiple={true}
                        value={filter?.clientIds || []}
                        onChange={(event) => {
                            const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value).filter(item => item != null && item !== '');
                            setFilter({ ...filter, clientIds: selectedOptions });
                        }}
                    >
                        <option value={''}>--выберите клиента--</option>
                        {clients?.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className={'col'}>
                    <label>Ресурс</label>
                    <Form.Select
                        multiple={true}
                        value={filter?.resourceIds || []}
                        onChange={(event) => {
                            const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value).filter(item => item != null && item !== '');
                            setFilter({ ...filter, resourceIds: selectedOptions });
                        }}
                    >
                        <option value={''}>--выберите ресурс--</option>
                        {resources?.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className={'col'}>
                    <label>Еденица измерения</label>
                    <Form.Select
                        multiple={true}
                        value={filter?.measureUnitIds || []}
                        onChange={(event) => {
                            const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value).filter(item => item != null && item !== '');
                            setFilter({ ...filter, measureUnitIds: selectedOptions });
                        }}
                    >
                        <option value={''}>--выберите еденицу измерения--</option>
                        {units?.map(u => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                    </Form.Select>
                </div>
            </div>
        </div>
    );
};