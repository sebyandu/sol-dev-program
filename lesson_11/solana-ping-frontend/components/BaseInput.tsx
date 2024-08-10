import  styles from "../styles/BaseInput.module.css";

interface BaseInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaseInput: React.FC<BaseInputProps> = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={styles.baseInput}
        />
    );
};

export default BaseInput;