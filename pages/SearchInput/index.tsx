import { Input } from '@mui/material'
import styles from './style.module.scss'
const SearchInput = (props:any) => {
    function handleChange(event: any) {
        props.onChange(event.target.value)
    }
    return (
        <div className={styles.input}>
        <input type="text" value={props.value} onChange={handleChange} placeholder='Nome do Cliente'/>
        </div>
    )
}
export default SearchInput