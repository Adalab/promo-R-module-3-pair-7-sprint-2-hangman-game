import '../styles/components/Letters.scss';

function ErrorLetters(props) {
  <div className="error">
    <h2 className="title">Letras falladas:</h2>
    <ul className="letters">{props.render}</ul>
  </div>;
}

export default ErrorLetters;
