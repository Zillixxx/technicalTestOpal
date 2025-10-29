import React, { useEffect, useState } from 'react';
import { Typography, Card, Divider, Spin, message } from 'antd';
import InternshipForm from '../components/InternshipForm';
import InternshipList from '../components/InternshipList';
import type { Internship } from '../types/Internship';
import { fetchInternships } from '../api/internship';

const { Title } = Typography;

export default function HomePage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les données depuis le serveur au montage
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInternships();
        setInternships(data);
      } catch (err) {
        console.error(err);
        message.error('Impossible de récupérer les demandes.');
      } finally {
        setLoading(false);
      }
    };
    void loadData();
  }, []);

  const handleCreated = (newInternship: Internship) => {
    setInternships((prev) => [newInternship, ...prev]);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Title level={2}>Formulaire de demande de stage</Title>

      <Card style={{ marginBottom: '2rem' }}>
        <InternshipForm onCreated={handleCreated} />
      </Card>

      <Divider>Demandes existantes</Divider>

      {loading ? <Spin /> : <InternshipList internships={internships} />}
    </div>
  );
}
