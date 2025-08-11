import { BrowserRouter, Routes, Route } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MeasureUnitsForm from "../measureunitcomponents/MeasureUnitsForm";
import ResourcesForm from "../resourcecomponents/RecourcesForm";
import ClientsForm from "../clientcomponents/ClientsFrom";
import BalancesForm from "../balancecomponents/BalancesForm";
import ReceiptDocumentsForm from "../receiptcomponents/ReceiptDocumentsForm";
import ShipmentDocumentsForm from "../shipmentcomponents/ShipmentDocumentsForm";

export default function StoargeApiRoutes() {
    return (
        <BrowserRouter>
            <div>
                <Navbar bg="primary" data-bs-theme="dark" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/balances">Главная страница</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/balances">Баланс</Nav.Link>
                                <Nav.Link href="/receipts">Поступления</Nav.Link>
                                <Nav.Link href="/shipmets">Отгрузки</Nav.Link>
                                <NavDropdown title="Справочники" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/resources">Ресурсы</NavDropdown.Item>
                                    <NavDropdown.Item href="/measureunits">Еденицы измерения</NavDropdown.Item>
                                    <NavDropdown.Item href="/clients">Клиенты</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Routes>
                    <Route path="/balances" element={<BalancesForm />} />
                    <Route path="/receipts" element={<ReceiptDocumentsForm />} />
                    <Route path="/shipmets" element={<ShipmentDocumentsForm />} />
                    <Route path="/resources" element={<ResourcesForm />} />
                    <Route path="/measureunits" element={<MeasureUnitsForm />} />
                    <Route path="/clients" element={<ClientsForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};