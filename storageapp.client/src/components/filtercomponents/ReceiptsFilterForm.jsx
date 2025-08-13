import { useEffect } from 'react';
import { useState } from 'react';
import { fetchResources } from '../../services/Resources';
import { fetchMeasureUnits } from '../../services/MeasureUnits'
import { fetchReceiptDocuments } from '../../services/Receipts'
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

export default function ReceiptsFilterForm({ filter, setFilter }) {
    const [receipts, setReceipts] = useState([])
    const [resources, setResources] = useState([])
    const [units, setUnits] = useState([])
    const [resourceSelectedOptions, setResourceSelectedOptions] = useState([]);
    const [unitSelectedOptions, setUnitSelectedOptions] = useState([])
    const [numberSelectedOptions, setNumberSelectedOptions] = useState([])

    const resourceOptions = resources.map(x => ({ value: x.id, label: x.name }));
    const unitOptions = units.map(x => ({ value: x.id, label: x.name }));
    const numberOptions = receipts.map(x => ({ value: x.number, label: x.number }))

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
        setFilter({ ...filter, numbers: selected?.map(option => option.value).filter(item => item != null && item !== '')})
    }

    useEffect(() => {
        const fetchData = async () => {
            let fetchedReceipts = await fetchReceiptDocuments()
            let fetchedResources = await fetchResources({isArchive: false})
            let fetchedUnits = await fetchMeasureUnits({ isArchive: false })

            setReceipts(fetchedReceipts)
            setResources(fetchedResources)
            setUnits(fetchedUnits)
        }

        fetchData()
    },[filter])

    return (
        <div className={'container'}>
            <div className={'row'} >
                <div className={'col'} style={{ width: 300, margin: '0 auto' }}>
                    <p>Дата с</p>
                    <Form.Control
                        type="date"
                        onChange={(event) =>
                            setFilter({ ...filter, from: event.target.value })
                        }
                    />
                </div>
                <div className={'col'} style={{ width: 300, margin: '0 auto' }}>
                    <p>Дата по</p>
                    <Form.Control
                        type="date"
                        onChange={(event) => 
                            setFilter({ ...filter, to: event.target.value })
                        }
                    />
                </div>
                <div className={'col'} style={{ width: 300, margin: '0 auto' }}>
                    <p>Выберите номер</p>
                    <Select
                        options={numberOptions}
                        isMulti
                        value={numberSelectedOptions}
                        onChange={handleNumberChange}
                        placeholder="Выберите..."
                    />
                </div>
                <div className={'col'} style={{ width: 300, margin: '0 auto' }}>
                    <p>Выберите ресурс</p>
                    <Select
                        options={resourceOptions}
                        isMulti
                        value={resourceSelectedOptions}
                        onChange={handleResourceChange}
                        placeholder="Выберите..."
                    />
                </div>
                <div className={'col'} style={{ width: 300, margin: '0 auto' }}>
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