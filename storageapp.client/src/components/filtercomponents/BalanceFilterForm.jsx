import { useEffect } from 'react';
import { useState } from 'react';
import { fetchResources } from '../../services/Resources';
import { fetchMeasureUnits } from '../../services/MeasureUnits'
import Form from 'react-bootstrap/Form';

export default function BalanceFilter({ filter, setFilter }) {
    const [resources, setResources] = useState([])
    const [units, setUnits] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            let fetchedResources = await fetchResources({ isArchive: false })
            let fetchedUnits = await fetchMeasureUnits({ isArchive: false })
            setResources(fetchedResources)
            setUnits(fetchedUnits)
        }

        fetchData()
    }, [filter])

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col"}>
                    <Form.Select
                        multiple={true}
                        value={filter?.resourceIds || []}
                        onChange={(event) => {
                            const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value).filter(item => item != null && item !== '');
                            setFilter({ ...filter, resourceIds: selectedOptions });
                        }}>
                        <option value={''}>---</option>
                        {resources.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className={"col"}>
                    <Form.Select
                        multiple={true}
                        value={filter?.measureUnitIds || []}
                        onChange={(event) => {
                            const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value).filter(item => item != null && item !== '');
                            setFilter({ ...filter, measureUnitIds: selectedOptions });
                        }}
                    >
                        <option value={''}>---</option>
                        {units.map(u => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                    </Form.Select>
                </div>
            </div>
        </div>
    );
};