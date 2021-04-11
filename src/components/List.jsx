import { Chip,ListItem, makeStyles} from '@material-ui/core'
import React from 'react'
import db from '../config/firebase'

const useStyles = makeStyles({
    root:{
        margin : 'auto 10%'
    }
})

function List({item}) {
    const classes = useStyles()

    return (
        <ListItem className={classes.root} >
            <Chip label={item.todo} onDelete={e => db.collection('tasks').doc(item.id).delete()} color="primary" variant="outlined" />
        </ListItem>
    )
}

export default List
