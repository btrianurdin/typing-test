import { useDispatch, useSelector } from 'react-redux';
import { TypingState, resetState } from '@/store/slices/typing-slice';
import { RootState } from '@/store';

const TestResult = () => {
  const { result } = useSelector<RootState, TypingState>(
    (state) => state.typing,
  );

  const disptach = useDispatch();

  return (
    <div className="max-w-xs w-full mx-auto mt-5">
      <div className="p-5 shadow-box">
        <h2 className="text-center font-bold">Test Result</h2>
        <div className="flex justify-center items-end mt-6">
          <h1 className="text-5xl">{result.score}</h1>
          <p className="font-semibold">WPM</p>
        </div>
        <div className="flex justify-between mt-6 text-green-700">
          <p>Correct words</p>
          <p>{result.correct}</p>
        </div>
        <div className="flex justify-between mt-3 text-red-700">
          <p>Wrong words</p>
          <p>{result.wrong}</p>
        </div>
      </div>
      <div className="mt-6 flex gap-5">
        <button className="shadow-box-button w-full p-2" disabled>
          Share
        </button>
        <button
          className="shadow-box-button w-full p-2"
          onClick={() => disptach(resetState())}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default TestResult;
