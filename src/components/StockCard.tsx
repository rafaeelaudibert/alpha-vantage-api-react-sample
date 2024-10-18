import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

export type Stock = {
  symbol: string
  price: string
  change: string
  changePercent: string
}

interface StockCardProps {
  stock: Stock
}

const useStyles = makeStyles()((theme) => ({
  cardContainer: {
    marginTop: theme.spacing(2),
  },
}))

const StockCard: React.FC<StockCardProps> = ({ stock: { symbol, price, change, changePercent } }) => {
  const { classes } = useStyles()

  return (
    <div className={classes.cardContainer}>
      <Typography variant="h5">{symbol}</Typography>
      <Typography variant="h6">${price}</Typography>
      <Typography color={parseFloat(change) >= 0 ? 'green' : 'red'}>
        {change} ({changePercent})
      </Typography>
    </div>
  )
}

export default StockCard


