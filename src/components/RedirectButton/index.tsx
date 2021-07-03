import { ButtonHTMLAttributes } from 'react';


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  page?: string;
}

export function RedirectButton({ page = '', ...props }: ButtonProps) {
  
  return (
    <button
      className={`selected`}
      {...props}
    >
    </button>
  )
}