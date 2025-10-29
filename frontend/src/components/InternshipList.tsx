import React, { useState } from 'react';
import { List, Card, Select, Space, Modal, Descriptions, Button, message } from 'antd';
import type { Internship } from '../types/Internship';

const { Option } = Select;

type Props = {
  internships: Internship[];
  apiUrl?: string;
  onUpdate?: (updated: Internship) => void;
};

export default function InternshipList({ internships, apiUrl = 'http://localhost:3000/internship', onUpdate }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [localInternships, setLocalInternships] = useState(internships);
  const [loading, setLoading] = useState(false);

  // Récupère les valeurs uniques pour les filtres
  const statuses = Array.from(new Set(localInternships.map((i) => i.status).filter(Boolean)));
  const services = Array.from(new Set(localInternships.map((i) => i.service).filter(Boolean)));

  // Filtrage des données
  const filteredInternships = localInternships.filter((i) => {
    const statusMatch = selectedStatus ? i.status === selectedStatus : true;
    const serviceMatch = selectedService ? i.service === selectedService : true;
    return statusMatch && serviceMatch;
  });

  const handleAccept = async () => {
    if (!selectedInternship) return;

    setLoading(true);
    try {
      const updated = { ...selectedInternship, status: 'acceptee' };

      // 🔄 Mise à jour locale immédiate
      setLocalInternships((prev) =>
        prev.map((i) => (i.id === updated.id ? updated : i))
      );

      // 🌐 Mise à jour serveur
      const res = await fetch(`${apiUrl}/${selectedInternship.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'acceptée' }),
      });

      if (!res.ok) {
        throw new Error(`Erreur serveur : ${res.status}`);
      }

      message.success('Demande acceptée ✅');
      setSelectedInternship(updated);
      if (onUpdate) onUpdate(updated);
    } catch (err) {
      console.error(err);
      message.error('Échec de la mise à jour ❌');
    } finally {
      setLoading(false);
    }
  };

  if (localInternships.length === 0) {
    return <p>Aucune demande pour le moment.</p>;
  }

  return (
    <>
      {/* Filtres */}
      <Space style={{ marginBottom: 16 }}>
        <Select
          placeholder="Filtrer par statut"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setSelectedStatus(value)}
          value={selectedStatus}
        >
          {statuses.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filtrer par service"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setSelectedService(value)}
          value={selectedService}
        >
          {services.map((service) => (
            <Option key={service} value={service}>
              {service}
            </Option>
          ))}
        </Select>
      </Space>

      {/* Liste des demandes */}
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={filteredInternships}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={`${item.prenom} ${item.nom} (${item.service})`}
              hoverable
              onClick={() => setSelectedInternship(item)}
            >
              <p>Email: {item.email}</p>
              <p>
                Du {new Date(item.dateDebut).toLocaleDateString()} au{' '}
                {new Date(item.dateFin).toLocaleDateString()}
              </p>
              {item.status && <p>Status: {item.status}</p>}
            </Card>
          </List.Item>
        )}
      />

      {/* Modal Détails */}
      <Modal
        open={!!selectedInternship}
        title={
          selectedInternship
            ? `${selectedInternship.prenom} ${selectedInternship.nom} (${selectedInternship.service})`
            : ''
        }
        onCancel={() => setSelectedInternship(null)}
        footer={[
          selectedInternship?.status !== 'acceptée' && (
            <Button
              key="accept"
              type="primary"
              loading={loading}
              onClick={handleAccept}
            >
              Accepter la demande
            </Button>
          ),
          <Button key="close" onClick={() => setSelectedInternship(null)}>
            Fermer
          </Button>,
        ]}
      >
        {selectedInternship && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Email">{selectedInternship.email}</Descriptions.Item>
            <Descriptions.Item label="Service">{selectedInternship.service}</Descriptions.Item>
            <Descriptions.Item label="Période">
              Du {new Date(selectedInternship.dateDebut).toLocaleDateString()} au{' '}
              {new Date(selectedInternship.dateFin).toLocaleDateString()}
            </Descriptions.Item>
            {selectedInternship.motivation && (
              <Descriptions.Item label="Motivation">
                {selectedInternship.motivation}
              </Descriptions.Item>
            )}
            {selectedInternship.status && (
              <Descriptions.Item label="Status">
                {selectedInternship.status}
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </>
  );
}
