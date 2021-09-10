import React from "react"
import "./FormItem.scss"

export function FormItem({
  onChange,
  name,
  label,
  value,
  type,
  isRequired,
  min,
  max,
  precision,
  step,
  pattern,
  title,
  placeholder,
}) {
  return (
    <div className="FormItem">
      <span className="label">{label}</span>

      {type === "textarea" ? (
        <textarea
          className={`input input-${type}`}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          type={type || "text"}
          value={value}
          placeholder={placeholder || label}
          required={isRequired}
          min={type === "number" && min ? min : null}
          max={type === "number" && max ? max : null}
          precision={type === "number" && precision ? precision : null}
          step={type === "number" && step ? step : null}
        />
      ) : (
        <input
          className={`input input-${type}`}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          type={type || "text"}
          value={value}
          placeholder={placeholder || label}
          required={isRequired}
          min={type === "number" && min ? min : null}
          max={type === "number" && max ? max : null}
          precision={type === "number" && precision ? precision : null}
          step={type === "number" && step ? step : null}
          pattern={pattern || null}
          title={title || null}
        />
      )}
    </div>
  )
}
export function FormItemColumn({
  onChange,
  name,
  label,
  value,
  type,
  isRequired,
  min,
  max,
  precision,
  step,
}) {
  return (
    <div className="FormItem Column">
      <input
        className={`input input-${type}`}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        type={type || "text"}
        value={value}
        placeholder={label}
        required={isRequired}
        min={type === "number" && min ? min : null}
        max={type === "number" && max ? max : null}
        precision={type === "number" && precision ? precision : null}
        step={type === "number" && step ? step : null}
      />
    </div>
  )
}
