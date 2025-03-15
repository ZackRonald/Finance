import React, { useState, useEffect} from "react";
import "./Article.css";
import finLogo from "../Pages/finLogo.png";
import { useNavigate } from "react-router-dom";
const Article = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 15;
    const navigate=useNavigate();
    useEffect(() => {
        fetch("https://newsapi.org/v2/everything?q=finance&apiKey=bc900743190a4be892d5138babe978db&pageSize=100")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.articles) {
                    setArticles(data.articles);
                } else {
                    throw new Error("Invalid data format");
                }
            })
            .catch((error) => console.error("Error fetching articles:", error));
    }, []);

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

    // Pagination logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (direction) => {
        setCurrentPage((prevPage) => {
            const newPage = direction === "next" ? prevPage + 1 : prevPage - 1;
            return Math.max(1, Math.min(newPage, Math.ceil(articles.length / articlesPerPage)));
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    let teleport=()=>{
        navigate("/Home")
    }
    return (
        <>
        <nav className="navi">
                <div id="info">
                  <img src={finLogo} alt="Logo" id="logo" />
                  <h2 id="ah2">Fin App</h2>
                </div>
                <div className="opt">
                  <h2 id="ah2" onClick={teleport}>Home</h2>
                </div>
              </nav>
        
         <div className="containers">
              
              <header>
                  <h1>Finance News & Articles</h1>
              </header>
              <section className="articles">
                  {currentArticles.length > 0 ? (
                      currentArticles.map((article, index) => (
                          <div className="article-card" key={index} onClick={() => window.open(article.url, "_blank")}>
                              <img src={article.urlToImage || "placeholder.jpg"} alt={article.title} />
                              <h3>{article.title}</h3>
                              <p>{article.description}</p>
                          </div>
                      ))
                  ) : (
                      <p>No articles available.</p>
                  )}
              </section>
  
              {/* Pagination Controls */}
              <div className="pagination">
                  <button onClick={() => paginate("prev")} disabled={currentPage === 1}>Previous Page</button>
                  <span>Page {currentPage} of {Math.ceil(articles.length / articlesPerPage)}</span>
                  <button onClick={() => paginate("next")} disabled={indexOfLastArticle >= articles.length}>Next Page</button>
              </div>
          </div>
        </>
       
    );
};

export default Article;
