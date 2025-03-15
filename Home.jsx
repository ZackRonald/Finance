import React from "react";
import "./Home.css";
import finLogo from "../Pages/finLogo.png";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
function Home() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  function teleport(loc) {
    if(loc==="EM"){
      navigate("/EM");
    }
    if(loc==="ET"){
      navigate("/ET")
    }
    if(loc==="Article"){
      navigate("/Article")
    }

    if(loc==="Support"){
      navigate("/Support")
    }
  }
  async function handleLogout() {
    try {
      await fetch("http://localhost:3010/logout", {
        method: "POST",
        credentials: "include", 
      });
  
     
      localStorage.clear();
      sessionStorage.clear();
  
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  
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

   const [isVisible, setIsVisible] = useState(false);
       const [close,setClose]=useState(true);
       const show = () => {
         setIsVisible(!isVisible);
       };

  return (
    <>
      <div className="navbar">
        <div id="info">
          <img src={finLogo} alt="Logo" id="logo" />
          <h2>Fin App</h2>
        </div>

        <div className="feat">
        <h3 onClick={() => teleport("EM")}>Expense Manager</h3>
        <h3 onClick={()=>teleport("ET")}>Expense Tracker</h3>
          <h3 onClick={()=>teleport("Article")}>Article</h3>
          <h3 onClick={()=>teleport("Support")}>Help & Support</h3>

        
        </div>

        <button id="logoutBtn" onClick={handleLogout}>Logout</button>
        <button className="menu-toggle" onClick={show}> ☰</button>
      </div>
      
      <div className="sideBar" style={{ display: isVisible ? "flex" : "none" }}>
   
            <h1 id="close" onClick={show}>X</h1>
            <h3 onClick={() => teleport("EM")}>Expense Manager</h3>
        <h3 onClick={()=>teleport("ET")}>Expense Tracker</h3>
          <h3 onClick={()=>teleport("Article")}>Article</h3>
          <h3 onClick={()=>teleport("Support")}>Help & Support</h3>
       
    
        <button className="logBtnSideBar">
         Logout</button>
    </div>
    <div className="body">
        <div className="Box1">
            <div className="Boxleft">
                <h1>Welcome </h1>
<p id="para">Welcome to the Smart Expense Tracker, your ultimate tool for managing finances and staying on top of your spending. Whether you're tracking day-to-day expenses or working towards a savings goal, our user-friendly platform helps you take control of your financial journey. With the Expense Management Page, you can easily add, update, or delete expenses as they occur, while the Expense Display & Filter Page lets you view and categorize your expenses on a daily, weekly, or monthly basis for better clarity. Set and track your financial goals with the Saving Plan Page, and get expert guidance on saving through our Contact Us Page. With detailed analytics and an intuitive interface, the Smart Expense Tracker empowers you to make smarter financial decisions, stay within budget, and plan for a more secure financial future. Start managing your expenses today and take the first step toward financial freedom!</p>
     </div>
            <div className="Boxright">
                <img src="https://files.oaiusercontent.com/file-T8KTngPXXndA3jbRK8FZdx?se=2025-03-10T09%3A40%3A48Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D71716240-d3c9-4c36-b385-2c8a2f2238a7.webp&sig=Ay7Kd86L/1N%2BwUPTy5vWLkYL4tefBBEioGockeFRZUQ%3D" alt="" id="imgHome"/>
            </div>
        </div>

        <div className="box2">
            <h2>Expense Manger</h2>
            <p id="para">The Expense Manager is a core feature that allows users to efficiently manage their financial transactions by adding, updating, and deleting expenses with ease. This feature ensures that users have complete control over their spending records, making expense tracking simple and hassle-free.
With the Expense Manager, users can quickly log new expenses by entering essential details such as the amount, category, and date. If there are any changes or corrections needed, users can easily update existing entries to maintain accurate financial records. Additionally, unwanted or incorrect expenses can be deleted, ensuring that the expense list remains clean and organized</p>
        <button id="naviBtn" onClick={() => teleport("EM")}>Expense Manger</button>
        </div>
        <div className="box3">
            <h2>Expense Tracker</h2>
            <p id="para">The Expense Tracker is a vital feature that helps users monitor their spending habits by displaying all recorded expenses in an organized manner. It provides a clear overview of where money is being spent, allowing users to track their daily, weekly, and monthly expenses with ease.
With built-in filtering options, users can sort expenses by category, date, or amount, making it simple to analyze spending patterns. This feature helps users stay financially aware and make informed decisions to manage their budget effectively. By keeping a detailed record of expenses, the Expense Tracker ensures better financial planning and control.</p>
<button id="naviBtn" onClick={() => teleport("ET")}>Expense Tracker</button>
        </div>
        <div className="box4">
            <h2>Article</h2>
            <p id="para">Our Article feature is designed to provide users with insightful, informative, and engaging content on various financial topics. Whether you’re looking for expert advice on investment strategies, debt management, retirement planning, or tax optimization, our articles serve as a valuable resource to enhance your financial knowledge.
Each article is carefully curated by industry experts and financial professionals to ensure accuracy and relevance. We cover a wide range of topics, from beginner-friendly guides to advanced financial strategies, helping users make informed decisions.
Our platform offers an intuitive reading experience with a clean, distraction-free interface, making it easy to absorb complex financial concepts. Users can also bookmark articles for future reference and share them with their network.
</p>
<button id="naviBtn" onClick={() => teleport("Article")}>Article</button>
        </div>
        <div className="box5">
            <h2>Contact & Support</h2>
            <p id="para">The Help & Support feature is designed to assist users with any questions or issues they may face while using the application. Whether users need guidance on managing their expenses, setting up budgets, or troubleshooting technical problems, this section provides the necessary support to ensure a smooth experience.
Users can find FAQs, tutorials, and step-by-step guides to help them navigate the app effectively. Additionally, they can reach out to customer support through email, chat, or a support ticket system for personalized assistance.
With Help & Support, users can confidently manage their finances, knowing that expert assistance is always available whenever needed.</p>
<button id="naviBtn" onClick={() => teleport("Support")}>Contact & Support</button>
        </div>
    </div>
   </>
  );
}

export default Home;
