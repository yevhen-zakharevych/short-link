import { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const {isLoading, request} = useHttp();
  const {token} = useContext(AuthContext);

  const fetchLinks = useCallback( async() => {
    try {
      const fetchedLinks = await request('api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(fetchedLinks);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (isLoading) {
    return <Loader />;
  }

  return (
   <>
    <LinksList links={links} />
   </>
  )
};
