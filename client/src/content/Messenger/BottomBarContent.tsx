import { useState } from 'react';
import {
  Card,
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  Hidden,
  TextField,
  Divider
} from '@mui/material';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

import { styled } from '@mui/material/styles';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { stringAvatar } from 'src/common/functions';
import { sendMessage } from 'src/store/actions/msg.action';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
        height: 40px !important;
        margin: 0 ${theme.spacing(2)};
        align-self: center;
`
);

const Input = styled('input')({
  display: 'none'
});

function BottomBarContent({ to }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const currentUser = useSelector(({ auth }: RootStateOrAny) => auth.user);

  const onSendMessage = () => {
    if (message) {
      const payload = {
        to,
        from: currentUser?._id,
        description: message,
        isFromAdmin: currentUser?.role == 'Admin'
      };
      dispatch(sendMessage(payload));
    }
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Hidden mdDown>
        <Avatar
          {...stringAvatar(
            `${currentUser?.firstName} ${currentUser?.lastName}`
          )}
        />

        <DividerWrapper orientation="vertical" flexItem />
      </Hidden>
      <Box sx={{ flex: 1, mr: 2 }}>
        <TextField
          hiddenLabel
          fullWidth
          placeholder="Write here your message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Box>

      <Hidden mdDown>
        <DividerWrapper orientation="vertical" flexItem />
        <Button
          startIcon={<SendTwoToneIcon />}
          variant="contained"
          onClick={onSendMessage}
        >
          Send
        </Button>
      </Hidden>
    </Card>
  );
}

export default BottomBarContent;
