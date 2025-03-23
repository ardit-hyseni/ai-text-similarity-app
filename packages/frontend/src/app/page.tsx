"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface ComparisonHistory {
  id: string;
  firstText: string;
  secondText: string;
  similarity: number;
  timestamp: string;
}

export default function Home() {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [history, setHistory] = useState<ComparisonHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch comparison history from backend
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/comparison-history");
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      } else {
        console.error("Failed to fetch history");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstText.trim() || !secondText.trim()) {
      alert("Please enter text in both fields");
      return;
    }

    setIsLoading(true);
    setSimilarity(null);

    try {
      const response = await fetch("http://localhost:5000/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstText, secondText }),
      });

      if (response.ok) {
        const data = await response.json();
        setSimilarity(data.similarity);

        // Refresh history after successful comparison
        fetchHistory();
      } else {
        console.error("Failed to calculate similarity");
      }
    } catch (error) {
      console.error("Error calculating similarity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Text Similarity Comparison</h1>

      <div className={styles.container}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstText">First Text:</label>
              <textarea
                id="firstText"
                value={firstText}
                onChange={(e) => setFirstText(e.target.value)}
                className={styles.textArea}
                placeholder="Enter first text..."
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="secondText">Second Text:</label>
              <textarea
                id="secondText"
                value={secondText}
                onChange={(e) => setSecondText(e.target.value)}
                className={styles.textArea}
                placeholder="Enter second text..."
                required
              />
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ?
                <>
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status">Calculating...</span>
                </>
                : "Calculate Similarity"}
            </button>

            {similarity !== null && (
              <div className={styles.result}>
                <h3>Similarity Score:</h3>
                <div className={styles.score}>{(similarity * 100).toFixed(2)}%</div>
              </div>
            )}
          </form>
        </div>

        <div className={styles.historySection}>
          <h2>Comparison History</h2>
          {history.length === 0 ? (
            <p>No comparison history available</p>
          ) : (
            <div className={styles.historyList}>
              {history.map((item) => (
                <div key={item.id} className={styles.historyItem}>
                  <div className={styles.historyTexts}>
                    <p><strong>Text 1:</strong> {item.firstText.length > 50 ? `${item.firstText.substring(0, 50)}...` : item.firstText}</p>
                    <p><strong>Text 2:</strong> {item.secondText.length > 50 ? `${item.secondText.substring(0, 50)}...` : item.secondText}</p>
                  </div>
                  <div className={styles.historyScore}>
                    <p><strong>Similarity:</strong> {(item.similarity * 100).toFixed(2)}%</p>
                    <p className={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
