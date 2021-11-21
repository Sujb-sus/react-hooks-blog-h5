import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Outlet } from 'react-router-dom';

export default function FixedBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    switch (value) {
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/label');
        break;
      case 2:
        navigate('/message');
        break;
      default:
        navigate('/myself');
        break;
    }
  }, [value, navigate]);
  return (
    <>
      <Outlet />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
          <BottomNavigationAction label="首页" icon={<HomeIcon />} />
          <BottomNavigationAction label="标签" icon={<BookmarksIcon />} />
          <BottomNavigationAction label="留言" icon={<AssignmentIcon />} />
          <BottomNavigationAction label="关于我" icon={<AssignmentIndIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
