import React, { useState, useEffect } from 'react';
import './App.css';

function IssueDetails({ issue }) {
  return (
    <div className="issue-details">
      <h2>{issue.title}</h2>
      <p>
        <strong>ID:</strong> {issue.id}
      </p>
      <p>
        <strong>User:</strong> {issue.user.login}
      </p>
      <p>
        <strong>Labels:</strong> {issue.labels.map((label) => label.name).join(', ')}
      </p>
      <p>
        <strong>Body:</strong> {issue.body}
      </p>
      <a
        href={issue.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="button"
      >
        Open Issue on GitHub
      </a>
    </div>
  );
}

function App() {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch('https://api.github.com/repos/facebook/react/issues');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchIssues();
  }, []);

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Issues</h1>
        <input
          type="text"
          placeholder="Search Issues"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>
      <div className="app-content">
        <div className="issue-list">
          <h2>Issue List</h2>
          <ul>
            {filteredIssues.map((issue) => (
              <li key={issue.id} onClick={() => handleIssueClick(issue)}>
                <strong>ID:</strong> {issue.id}
                <br />
                <strong>Title:</strong> {issue.title}
                <br />
                <strong>User:</strong> {issue.user.login}
              </li>
            ))}
          </ul>
        </div>
        {selectedIssue && (
          <div className="selected-issue">
            <h2>Selected Issue</h2>
            <IssueDetails issue={selectedIssue} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
