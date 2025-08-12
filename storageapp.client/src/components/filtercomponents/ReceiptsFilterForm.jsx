import { useEffect } from 'react';
import { useState } from 'react';
import { fetchResources } from '../../services/Resources';
import { fetchMeasureUnits } from '../../services/MeasureUnits'
import { fetchReceiptDocuments } from '../../services/Receipts'
import { formatDateISO } from '../../services/formaters/DateFormater'
import Form from 'react-bootstrap/Form';

export default function ReceiptsFilterForm({ filter, setFilter }) {
    const [receipts, setReceipts] = useState([])
    const [resources, setResources] = useState([])
    const [units, setUnits] = useState([])


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
                        {receipts?.map(r => (
                            <option key={r.id} value={r.number}>{r.number}</option>
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