export default function Alert({ text, type='info'}) {
    return (
        <div className={ `alert alert-${type}` }>{ text }</div>
    );
}