import { useState, type JSX } from 'react';
import { Form, Input, DatePicker, Select, Button, message, Alert } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CreateInternshipPayload, Internship } from '../types/Internship';
import { createInternship } from '../api/internship';

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
}: Props): JSX.Element {
  const [form] = Form.useForm<FormValues>();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: FormValues) => {
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

    setSubmitting(true);
    try {
      // Use centralized API helper (axios) for consistent config / timeouts
      const created: Internship = await createInternship(payload);
      message.success('Demande créée avec succès');
      setFeedback({ type: 'success', message: '✅ Demande envoyée et enregistrée avec succès !' });
      form.resetFields();
      if (onCreated) onCreated(created);
    } catch (err: any) {
      console.error(err);
      const serverMessage =
        err?.response?.data?.message ??
        err?.response?.data ??
        err?.message ??
        '❌ Échec de la création. Vérifiez le serveur ou les données saisies.';
      message.error(String(serverMessage));
      setFeedback({ type: 'error', message: String(serverMessage) });
    } finally {
      setSubmitting(false);
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
          <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
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
