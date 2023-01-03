import * as React from 'react';
import { useSelector } from 'react-redux';
import { BasicCard } from './Card';

export const Cards = () => {

  const cards = useSelector<any>(state => state.cardItems.cardItems)

  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
      {(cards as unknown as any[]).map(c => <div key={c.id} style={{ padding: 5 }}>
        <BasicCard id={c.id} city={c.city} temperature={c.temperature} weather={c.weather} icon={c.icon}/></div>)}
    </div>
  );
}

