import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { Internship } from '../types/Internship';
import { getInternship, updateInternshipStatus } from '../api/internship';

export default function InternshipDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadInternship = async () => {
      try {
        const nid = Number(id);
        if (Number.isNaN(nid)) {
          message.error('ID invalide');
          navigate('/');
          return;
        }
        const found = await getInternship(nid);
        if (found) {
          setInternship(found);
        } else {
          message.error('Demande non trouvée');
          navigate('/');
        }
      } catch (err) {
        console.error(err);
        message.error('Erreur lors du chargement');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    void loadInternship();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus: 'APPROVED' | 'REJECTED') => {
    if (!internship) return;
    setUpdating(true);

    try {
      const updated = await updateInternshipStatus(internship.id, newStatus);
      setInternship(updated);
      message.success(
        newStatus === 'APPROVED' ? '✅ Demande acceptée' : '❌ Demande refusée',
        2
      );

      setTimeout(() => navigate('/'), 2000);
    } catch (err: any) {
      console.error(err);
      const serverMessage = err?.response?.data?.message ?? err?.message ?? 'Échec de la mise à jour ❌';
      message.error(String(serverMessage));
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Spin />;
  if (!internship) return <p>Demande non trouvée</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/')}
        style={{ marginBottom: '1rem' }}
      >
        Retour
      </Button>

      <Card title={`${internship.prenom} ${internship.nom}`}>
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Email">{internship.email}</Descriptions.Item>
          <Descriptions.Item label="Service">{internship.service}</Descriptions.Item>
          <Descriptions.Item label="Période">
            Du {new Date(internship.dateDebut).toLocaleDateString()} au{' '}
            {new Date(internship.dateFin).toLocaleDateString()}
          </Descriptions.Item>
          {internship.motivation && (
            <Descriptions.Item label="Motivation">{internship.motivation}</Descriptions.Item>
          )}
          <Descriptions.Item label="Statut">
            {internship.status === 'PENDING'
              ? 'En attente'
              : internship.status === 'APPROVED'
              ? 'Approuvée'
              : 'Refusée'}
          </Descriptions.Item>
        </Descriptions>

        {internship.status === 'PENDING' && (
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <Button
              type="primary"
              loading={updating}
              onClick={() => handleStatusChange('APPROVED')}
            >
              Accepter
            </Button>
            <Button
              danger
              loading={updating}
              onClick={() => handleStatusChange('REJECTED')}
            >
              Refuser
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
