import style from './Spinner.module.css';

const Spinner = () => {

    return (
        <div className={style['lds-ripple']}><div></div><div></div></div>
    );
}

export default Spinner;