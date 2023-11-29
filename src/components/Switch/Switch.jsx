import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./Switch.scss";

const bgInactiveColor = "#683B2B";
const bgActiveColor = "#EAD0B9";

export const PirogiSwitch = (props) => {
  return (
    <Switch {...props} className={"PirogiSwitch " + props?.className ?? ""} />
  );
};

// export const PirogiSwitch = styled(Switch)(({ theme }) => ({
//     width: 70,
//     height: 20,
//     padding: 0,
//     display: 'flex',
//     '& .MuiSwitch-input': {
//         width: 70,
//         left: 0,
//         top: 2,
//     },
//     '&:active': {
//       '& .MuiSwitch-thumb': {
//         width: 15,
//       },
//       '& .MuiSwitch-switchBase.Mui-checked': {
//         transform: 'translateX(50px)',
//       },
//     },
//     '& .MuiSwitch-switchBase': {
//       padding: 2,
//       '&.Mui-checked': {
//         transform: 'translateX(60px)',
//         color: '#fff',
//         '& + .MuiSwitch-track': {
//           opacity: 1,
//           backgroundColor: bgActiveColor,
//         },
//         '& .MuiSwitch-thumb': {
//             backgroundColor: bgInactiveColor
//         },
//         '& .MuiSwitch-input': {
//             left: -60,
//         },
//       },
//     },
//     '& .MuiSwitch-thumb': {
//       boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
//       paddingTop: 3,
//       width: 12,
//       height: 12,
//       borderRadius: 6,
//       transition: theme.transitions.create(['width'], {
//         duration: 200,
//       }),
//     },
//     '& .MuiSwitch-track': {
//       borderRadius: 16 / 2,
//       opacity: 1,
//       backgroundColor: bgInactiveColor,
//       boxSizing: 'border-box',
//     },
//   }));
