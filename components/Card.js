import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Price from './Price';
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart'



export default function MultiActionAreaCard({id,price,title,discount,color,oldPrice,image}) {

  const dispatch = useDispatch()
  const handleAddToCart = ()=>{
    dispatch(addToCart({
      productId : id,
      price :price,
      title:title,
      image: image,
      quantity: 1,
      color:color
    }))
  }
  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',  }}>
      <CardActionArea>
        {image?(
        <CardMedia
        component="img"
        height="200"
        width={image?.width || 240}
        image={image?.url}
        alt={image?.alt}
      />
        ):(
          <CardMedia
          component="img"
          height="200"
          width={image?.width || 240}
          image="/card_images/not-found.jpg"
          alt={title}
        />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{marginTop:'10px'}}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button size="medium" color='secondary' sx={{ fontSize:'1.2rem' }}
 >
          شراء
        </Button>
          <Price price={price} discount={discount} oldPrice={oldPrice}/>
        <Button onClick={handleAddToCart} size="medium" color="primary" sx={{fontSize:'1.3rem'}}
        >
          <ShoppingCartIcon  sx={{fontSize:'1.7rem',borderRadius: "50%",padding:'2px' ,border:"1px solid"}}></ShoppingCartIcon>
          
        </Button>
      </CardActions>
    </Card>
  );
}
