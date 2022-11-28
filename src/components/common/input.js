import { Input as I } from 'antd';

const Input = (props) => {
  const { label, id, ...opts } = props;

  return (
    <div className="py-1">
      {!!label && <label htmlFor={id}>{label}</label>}
      <I id={id} name={id} placeholder={label} {...opts} />
    </div>
  );
};

export default Input;
