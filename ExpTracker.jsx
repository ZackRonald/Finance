import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import finLogo from "../Pages/finLogo.png";
import "./ExpTracker.css";
import { useNavigate } from "react-router-dom";

const ExpTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [viewMode, setViewMode] = useState("Daily");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [endMonth, setEndMonth] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, unpaid: 0 ,trans:0,loan:0,bill:0,shopping:0,food:0,rent:0,salary:0,cloan:0,gift:0,bonus:0});

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3010/getExpenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error fetching expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const resetData = () => {
    setSelectedDate("");
    setStartDate("");
    setEndDate("");
    setSelectedMonth("");
    setEndMonth("");
    setSelectedCategory(""); 
    setSummary({ totalIncome: 0, totalExpense: 0, unpaid: 0,trans:0,loan:0,bill:0,shopping:0,food:0,rent:0,salary:0,cloan:0,gift:0,bonus:0});
  };

  useEffect(() => {
    resetData();
  }, [viewMode]);

  const filterExpenses = () => {
    return expenses.filter((expense) => {
      let isValid = true;

      if (viewMode === "Daily") {
        isValid = expense.date === selectedDate;
      } else if (viewMode === "Weekly") {
        isValid = expense.date >= startDate && expense.date <= endDate;
      } else if (viewMode === "Monthly") {
        isValid = expense.date >= selectedMonth && expense.date <= endMonth;
      }

      if (selectedCategory) {
        isValid = isValid && expense.category === selectedCategory;
      }

      return isValid;
    });
  };

  useEffect(() => {
    const filtered = filterExpenses();
    let totalIncome = 0,
      totalExpense = 0,
      unpaid = 0 ,trans=0,loan=0,bill=0,shopping=0,food=0,rent=0,salary=0,cloan=0,gift=0,bonus=0;

    filtered.forEach((expense) => {
      
      
      const amount = Number(expense.amount);
      if (expense.type === "Income") {
        totalIncome += amount;
      } else if (expense.type === "Expense") {
        totalExpense += amount;
        if (expense.status === "Unpaid") unpaid += amount;
      }
      if(expense.category==="Transport"){
        trans+=amount;
      }
      if(expense.category==="Bills"){
        bill+=amount;
      }
      if(expense.category==="Loan"){
        loan+=amount;
        cloan+=amount;
      }
      if(expense.category==="Shopping"){
        shopping+=amount;
      }
      if(expense.category==="Rent"){
        rent+=amount;
      }
      if(expense.category==="Food"){
        food+=amount;
      }
      if(expense.category==="Salary"){
        salary+=amount;
      }
      if(expense.category==="Bonus"){
        bonus+=amount;
      }
      
      if(expense.category==="Gift"){
        gift+=amount;
      }
    });

    setSummary({ totalIncome, totalExpense, unpaid,trans,bill,loan,shopping,food,rent,salary,cloan,gift,bonus });
  }, [viewMode, selectedDate, startDate, endDate, selectedMonth, endMonth, selectedCategory, expenses]);

  const navigate = useNavigate();
  const teleport = () => {
    navigate("/Home");
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3010/checkAuth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          navigate("/login"); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        alert("Login first or invalid token!"); 
        navigate("/login"); 
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <>
      <nav className="navi">
        <div id="info">
          <img src={finLogo} alt="Logo" id="logo" />
          <h2 id="h2Opt">Fin App</h2>
        </div>
        <div className="opt">
          <h2 id="h2Opt" onClick={teleport}>
            Home
          </h2>
        </div>
      </nav>

      <Container className="mt-4">
      <div className="FormHolder">
      <h1>Expense Tracker</h1>
        <Form id="expForm">
          <Form.Group>
            <Form.Label>Select View</Form.Label>
            <Form.Control as="select" value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </Form.Control>
          </Form.Group>

          {/* Daily Filter */}
          {viewMode === "Daily" && (
            <>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </>
          )}

          {viewMode === "Weekly" && (
            <>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </>
          )}

          {viewMode === "Monthly" && (
            <>
              <Form.Label>Start Month</Form.Label>
              <Form.Control type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
              <Form.Label>End Month</Form.Label>
              <Form.Control type="month" value={endMonth} onChange={(e) => setEndMonth(e.target.value)} />
            </>
          )}

         
          <Form.Group>
            <Form.Label>Filter by Category</Form.Label>
            <Form.Control as="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              <optgroup label="Expense Categories">
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Loan">Loan</option>
                <option value="Rent">Rent</option>
                <option value="Bills">Bills</option>
              </optgroup>
              <optgroup label="Income Categories">
                <option value="Salary">Salary</option>
                <option value="Gift">Gift</option>
                <option value="Loan">Loan</option>
                <option value="Bonus">Bonus</option>
              </optgroup>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      
          <div className="incomeCard">
          <p id="paraCard" style={{color:"black"}} >Total Income: ₹{summary.totalIncome}</p>
          <img style={{height:"200px", width:"200px"}} src="https://img.freepik.com/free-vector/financial-planning-concept-illustration_114360-20545.jpg?t=st=1741926049~exp=1741929649~hmac=f16ab7448344673d637285568ccc85f62c36a6e0d518cfeff4e31b617e937c04&w=826" alt="" />
          </div>
      
          <div className="ExpenseCard">
          <p id="paraCard" style={{color:"black"}}>Total Expense: ₹{summary.totalExpense}</p>
          <img style={{height:"200px", width:"200px"}} src="https://img.freepik.com/free-vector/mobile-expense-management-abstract-concept_335657-3030.jpg?t=st=1741926387~exp=1741929987~hmac=7f2e07cd5df26d6c253dab617a7fc8f90d033c471e019f78ac8520a505a214dd&w=826" alt="" />
          </div>
       
        
          <div className="unpaidCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Unpaid Amount: ₹{summary.unpaid}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/money-stress-concept-illustration_114360-8967.jpg?t=st=1741926626~exp=1741930226~hmac=56ed67ff4cefdbce97eb6d8a2dbc5f143e8b26da80cf9a7ca48e6aa4c81b6c1a&w=826" alt="" />
          </div>

          <div className="transportCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Transport: ₹{summary.trans}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/flight-booking-concept-illustration_114360-2213.jpg?t=st=1741931854~exp=1741935454~hmac=1dae3cddb127fa0cd6fbfabfd7be5811e0d430be0fe8c63f559773ac54a59df6&w=826" alt="" />
          </div>

          <div className="loanCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Loan: ₹{summary.loan}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/bank-loan-concept-illustration_114360-21880.jpg?t=st=1741932077~exp=1741935677~hmac=35d48f98a138df358774bb73bf658849317bf581c6d53bc07822d742fdcd3fb2&w=826" alt="" />
          </div>

          <div className="billCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Bills: ₹{summary.bill}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/utility-bills-concept-illustration_114360-15641.jpg?t=st=1741932232~exp=1741935832~hmac=6d928e6cc2c8146e35dd43f77ff9371d623385de916eaf585ab7e752dc2a1378&w=826" alt="" />
          </div>

          <div className="shopCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Shopping: ₹{summary.shopping}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?t=st=1741932461~exp=1741936061~hmac=d7d0f41f17c1124795484004d778f978bc464f5356394993549e6bf00ad6c42c&w=1380" alt="" />
          </div>

          <div className="foodCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Food: ₹{summary.food}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/man-sitting-restaurant-waiter-offering-wine-bottle-guy-alone-table-modern-restaurant-evening_575670-320.jpg?t=st=1741932785~exp=1741936385~hmac=4bf99f2e595455eb44e28b9b3af61a362fe4723e71ae7cb61d816617df57c247&w=900" alt="" />
          </div>

          <div className="rentCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Rent: ₹{summary.rent}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/apartment-rent-concept-illustration_114360-4115.jpg?t=st=1741932982~exp=1741936582~hmac=948801bb3490962e2dbd6c0e1172aad8a3ea7751112399e9c74c771cee4224c5&w=826" alt="" />
          </div>

          <h1 style={{position:"relative",top:"700px"}}>Income</h1>
          <div className="salaryCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Salary: ₹{summary.salary}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/payday-concept-illustration_114360-25126.jpg?t=st=1741933407~exp=1741937007~hmac=f811fe8d296cb4e7c518bf6d9d1ca06c751fe5bac57a879cbdfe0c7f23eb8a0e&w=826" alt="" />
          </div>

          <div className="giftCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Gift: ₹{summary.gift}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/gift-concept-illustration_114360-698.jpg?t=st=1741933769~exp=1741937369~hmac=6154211283add88a2114b46d532a7e9c3bce5074052e0bdc033e13d18096bba0&w=826" alt="" />
          </div>

          <div className="gLoanCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Loan: ₹{summary.cloan}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/bank-loan-concept-illustration_114360-16751.jpg?t=st=1741934009~exp=1741937609~hmac=7667d27b064722e667af55b63436c554a3220b781dce2901b7b85f28b42fb5d6&w=826" alt="" />
          </div>

          <div className="bonusCard">
          <p id="paraCard"style={{position:"relative",top:"10px",color:"black"}}>Bonus: ₹{summary.bonus}</p>
          <img style={{height:"200px", width:"200px"}}  src="https://img.freepik.com/free-vector/businessman-concept-illustration_114360-1385.jpg?t=st=1741934152~exp=1741937752~hmac=97c54c85725159053e4156c224a4ad77fc2de2ee3fb64801d8f5b0da3baceb8b&w=826" alt="" />
          </div>
        <Row className="mt-3">
          {filterExpenses().length > 0 ? (
            filterExpenses().map((expense) => (
              <Col key={expense._id} md={4} className="mb-4" style={{position:"relative",top:"70px"}}>
                  {/* <Card 
                  style={{ 
                    borderLeft: `5px solid ${expense.type === "Income" ? "green" : "red"}`, 
                    backgroundColor: expense.type === "Income" ? "#ccffcc" : "#ffcccc" 
                  }}
                  className="shadow-sm"
                >

                  <Card.Body className="bodyC">
                  <div className="upper" style={{ borderBottom: "2px solid black", width: "100%", margin: "10px 0" }}>

                  <div className="leftUpper">
                  <div className="H1"> <Card.Title>Category:</Card.Title><Card.Title>{expense.category}</Card.Title></div>
                  <Card.Subtitle className="mb-2 text-muted">{expense.date}</Card.Subtitle>
                  </div>

                    
                    </div>
                    

                  <div className="lower">
                      <div className="leftLower">
                       <div className="leftLowerUpper">  
                         <Card.Title>Description:</Card.Title> <Card.Text id="cardtext">{expense.description}</Card.Text>
                      
                        </div>
                      <div className="leftLowerDown">
                        <p><strong>Status:</strong> {expense.status}</p>
                      </div>
                  </div>
                  <div className="LowerRight">
                    <div className="expen">
                    <h5 className={expense.type === "Income" ? "text-success" : "text-danger"}>
                      ₹{expense.amount}
                    </h5>
                    </div>
                    <div className="meth">{expense.type === "Expense"||"Income" && <p><strong>Payment Method:</strong> {expense.paymentMethod}</p>}</div>
</div>                    
                   </div>
                    
                    
                  </Card.Body>
                </Card> */}
              
              </Col>
            ))   
          ) : (
            <p>No data available</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default ExpTracker;
