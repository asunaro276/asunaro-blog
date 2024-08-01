import { GitHub } from '@mui/icons-material'
import { Button, Card, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { XIcon } from './XIcon'

export const SideProfile = () => {
  return (
    <Card>
      <CardContent >
        <Typography sx={{ textAlign: 'center', marginY: '18px' }}>profile</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '2rem' }}>
          <CardMedia
            component='img'
            src='https://storage.googleapis.com/p_641d41d3a492e5ac4c9226fe/3ab0e1e0-e610-4dc9-acb4-f7917add37b1/asunaro.png'
            height='150'
            sx={{ width: '150px', borderRadius: '100%' }}
          />
        </Box>
        <Typography sx={{ textAlign: 'center' }}>あすなろ</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Divider sx={{ width: '80px' }}/>
        </Box>
        <Box sx={{ marginX: '40px', marginY: '20px' }}>
          <Button href='https://github.com/Asunaro276/asunaro-blog' target='_blank' sx={{ padding: '0px', minWidth: 'unset' }}>
            <GitHub sx={{ color: '#000', fontSize: '22px' }}/>
          </Button>
          <Button href='https://twitter.com/asunaro276' target='_blank' sx={{ padding: '0px', minWidth: 'unset', marginLeft: '10px' }}>
            <XIcon  sx={{ color: '#000', fontSize: '22px' }} />
          </Button>
        
        </Box>
        <Typography sx={{ margin: '40px'}}>
          新米エンジニアの技術ブログです。主にWeb技術や数学で遊んでいます。日々楽しみながら学んでいくことを目標としています。
        </Typography>
      </CardContent>
    </Card>
  )
}
