import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import finLogo from "../Pages/finLogo.png";
import debt from "../Pages/debt.png";
import tax from "../Pages/tax.png";
import retri from "../Pages/retriment.png";
import invest from "../Pages/invest.png";
import finac from "../Pages/fina.png";
import "./Support.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"; 
import { faPhone } from "@fortawesome/free-solid-svg-icons"; 
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";


function Support() {
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
                    <h2>Fin App</h2>
                </div>
                <div className="opt">
                    <h2 style={{cursor:"pointer"}} onClick={teleport}>Home</h2>
                </div>
            </nav>
            <h1 id='provide'>What are the services we provide?</h1>
            <div className="news">
                <div className="slider">
                <div className="service" id='service1'>
                <div className="infor">
                            <h1>Finance Guiding Experts</h1>
                            <p>Our expert financial advisors provide personalized guidance to help users manage their income, expenses, and savings. Whether you're struggling with budgeting or planning for the future, our specialists offer tailored solutions to improve your financial well-being. Get one-on-one consultations, expert insights, and real-time financial tracking to make informed money decisions.</p>
                        </div>
                        <div className="img">
                            <img src={finac} alt="" id='imgS' />
                        </div>
                    </div>
                    <div className="service" id='service2'>

                        <div className="infor">
                            <h1>Investment Advisory Services</h1>
                            <p>We help users navigate the complex world of investments with professional advice on stocks, mutual funds, real estate, and more. Our experts analyze market trends and risk factors to provide smart investment strategies. Whether you’re a beginner or an experienced investor, we ensure you maximize returns while minimizing risks.</p>
                        </div>
                        <div className="img">
                            <img src={invest} alt="" id='imgS' />
                        </div>
                    </div>
                    <div className="service" id='service3'>
                        <div className="infor">
                            <h1>Debt Management & Credit Counseling</h1>
                            <p>Struggling with loans and credit card debt? Our debt management service offers strategic plans to help users reduce debt efficiently. We provide insights into credit score improvement, loan restructuring, and responsible borrowing habits. Our goal is to make debt repayment stress-free and financially sound.</p>
                        </div>
                        <div className="img">
                            <img src={debt} alt="" id='imgSS' />
                        </div>
                    </div>
                    <div className="service" id='service4'>
                        <div className="infor">
                            <h1>Retirement & Wealth Planning</h1>
                            <p>Plan for a secure future with our retirement and wealth planning services. We assist users in setting realistic financial goals, selecting the right pension plans, and ensuring a steady post-retirement income. Our experts create customized plans based on current income, expected expenses, and long-term aspirations.</p>
                        </div>
                        <div className="img">
                            <img src={retri} alt="" id='imgS' />
                        </div>
                    </div>
                    <div className="service" id='service5'>
                        <div className="infor">
                            <h1>Tax Planning & Optimization</h1>
                            <p>Managing taxes can be overwhelming, but we simplify the process with expert tax planning strategies. Our service helps users identify deductions, optimize tax savings, and stay compliant with tax regulations. We guide individuals and businesses in maximizing refunds and minimizing liabilities efficiently.</p>
                        </div>
                        <div className="img">
                            <img src={tax} alt="" id='imgS' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="faq">
                <h1 id='faqh'>User asked frequently asked questions</h1>
            <div className="accordion accordion-flush" id="accordionFlushExample">
    <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            What financial services do you offer?
            </button>
        </h2>
        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">We provide financial guidance, investment advisory, debt management, retirement planning, and tax optimization to help you manage your finances effectively.

</div>
        </div>
    </div>
    
    <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            How can I start using your financial services?
            </button>
        </h2>
        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">You can explore our services on the website and book a consultation with our financial experts to get personalized assistance.</div>
        </div>
    </div>

    <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            Is there a fee for financial consultations?
            </button>
        </h2>
        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">Some of our basic consultations are free, while advanced financial planning may have a service charge. Contact us for detailed pricing information.</div>
        </div>
    </div>

    <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingFour">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
            Is my personal and financial data secure on your website?
            </button>
        </h2>
        <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">Yes! We implement advanced encryption and security protocols to ensure your data remains confidential and protected.</div>
        </div>
    </div>

    <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingFive">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
            Can I access your services on mobile devices?
            </button>
        </h2>
        <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">Yes, our website is mobile-friendly, and we are working on a mobile app for an even better user experience.

            </div>
        </div>
    </div>

    <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingSix">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                Do I need to create an account to access the services?
            </button>
        </h2>
        <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">While some resources are available without an account, creating an account allows you to access personalized financial advice, track your progress, and receive tailored recommendations.</div>
        </div>
    </div>

</div>

            </div>
<div className="contact">
    
<h1 id='contact'>Our Contact</h1>
            <div className="contactDetails">
    <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
        <FontAwesomeIcon icon={faPhone} style={{ color: "#229954" }}  id='icon'/>

            <h5 className="card-title">Phone Number</h5>
           
            <p className="card-text">
              +91 99404 483424
            </p>
        </div>
    </div>
    <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
        <FontAwesomeIcon icon={faEnvelope} style={{ color:  "#229954" }}  id='icon' />

            <h5 className="card-title">Email</h5>
           
            <p className="card-text">
              finapp@gamil.com
            </p>
        </div>
    </div>
    <div className="cards" style={{ width: "18rem" }}>
        <div className="card-body">
        <FontAwesomeIcon icon={faLocationDot} style={{ color: "#229954" }} id='icon' />

            <h5 className="card-title">Address</h5>
           
            <p className="card-text">
            123 Finance Street, Suite 456
Greenwood Business Park
Springfield, XY 56789
            </p>
        </div>
    </div>
</div>

</div>

<div className="form">
  <div className="appoint">
  <h1 id='appo'>Book your appointment here</h1>
        <form id='form' action="">
            <input id='inp' type="text" placeholder='Enter your name' />
            <input  id='inp' type="text" placeholder='Enter your email' />
            <input  id='inp' type="tel" placeholder='Enter your phone number' />
            <input  id='inp' type="text" placeholder='Enter your purpose' />
            <button>Submit</button>
        </form>
  </div>

       <div className="feedback"> <h1 id='feed'>Leave your feedback here</h1>
    <form id='form' action="">
            <input id='inp' type="text" placeholder='Enter your name' />
            <input  id='inp' type="text" placeholder='Enter your email' />
            <input  id='inp' type="tel" placeholder='Enter your phone number' />
            <input  id='inp' type="text" placeholder='Enter your purpose' />
            <button>Submit</button>
        </form></div>
</div>


   
    

        </>
    );
}

export default Support;