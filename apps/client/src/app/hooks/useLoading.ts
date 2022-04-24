import { useEffect, useState } from 'react';
import { selectAllUsers, selectRoomList, useAppSelector } from '../store';
function useLoading() {
  const allUsers = useAppSelector(selectAllUsers);
  const roomList = useAppSelector(selectRoomList);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (allUsers.length && roomList.length) {
      setLoading(false);
    }
  }, [allUsers, roomList]);
  return [loading];
}
export default useLoading;
