import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import Section from './Section';

export default function KanbanBoard() {
  // Definindo os estados iniciais
  const [columns, setColumns] = useState({
    'novo': {
      title: 'Novos',
      icon: 'fas fa-inbox',
      color: '#D90429',
      items: [
        { id: 1, name: 'João Silva', message: 'Olá, gostaria de um orçamento', time: '09:45', avatar: 'J', priority: 'high' },
        { id: 2, name: 'Maria Souza', message: 'Preciso de ajuda com o produto', time: '10:12', avatar: 'M', priority: 'medium' },
        { id: 3, name: 'Carlos Santos', message: 'Qual o horário de funcionamento?', time: '10:30', avatar: 'C', priority: 'low' }
      ]
    },
    'andamento': {
      title: 'Em Andamento',
      icon: 'fas fa-spinner',
      color: '#FFD166',
      items: [
        { id: 4, name: 'Ana Oliveira', message: 'Aguardando confirmação do pagamento', time: '09:20', avatar: 'A', priority: 'medium' },
        { id: 5, name: 'Pedro Costa', message: 'Vou verificar e te retorno', time: '09:30', avatar: 'P', priority: 'high' }
      ]
    },
    'concluido': {
      title: 'Concluídos',
      icon: 'fas fa-check-circle',
      color: '#25D366',
      items: [
        { id: 6, name: 'Fernanda Lima', message: 'Obrigada pelo atendimento!', time: '08:45', avatar: 'F', priority: 'medium' }
      ]
    }
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [activeDragColumn, setActiveDragColumn] = useState(null);
  const [stats, setStats] = useState({
    total: 6,
    novos: 3,
    andamento: 2,
    concluidos: 1,
    tempoMedio: '4.5 min'
  });
  
  // Atualiza estatísticas quando houver mudanças nas colunas
  useEffect(() => {
    setStats({
      total: Object.values(columns).reduce((sum, col) => sum + col.items.length, 0),
      novos: columns.novo.items.length,
      andamento: columns.andamento.items.length,
      concluidos: columns.concluido.items.length,
      tempoMedio: '4.5 min'
    });
  }, [columns]);

  // Iniciar a ação de arrastar
  const handleDragStart = (item, columnId) => {
    setDraggedItem({ ...item, sourceColumn: columnId });
    setActiveDragColumn(columnId);
  };

  // Finalizar a ação de arrastar e soltar o item
  const handleDrop = (targetColumnId) => {
    if (draggedItem && activeDragColumn && activeDragColumn !== targetColumnId) {
      // Remove o item da coluna original
      const sourceItems = [...columns[activeDragColumn].items];
      const filteredSourceItems = sourceItems.filter(item => item.id !== draggedItem.id);
      
      // Adiciona o item à coluna de destino
      const targetItems = [...columns[targetColumnId].items];
      targetItems.push(draggedItem);
      
      // Atualiza o estado das colunas
      setColumns({
        ...columns,
        [activeDragColumn]: {
          ...columns[activeDragColumn],
          items: filteredSourceItems
        },
        [targetColumnId]: {
          ...columns[targetColumnId],
          items: targetItems
        }
      });
    }
    
    // Reset dos estados de arrastar
    setDraggedItem(null);
    setActiveDragColumn(null);
  };

  // Permite que o item seja solto em uma coluna
  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Adiciona um novo item de teste aleatório
  const addTestItem = () => {
    const names = ['Roberto', 'Juliana', 'Márcio', 'Carla', 'Eduardo', 'Beatriz'];
    const messages = [
      'Gostaria de saber mais sobre o produto',
      'Como faço para agendar uma demonstração?',
      'Qual o prazo de entrega?',
      'Preciso de suporte técnico',
      'Tem desconto para compras em quantidade?'
    ];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomPriority = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)];
    
    const newItem = {
      id: Date.now(),
      name: randomName,
      message: randomMessage,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      avatar: randomName[0],
      priority: randomPriority
    };
    
    setColumns({
      ...columns,
      novo: {
        ...columns.novo,
        items: [...columns.novo.items, newItem]
      }
    });
  };

  return (
    <Section id="kanban" className="kanban-section gradient-section green" gradientType="green">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Organize seu <span className="title-highlight">Atendimento</span></h2>
          <p className="promo-subtitle">Visualize e gerencie suas conversas com nosso sistema Kanban intuitivo< (exemplo interativo)/p>
        </Reveal>
        
        <Reveal delay={0.1}>
          <div className="kanban-stats">
            <div className="kanban-stat">
              <div className="kanban-stat-value">{stats.total}</div>
              <div className="kanban-stat-label">Conversas</div>
            </div>
            <div className="kanban-stat">
              <div className="kanban-stat-value" style={{color: columns.novo.color}}>{stats.novos}</div>
              <div className="kanban-stat-label">Novos</div>
            </div>
            <div className="kanban-stat">
              <div className="kanban-stat-value" style={{color: columns.andamento.color}}>{stats.andamento}</div>
              <div className="kanban-stat-label">Em andamento</div>
            </div>
            <div className="kanban-stat">
              <div className="kanban-stat-value" style={{color: columns.concluido.color}}>{stats.concluidos}</div>
              <div className="kanban-stat-label">Concluídos</div>
            </div>
            <div className="kanban-stat">
              <div className="kanban-stat-value">{stats.tempoMedio}</div>
              <div className="kanban-stat-label">Tempo médio</div>
            </div>
            <button className="kanban-add-btn" onClick={addTestItem}>
              <i className="fas fa-plus"></i> Adicionar conversa
            </button>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="kanban-board">
            {Object.entries(columns).map(([columnId, column]) => (
              <div 
                key={columnId}
                className={`kanban-column ${activeDragColumn === columnId ? 'drag-source' : ''}`}
                onDragOver={(e) => handleDragOver(e, columnId)}
                onDrop={() => handleDrop(columnId)}
              >
                <div className="column-header" style={{ backgroundColor: column.color + '22', borderColor: column.color }}>
                  <i className={column.icon} style={{ color: column.color }}></i>
                  <h3>{column.title}</h3>
                  <span className="column-count">{column.items.length}</span>
                </div>
                
                <div className="column-content">
                  {column.items.map(item => (
                    <motion.div
                      key={item.id}
                      className={`kanban-card priority-${item.priority}`}
                      layoutId={`card-${item.id}`}
                      draggable
                      onDragStart={() => handleDragStart(item, columnId)}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <div className="card-header">
                        <div className="card-avatar">{item.avatar}</div>
                        <div className="card-name">{item.name}</div>
                        <div className="card-time">{item.time}</div>
                      </div>
                      <div className="card-body">
                        <p className="card-message">{item.message}</p>
                      </div>
                      <div className="card-footer">
                        <div className="card-priority">
                          {item.priority === 'high' && <span className="priority high"><i className="fas fa-arrow-up"></i> Alta</span>}
                          {item.priority === 'medium' && <span className="priority medium"><i className="fas fa-minus"></i> Média</span>}
                          {item.priority === 'low' && <span className="priority low"><i className="fas fa-arrow-down"></i> Baixa</span>}
                        </div>
                        <div className="card-actions">
                          <button className="card-action-btn reply"><i className="fas fa-reply"></i></button>
                          {columnId !== 'concluido' && (
                            <button className="card-action-btn complete"><i className="fas fa-check"></i></button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {column.items.length === 0 && (
                    <div className="empty-column">
                      <i className="fas fa-inbox"></i>
                      <p>Nenhum item</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        
        <Reveal delay={0.3}>
          <div className="kanban-instructions">
            <div className="instruction">
              <i className="fas fa-mouse-pointer"></i>
              <span>Arraste os cards entre as colunas para mudar o status</span>
            </div>
            <div className="instruction">
              <i className="fas fa-plus-circle"></i>
              <span>Adicione novas conversas com o botão acima</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
} 
