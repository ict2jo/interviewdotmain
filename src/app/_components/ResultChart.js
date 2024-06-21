import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Paper, Typography } from '@mui/material';
import resultData from "@/app/api/result/result.json"


export default function ResultChart({ chartData, renderCustomizedLabel }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredData, setHoveredData] = useState(null);
  const COLORS = ['#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e40af', '#172554'];

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
    setHoveredData(resultData[data.name]);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
    setHoveredData(null);
  };

  return (
    <div className="flex">
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          직업 적성 결과
        </Typography>
        <PieChart width={600} height={600}>
          <Pie
            data={chartData}
            cx={300}
            cy={300}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={250}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={activeIndex === index ? 1 : 0.6} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Paper>
      {hoveredData && (
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6" gutterBottom>
            <div className="bg-primary-600 text-white rounded-full px-3 py-1 text-sm">{hoveredData.유형} {hoveredData.이름}</div>
          </Typography>
          <Typography variant="body1">
            흥미특성: {hoveredData.흥미특성}<br />
            자기평가: {hoveredData.자기평가}<br />
            타인평가: {hoveredData.타인평가}<br />
            선호활동: {hoveredData.선호활동}<br />
            적성: {hoveredData.적성}<br />
            성격: {hoveredData.성격}<br />
            가치: {hoveredData.가치}<br />
            회피활동: {hoveredData.회피활동}<br />
            대표직업: {hoveredData.대표직업}
          </Typography>
        </Paper>
      )}
    </div>
  );
}
