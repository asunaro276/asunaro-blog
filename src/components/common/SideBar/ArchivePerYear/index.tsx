import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material'
import type { YearMonthItem } from '/types'

type Props = {
  yearmonths: YearMonthItem[]
}

const ArchivePerYear = (props: Props) => {
  return (
    <Card>
      <CardContent sx={{ paddingBottom: '1.5em', fontWeight: 600 }}>Archive</CardContent>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        {props.yearmonths.map(yearmonth => {
          const [year, month] = yearmonth.yearmonth.split('-')
          return (
            <Box key={yearmonth._id}>
              <Divider variant='middle' />
              <Box sx={{ paddingLeft: '1em', paddingY: '0.5em' }}>
                <a href={`/year/${yearmonth.yearmonth}`}>
                  <Button variant='text' sx={{ textTransform: 'none', fontSize: '1rem' }}>
                    {year}/{month}
                    <Typography sx={{ display: 'inline', color: '#333', paddingLeft: '0.5em' }}>
                      {`(${yearmonth.ref.length})`}
                    </Typography>
                  </Button>
                </a>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default ArchivePerYear
