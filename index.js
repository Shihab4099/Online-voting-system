import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetch('/api/candidates')
      .then(res => res.json())
      .then(data => setCandidates(data));
  }, []);

  const handleVote = async (id) => {
    // Simulate userId for now (replace with auth later)
    const userId = 'user123';

    const res = await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateId: id, userId }),
    });
    const data = await res.json();

    if (res.ok) {
      alert('Kura yako imesajiliwa');
      setVoted(true);
    } else {
      alert(data.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Wagombea</Typography>
      {candidates.map(cand => (
        <Card key={cand._id} style={{ marginBottom: 16 }}>
          <CardContent>
            <Typography variant="h6">{cand.name}</Typography>
            <Typography>Chama: {cand.party}</Typography>
            <Button 
              variant="contained" 
              disabled={voted}
              onClick={() => handleVote(cand._id)}
            >
              Piga Kura
            </Button>
          </CardContent>
        </Card>
      ))}
      {voted && <Typography>Asante kwa kupiga kura!</Typography>}
    </Container>
  );
}
