import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../Layout/AppLayout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';

const MainDashboard: React.FC = () => {
  // Mock data for charts
  const ticketData = [
    { name: 'Пн', открытые: 4000, решенные: 2400 },
    { name: 'Вт', открытые: 3000, решенные: 1398 },
    { name: 'Ср', открытые: 2000, решенные: 9800 },
    { name: 'Чт', открытые: 2780, решенные: 3908 },
    { name: 'Пт', открытые: 1890, решенные: 4800 },
    { name: 'Сб', открытые: 2390, решенные: 3800 },
    { name: 'Вс', открытые: 3490, решенные: 4300 },
  ];
  
  const categoryData = [
    { name: 'Тех. поддержка', value: 400 },
    { name: 'Оплата', value: 300 },
    { name: 'Функции', value: 300 },
    { name: 'Ошибки', value: 200 },
    { name: 'Аккаунт', value: 100 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  const agentPerformanceData = [
    { name: 'Алекс', performance: 85 },
    { name: 'Елена', performance: 92 },
    { name: 'Анна', performance: 78 },
    { name: 'Дмитрий', performance: 95 },
    { name: 'ИИ-бот', performance: 88 },
  ];
  
  const satisfactionData = [
    { name: 'Янв', satisfaction: 85 },
    { name: 'Фев', satisfaction: 87 },
    { name: 'Мар', satisfaction: 83 },
    { name: 'Апр', satisfaction: 90 },
    { name: 'Май', satisfaction: 88 },
    { name: 'Июн', satisfaction: 92 },
  ];
  
  return (
    <AppLayout title="Панель управления">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Панель поддержки ИИ</h1>
          <p className="text-neutral-600">Добро пожаловать в систему ИИ-агента поддержки Qoder</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-2">Всего заявок</h3>
            <p className="text-3xl font-bold text-primary-600">24</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-2">Открытые заявки</h3>
            <p className="text-3xl font-bold text-yellow-500">12</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-2">Решено сегодня</h3>
            <p className="text-3xl font-bold text-green-500">8</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-2">Удовлетворенность</h3>
            <p className="text-3xl font-bold text-blue-500">92%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Заявки по дням</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={ticketData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="открытые" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="решенные" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Категории заявок</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${Math.round(percent! * 100)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Производительность агентов</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={agentPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="performance" name="Производительность (%)" fill="#8884d8" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Производительность']} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Удовлетворенность клиентов</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={satisfactionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="satisfaction" name="Удовлетворенность (%)" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Недавняя активность</h2>
            <Link to="/app" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Просмотр всех заявок →
            </Link>
          </div>
          <p className="text-neutral-600">Недавние заявки с анализом ИИ и рекомендациями</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Статус ИИ-агента поддержки</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-neutral-700">Движок анализа ИИ: Активен</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-neutral-700">Классификация заявок: Онлайн</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-neutral-700">Система рекомендаций: Работает</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MainDashboard;