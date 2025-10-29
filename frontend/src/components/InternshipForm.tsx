import { useState, type JSX } from 'react';
import { Form, Input, DatePicker, Select, Button, message, Alert } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CreateInternshipPayload, Internship } from '../types/Internship';

const { TextArea } = Input;
const { Option } = Select;

type FormValues = {
  nom: string;
  prenom: string;
  email: string;
  service: string;
  dateDebut: Dayjs;
  dateFin: Dayjs;
  motivation?: string;
};

type Props = {
  onCreated?: (created: Internship) => void;
  apiUrl?: string;
};

export default function InternshipForm({
  onCreated,
  apiUrl = 'http://localhost:3000/internship',
}: Props): JSX.Element {
  const [form] = Form.useForm<FormValues>();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const onFinish = async (values: FormValues) => {
    // Vérification des dates au moment de la soumission
    if (!values.dateFin.isAfter(values.dateDebut, 'day')) {
      const msg = 'La date de fin doit être postérieure à la date de début';
      message.error(msg);
      setFeedback({ type: 'error', message: msg });
      return;
    }

    const payload: CreateInternshipPayload = {
      nom: values.nom,
      prenom: values.prenom,
      email: values.email,
      service: values.service,
      dateDebut: values.dateDebut.toISOString(),
      dateFin: values.dateFin.toISOString(),
      motivation: values.motivation ?? null,
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status} ${text}`);
      }

      const created: Internship = await res.json();
      message.success('Demande créée avec succès');
      setFeedback({ type: 'success', message: '✅ Demande envoyée et enregistrée avec succès !' });
      form.resetFields();
      if (onCreated) onCreated(created);
    } catch (err) {
      console.error(err);
      const msg = '❌ Échec de la création. Vérifiez le serveur ou les données saisies.';
      message.error(msg);
      setFeedback({ type: 'error', message: msg });
    }
  };

  return (
    <div style={{ maxWidth: 680 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="nom" label="Nom" rules={[{ required: true, message: 'Nom requis' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="prenom" label="Prénom" rules={[{ required: true, message: 'Prénom requis' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Email invalide' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="service" label="Service" rules={[{ required: true, message: 'Service requis' }]}>
          <Select placeholder="Choisir un service">
            <Option value="IT">IT</Option>
            <Option value="Marketing">Marketing</Option>
            <Option value="Finance">Finance</Option>
            <Option value="RH">RH</Option>
            <Option value="Autre">Autre</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dateDebut"
          label="Date de début"
          rules={[{ required: true, message: 'Date de début requise' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="dateFin"
          label="Date de fin"
          dependencies={['dateDebut']}
          rules={[
            { required: true, message: 'Date de fin requise' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const start = getFieldValue('dateDebut');
                if (!value || !start || value.isAfter(start, 'day')) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('La date de fin doit être postérieure à la date de début'));
              },
            }),
          ]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="motivation" label="Motivation">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Créer la demande
          </Button>
        </Form.Item>
      </Form>

      {feedback && (
        <Alert
          style={{ marginTop: 16 }}
          message={feedback.message}
          type={feedback.type}
          showIcon
        />
      )}
    </div>
  );
}
