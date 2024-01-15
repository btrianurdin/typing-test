import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TypingState,
  addWordList,
  removeChar,
  resetState,
  updateNextChar,
  updateNextWord,
} from './store/slices/typing-slice';
import { RootState } from './store';
import cn from './utils/cn';
import { TypingTimeMemo } from './components/typing-time';
import TestResult from './components/test-result';
import CreditFooter from './components/credit-footer';
import ThemeSwitcher from './components/theme-switcher';

function App() {
  const dispatch = useDispatch();
  const { wordLists, currentWordIndex, typingState, extraWords } = useSelector<
    RootState,
    TypingState
  >((state) => state.typing);

  const fetchWordLists = useCallback(() => {
    import('@/data/word-lists.json').then((data) => {
      const words = data.default[
        Math.floor(Math.random() * data.default.length)
      ] as unknown as string[];
      const randomWords = [...words].sort(() => Math.random() - 0.5);

      dispatch(addWordList(randomWords));
    });
  }, [dispatch]);

  useEffect(() => {
    if (typingState === 'ready') {
      fetchWordLists();
    }
  }, [fetchWordLists, typingState]);

  const handleTypingStart = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(resetState());
      } else if (e.key === ' ') {
        dispatch(updateNextWord());
      } else if (e.key === 'Backspace') {
        dispatch(removeChar());
      } else {
        if (e.key.length === 1) {
          dispatch(updateNextChar(e.key));
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleTypingStart);

    return () => {
      window.removeEventListener('keydown', handleTypingStart);
    };
  }, [handleTypingStart]);

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col justify-between h-screen p-6 gap-10">
      <ThemeSwitcherMemo />

      <div>
        <div className="flex justify-between items-center text-ts-secondary">
          <h1 className="text-2xl font-bold mb-6">Typing Test</h1>
          {typingState !== 'end' && <TypingTimeMemo />}
        </div>
        {typingState === 'end' ? (
          <TestResult />
        ) : (
          <div className="h-[140px] overflow-hidden">
            <div className="word-lists">
              {wordLists.map((word, idx) => {
                return (
                  <div
                    key={`word${idx}`}
                    data-word-order={idx}
                    className={cn('word', {
                      highlight: idx === currentWordIndex,
                    })}
                  >
                    {word.split('').map((char, idx) => (
                      <span key={`char${idx}${word}`}>{char}</span>
                    ))}
                    {extraWords[idx]?.split('').map((char, idx) => (
                      <span key={`extra-char${idx}${word}`} className="c-wrong">
                        {char}
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <CreditFooterMemo />
    </div>
  );
}

const CreditFooterMemo = memo(CreditFooter);
const ThemeSwitcherMemo = memo(ThemeSwitcher);

export default App;
