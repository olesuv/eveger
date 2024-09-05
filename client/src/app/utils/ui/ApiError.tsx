import { IErrorUI } from '../../types/error';

export default function ApiError(props: IErrorUI) {
  console.error(props.error);

  return (
    <main>
      <h4>Some API error occured</h4>
      <p>
        <h6>{props.error}</h6>
      </p>
    </main>
  );
}
