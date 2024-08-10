import styles from "../styles/BaseButton.module.css";

interface BaseButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const BaseButton: React.FC<BaseButtonProps> = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className={styles.button}>
            {children}
        </button>
    );
};

export default BaseButton;