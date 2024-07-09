import React, { useState, useEffect } from 'react';
import TransactionsTable from '../components/TransactionsTable';
import Statistics from '../components/Statistics';
import PriceBarChart from '../components/BarChart';
import CategoryPieChart from '../components/PieChart';
import axios from 'axios';

const IndexPage: React.FC = () => {
    const [month, setMonth] = useState('7');
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChart, setBarChart] = useState([]);
    const [pieChart, setPieChart] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await axios.get(`/transactions?month=${month}`);
            setTransactions(response.data);
        };

        const fetchStatistics = async () => {
            const response = await axios.get(`/statistics?month=${month}`);
            setStatistics(response.data);
        };

        const fetchBarChart = async () => {
            const response = await axios.get(`/barchart?month=${month}`);
            setBarChart(response.data);
        };

        const fetchPieChart = async () => {
            const response = await axios.get(`/piechart?month=${month}`);
            setPieChart(response.data);
        };

        fetchTransactions();
        fetchStatistics();
        fetchBarChart();
        fetchPieChart();
    }, [month]);

    return (
        <div>
            <h1>Transaction Dashboard</h1>
            <select value={month} onChange={e => setMonth(e.target.value)}>
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </option>
                ))}
            </select>

            <Statistics statistics={statistics} />
            <TransactionsTable transactions={transactions} />
            <PriceBarChart barChart={barChart} />
            <CategoryPieChart pieChart={pieChart} />
        </div>
    );
};

export default IndexPage;