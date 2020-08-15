import React, { useState, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, SearchTeachers, Button, Block } from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface DataProps {
  subject: string;
  week_day: string;
  time: string;
}

const TeacherList: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [teachers, setTeachers] = useState([]);

  const searchTeachers = useCallback(async (data: DataProps) => {
    const { subject, week_day, time } = data;

    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        subject: Yup.string().required('Matéria é obrigatório'),
        week_day: Yup.string().required('Dia da semana é obrigatório'),
        time: Yup.string().required('Hora é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  }, []);

  return (
    <Container>
      <PageHeader title="Estes são os proffys disponíveis.">
        <SearchTeachers>
          <Form ref={formRef} onSubmit={searchTeachers}>
            <Block>
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
              <Select
                name="week_day"
                label="Dia da semana"
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

              <Input name="time" label="Hora" type="time" />

              <Button type="submit">Search</Button>
            </Block>
          </Form>
        </SearchTeachers>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </Container>
  );
};

export default TeacherList;
