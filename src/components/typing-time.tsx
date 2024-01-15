import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { TypingState, updateTypingState } from '@/store/slices/typing-slice';

const TypingTime = () => {
  const dispatch = useDispatch();
  const { time, typingState } = useSelector<RootState, TypingState>(
    (state) => state.typing,
  );
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    if (typingState === 'ready') setCurrentTime(time);
  }, [time, typingState]);

  useEffect(() => {
    if (typingState === 'typing') {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev === 0) return 0;
          return prev! - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [dispatch, typingState]);

  useEffect(() => {
    if (currentTime === 0) {
      dispatch(updateTypingState('end'));
    }
  }, [currentTime, dispatch]);

  return <div className="text-2xl font-bold">{currentTime}</div>;
};

export const TypingTimeMemo = memo(TypingTime);

export default TypingTime;
