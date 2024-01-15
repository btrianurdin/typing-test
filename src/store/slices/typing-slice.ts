import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit/react';

export type TypingState = {
  wordLists: string[];
  currentWord: string;
  currentWordIndex: number;
  currentWordChar: string;
  currentWordCharIndex: number;
  extraWords: string[];
  extraWordsIndex: number;
  time: number;
  typingState: 'ready' | 'typing' | 'end';
  result: {
    score: number;
    correct: number;
    wrong: number;
  };
};

const initialState: TypingState = {
  wordLists: [],
  currentWord: '',
  currentWordIndex: 0,
  currentWordChar: '',
  currentWordCharIndex: 0,
  extraWords: [],
  extraWordsIndex: 0,
  time: 60,
  typingState: 'ready',
  result: {
    score: 0,
    correct: 0,
    wrong: 0,
  },
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    resetState: (state) => {
      if (state.typingState === 'ready') return;
      state.wordLists = [];
      state.currentWord = '';
      state.currentWordIndex = 0;
      state.currentWordChar = '';
      state.currentWordCharIndex = 0;
      state.extraWords = [];
      state.extraWordsIndex = 0;
      state.time = initialState.time;
      state.typingState = initialState.typingState;
      state.result = initialState.result;
    },
    addWordList: (state, action: PayloadAction<string[]>) => {
      state.wordLists = action.payload;
      state.currentWord = action.payload[0];
      state.currentWordChar = action.payload[0][0];
      state.currentWordIndex = 0;
    },
    removeChar: (state) => {
      if (state.typingState === 'end') return;
      if (state.currentWordCharIndex === 0) return;

      if (state.extraWords[state.currentWordIndex]?.length) {
        state.extraWords[state.currentWordIndex] = state.extraWords[
          state.currentWordIndex
        ]?.slice(0, -1);
        return;
      }

      state.currentWordCharIndex--;
      state.currentWordChar = state.currentWord[state.currentWordCharIndex];

      if (document) {
        const chars = document.querySelector(
          `[data-word-order="${state.currentWordIndex}"]`,
        );

        chars?.children[state.currentWordCharIndex].classList.remove(
          'c-correct',
          'c-wrong',
        );
      }
    },
    updateNextChar: (state, action: PayloadAction<string>) => {
      if (state.typingState === 'end') return;

      if (state.typingState === 'ready') {
        state.typingState = 'typing';
      }

      // if (state.currentWordCharIndex === state.currentWord.length) return;

      if (state.currentWordCharIndex > state.currentWord.length - 1) {
        if (state.extraWords[state.currentWordIndex]) {
          state.extraWords[state.currentWordIndex] += action.payload;
        } else {
          state.extraWords[state.currentWordIndex] = action.payload;
        }
        return;
      }

      if (document) {
        const chars = document.querySelector(
          `[data-word-order="${state.currentWordIndex}"]`,
        );

        chars?.children[state.currentWordCharIndex].classList.add(
          state.currentWordChar === action.payload ? 'c-correct' : 'c-wrong',
        );
      }

      state.currentWordCharIndex++;
      state.currentWordChar = state.currentWord[state.currentWordCharIndex];
    },
    updateNextWord: (state) => {
      if (state.typingState === 'end') return;
      if (document) {
        const word = document.querySelector(
          `[data-word-order="${state.currentWordIndex}"]`,
        );
        let allCorrect = true;

        if (word?.children) {
          for (let i = 0; i < word?.children.length; i++) {
            if (!word?.children[i].classList.contains('c-correct')) {
              allCorrect = false;
              break;
            }
          }
        }

        word?.setAttribute(allCorrect ? 'data-correct' : 'data-wrong', '');

        word?.nextElementSibling?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }

      state.currentWordIndex++;
      state.currentWord = state.wordLists[state.currentWordIndex];

      state.currentWordCharIndex = 0;
      state.currentWordChar = state.currentWord[state.currentWordCharIndex];
    },
    updateTypingState: (
      state,
      action: PayloadAction<'ready' | 'typing' | 'end'>,
    ) => {
      state.typingState = action.payload;

      if (action.payload === 'end') {
        const wordCorrect = document.querySelectorAll(
          '.word-lists [data-correct]',
        );
        const wordWrong = document.querySelectorAll('.word-lists [data-wrong]');

        state.result = {
          score: wordCorrect.length,
          correct: wordCorrect.length || 0,
          wrong: wordWrong.length || 0,
        };
      }
    },
  },
});

export const {
  addWordList,
  updateNextWord,
  updateNextChar,
  removeChar,
  resetState,
  updateTypingState,
} = typingSlice.actions;

export default typingSlice.reducer;
