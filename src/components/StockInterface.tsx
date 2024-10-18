import React, { useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material'
import axios from 'axios'
import { makeStyles } from 'tss-react/mui'
import StockCard, { type Stock } from './StockCard'

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY!

const useStyles = makeStyles()((theme) => ({
  card: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  searchButton: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  error: {
    marginTop: theme.spacing(2),
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  }
}))

const buildURLForSymbol = (symbol: string) =>
  `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`

const StockInterface: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('')
  const [stockData, setStockData] = useState<Stock | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { classes } = useStyles()

  const fetchStockData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(buildURLForSymbol(symbol))

      const data = response.data['Global Quote']
      console.log(data)

      if (!data['01. symbol']) {
        setError('Invalid stock symbol')
        setStockData(null)
        setLoading(false)

        return
      }

      setStockData({
        symbol: data['01. symbol'],
        price: data['05. price'],
        change: data['09. change'],
        changePercent: data['10. change percent'],
      })
    } catch (err) {
      setError('Error fetching stock data. Please try again.')
      setStockData(null)
    }

    setLoading(false)
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className={classes.card}>
        <Typography variant="h4" gutterBottom>
          Stock Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Stock Symbol"
              size='small'
              value={symbol}
              onChange={e => setSymbol(e.target.value)}
            />
          </Grid>
          <Grid item xs={4} className={classes.buttonWrapper}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={fetchStockData}
              disabled={loading || !symbol}
            >
              {loading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Grid>
        </Grid>
        {error && (
          <Typography color="error" className={classes.error}>
            {error}
          </Typography>
        )}

        {stockData && <StockCard stock={stockData} />}
      </Paper>
    </Container>
  )
}

export default StockInterface
