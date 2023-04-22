import { Person } from '../../App';
import Styles from './Card.module.css';

type CardProps = {
  person: Person
}

export const Card = ({person}: CardProps) => {
  return <div className={Styles.container}>
    <p><b>Имя:</b> {person.name}</p>
    <p><b>Цвет глаз:</b> {person.eye_color}</p>
    <p><b>Рост:</b> {person.height}</p>
  </div>
}