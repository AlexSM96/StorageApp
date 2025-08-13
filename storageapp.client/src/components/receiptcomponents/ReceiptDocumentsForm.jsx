import { useEffect, useState, useRef } from "react";
import { createReceiptDocument, fetchReceiptDocuments, updateReceiptDocument, deleteReceiptDocument } from "../../services/Receipts"
import { formatDate } from '../../services/formaters/DateFormater'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CreateReceiptDocumentForm from "./CreateReceiptDocumentForm";
import UpdateReceiptDocumentForm from "./UpdateReceiptDocumentForm";
import ReceiptsFilterForm from "../filtercomponents/ReceiptsFilterForm"


export default function ReceiptDocumentsForm() {
    const [receiptDocuments, setReceiptDocumetns] = useState([])
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [filter, setFilter] = useState({
        from: '',
        to: '',
        numbers: [],
        resourceIds: [],
        measureUnitIsd: []
    })

    useEffect(() => {
        const fetchData = async () => {
            let fetchedReceiptDocuements = await fetchReceiptDocuments(filter)
            setReceiptDocumetns(fetchedReceiptDocuements)
        }

        fetchData()
    }, [filter])

    const onCreate = async (document) => {
        try {
            await createReceiptDocument(document)
            let fetchedReceiptDocuements = await fetchReceiptDocuments()
            setReceiptDocumetns(fetchedReceiptDocuements)
        } catch (e){
            if (!e?.response){
                setErrMsg('Сервер не отвечает')
            } else if (e.response.status === 400) {
                const errors = e.response.data.errors;
                const errorNumber = errors.Number ? errors.Number.join(', ') : '';
                const errorDate = errors.Date ? errors.Date.join(', ') : '';
                setErrMsg(`Не удалось создать документ поступления. ${errorNumber}. ${errorDate}.`)
            }
            else {
                setErrMsg('Не удалось создать документ поступления.')
            }
        }
        
    }

    const onUpdate = async (document) => {
        try {
            let updatedShipmentDocument = await updateReceiptDocument(document)
            let fetchedReceiptDocuements = await fetchReceiptDocuments()
            setReceiptDocumetns(fetchedReceiptDocuements)
        } catch (e) {
            if (!e?.response) {
                setErrMsg('Сервер не отвечает')
            } else if (e.response.status === 400) {
                const errors = e.response.data.errors;
                const errorNumber = errors.Number ? errors.Number.join(', ') : '';
                const errorDate = errors.Date ? errors.Date.join(', ') : '';
                setErrMsg(`Не удалось обновить документ поступления. ${errorNumber}. ${errorDate}.`)
            }
            else {
                setErrMsg('Не удалось обновить документ поступления.')
            }
        }
    }

    const onDelete = async (document) => {
        let isSuccess = await deleteReceiptDocument(document)
        let fetchedReceiptDocuements = await fetchReceiptDocuments()
        setReceiptDocumetns(fetchedReceiptDocuements)
    }

    return (
        <div className={"container"}>
            <h2>Поступления</h2>
            <br />
            <ReceiptsFilterForm filter={filter} setFilter={setFilter} />
            <br />
            <CreateReceiptDocumentForm onCreate={onCreate} errRef={errRef} errMsg={errMsg} />
            <br />
            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        <th width={'20%'}>Номер</th>
                        <th width={'20%'}>Дата</th>
                        <th width={'20%'}>Ресурс</th>
                        <th width={'20%'}>Еденица измерения</th>
                        <th width={'20%'}>Кол-во</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {receiptDocuments
                        ? receiptDocuments.map(doc => (
                            <>
                                {doc.receiptResources.map((res, index) => (
                                    <tr key={`${doc.id}_${index}_${doc.number}`}>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={doc.receiptResources.length}>{doc.number}</td>
                                                <td rowSpan={doc.receiptResources.length}>{formatDate(doc.date)}</td>
                                            </>
                                        )}

                                        <td>{res.resource.name}</td>
                                        <td>{res.measureUnit.name}</td>
                                        <td>{res.quantity}</td>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={doc.receiptResources.length}>
                                                    <UpdateReceiptDocumentForm document={doc} onUpdate={onUpdate} errRef={errRef} errMsg={errMsg} />
                                                </td>
                                                <td rowSpan={doc.receiptResources.length}>
                                                    <Button variant="danger" onClick={() => onDelete(doc)}>Удалить</Button>
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