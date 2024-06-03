"use client";
import { useState } from 'react';
import NameForm from './../components/NameForm';
import styled from "styled-components";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  padding: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  
  /* margin-bottom: 2rem; */
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
`;

const ResultWrapper = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  /* margin-top: 1rem; */
`;

const ResultTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ResultItem = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const CountryList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
`;

const CountryItem = styled.li`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const ShowMoreButton = styled.button`
  background-color: #0070f3;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #005bb5;
  }
`;

export default function Home() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleSubmit = async (name) => {
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/guess?name=${name}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <HomeWrapper>
      <Title>Guess Age, Gender, and Country</Title>
      <InputWrapper>
        <NameForm onSubmit={handleSubmit} />
      </InputWrapper>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <ResultWrapper>
          <ResultTitle>Results</ResultTitle>
          <ResultItem><strong>Name:</strong> {result.ageData.name}</ResultItem>
          <ResultItem><strong>Age:</strong> {result.ageData.age}</ResultItem>
          <ResultItem><strong>Gender:</strong> {result.genderData.gender} (Probability: {(result.genderData.probability * 100).toFixed(2)}%)</ResultItem>
          <ResultTitle>Countries</ResultTitle>
          <CountryList>
            {result.countryData.country.slice(0, showMore ? result.countryData.country.length : 1).map((c, index) => (
              <CountryItem key={index}>{c.country_id} (Probability: {(c.probability * 100).toFixed(2)}%)</CountryItem>
            ))}
          </CountryList>
          {!showMore && result.countryData.country.length > 1 && (
            <ShowMoreButton onClick={() => setShowMore(true)}>Show More Countries</ShowMoreButton>
          )}
        </ResultWrapper>
      )}
    </HomeWrapper>
  );
}
