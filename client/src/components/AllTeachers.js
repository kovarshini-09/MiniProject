// // // AllTeachers.js
// // import React, { useState, useEffect } from "react";
// // import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "./AllStudents.css";
// // import { FaUserPlus } from 'react-icons/fa';
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import empIcon from "../images/teachers-icon.png";
// // import AddTeacher from "./AddTeachers";

// // function AllTeachers() {
// //   const navigate = useNavigate();
// //   const [teachers, setTeachers] = useState([]);
// //   const [showAddTeacher, setShowAddTeacher] = useState(false);

// //   useEffect(() => {
// //     axios.get("http://localhost:5000/api/teachers")
// //       .then(res => setTeachers(res.data))
// //       .catch(err => console.error(err));
// //   }, []);

// //   const handleView = (id) => {
// //     navigate(`/admin/teachers/${id}`);
// //   };

// //   const handleEdit = (id) => {
// //     navigate(`/admin/teachers/edit/${id}`);
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this teacher?")) {
// //       try {
// //         await axios.delete(`http://localhost:5000/api/teachers/${id}`);
// //         setTeachers(teachers.filter(t => t._id !== id));
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     }
// //   };

// //   const handleAddTeacher = () => {
// //     setShowAddTeacher(true);
// //   };

// //   const handleBack = () => {
// //     setShowAddTeacher(false);
// //   };

// //   return (
// //     <Container fluid className="p-4 bg-light min-vh-100">
// //       {!showAddTeacher ? (
// //         <>
// //           <div className="d-flex justify-content-between align-items-center mb-4">
// //             <div className="page-chip">Employees - All Teachers</div>
// //             <div className="d-flex align-items-center gap-2">
// //               <Form.Control
// //                 type="text"
// //                 placeholder="Search"
// //                 className="rounded-pill px-3"
// //                 style={{ maxWidth: "200px", borderColor: "#dc3545" }}
// //               />
// //               <Button
// //                 variant="danger"
// //                 className="rounded-pill px-4"
// //                 style={{ backgroundColor: "#f04b4b", border: "none" }}
// //               >
// //                 All
// //               </Button>
// //             </div>
// //           </div>

// //           <Row className="g-4">
// //             {teachers.map((teacher) => (
// //               <Col sm={6} md={4} lg={3} key={teacher._id}>
// //                 <Card className="shadow-sm border-0 text-center h-100">
// //                   <Card.Body className="d-flex flex-column align-items-center">
// //                     <img
// //                       src={empIcon}
// //                       alt="teacher"
// //                       className="img-fluid mb-3"
// //                       style={{ maxWidth: "120px" }}
// //                     />
// //                     <h6 className="fw-semibold mb-4">{teacher.name}</h6>
// //                     <div className="mt-auto w-100">
// //                       <div className="d-flex justify-content-center gap-2">
// //                         <Button
// //                           variant="outline-secondary"
// //                           size="sm"
// //                           className="px-3"
// //                           onClick={() => handleView(teacher._id)}
// //                         >
// //                           View
// //                         </Button>
// //                         <Button
// //                           variant="outline-primary"
// //                           size="sm"
// //                           className="px-3"
// //                           onClick={() => handleEdit(teacher._id)}
// //                         >
// //                           Edit
// //                         </Button>
// //                         <Button
// //                           variant="outline-warning"
// //                           size="sm"
// //                           className="px-3 text-dark"
// //                           onClick={() => handleDelete(teacher._id)}
// //                         >
// //                           Delete
// //                         </Button>
// //                       </div>
// //                     </div>
// //                   </Card.Body>
// //                 </Card>
// //               </Col>
// //             ))}

// //             {/* Add New Card */}
// //             <Col sm={6} md={4} lg={3}>
// //               <Card
// //                 className="shadow-sm border p-3 text-center d-flex align-items-center justify-content-center h-100"
// //                 onClick={handleAddTeacher}
// //                 style={{ cursor: "pointer" }}
// //               >
// //                 <FaUserPlus size={40} className="mb-2 text-dark" />
// //                 <h6 className="fw-semibold">Add New</h6>
// //               </Card>
// //             </Col>
// //           </Row>
// //         </>
// //       ) : (
// //         <>
// //           <Button 
// //             variant="primary" 
// //             className="mb-4" 
// //             onClick={handleBack}
// //           >
// //             Back
// //           </Button>
// //           <AddTeacher />
// //         </>
// //       )}
// //     </Container>
// //   );
// // }

// // export default AllTeachers;

// // ✅ Updated AllTeachers.js (only minimal safe UI improvement)
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./AllStudents.css";
// import { FaUserPlus } from 'react-icons/fa';
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import empIcon from "../images/teachers-icon.png";
// import AddTeacher from "./AddTeachers";

// function AllTeachers() {
//   const navigate = useNavigate();
//   const [teachers, setTeachers] = useState([]);
//   const [showAddTeacher, setShowAddTeacher] = useState(false);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/teachers")
//       .then(res => setTeachers(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleView = (id) => {
//     navigate(`/admin/teachers/${id}`);
//   };

//   const handleEdit = (id) => {
//     navigate(`/admin/teachers/edit/${id}`);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this teacher?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/teachers/${id}`);
//         setTeachers(teachers.filter(t => t._id !== id));
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const handleAddTeacher = () => {
//     setShowAddTeacher(true);
//   };

//   const handleBack = () => {
//     setShowAddTeacher(false);
//   };

//   return (
//     <Container fluid className="p-4 bg-light min-vh-100">
//       {!showAddTeacher ? (
//         <>
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div className="page-chip">Employees - All Teachers</div>
//             <div className="d-flex align-items-center gap-2">
//               <Form.Control
//                 type="text"
//                 placeholder="Search"
//                 className="rounded-pill px-3"
//                 style={{ maxWidth: "200px", borderColor: "#dc3545" }}
//               />
//               <Button
//                 variant="danger"
//                 className="rounded-pill px-4"
//                 style={{ backgroundColor: "#f04b4b", border: "none" }}
//               >
//                 All
//               </Button>
//             </div>
//           </div>

//           {/* ✅ Teacher Cards Section */}
//           <Row className="g-4">
//             {teachers.map((teacher) => (
//               <Col sm={6} md={4} lg={3} key={teacher._id}>
//                 <Card className="shadow-sm border-0 text-center h-100">
//                   <Card.Body className="d-flex flex-column align-items-center">
//                     <img
//                       src={empIcon}
//                       alt="teacher"
//                       className="img-fluid mb-3"
//                       style={{ maxWidth: "120px" }}
//                     />
//                     <h6 className="fw-semibold mb-1">{teacher.name}</h6>
//                     <p className="text-muted mb-4">{teacher.subject}</p> {/* ✅ Added subject below name */}
//                     <div className="mt-auto w-100">
//                       <div className="d-flex justify-content-center gap-2">
//                         <Button
//                           variant="outline-secondary"
//                           size="sm"
//                           className="px-3"
//                           onClick={() => handleView(teacher._id)}
//                         >
//                           View
//                         </Button>
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           className="px-3"
//                           onClick={() => handleEdit(teacher._id)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="outline-warning"
//                           size="sm"
//                           className="px-3 text-dark"
//                           onClick={() => handleDelete(teacher._id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}

//             {/* Add New Card */}
//             <Col sm={6} md={4} lg={3}>
//               <Card
//                 className="shadow-sm border p-3 text-center d-flex align-items-center justify-content-center h-100"
//                 onClick={handleAddTeacher}
//                 style={{ cursor: "pointer" }}
//               >
//                 <FaUserPlus size={40} className="mb-2 text-dark" />
//                 <h6 className="fw-semibold">Add New</h6>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       ) : (
//         <>
//           <Button
//             variant="primary"
//             className="mb-4"
//             onClick={handleBack}
//           >
//             Back
//           </Button>
//           <AddTeacher />
//         </>
//       )}
//     </Container>
//   );
// }
// export default AllTeachers;
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AllStudents.css";
import { FaUserPlus } from "react-icons/fa";
import empIcon from "../images/teachers-icon.png";
import AddTeacher from "./AddTeachers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllTeachers() {
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  const handleAddTeacher = () => {
    setShowAddTeacher(true);
  };

  const handleBack = () => {
    setShowAddTeacher(false);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teachers");
        // Optional: sort alphabetically
        const sortedTeachers = res.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setTeachers(sortedTeachers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeachers();
  }, []);

  const handleView = (id) => navigate(`/admin/teachers/${id}`);
  const handleEdit = (id) => navigate(`/admin/teachers/edit/${id}`);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axios.delete(`http://localhost:5000/api/teachers/${id}`);
        setTeachers(teachers.filter((t) => t._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {!showAddTeacher ? (
        <>
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="page-chip">Employees - All Teachers</div>
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

          {/* Teacher Cards */}
          <Row className="g-4">
            {teachers.map((teacher) => (
              <Col sm={6} md={4} lg={3} key={teacher._id}>
                <Card className="shadow-sm border-0 text-center h-100">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <img
                      src={empIcon}
                      alt="teacher"
                      className="img-fluid mb-3"
                      style={{ maxWidth: "120px" }}
                    />
                    <h6 className="fw-semibold mb-1">{teacher.name}</h6>
                    <p className="text-muted mb-3">{teacher.subject}</p>
                    <div className="mt-auto w-100">
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="px-3"
                          onClick={() => handleView(teacher._id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="px-3"
                          onClick={() => handleEdit(teacher._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="px-3 text-dark"
                          onClick={() => handleDelete(teacher._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {/* Add New Teacher Card */}
            <Col sm={6} md={4} lg={3}>
              <Card
                className="shadow-sm border p-3 text-center d-flex align-items-center justify-content-center h-100"
                onClick={handleAddTeacher}
                style={{ cursor: "pointer" }}
              >
                <FaUserPlus size={40} className="mb-2 text-dark" />
                <h6 className="fw-semibold text-dark">Add New</h6>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Button variant="primary" className="mb-4" onClick={handleBack}>
            Back
          </Button>
          <AddTeacher />
        </>
      )}
    </Container>
  );
}

export default AllTeachers;

