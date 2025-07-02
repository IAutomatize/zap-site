import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import Reveal from './Reveal';
import Section from './Section';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function PerformanceChart() {
  const chartRef = useRef();
  const [activeDataset, setActiveDataset] = useState(0);
  const [highlightedPoint, setHighlightedPoint] = useState(null);
  const [timeRange, setTimeRange] = useState('month');
  const [tooltipData, setTooltipData] = useState(null);
  
  // Dados para diferentes períodos
  const chartData = {
    week: {
      labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
      conversas: [38, 45, 53, 42, 55, 32, 28],
      conversoes: [4, 6, 9, 5, 8, 3, 2],
      tempo: [6.2, 5.8, 4.5, 5.2, 4.8, 7.1, 6.5]
    },
    month: {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      conversas: [243, 298, 312, 275],
      conversoes: [28, 42, 45, 36],
      tempo: [5.7, 5.2, 4.8, 5.0]
    },
    year: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      conversas: [820, 932, 901, 934, 1290, 1330, 1320, 1450, 1280, 1390, 1500, 1650],
      conversoes: [102, 143, 151, 167, 215, 250, 265, 280, 245, 267, 285, 320],
      tempo: [7.2, 6.8, 6.5, 6.2, 5.9, 5.5, 5.2, 4.9, 5.1, 4.8, 4.6, 4.5]
    }
  };

  const metrics = [
    { 
      id: 'conversas',
      label: 'Conversas', 
      color: '#0496FF',
      borderColor: '#0496FF',
      backgroundColor: 'rgba(4, 150, 255, 0.1)',
      fill: true
    },
    { 
      id: 'conversoes',
      label: 'Conversões', 
      color: '#D90429',
      borderColor: '#D90429',
      backgroundColor: 'rgba(217, 4, 41, 0.1)',
      fill: true
    },
    { 
      id: 'tempo',
      label: 'Tempo de Resposta (min)', 
      color: '#FFD166',
      borderColor: '#FFD166',
      backgroundColor: 'rgba(255, 209, 102, 0.1)',
      fill: true
    }
  ];

  const [chartInstance, setChartInstance] = useState(null);
  
  useEffect(() => {
    if (chartRef.current) {
      setChartInstance(chartRef.current);
    }
  }, []);

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: ({ chart, tooltip }) => {
          if (tooltip.opacity === 0) {
            setTooltipData(null);
            return;
          }
          
          const dataIndex = tooltip.dataPoints[0].dataIndex;
          const value = tooltip.dataPoints[0].raw;
          
          setTooltipData({
            label: chartData[timeRange].labels[dataIndex],
            value: value,
            datasetIndex: tooltip.dataPoints[0].datasetIndex
          });
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#b3b3b3',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#b3b3b3',
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const { datasetIndex, index } = elements[0];
        setHighlightedPoint({ datasetIndex, index });
        
        setTimeout(() => {
          setHighlightedPoint(null);
        }, 2000);
      }
    }
  });

  const getChartData = () => {
    return {
      labels: chartData[timeRange].labels,
      datasets: [metrics[activeDataset]].map(metric => ({
        label: metric.label,
        data: chartData[timeRange][metric.id],
        borderColor: metric.borderColor,
        backgroundColor: metric.backgroundColor,
        tension: 0.4,
        fill: metric.fill,
        pointBackgroundColor: metric.color,
        pointRadius: (ctx) => {
          const index = ctx.dataIndex;
          if (highlightedPoint && 
              highlightedPoint.datasetIndex === ctx.datasetIndex && 
              highlightedPoint.index === index) {
            return 8;
          }
          return 4;
        },
        pointHoverRadius: 7,
        pointBorderWidth: 2,
        pointBorderColor: '#fff'
      }))
    };
  };

  const getPerformanceStats = () => {
    const data = chartData[timeRange];
    const totalConversas = data.conversas.reduce((sum, val) => sum + val, 0);
    const totalConversoes = data.conversoes.reduce((sum, val) => sum + val, 0);
    const avgTempo = data.tempo.reduce((sum, val) => sum + val, 0) / data.tempo.length;
    const taxaConversao = (totalConversoes / totalConversas * 100).toFixed(1);
    
    return {
      totalConversas,
      totalConversoes,
      avgTempo: avgTempo.toFixed(1),
      taxaConversao
    };
  };

  const stats = getPerformanceStats();
  
  const handleDatasetChange = (index) => {
    setActiveDataset(index);
  };
  
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <Section id="performance" className="performance-section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Acompanhe seu <span className="title-highlight">Desempenho</span></h2>
          <p className="promo-subtitle">Métricas detalhadas para você tomar as melhores decisões (exemplo interativo)</p>
        </Reveal>
        
        <div className="performance-content">
          <Reveal delay={0.1}>
            <div className="chart-filters">
              <div className="metric-selector">
                {metrics.map((metric, index) => (
                  <button 
                    key={metric.id} 
                    className={`metric-btn ${index === activeDataset ? 'active' : ''}`}
                    onClick={() => handleDatasetChange(index)}
                    style={{ 
                      borderColor: index === activeDataset ? metric.color : 'transparent',
                      color: index === activeDataset ? metric.color : '#b3b3b3'
                    }}
                  >
                    {metric.label}
                  </button>
                ))}
              </div>
              
              <div className="time-selector">
                <button 
                  className={`time-btn ${timeRange === 'week' ? 'active' : ''}`}
                  onClick={() => handleTimeRangeChange('week')}
                >
                  Semanal
                </button>
                <button 
                  className={`time-btn ${timeRange === 'month' ? 'active' : ''}`}
                  onClick={() => handleTimeRangeChange('month')}
                >
                  Mensal
                </button>
                <button 
                  className={`time-btn ${timeRange === 'year' ? 'active' : ''}`}
                  onClick={() => handleTimeRangeChange('year')}
                >
                  Anual
                </button>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="chart-container performance-chart">
              <Line
                data={getChartData()}
                options={chartOptions}
                ref={chartRef}
              />
              
              {tooltipData && (
                <motion.div 
                  className="custom-tooltip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    borderColor: metrics[tooltipData.datasetIndex]?.color
                  }}
                >
                  <div className="tooltip-title" style={{ color: metrics[tooltipData.datasetIndex]?.color }}>
                    {tooltipData.label}
                  </div>
                  <div className="tooltip-value">
                    {tooltipData.value} {metrics[tooltipData.datasetIndex]?.id === 'tempo' ? 'min' : ''}
                  </div>
                </motion.div>
              )}
            </div>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="performance-stats">
              <motion.div 
                className="performance-stat-card"
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
              >
                <div className="stat-card-icon" style={{ backgroundColor: metrics[0].color + '20' }}>
                  <i className="fas fa-comments" style={{ color: metrics[0].color }}></i>
                </div>
                <div className="stat-card-content">
                  <div className="stat-card-value">{stats.totalConversas.toLocaleString()}</div>
                  <div className="stat-card-label">Total de Conversas</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="performance-stat-card"
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
              >
                <div className="stat-card-icon" style={{ backgroundColor: metrics[1].color + '20' }}>
                  <i className="fas fa-shopping-cart" style={{ color: metrics[1].color }}></i>
                </div>
                <div className="stat-card-content">
                  <div className="stat-card-value">{stats.totalConversoes.toLocaleString()}</div>
                  <div className="stat-card-label">Conversões</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="performance-stat-card"
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
              >
                <div className="stat-card-icon" style={{ backgroundColor: metrics[2].color + '20' }}>
                  <i className="fas fa-clock" style={{ color: metrics[2].color }}></i>
                </div>
                <div className="stat-card-content">
                  <div className="stat-card-value">{stats.avgTempo} min</div>
                  <div className="stat-card-label">Tempo Médio de Resposta</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="performance-stat-card"
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
              >
                <div className="stat-card-icon" style={{ backgroundColor: '#7B2CBF20' }}>
                  <i className="fas fa-chart-pie" style={{ color: '#7B2CBF' }}></i>
                </div>
                <div className="stat-card-content">
                  <div className="stat-card-value">{stats.taxaConversao}%</div>
                  <div className="stat-card-label">Taxa de Conversão</div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
} 
