import { useEffect, useMemo, useState } from 'react';


export const useForm = ( initialValues = {}, formValidations = {} ) => {

    const [ formState, setFormState ] = useState( initialValues );
    const [ formChecks, setFormChecks ] = useState( {} );

    useEffect( () => {
        createValidators();
    }, [ formState ] );

    useEffect( () => {
        setFormState( initialValues );
    }, [ initialValues ]);

    const onChangeForm = ({ target }) => {
        const { name, value } = target;
        
        setFormState({
            ...formState,
            [ name ]: value,
        })
    };
    
    const onResetForm = () => {
        setFormState( initialValues );
    };

    const isFormValid = useMemo( () => {
        for ( const formValue of Object.keys( formChecks ) ) {
            if( formChecks[formValue] !== null ) return false;
        }

        return true;
    }, [formChecks] )
    
    const createValidators = () => {
        
        const checkedValidations = {};
        
        for ( const formField of Object.keys( formValidations ) ) {

            const [ fn, errorMessage ] = formValidations[formField];

            checkedValidations[ `${ formField }Valid` ] = // 'displayNameValid', 'emailValid', 'passwordValid'
                fn( formState[formField] ) ? null : errorMessage;
        }

        setFormChecks( checkedValidations );
    };

    return {
        ...formState,
        formState,
        onChangeForm,
        onResetForm,
        // form validations
        ...formChecks,
        isFormValid
    };
}