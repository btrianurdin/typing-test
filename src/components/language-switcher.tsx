import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { TypingLanguage, updateLanguage } from '@/store/slices/typing-slice';
import cn from '@/utils/cn';

const LanguageSwitcher = () => {
  const language = useSelector<RootState, TypingLanguage>(
    (state) => state.typing.language,
  );
  const dispatch = useDispatch();

  return (
    <div className="text-ts-secondary">
      <p className="text-ts-deep-gray mb-2">Language</p>
      <div className="flex gap-4">
        <button
          className={cn('text-ts-deep-gray', {
            'text-ts-secondary font-bold': language === 'EN',
          })}
          onClick={() => dispatch(updateLanguage('EN'))}
        >
          English
        </button>
        <button
          className={cn('text-ts-deep-gray', {
            'text-ts-secondary font-bold': language === 'ID',
          })}
          onClick={() => dispatch(updateLanguage('ID'))}
        >
          Indonesia
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
