import { useEffect, useState } from "react";
import { createShipmentDocument, updateShipmentDocument, deleteShipmentDocument, fetchShipmentDocuments } from '../../services/Shipments'
import { formatDate } from '../../services/formaters/DateFormater'
import Table from "react-bootstrap/Table";
import Badge from 'react-bootstrap/Badge';
import CreateShipmentDocumentForm from '../shipmentcomponents/CreateShipmentDocumentForm'
import UpdateShipmentDocumentForm from "./UpdateShipmentDocumentForm";

export default function ShipmentDocumentsForm() {
    const [shipmentDocuments, setShipmentDocuments] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let fetchedShipmentDocuments = await fetchShipmentDocuments()
            setShipmentDocuments(fetchedShipmentDocuments)
        }

        fetchData()
    }, [])

    const onCreate = async (document) => {
        await createShipmentDocument(document)
        let fetchedShipmentDocuments = await fetchShipmentDocuments()
        setShipmentDocuments(fetchedShipmentDocuments)
    }

    const onUpdate = async (document) => {
        let updatedShipmentDocument = await updateShipmentDocument(document)
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

            <CreateShipmentDocumentForm onCreate={onCreate} />
            <br/>
            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Дата</th>
                        <th>Клиент</th>
                        <th>Адрес</th>
                        <th>Статус</th>
                        <th>Ресурс</th>
                        <th>Еденица измерения</th>
                        <th>Кол-во</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {shipmentDocuments
                        ? shipmentDocuments.map(doc => (
                            <>
                                {doc.shipmentResources.map((res, index) => (
                                    <tr key={`${doc.id}_${index}_${doc.number}`}>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={doc.shipmentResources.length}>{doc.number}</td>
                                                <td rowSpan={doc.shipmentResources.length}>{formatDate(doc.date)}</td>
                                                <td rowSpan={doc.shipmentResources.length}>{doc.client.name}</td>
                                                <td rowSpan={doc.shipmentResources.length}>{doc.client.address}</td>
                                                <td rowSpan={doc.shipmentResources.length}>{doc.shipmentStatus === 1
                                                    ? <Badge bg="success">Подписан</Badge>
                                                    : <Badge bg="secondary">Не подписан</Badge>}
                                                </td>
                                            </>
                                        )}

                                        <td>{res.resource.name}</td>
                                        <td>{res.measureUnit.name}</td>
                                        <td>{res.quantity}</td>
                                        {index === 0 && ( 
                                            <td rowSpan={doc.shipmentResources.length}>
                                                <UpdateShipmentDocumentForm document={doc} onUpdate={onUpdate} />
                                            </td>
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