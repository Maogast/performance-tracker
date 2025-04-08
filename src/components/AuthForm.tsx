// src/components/AuthForm.tsx
import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5">{isRegistering ? "Register" : "Sign In"}</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ my: 1 }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ my: 1 }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        {isRegistering ? "Register" : "Sign In"}
      </Button>
      <Button
        onClick={() => setIsRegistering(!isRegistering)}
        fullWidth
        sx={{ mt: 1 }}
      >
        {isRegistering ? "Have an account? Sign In" : "No account? Register"}
      </Button>
    </Box>
  );
};

export default AuthForm;