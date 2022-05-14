import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  ListItemIcon,
  Divider,
  FormControl,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { LocalOffer as TagIcon } from "@material-ui/icons";



const useStyles = makeStyles((theme) => ({
  offerList: {
    width: "100%",
  },
  offerLoadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  offerListing: {
    display: "flex",
    // alignItems: "flex-end",
    flexDirection: "row",
    [theme.breakpoints.up("sm")]: {
      alignItems: "flex-start",
      flexDirection: "row",
    },
  },
  offerIcon: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inline-flex",
    },
  },
  offerTextWrapper: {
    textTransform: "uppercase",
    paddingRight: theme.spacing(1),
    width: "100%",
  },
  offerText: {
    display: "block",
  },
}));
export default function Rooms ({ roomId, reservationId, currRoom })  {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(currRoom)

  useEffect(() => {
      console.log(roomId, reservationId, room);
    setRoom(currRoom);
    // console.log("rooms",rooms);
  }, []);

 

  return (
   
      
          <ListItem
            alignItems="flex-start"
            className={classes.offerListing}
            key={room._id}
          >
            <ListItemIcon className={classes.offerIcon}>
              <TagIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.offerTextWrapper}
              primary={<span className={classes.offerText}>{room.roomType}</span>}
              secondary={
                <FormControl className={classes.offerText}>
                  {Object.keys(room.amenities).map((key,index) => {
                    return (
                       
                    <FormControlLabel control={<Checkbox id={index} checked = {room.amenities[key]} disabled/>} label={key} />
                    //   <div key={index} className={classes.offerText}>
                        
                    //     {line}
                    //   </div>
                    );
                  })}
                </FormControl>
              }
            />
            
          </ListItem>
        );

};
