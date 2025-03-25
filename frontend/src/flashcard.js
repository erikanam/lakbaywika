import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  font-family: Arial, sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 60px;
`;

const Instructions = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 15px;
`;

const FlashcardWrapper = styled.div`
  perspective: 1000px;
`;

const Flashcard = styled.div`
  width: 400px;
  height: 280px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "none")};
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 22px;
  font-weight: bold;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
`;

const Front = styled(CardSide)`
  background-color: #3498db;
  color: white;
`;

const Back = styled(CardSide)`
  background-color: #2ecc71;
  color: white;
  transform: rotateY(180deg);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const FlashcardApp = () => {
  const flashcards = [
    { word: "Good Morning", translation: "Magandang Umaga" },
    { word: "Thank You", translation: "Salamat" },
    { word: "How are you?", translation: "Kumusta?" },
    { word: "Goodbye", translation: "Paalam" },
    { word: "Yes", translation: "Oo" },
    { word: "No", translation: "Hindi" },
    { word: "You", translation: "Ikaw" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  return (
    <Container>
      <Title>Mga Pangunahing Parirala sa Tagalog</Title>
      <Instructions>I-click ang flashcard para ipakita ang sagot.</Instructions>
      <FlashcardWrapper>
        <Flashcard flipped={flipped} onClick={() => setFlipped(!flipped)}>
          <Front>{flashcards[currentIndex].word}</Front>
          <Back>{flashcards[currentIndex].translation}</Back>
        </Flashcard>
      </FlashcardWrapper>
      <Button onClick={nextCard}>Susunod</Button>
    </Container>
  );
};

export default FlashcardApp;
