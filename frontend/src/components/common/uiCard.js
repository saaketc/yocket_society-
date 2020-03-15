import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    card: {
        maxWidth: 345,
     
    },
    media: {
        height: 140,
    },
});

export default function UiCard(props) {

    
    const classes = useStyles();
   
    const { image, content, data, sideContent1, sideContent, property, mediaHeight, buttonLabel1, buttonLabel2, onClick, button, handleClick } = props;
    return (
        <Card className={classes.card}
           
            onClick={() => onClick ? onClick(data) : null}>
            <CardActionArea>
                <CardMedia
                    
                    className={mediaHeight ? classes.media : null}
                    image={image}
                    title={data[property]}
                />
                <CardContent >
                    <Typography gutterBottom variant="h6" component="h2">
                        {data[property]}
          </Typography>
          
                    <Typography variant="body2" color="textSecondary" component="p">
                       {content}
          </Typography>
                </CardContent>
                {sideContent && 
                <>
                <Typography variant="body2" color="textSecondary" component="p">
                       {sideContent1}
                       </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                       {sideContent}
                       </Typography>
                </>
                }
                
          
            </CardActionArea>
            <CardActions>
                { button &&
                <>
                 <Button size="small" color="primary"
                 onClick = {() => handleClick(data, '1')}>
                  {buttonLabel1}
        </Button> 
                <Button size="small" color="primary"
                 onClick = {() => handleClick(data, '0')}>
                    {buttonLabel2}
        </Button> 
        </>
                }
            </CardActions>
        </Card>
    );
}