import { useEffect, useState } from 'react';
import { selectAllUsers, useAppSelector } from '../store';
function useLoading() {
  const allUsers = useAppSelector(selectAllUsers);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (allUsers.length) {
      setLoading(false);
    }
  }, [allUsers]);
  return [loading];
}
export default useLoading;
