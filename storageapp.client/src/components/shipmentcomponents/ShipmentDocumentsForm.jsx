import { useEffect, useState, useRef } from "react";
import { createShipmentDocument, updateShipmentDocument, deleteShipmentDocument, fetchShipmentDocuments, signShipmentDocument, unSignShipmentDocument } from '../../services/Shipments'
import { formatDate } from '../../services/formaters/DateFormater'
import Table from "react-bootstrap/Table";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import CreateShipmentDocumentForm from '../shipmentcomponents/CreateShipmentDocumentForm'
import UpdateShipmentDocumentForm from "./UpdateShipmentDocumentForm";
import ShipmentsFilterForm from "../filtercomponents/ShipmentsFilterForm";

export default function ShipmentDocumentsForm() {
    const [shipmentDocuments, setShipmentDocuments] = useState([])
    const [filter, setFilter] = useState({
        from: '',
        to: '',
        numbers: [],
        clientIds: [],
        resourceIds: [],
        measureUnitIsd: []
    })
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            let fetchedShipmentDocuments = await fetchShipmentDocuments(filter)
            setShipmentDocuments(fetchedShipmentDocuments)
        }

        fetchData()
    }, [filter])

    const onCreate = async (document) => {
        try {
            await createShipmentDocument(document)
            let fetchedShipmentDocuments = await fetchShipmentDocuments()
            setShipmentDocuments(fetchedShipmentDocuments)
        } catch (e) {
            if (!e?.response) {
                setErrMsg('Сервер не отвечает')
            } else if (e.response.status === 400) { 
                const errors = e.response.data.errors;
                const errorClient = errors.ClientId ? errors.ClientId.join(', ') : '';
                const errorNumber = errors.Number ? errors.Number.join(', ') : '';
                const errorDate = errors.Date ? errors.Date.join(', ') : '';
                setErrMsg(`Не удалось создать документ отгрузки. ${errorClient}. ${errorNumber}. ${errorDate}.`)
            }
            else {
                setErrMsg('Не удалось создать документ отгрузки')
            }
        }
    }

    const onUpdate = async (document) => {
        try {
            let updatedShipmentDocument = await updateShipmentDocument(document)
            let fetchedShipmentDocuments = await fetchShipmentDocuments()
            setShipmentDocuments(fetchedShipmentDocuments)
        } catch(e) {
            if (!e?.response) {
                setErrMsg('Сервер не отвечает')
            } else if (e.response.status === 400) {
                const errors = e.response.data.errors;
                const errorClient = errors.ClientId ? errors.ClientId.join(', ') : '';
                const errorNumber = errors.Number ? errors.Number.join(', ') : '';
                const errorDate = errors.Date ? errors.Date.join(', ') : '';
                setErrMsg(`Не удалось обновить документ отгрузки. ${errorClient}. ${errorNumber}. ${errorDate}.`)
            }
            else {
                setErrMsg('Не удалось обновить документ отгрузки')
            }
        }
    }

    const onSign = async (document) => {
        let signedShipmentDocument = await signShipmentDocument(document);
        let fetchedShipmentDocuments = await fetchShipmentDocuments()
        setShipmentDocuments(fetchedShipmentDocuments)
    }

    const onUnSign = async (document) => {
        let unSignedShipmentDocument = await unSignShipmentDocument(document);
        let fetchedShipmentDocuments = await fetchShipmentDocuments()
        setShipmentDocuments(fetchedShipmentDocuments)
    }

    const onDelete = async (document) => {
        let isSuccess = await deleteShipmentDocument(document)
        let fetchedShipmentDocuments = await fetchShipmentDocuments()
        setShipmentDocuments(fetchedShipmentDocuments)
    }

    return (
        <div className={"container"}>
            <h2>Отгрузки</h2>
            <br />
            <ShipmentsFilterForm filter={filter} setFilter={setFilter} />
            <br />
            <CreateShipmentDocumentForm onCreate={onCreate} errRef={errRef} errMsg={errMsg} />
            <br/>
            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        <th width={'20%'}>Номер</th>
                        <th width={'20%'}>Дата</th>
                        <th width={'20%'}>Клиент</th>
                        <th width={'20%'}>Адрес</th>
                        <th width={'20%'}>Статус</th>
                        <th width={'20%'}>Ресурс</th>
                        <th width={'20%'}>Еденица измерения</th>
                        <th width={'20%'}>Кол-во</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {shipmentDocuments
                        ? shipmentDocuments.map(doc => (
                            <>
                                {doc?.shipmentResources.map((res, index) => (
                                    <tr key={`${doc?.id}_${index}_${doc?.number}`}>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={doc?.shipmentResources?.length}>{doc?.number}</td>
                                                <td rowSpan={doc?.shipmentResources?.length}>{formatDate(doc?.date)}</td>
                                                <td rowSpan={doc?.shipmentResources?.length}>{doc?.client?.name}</td>
                                                <td rowSpan={doc?.shipmentResources?.length}>{doc?.client?.address}</td>
                                                <td rowSpan={doc?.shipmentResources?.length}>{doc?.shipmentStatus === 1
                                                    ? <Badge bg="success">Подписан</Badge>
                                                    : <Badge bg="secondary">Не подписан</Badge>}
                                                </td>
                                            </>
                                        )}
                                        <td>{res?.resource?.name}</td>
                                        <td>{res?.measureUnit?.name}</td>
                                        <td>{res?.quantity}</td>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={doc?.shipmentResources?.length}>
                                                    <UpdateShipmentDocumentForm document={doc} onUpdate={onUpdate} errRef={errRef} errMsg={errMsg} />
                                                </td>
                                                <td rowSpan={doc?.shipmentResources?.length}>
                                                    {doc?.shipmentStatus === 1
                                                        ? <Button variant="danger" onClick={() => onUnSign(doc)}>Отозвать</Button>
                                                        : <Button variant="success" onClick={() => onSign(doc)}>Сохранить и подписать</Button>
                                                    }
                                                </td>
                                                <td rowSpan={doc?.shipmentResources?.length}>
                                                    {doc?.shipmentStatus !== 1
                                                        ? <Button variant="danger" onClick={() => onDelete(doc)}>Удалить</Button>
                                                        : <></>
                                                    } 
                                                </td>
                                            </>
                                            
                                        )}
                                        
                                    </tr>
                                ))}
                            </>
                        ))
                        : <tr></tr>
                    }

                </tbody>
            </Table>
        </div>
    );
};