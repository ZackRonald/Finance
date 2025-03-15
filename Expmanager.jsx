import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import finLogo from "../Pages/finLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./Expmanager.css";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({
    _id: null,
    date: "",
    type: "", 
    category: "",
    description: "",
    amount: "",
    paymentMethod: "",
    status: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    fetchExpenses();
  }, []);

  const formatChartData = (data) => {
    const categoryTotals = {};
    data.forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB", "#9966FF"];
    
    const formattedData = Object.keys(categoryTotals).map((key) => ({
      name: key,
      value: categoryTotals[key],
    }));
    setChartData(formattedData);
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3010/getExpenses", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("User not authenticated");
      const data = await response.json();
      const formattedExpenses = data.map(expense => ({
        ...expense,
        type: expense.type ? String(expense.type) : "Unknown", 
      }));
      
     

      
      setExpenses(formattedExpenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  const handleChange = (e) => {
    setCurrentExpense({ ...currentExpense, [e.target.name]: e.target.value });
  };

  const handleEdit = (expense) => {
    setCurrentExpense(expense);
    setEditMode(true);
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentExpense({
      _id: null,
      date: "",
      type: "",
      category: "",
      description: "",
      amount: "",
      paymentMethod: "",
      status: "",
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    const apiUrl = editMode
      ? "http://localhost:3010/updateExpense"
      : "http://localhost:3010/addExpense";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editMode ? { ...currentExpense, id: currentExpense._id } : currentExpense),
      });

      if (!response.ok) throw new Error("Failed to save expense");

      fetchExpenses(); 
      setShowModal(false);
    } catch (error) {
      console.error("Error saving expense:", error);
    }
};

  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:3010/deleteExpense", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }), 
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }
  
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const navigate=useNavigate();


   useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch("http://localhost:3010/checkAuth ", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
  
          if (!response.ok) {
            navigate("/login"); 
          }
        } catch (error) {
          console.error("Authentication check failed:", error);
          alert("Login first or invalid token!"); 
          navigate("/login"); 
        }
      };
  
      checkAuth();
    }, [navigate]);
  
  let teleport=()=>{
    navigate("/Home")
}
  return (
    <>
      <nav className="navi">
                <div id="info">
                  <img src={finLogo} alt="Logo" id="logo" />
                  <h2>Fin App</h2>
                </div>
                <div className="opt">
                  <h2 style={{cursor:"pointer",fontSize:"25px"}} onClick={teleport}>Home</h2>
                </div>
              </nav>
         
              {/* <Container className="mt-4">
      <h1>Your Expenses & Income</h1>
      <Row>
        <Col md={6}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container> */}
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Your Expenses & Income</h1>
          <Button variant="primary" onClick={handleAdd}>Add Expense</Button>
        </div>

        <Row className="mt-3">
          {currentExpenses.length > 0 ? (
            currentExpenses.map((expense) => (
              <Col key={expense._id} md={4} className="mb-4" >
                 <Card 
                  style={{ 
                    borderLeft: `5px solid ${expense.type === "Income" ? "green" : "red"}`, 
                    backgroundColor: expense.type === "Income" ? "#ccffcc" : "#ffcccc" 
                  }}
                  className="shadow-sm"
                >

                  <Card.Body className="bodyC">
                  <div className="upper" >

                  <div className="leftUpper">
                  <div className="H1"> <Card.Title style={{marginLeft:"10px"}}>Amount:</Card.Title><Card.Title style={{fontSize:"40px",position:"relative",left:"80px"}}> ₹{expense.amount}
                  <Card.Subtitle className="mb-2 text-muted" style={{fontSize:"25px",position:"relative",left:"10px",fontWeight:"bold",top:"30px"}}>{expense.status}</Card.Subtitle>
                    </Card.Title></div>

                  </div>
                  {/* //{expense.category} */}
                    <div className="rightUpper">
                      <div className="desc">
                      <Card.Text style={{fontWeight:"bold",color:"black"}}>Description:</Card.Text> <Card.Text id="cardtext" style={{color:"black"}}>{expense.description}</Card.Text>
                      </div>
                   
                    <p style={{color:"black"}}><strong style={{color:"black"}}>Date:</strong> {expense.date   }</p>
                 
                  </div>
                    </div>
                    

                  <div className="lower">
                      <div className="leftLower">
                       <div className="leftLowerUpper">  
                         
                         <div className="btns">
                    <Button variant="warning" size="sm" onClick={() => handleEdit(expense)}>Edit</Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(expense._id)}>Delete</Button>

                    </div>
                        </div>
                      <div className="leftLowerDown">
                        
                      </div>
                  </div>
                  <div className="LowerRight">
                   
                    <div className="meth"> <p><strong>Payment Method:</strong> {expense.paymentMethod}</p></div>
</div>                    
                   </div>
                    
                    
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center w-100">No data available</p>
          )}
        </Row>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? "Edit Expense" : "Add Expense"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" name="type" value={currentExpense.type} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </Form.Control>
              </Form.Group>
              {currentExpense.type && (
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" name="category" value={currentExpense.category} onChange={handleChange}>
                    <option value="">Select</option>
                    {currentExpense.type === "Income" ? (
                      <>
                        <option value="Salary">Salary</option>
                        <option value="Gift">Gift</option>
                        <option value="Loan">Loan</option>
                        <option value="Bonus">Bonus</option>
                      </>
                    ) : (
                      <>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Loan">Loan</option>
                        <option value="Rent">Rent</option>
                        <option value="Bills">Bills</option>
                      </>
                    )}
                  </Form.Control>
                </Form.Group>
              )}
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={currentExpense.date} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" name="amount" value={currentExpense.amount} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Payment Method</Form.Label>
                <Form.Control as="select" name="paymentMethod" value={currentExpense.paymentMethod} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Bank">Bank</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={currentExpense.description} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" value={currentExpense.status} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Received">Received</option>
                  <option value="Pending">Pending</option>
                </Form.Control> 
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="success" onClick={handleSave}>{editMode ? "Update" : "Add"}</Button>
          </Modal.Footer>
        </Modal>

        <div className="pagination d-flex justify-content-center mt-3">
          <Button variant="secondary" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="mx-3">Page {currentPage} of {totalPages}</span>
          <Button variant="secondary" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </Container>
    </>
  );
};

export default ExpenseManager;
