import { useEffect } from 'react';
import { useState } from 'react';
import { fetchResources } from '../../services/Resources';
import { fetchMeasureUnits } from '../../services/MeasureUnits'
import { fetchShipmentDocuments } from '../../services/Shipments'
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { fetchClients } from '../../services/Clients';

export default function ShipmetsFilterForm({ filter, setFilter }) {
    const [shipments, setShipments] = useState([])
    const [resources, setResources] = useState([])
    const [clients, setClients] = useState([])
    const [units, setUnits] = useState([])

    const [resourceSelectedOptions, setResourceSelectedOptions] = useState([]);
    const [unitSelectedOptions, setUnitSelectedOptions] = useState([])
    const [numberSelectedOptions, setNumberSelectedOptions] = useState([])
    const [clientSelectedOptions, setClientSelectedOptions] = useState([])

    const resourceOptions = resources.map(x => ({ value: x.id, label: x.name }));
    const unitOptions = units.map(x => ({ value: x.id, label: x.name }));
    const numberOptions = shipments.map(x => ({ value: x.number, label: x.number }))
    const clientOptions = clients.map(x => ({value: x.id, label: x.name}))

    const handleResourceChange = (selected) => {
        setResourceSelectedOptions(selected);
        setFilter({ ...filter, resourceIds: selected?.map(option => option.value).filter(item => item != null && item !== '') })
    };

    const handleUnitChange = (selected) => {
        setUnitSelectedOptions(selected)
        setFilter({ ...filter, measureUnitIds: selected?.map(option => option.value).filter(item => item != null && item !== '') })
    };

    const handleNumberChange = (selected) => {
        setNumberSelectedOptions(selected);
        setFilter({ ...filter, numbers: selected?.map(option => option.value).filter(item => item != null && item !== '') })
    }

    const handleClientChange = (selected) => {
        setClientSelectedOptions(selected)
        setFilter({ ...filter, clientIds: selected?.map(option => option.value).filter(item => item != null && item !== '') })
    }


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
                <div className={'col'} style={{ width: 400, margin: '0 auto' }}>
                    <p>Дата с</p>
                    <Form.Control
                        type="date"
                        onChange={(event) =>
                            setFilter({ ...filter, from: event.target.value })
                        }
                    />
                </div>
                
                <div className={'col'} style={{ width: 400, margin: '0 auto' }}>
                    <p>Выберите номер</p>
                    <Select
                        options={numberOptions}
                        isMulti
                        value={numberSelectedOptions}
                        onChange={handleNumberChange}
                        placeholder="Выберите..."
                    />
                </div>
                <div className={'col'} style={{ width: 400, margin: '0 auto' }}>
                    <p>Выберите клиента</p>
                    <Select
                        options={clientOptions}
                        isMulti
                        value={clientSelectedOptions}
                        onChange={handleClientChange}
                        placeholder="Выберите..."
                    />
                </div>
            </div>
            <div className={'row'}>
                <div className={'col'} style={{ width: 400, margin: '0 auto' }}>
                    <p>Дата по</p>
                    <Form.Control
                        type="date"
                        onChange={(event) =>
                            setFilter({ ...filter, to: event.target.value })
                        }
                    />
                </div>
                <div className={'col'} style={{ width: 400, margin: '0 auto' }}>
                    <p>Выберите ресурс</p>
                    <Select
                        options={resourceOptions}
                        isMulti
                        value={resourceSelectedOptions}
                        onChange={handleResourceChange}
                        placeholder="Выберите..."
                    />
                </div>
                <div className={'col'} style={{ width: 400, margin: '0 auto' }}>
                    <p>Выберите еденицу измерения</p>
                    <Select
                        options={unitOptions}
                        isMulti
                        value={unitSelectedOptions}
                        onChange={handleUnitChange}
                        placeholder="Выберите..."
                    />
                </div>
            </div>
        </div>
    );
};