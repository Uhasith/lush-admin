import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

import {
  Avatar,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { stringAvatar } from 'src/common/functions';
import { fetchMessages } from 'src/store/actions/msg.action';
import Label from 'src/components/Label';

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const style: any = {
  spinnerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const AllMessages = ({ onChatClick, keyword }) => {
  const dispatch = useDispatch();
  const allMessages = useSelector(({ msg }: RootStateOrAny) => msg.list);
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const user = useSelector(({ auth }: RootStateOrAny) => auth.user);

  const [msgs, setMsgs] = useState([]);
  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  useEffect(() => {
    if (keyword == '') {
      return setMsgs(allMessages);
    }

    const searchedMsgs = allMessages.filter((msg: any) => {
      if (String(msg?.worker?.name).toLowerCase().includes(keyword)) return msg;
    });

    setMsgs(searchedMsgs);
  }, [keyword, allMessages]);

  const unreadMessageCount = (messages: any) => {
    if (messages.length > 0) {
      const count = _.countBy(messages, (msg) => {
        return msg.status == 'Unread';
      });
      return count?.true;
    }
  };

  const filteredMessages =
    user?.role !== 'Admin' ? _.filter(msgs, ['worker.id', user?._id]) : msgs;

  return (
    <List disablePadding component="div">
      {loading ? (
        <Box sx={style.spinnerContainer}>
          <CircularProgress size={15} />
        </Box>
      ) : (
        <>
          {filteredMessages?.length > 0 ? (
            filteredMessages?.map(
              ({ messages, worker }: any, index: number) =>
                messages.length > 0 && (
                  <ListItemWrapper
                    key={index}
                    onClick={() => onChatClick(worker)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        {...stringAvatar(
                          user?.role === 'Admin'
                            ? worker?.name
                            : 'Admin Support'
                        )}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ mr: 1 }}
                      primaryTypographyProps={{
                        color: 'textPrimary',
                        variant: 'h5',
                        noWrap: true
                      }}
                      secondaryTypographyProps={{
                        color: 'textSecondary',
                        noWrap: true
                      }}
                      primary={
                        user?.role === 'Admin' ? worker.name : 'Admin/Support'
                      }
                      secondary={messages[0]?.description}
                    />
                    {unreadMessageCount(messages) && (
                      <Label color="primary">
                        <b>{unreadMessageCount(messages)}</b>
                      </Label>
                    )}
                  </ListItemWrapper>
                )
            )
          ) : (
            <p>No Messages</p>
          )}
        </>
      )}
    </List>
  );
};
export default AllMessages;
