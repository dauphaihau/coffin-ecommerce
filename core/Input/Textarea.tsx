import {FieldErrors} from "react-hook-form";

interface TextareaProps {
  name: string,
  classes?: string,
  label?: string,
  register?: (name: string) => void,
  placeholder?: string,
  classNameLabel?: string,
  errors?: FieldErrors,
  type?: string,
  rows?: number,
}

const Textarea = (props: TextareaProps) => {

  const {
    label, name,
    classes = '',
    type = 'text',
    classNameLabel = '',
    placeholder = '',
    register, errors,
    rows = 3,
    ...others
  } = props;

  return (
    <div className={`form-textarea-input ${classes}`}>
      {label && <label className={classNameLabel}>{label}</label>}
      <textarea
        {...others} placeholder={placeholder} rows={rows}
        {...register(name)}
      />
      {errors && <p className="text-red-500 text-[0.9rem] mt-2">{errors[name]?.message}</p>}
    </div>
  );
}

export default Textarea;
