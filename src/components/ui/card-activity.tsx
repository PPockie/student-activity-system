export interface CardActivityProps {
    title: string;
    description: string;
    style?: React.CSSProperties;
}

function CardActivity({ title, description, style }: CardActivityProps) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '8px', borderRadius: '8px', ...style }}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default CardActivity;