import * as React from 'react'
import cn from 'clsx'
import styles from './styles.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {

};

const Container = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState('');

//     function handleBlur(e: React.FocusEvent<HTMLInputElement>): void {
//       // adjust firefox behavior... when input's type is number, firefox doesn't dispatch change event but
//       // fill the field with new value, to fix that, we clear input when value is not a number
//       if (type === 'number' && !e.target.validity.valid) {
//         e.target.value = '';
//         setInternalValue('');
//       }

//       onBlur && onBlur(e);
//     }

//     function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
//       // adjust input type number behavior... when input type is number, maxlength doesn't work, to fix that,
//       // we trunc any value on input change to maxlength declared in input
//       if (maxLength && e.target.value && maxLength < e.target.value.length) {
//         e.target.value = String(e.target.value).substring(maxLength, 0);
//       }

//       setInternalValue(e.target.value);

//       onChange && onChange(e);
//     }


//     return (
//       <div
//         className={cn(className, styles['hapnak-input'], styles[`-${type}`], {
//           [styles['-invalid']]: !!errorMessage && !disabled,
//           [styles['-disabled']]: disabled,
//           [styles['-readonly']]: readOnly,
//         })}
//       >
//         <input
//           id={`${name}-input`}
//           ref={ref}
//           name={name}
//           type={type}
//           value={value !== undefined ? value : internalValue}
//           onBlur={handleBlur}
//           onChange={handleChange}
//           required={required}
//           disabled={disabled}
//           readOnly={readOnly}
//           minLength={maxLength ? 0 : undefined}
//           maxLength={maxLength}
//           className={cn(styles['input'], {
//             [styles['-filled']]:
//               !!(value !== undefined ? value : internalValue) ||
//               (type === 'number' && value === 0),
//               [styles['-small']]: scale === 'small',
//               [styles['-medium']]: scale === 'medium',
//               [styles['-large']]: scale === 'large',
//               [styles['']]: scale === 'none',
//           })}
//           tabIndex={disabled || readOnly ? -1 : 0}
//           data-input=""
//           autoComplete="off"
//           aria-invalid={errorMessage && !disabled ? 'true' : 'false'}
//           aria-readonly={readOnly ? 'true' : 'false'}
//           aria-disabled={disabled ? 'true' : 'false'}
//           aria-required={required ? 'true' : 'false'}
//           aria-labelledby={`${name}-input-label`}
//           aria-errormessage={`${name}-input-error`}
//           {...props}
//         />

//         <label
//           id={`${name}-input-label`}
//           htmlFor={`${name}-input`}
//           className={styles['label']}
//           data-label=""
//         >
//           {label} {!required && !disabled && '(Opcional)'}
//         </label>

//         {icon &&
//           <img src={Search} className={styles["icon"]} />
//         }
//       </div>
//     );
    return <button>BUTTON</button>
  }
);

Container.defaultProps = {
  type: 'button',
};

export default Container;