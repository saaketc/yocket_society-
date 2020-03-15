import React from 'react';
import Button from '@material-ui/core/Button';
const color = 'bf2604'
const BasicButton = ({label}) => {

return(
    <Button
                       
                        fullWidth
                        variant="contained"
                        style={{ color: 'white', backgroundColor:color }}
                        
                    >
                        {label}
                    </Button>
)
}

export default BasicButton;