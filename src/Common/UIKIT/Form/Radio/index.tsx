import React, { useState } from 'react';

interface Props {
  id: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type ComputeStrokeColor = (
  disabled: boolean | undefined,
  checked: boolean,
  hover: boolean
) => string;

const computeStrokeColor: ComputeStrokeColor = (disabled, checked, hover) => {
  if (disabled) return checked ? '#57c8f1' : 'grey';

  return checked || hover ? '#57c8f1' : 'grey';
};

type ComputeOpacity = (
  disabled: boolean | undefined,
  hover: boolean,
  trigerChange: boolean
) => number;

const computeOpacity: ComputeOpacity = (disabled, hover, trigerChange) => {
  if (disabled) return 0.5;

  return hover && trigerChange ? 0.7 : 1;
};

const Radio = ({
  checked, disabled, onChange, value, id, name,
}: Props) => {
  const [hover, setHover] = useState(false);

  const fillColor = checked ? '#57c8f1' : 'grey';
  const strokeColor = computeStrokeColor(disabled, checked, hover);

  const trigerChange = !checked && !disabled;

  return (
    <div
      role="button"
      tabIndex={0}
      style={{ outline: 'none', position: 'relative', cursor: disabled ? 'auto' : 'pointer' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <svg
        version="1.1"
        baseProfile="full"
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        style={{
          position: 'absolute',
          opacity: computeOpacity(disabled, hover, trigerChange),
        }}
      >
        <circle cx={10} cy={10} r={8} strokeWidth={2} stroke={strokeColor} fill="#0000" />
        {checked && <circle cx={10} cy={10} r={4} fill={fillColor} />}
      </svg>
      <input
        style={{
          width: 20, height: 20, position: 'absolute', opacity: 0,
        }}
        type="radio"
        id={id}
        name={name}
        checked={checked}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Radio;
