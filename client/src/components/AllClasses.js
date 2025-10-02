import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';
import empIcon from "../images/teachers-icon.png"; 
import "./AllClasses.css"

const AllClasses = () => {

  

  const dummyClasses = [
    { id: 1, name: "Class A", students: 25, boys: 12, girls: 13 },
    { id: 2, name: "Class B", students: 30, boys: 15, girls: 15 },
    { id: 3, name: "Class C", students: 22, boys: 10, girls: 12 },
    { id: 4, name: "Class D", students: 28, boys: 14, girls: 14 },
    { id: 5, name: "Class E", students: 18, boys: 8, girls: 10 },
  ];

  return (
    <div className="flex-grow-1 p-4 bg-light min-vh-100">
      {/* Header aligned with AllTeachers */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-chip">Classes - All Classes</div>
        <div className="d-flex align-items-center gap-2">
          <Form.Control
            type="text"
            placeholder="Search"
            className="rounded-pill px-3"
            style={{ maxWidth: "200px", borderColor: "#dc3545" }}
          />
          <Button
            variant="danger"
            className="rounded-pill px-4"
            style={{ backgroundColor: "#f04b4b", border: "none" }}
          >
            All
          </Button>
        </div>
      </div>

      {/* Classes Grid */}
      <Row className="g-4">
        {dummyClasses.map((classItem) => (
          <Col sm={6} md={4} lg={3} key={classItem.id}>
            <Card className="shadow-sm border-0 text-center h-100">
              <Card.Body className="d-flex flex-column align-items-center">
                <img
                  src={empIcon}
                  alt="class icon"
                  className="img-fluid mb-3"
                  style={{ maxWidth: "120px" }}
                />
                <h6 className="fw-semibold mb-4">{classItem.name}</h6>
                {/* Pushes buttons to bottom neatly */}
                <div className="mt-auto w-100">
                  <div className="d-flex justify-content-center gap-2">
                    <Button variant="outline-secondary" size="sm" className="px-3">
                      View
                    </Button>
                    <Button variant="outline-primary" size="sm" className="px-3">
                      Edit
                    </Button>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="px-3 text-dark"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {/* Add New Card */}
        <Col sm={6} md={4} lg={3}>
          <Card className="shadow-sm border p-3 text-center d-flex align-items-center justify-content-center h-100">
            <FaPlus size={40} className="mb-2 text-dark" />
            <h6 className="fw-semibold">Add New</h6>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AllClasses;