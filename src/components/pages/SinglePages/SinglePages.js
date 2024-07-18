import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { Navigate, useParams } from "react-router-dom";
import { getTablesById } from '../../../redux/tablesRedux';
import styles from './SinglePages.module.scss'; 

const SinglePages = () => {
    const { tableId } = useParams();
    const tableData = useSelector(state => getTablesById(state, tableId));
    if (!tableData) return <Navigate to='/' />

    return (
        <Form className="ms-0">
    <h1>Table {tableData.id}</h1>
    <Row>
        <Col xs={12} md={6}> 
            <Row>
                <Col xs={12} md={3} className={styles.labelCol}><strong>Status :</strong></Col>
                <Col xs={12} md={9} className={styles.inputStatus}>
                    <Form.Select className={styles.fullWidthInput} value={tableData.status}>
                        <option>{tableData.status}</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={3} className={styles.labelCol}><strong>People</strong></Col>
                <Col xs={2} md={3} className={styles.inputCol}>
                    <Form.Control className={styles.wideInput} value={tableData.peopleAmount} />
                </Col>
                <Col xs={8} md={3} className={`${styles.inputCol} d-flex align-items-center`}>
                    <InputGroup.Text className="border-0 bg-transparent">/</InputGroup.Text>
                </Col>
                <Col xs={2} md={3} className={styles.inputCol}>
                    <Form.Control className={styles.inputCol} value={tableData.maxPeopleAmount} />
                </Col>
            </Row>
            <Row>
                <Col xs={10} md={3} className={styles.labelCol}><strong>Bill :</strong></Col>
                <Col xs={10} md={9} className={`${styles.inputCol} d-flex align-items-center`}>
                    <span className="me-1">$</span>
                    <Form.Control className={styles.centeredInput} value={tableData.bill} />
                </Col>
            </Row>
            <Button type="submit">Update</Button>
        </Col>
    </Row>
</Form>

    )
}
export default SinglePages;
