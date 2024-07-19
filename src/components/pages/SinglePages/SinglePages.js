import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, InputGroup, Form, Spinner } from 'react-bootstrap';
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { getTablesById, editTableRequest, fetchTables } from '../../../redux/tablesRedux';
import styles from './SinglePages.module.scss'; 
import { getStatus, fetchStatus } from '../../../redux/statusRedux';

const SinglePages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tableId } = useParams();
    const tableData = useSelector(state => getTablesById(state, tableId));
    const statusData = useSelector(getStatus);

    const [status, setStatus] = useState(tableData?.status || '');
    const [peopleAmount, setPeopleAmount] = useState(tableData?.peopleAmount || 0);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(tableData?.maxPeopleAmount || 0);
    const [bill, setBill] = useState(tableData?.bill || 0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!tableData) {
            navigate('/');
        } else {
            setStatus(tableData.status);
            setPeopleAmount(tableData.peopleAmount);
            setMaxPeopleAmount(tableData.maxPeopleAmount);
            setBill(tableData.bill);
        }
    }, [tableData, navigate]);

    useEffect(() => {
        dispatch(fetchTables());
        dispatch(fetchStatus());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'Free' || status === 'Cleaning') {
            setPeopleAmount(0);
        }
        if (status !== 'Busy') {
            setBill(0);
        }
    }, [status]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTable = {
            ...tableData,
            status,
            peopleAmount,
            maxPeopleAmount,
            bill: status === 'Busy' ? bill : 0
        };
        dispatch(editTableRequest(updatedTable))
            .then(() => navigate('/'));  
    };

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        if (newStatus === 'Free' || newStatus === 'Cleaning') {
            setPeopleAmount(0);
        }
    };

    const handlePeopleAmountChange = (event) => {
        const value = Math.min(Math.max(event.target.value, 0), 10);
        setPeopleAmount(Math.min(value, maxPeopleAmount));
    };

    const handleMaxPeopleAmountChange = (event) => {
        const value = Math.min(Math.max(event.target.value, 0), 10);
        setMaxPeopleAmount(value);
        if (peopleAmount > value) {
            setPeopleAmount(value);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [tableData]);

    if (loading) {
        return (
            <div className="text-center mt-9">
                <Spinner animation="border" variant="primary" />
                <p>Loading ... Please wait</p>
            </div>
        );
    }

    if (!tableData) return <Navigate to='/' />;

    return (
        <Form className="ms-0" onSubmit={handleSubmit}>
            <h1>Table {tableData.id}</h1>
            <Row>
                <Col xs={12} md={6}>
                    <Row>
                        <Col xs={12} md={3} className={styles.labelCol}><strong>Status :</strong></Col>
                        <Col xs={12} md={9} className={styles.inputStatus}>
                            <Form.Select 
                                className={styles.fullWidthInput} 
                                value={status} 
                                onChange={handleStatusChange}
                            >
                                <option value="Free">Free</option>
                                <option value="Reserved">Reserved</option>
                                <option value="Busy">Busy</option>
                                <option value="Cleaning">Cleaning</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={3} className={styles.labelCol}><strong>People</strong></Col>
                        <Col xs={2} md={3} className={styles.inputCol}>
                            <Form.Control 
                                className={styles.wideInput} 
                                type="number" 
                                value={peopleAmount} 
                                onChange={handlePeopleAmountChange} 
                            />
                        </Col>
                        <Col xs={8} md={3} className={`${styles.inputCol} d-flex align-items-center`}>
                            <InputGroup.Text className="border-0 bg-transparent">/</InputGroup.Text>
                        </Col>
                        <Col xs={2} md={3} className={styles.inputCol}>
                            <Form.Control 
                                className={styles.inputCol} 
                                type="number" 
                                value={maxPeopleAmount} 
                                onChange={handleMaxPeopleAmountChange} 
                            />
                        </Col>
                    </Row>
                    {status === 'Busy' && (
                        <Row>
                            <Col xs={10} md={3} className={styles.labelCol}><strong>Bill :</strong></Col>
                            <Col xs={10} md={9} className={`${styles.inputCol} d-flex align-items-center`}>
                                <span className="me-1">$</span>
                                <Form.Control 
                                    className={styles.centeredInput} 
                                    type="number" 
                                    value={bill} 
                                    onChange={(e) => setBill(e.target.value)} 
                                />
                            </Col>
                        </Row>
                    )}
                    <Button type="submit">Update</Button>
                </Col>
            </Row>
        </Form>
    );
}
export default SinglePages;
