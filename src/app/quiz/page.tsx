"use client"

import React, { useState, useEffect } from 'react';
import styles from './Quiz.module.css';
import toast, { Toaster } from 'react-hot-toast';
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizEnded, setQuizEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const loadingToast = toast.loading('Loading questions...');
      try {
        const response = await fetch('/api/quiz/start');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setQuestions(data.data);
          toast.success('Questions loaded successfully', { id: loadingToast });
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        toast.error('Failed to load questions', { id: loadingToast });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !quizEnded && !isLoading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizEnded && !isLoading) {
      handleNext();
    }
  }, [timeLeft, quizEnded, isLoading]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = optionIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(30);
      toast.success("Answer Submitted");
    } else {
      toast.success("Quiz Ended");
      setQuizEnded(true);
      const submitQuiz = async () => {
        try {
          const response = await fetch('/api/quiz/end', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              score,
              totalQuestions: questions.length,
              questions: questions.map(q => ({ id: q.id, text: q.text, correctAnswer: q.correctAnswer })),
              userAnswers
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to submit quiz');
          }
          const data = await response.json();
          if (data.success) {
            toast.success('Quiz submitted successfully');
          } else {
            throw new Error('Failed to submit quiz');
          }
        } catch (error) {
          console.error('Error submitting quiz:', error);
          toast.error('Failed to submit quiz');
        }
      };
      submitQuiz();
    }
  };

  if (isLoading) {
    return (
      <div className={styles.app_quiz}>
        <div className={styles.main_body}>
          <div className={styles.container}>
            <h2>Loading Quiz...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (quizEnded) {
    return (
          <div className={styles.app_quiz}>
          <div className={styles.main_body}>
            <div className={styles.container}>
              <div className={styles.container_header}>
                <h2>Your Score</h2>
              </div>
              <div className={styles.container}>
                <h2>Quiz Ended</h2>
                <p className={styles.final_score}>Your score: {score} out of {questions.length}</p>
              </div>
              <div className={styles.footer}>
                <button
                  className={styles.nextButton}
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedOption(null);
                    setScore(0);
                    setQuizEnded(false);
                  }}
                >
                  Restart Test
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={styles.app_quiz}>
        <div className={styles.main_body}>
          <div className={styles.container}>
            <h2>Error: No questions available</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app_quiz}>
      <div className={styles.main_body}>
        <div className={styles.container}>
          <div className={styles.container_header}>
            <h2>Question {currentQuestion + 1}</h2>
          </div>
          <p>{questions[currentQuestion].text}</p>
          <ul className={styles.optionsList}>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button
                  className={`${styles.optionButton} ${selectedOption === index ? styles.selected : ''}`}
                  onClick={() => handleOptionSelect(index)}
                  // Remove the 'disabled' attribute to allow changing the answer
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <p>Time left: {timeLeft} seconds</p>
            <button
              className={styles.nextButton}
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}
