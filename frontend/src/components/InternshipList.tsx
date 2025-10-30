import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Card, Select, Space } from 'antd';
import type { Internship } from '../types/Internship';

const { Option } = Select;

type Props = {
  internships: Internship[];
};

export default function InternshipList({ internships }: Props) {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [localInternships] = useState(internships);

  // Valeurs uniques pour filtres
  const statuses = Array.from(new Set(localInternships.map((i) => i.status).filter(Boolean)));
  const services = Array.from(new Set(localInternships.map((i) => i.service).filter(Boolean)));

  // Filtrage des données
  const filteredInternships = localInternships.filter((i) => {
    const statusMatch = selectedStatus ? i.status === selectedStatus : true;
    const serviceMatch = selectedService ? i.service === selectedService : true;
    return statusMatch && serviceMatch;
  });

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

      {/* Liste */}
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={filteredInternships}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={`${item.prenom} ${item.nom} (${item.service})`}
              hoverable
              onClick={() => navigate(`/internship/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <p>Email: {item.email}</p>
              <p>
                Du {new Date(item.dateDebut).toLocaleDateString()} au{' '}
                {new Date(item.dateFin).toLocaleDateString()}
              </p>
              <p>
                Statut:{' '}
                <b>
                  {item.status === 'PENDING'
                    ? 'En attente'
                    : item.status === 'APPROVED'
                    ? 'Approuvée'
                    : 'Refusée'}
                </b>
              </p>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
