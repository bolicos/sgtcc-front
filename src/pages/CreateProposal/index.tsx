import React from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import './styles.css'
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import { Proposal } from '../../models/itens';
import api from '../../services/api';
import Button from '../../components/Button';

function CreateProposal() {
    const history = useHistory();
    const { values, handleChange, handleSubmit } = useFormik<Proposal>({
        initialValues: {
            title: '',
        },
        onSubmit: values => {
            api.post('proposals', values).then(() => {
                history.push('/');
            }).catch(() => {

            });
        },
    });

    return (
        <div id="page-create-proposal" className="container">
            <PageHeader
                title='Que incrível que você quer criar uma proposta.'
                description='O primeiro passo é preencher este formulário.'
            />

            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend> Proposta</legend>

                        <Input
                            value={values.title}
                            name='title'
                            label='Título'
                            onChange={handleChange}
                        />
                    </fieldset>
                    <footer>

                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha o formulário
                    </p>

                        <Button
                            type="submit"
                            name='form-button'
                            text='Salvar proposta'
                        />

                    </footer>
                </form>
            </main>
        </div>
    );
}

export default CreateProposal;