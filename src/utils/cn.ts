import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: classNames.ArgumentArray): string => {
  return twMerge(classNames(inputs));
};

export default cn;
