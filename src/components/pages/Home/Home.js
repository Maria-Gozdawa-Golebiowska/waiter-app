import { useSelector } from "react-redux";
import { getAllTables } from '../../../redux/tablesRedux';
import { Link } from "react-router-dom";
import { Card, Button, Col, Row, Container, } from 'react-bootstrap';


const Home = () => {
    const tables = useSelector((state) => getAllTables(state))
   
    return (
        <Container>
          <h1 className="my-4">All tables</h1>
          {tables.map(table => (
            <Card key={table.id} className="mb-4">
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>Table {table.id}</Card.Title>
                    <Card.Text>
                      <strong>Status:</strong> {table.status}
                    </Card.Text>
                  </Col>
                  <Col xs="auto" className="d-flex align-items-center">
                    <Link to={`/table/${table.id}`}>
                      <Button variant="primary">Show more</Button>
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Container>
      );
    };
    
    export default Home;
    