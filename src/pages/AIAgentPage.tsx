import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';

const AIAgentPage: React.FC = () => {
  const [agentStatus, setAgentStatus] = useState<'active' | 'paused' | 'offline'>('active');
  
  // Mock data for live activity
  const liveActivities = [
    { id: 1, action: 'Анализ входящего звонка', category: 'Биллинг', time: 'Только что' },
    { id: 2, action: 'Заявка #1842 отнесена к высокому приоритету', category: 'Технический', time: '2 мин назад' },
    { id: 3, action: 'Требуется вмешательство (Низкий уровень уверенности)', category: 'Общий', time: '5 мин назад' },
    { id: 4, action: 'Обнаружена рекомендованная автоматизация', category: 'Процесс', time: '7 мин назад' },
    { id: 5, action: 'Прогнозируется удовлетворенность клиента', category: 'Метрики', time: '10 мин назад' },
  ];

  // Mock data for KPIs
  const kpiData = [
    { title: 'Диалогов обработано ИИ', value: '142', change: '+12%' },
    { title: 'Решено автоматически', value: '78%', change: '+5%' },
    { title: 'Передано человеку', value: '22%', change: '-3%' },
    { title: 'Среднее время ответа', value: '42с', change: '-8с' },
    { title: 'Средний уровень уверенности ИИ', value: '87%', change: '+4%' },
    { title: 'Заявок обработано сегодня', value: '86', change: '+14%' },
  ];

  // Mock data for confidence distribution
  const confidenceDistribution = [
    { label: 'Высокий уровень уверенности (80–100%)', percentage: 72, color: 'bg-green-500' },
    { label: 'Средний уровень уверенности (60–79%)', percentage: 18, color: 'bg-yellow-500' },
    { label: 'Низкий уровень уверенности (<60%)', percentage: 10, color: 'bg-red-500' },
  ];

  // Mock data for escalation rules
  const escalationRules = [
    { id: 1, rule: 'Проблемы, связанные с оплатой', action: 'Эскалировать' },
    { id: 2, rule: 'Обнаружен гневный или негативный тон', action: 'Эскалировать' },
    { id: 3, rule: 'Уровень уверенности ИИ ниже порога', action: 'Эскалировать' },
    { id: 4, rule: 'Обнаружен VIP-клиент', action: 'Эскалировать' },
    { id: 5, rule: 'Юридические вопросы или споры о возврате', action: 'Эскалировать' },
  ];

  // Mock data for learning insights
  const learningInsights = [
    { id: 1, insight: 'Обнаружены повторяющиеся запросы по выставлению счетов', action: 'Создать автоматизацию' },
    { id: 2, insight: 'Пробел в базе знаний в документации API', action: 'Добавить в базу знаний' },
    { id: 3, insight: 'Шаблон запутанности пользовательского интерфейса в процессе оформления заказа', action: 'Проверить шаблон' },
  ];

  // Mock data for recent AI decisions
  const recentDecisions = [
    { id: 'ЗАЯВКА-001', category: 'Технический', priority: 'Высокий', confidence: '92%', action: 'Эскалировать' },
    { id: 'ЗАЯВКА-002', category: 'Аккаунт', priority: 'Средний', confidence: '85%', action: 'Решено' },
    { id: 'ЗАЯВКА-003', category: 'Биллинг', priority: 'Критический', confidence: '65%', action: 'Эскалировать' },
    { id: 'ЗАЯВКА-004', category: 'Общий', priority: 'Низкий', confidence: '95%', action: 'Решено' },
    { id: 'ЗАЯВКА-005', category: 'Технический', priority: 'Высокий', confidence: '78%', action: 'Назначено' },
  ];

  const toggleAgentStatus = () => {
    setAgentStatus(prev => prev === 'active' ? 'paused' : 'active');
  };

  return (
    <AppLayout title="ИИ-агент">
      <div>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
          <div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                agentStatus === 'active' ? 'bg-green-500' : 
                agentStatus === 'paused' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></div>
              <span className="text-sm font-medium capitalize">{agentStatus === 'active' ? 'Активен' : agentStatus === 'paused' ? 'Приостановлен' : 'Не в сети'}</span>
            </div>
            <span className="text-sm text-neutral-500">Последняя активность: Только что</span>
            <div className="flex space-x-2">
              <button 
                onClick={toggleAgentStatus}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-neutral-300 hover:bg-neutral-50"
              >
                {agentStatus === 'active' ? 'Приостановить работу' : 'Возобновить работу'}
              </button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-lg border border-neutral-300 hover:bg-neutral-50">
                Настроить агента
              </button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-lg border border-neutral-300 hover:bg-neutral-50">
                Просмотр журналов
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Activity Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Живая активность</h2>
              <div className="space-y-4">
                {liveActivities.map(activity => (
                  <div key={activity.id} className="flex items-start border-l-4 border-primary-500 pl-4 py-2 bg-neutral-50 rounded-r">
                    <div className="mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{activity.action}</p>
                      <div className="flex justify-between">
                        <span className="text-xs text-neutral-500">{activity.category}</span>
                        <span className="text-xs text-neutral-400">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent AI Decisions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Недавние решения ИИ</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Заявка</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Категория</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Приоритет</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Уверенность</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Действие</th>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {recentDecisions.map((decision, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-900">{decision.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">{decision.category}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            decision.priority === 'Критический' ? 'bg-red-100 text-red-800' :
                            decision.priority === 'Высокий' ? 'bg-orange-100 text-orange-800' :
                            decision.priority === 'Средний' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {decision.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">{decision.confidence}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            decision.action === 'Решено' ? 'bg-green-100 text-green-800' :
                            decision.action === 'Эскалировать' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {decision.action}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Обзор производительности</h2>
              <div className="grid grid-cols-2 gap-4">
                {kpiData.map((kpi, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4">
                    <p className="text-sm text-neutral-500">{kpi.title}</p>
                    <div className="flex items-baseline mt-1">
                      <span className="text-xl font-bold text-neutral-900">{kpi.value}</span>
                      <span className="ml-2 text-xs text-green-600">{kpi.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Confidence & Decision Quality */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Распределение уверенности ИИ</h2>
              <div className="space-y-3">
                {confidenceDistribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full`} 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-neutral-600 italic">
                Решения с низким уровнем уверенности автоматически передаются человеку.
              </p>
            </div>

            {/* Escalation Rules */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-neutral-900">Правила эскалации</h2>
                <button className="text-sm text-primary-600 hover:text-primary-800">
                  Редактировать правила
                </button>
              </div>
              <ul className="space-y-3">
                {escalationRules.map(rule => (
                  <li key={rule.id} className="flex justify-between items-center p-2 hover:bg-neutral-50 rounded">
                    <span className="text-sm">{rule.rule}</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                      {rule.action}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning & Optimization Insights */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Обучение и оптимизация</h2>
              <div className="space-y-4">
                {learningInsights.map(insight => (
                  <div key={insight.id} className="p-3 border border-neutral-200 rounded-lg">
                    <p className="text-sm">{insight.insight}</p>
                    <button className="mt-2 text-xs text-primary-600 hover:text-primary-800">
                      {insight.action === 'Создать автоматизацию' ? 'Создать автоматизацию' : insight.action === 'Добавить в базу знаний' ? 'Добавить в базу знаний' : 'Проверить шаблон'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIAgentPage;