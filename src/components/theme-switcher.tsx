import cn from '@/utils/cn';
import useTheme from '@/utils/hooks/use-theme';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-center items-start gap-6">
      <button
        className={cn('text-ts-deep-gray', {
          'text-ts-secondary font-bold': theme === 'light',
        })}
        onClick={() => setTheme('light')}
      >
        Light
      </button>
      <button
        className={cn('text-ts-deep-gray', {
          'text-ts-secondary font-bold': theme === 'dark',
        })}
        onClick={() => setTheme('dark')}
      >
        Dark
      </button>
    </div>
  );
};

export default ThemeSwitcher;
