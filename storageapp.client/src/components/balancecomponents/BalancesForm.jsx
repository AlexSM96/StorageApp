import { useEffect, useState } from "react";
import { fetchBalances } from "../../services/Balances";
import Table from "react-bootstrap/Table";
import BalanceFilter from "../filtercomponents/BalanceFilterForm";


export default function BalancesForm() {
    const [balances, setBalances] = useState([])
    const [filter, setFilter] = useState({
        resourceIds: [],
        measureUnitIds: []
    });

    useEffect(() => {
        const fetchData = async () => {
            let fetchedBalances = await fetchBalances(filter)
            setBalances(fetchedBalances)
        }

        fetchData()
    }, [filter])


    

    return (
        <div className={"container"}>
            <h2>Баланс</h2>
            <br />
            <br />
            <BalanceFilter filter={filter} setFilter={setFilter} />
            <br />
            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        <th>Ресурс</th>
                        <th>Еденица измерения</th>
                        <th>Кол-во</th>
                    </tr>
                </thead>
                <tbody>
                    {balances
                        ? balances.map(b => (
                            <tr key={b.resource?.name}>
                            <td>{b.resource?.name}</td>
                            <td>{b.measureUnit?.name}</td>
                            <td>{b.quantity}</td>
                        </tr>
                    )) : <tr></tr>}

                </tbody>
            </Table>
        </div>
    );
};