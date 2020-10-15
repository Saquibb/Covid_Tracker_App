import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';

export default function Chart() {
  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    const fetchCountryAPI = async () => {
      const apiResponse = await fetch('https://covid19.mathdro.id/api');
      console.log(apiResponse);
      const dataFromApi = await apiResponse.json();
      console.log(dataFromApi);
      setDailyData(dataFromApi);
    };

    fetchCountryAPI();
  }, []);
}
