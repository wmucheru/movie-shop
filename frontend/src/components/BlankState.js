export default function BlankState({ message, type='info'}) {
    return (
        <div className={ `alert alert-${type}` }>{ message }</div>
    );
}