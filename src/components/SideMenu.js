// import * as React from 'react';
// import Box from '@mui/material/Box';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';
// import { IconButton } from '@material-ui/core';

// export default function SwipeableTemporaryDrawer(props) {
//     const [state, setState] = React.useState({
//         left: false,
//     });
//     const toggleDrawer = (anchor, open) => (event) => {
//         if (
//             event &&
//             event.type === 'keydown' &&
//             (event.key === 'Tab' || event.key === 'Shift')
//         ) {
//             return;
//         }

//         setState({ ...state, [anchor]: open });
//     };

//     const list = (anchor) => (
//         <Box
//             sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//             role="presentation"
//             onClick={toggleDrawer(anchor, false)}
//             onKeyDown={toggleDrawer(anchor, false)}
//         >
//             <List>
//                 {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                     <ListItem key={text} disablePadding>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                             </ListItemIcon>
//                             <ListItemText primary={text} />
//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider />
//             <List>
//                 {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                     <ListItem key={text} disablePadding>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                             </ListItemIcon>
//                             <ListItemText primary={text} />
//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );

//     return (
//         <div>
//             {['left'].map((anchor) => (
//                 <React.Fragment key={anchor}>
//                     <IconButton onClick={toggleDrawer(anchor, true)} >
//                         <MenuIcon fontSize="small" />
//                     </IconButton>
//                     {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
//                     <SwipeableDrawer
//                         anchor={anchor}
//                         open={state[anchor]}
//                         onClose={toggleDrawer(anchor, false)}
//                         onOpen={toggleDrawer(anchor, true)}
//                     >
//                         {list(anchor)}
//                     </SwipeableDrawer>
//                 </React.Fragment>
//             ))}
//         </div>
//     );
// }


import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [menuName, setMenuName] = React.useState(null);

  const mainMenuListArr = ["a", "b", "c"];

  const subMenuObj = {
    a: ["a.1", "a.2", "a.3"],
    b: ["b.1", "b.2", "b.3"],
    c: ["c.1", "c.2", "c.3"]
  };

  const list = anchor => {
    let arr = menuName ? subMenuObj[menuName] : mainMenuListArr;
    const clickListener = text => {
      if (!menuName) {
        return setMenuName(text);
      } else {
        return alert(`${text} clicked`);
      }
    };
    return (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom"
        })}
        role="presentation"
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {arr.map((text, index) => (
            <ListItem button key={text} onClick={() => clickListener(text)}>
              <ListItemText primary={text} />
              {!menuName && <ChevronRightIcon />}
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  return (
    <div>
      {["left", "right", "top", "bottom"].map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {menuName && (
              <ListItem button onClick={() => setMenuName(null)}>
                <ListItemText primary="Back to main menu" />
                <ChevronLeftIcon />
              </ListItem>
            )}
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}