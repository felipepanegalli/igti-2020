import React, { Component, useEffect } from 'react';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Candidates from './components/Candidates';
import { useState } from 'react';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [previousVotes, setPreviousVotes] = useState([]);
  const [previousPercentages, setPreviousPercentages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8080/votes')
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const localPreviousVotes = candidates.map(({ id, votes }) => {
            return { id, votes };
          });
          const localPreviousPercentages = candidates.map(
            ({ id, percentage }) => {
              return { id, percentage };
            }
          );
          setCandidates(json.candidates);
          setPreviousVotes(localPreviousVotes);
          setPreviousPercentages(localPreviousPercentages);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [candidates]);

  if (candidates.length === 0) {
    return <Spinner text="Carregando..." size="small" />;
  }

  return (
    <div className="container">
      <Header>Votação</Header>
      <Candidates
        previousVotes={previousVotes}
        previousPercentages={previousPercentages}
        candidates={candidates}
      />
    </div>
  );
}
