import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiAlertOctagon } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import PageHeader from '../../components/PageHeader';

import './styles.css';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface DataProps {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;
  schedule: string;
}

const TechForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  function addNewScheduleItem(): void {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });
    console.log(updatedScheduleItems);

    return setScheduleItems(updatedScheduleItems);
  }

  const handleCreateClass = useCallback(async (data: DataProps) => {
    const { name, avatar, whatsapp, bio, subject, cost } = data;

    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo "Name" é obrigatório'),
        avatar: Yup.string().required('Campo "Avatar" é obrigatório'),
        whatsapp: Yup.string().required('Campo "whatsapp" é obrigatório'),
        bio: Yup.string().required('Campo "bio" é obrigatório'),
        subject: Yup.string().required('Campo "subject" é obrigatório'),
        cost: Yup.string().required('Campo "cost" é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      api
        .post('classes', {
          name,
          avatar,
          whatsapp,
          bio,
          subject,
          cost: Number(cost),
          schedule: scheduleItems,
        })
        .then(() => {
          alert('All done!');
          history.push('/');
        });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aula"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <Form ref={formRef} onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input label="Nome completo" name="name" />

            <Input label="Avatar" name="avatar" />

            <Input name="whatsapp" label="Whatsapp" />
            <Textarea name="bio" label="Biografia" />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Bilogia', label: 'Bilogia' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Física', label: 'Física' },
              ]}
            />
            <Input name="cost" label="Custo da sua hora por aula" />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div className="schedule-item" key={scheduleItem.week_day}>
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'week_day', e.target.value)}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />

                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'from', e.target.value)}
                />

                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'to', e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <FiAlertOctagon color="#ac495b" size={30} />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </Form>
      </main>
    </div>
  );
};

export default TechForm;
