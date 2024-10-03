import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

const validationSchema = z.object({
    valueSearch: z.string()
                  .min(1, { message: 'Minimum une lettre :o' })
                  .regex(/^(?!.*[0-9_])[\w\s\-]+$/i, 'Nom incorrect')
                  .trim()
});

const SearchBar = ({
    placeholder = '',
    onSearch = () => { } /* NOOP */
}) => {

    const { register, handleSubmit, formState : { errors }, setFocus, reset } = useForm({
        defaultValues: { valueSearch : '' },
        resolver: zodResolver(validationSchema)
    });

    const handleSearchSubmit = (data) => {
        onSearch(data.valueSearch);
        setFocus('valueSearch');
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <input type='text' placeholder={placeholder} 
                {...register('valueSearch')}
                aria-label='Champs de recherche' />
            { errors.valueSearch && (
                <span>{errors.valueSearch.message}</span>
            )}
            <br />
            <button type="submit">Rechercher</button>
        </form>
    );
};

export default SearchBar;