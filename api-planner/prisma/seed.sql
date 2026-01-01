-- Dados de exemplo para demonstração
-- Execute: npm run db:seed

INSERT INTO trips (id, destination, starts_at, ends_at, is_confirmed, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Paris, França', '2024-07-15 10:00:00', '2024-07-22 18:00:00', true, datetime('now')),
('550e8400-e29b-41d4-a716-446655440001', 'Tokyo, Japão', '2024-08-10 08:00:00', '2024-08-20 20:00:00', false, datetime('now'));

INSERT INTO participants (id, name, email, is_confirmed, is_owner, trip_id) VALUES
('660e8400-e29b-41d4-a716-446655440000', 'João Silva', 'joao@example.com', true, true, '550e8400-e29b-41d4-a716-446655440000'),
('660e8400-e29b-41d4-a716-446655440001', 'Maria Santos', 'maria@example.com', true, false, '550e8400-e29b-41d4-a716-446655440000'),
('660e8400-e29b-41d4-a716-446655440002', 'Pedro Costa', 'pedro@example.com', false, false, '550e8400-e29b-41d4-a716-446655440001');

INSERT INTO activities (id, title, occurs_at, trip_id) VALUES
('770e8400-e29b-41d4-a716-446655440000', 'Visita à Torre Eiffel', '2024-07-16 14:00:00', '550e8400-e29b-41d4-a716-446655440000'),
('770e8400-e29b-41d4-a716-446655440001', 'Passeio pelo Louvre', '2024-07-17 10:00:00', '550e8400-e29b-41d4-a716-446655440000'),
('770e8400-e29b-41d4-a716-446655440002', 'Jantar em Montmartre', '2024-07-18 19:00:00', '550e8400-e29b-41d4-a716-446655440000');

INSERT INTO links (id, title, url, trip_id) VALUES
('880e8400-e29b-41d4-a716-446655440000', 'Guia de Paris', 'https://www.paris.fr/pages/guide-touristique', '550e8400-e29b-41d4-a716-446655440000'),
('880e8400-e29b-41d4-a716-446655440001', 'Mapa do Metrô', 'https://www.ratp.fr/plan-metro', '550e8400-e29b-41d4-a716-446655440000');